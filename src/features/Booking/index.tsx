/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeadTitle from "../HeadTitle";
import "./style.css";
import onErrorImg from "utils/errorImg";
import ServiceBookItem from "./components/ServiceItem";
import { useHistory, useLocation } from "react-router-dom";
import { addServiceBookNow, clearAllServices } from "redux/servicesBookSlice";
import icon from "constants/icon";
import BookingTime from "./components/BookingTime";
import dayjs from "dayjs";
import order from "api/orderApi";
import { pickBy, identity } from "lodash";
import HeadMobile from "../HeadMobile";
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";
import { FLAT_FORM_TYPE } from "rootComponents/flatForm";
import PaymentMethodCpn from "../PaymentMethod/index";
import { formatDatePost } from "utils/formatDate";
import { extraPaymentMethodId } from "../PaymentMethod/extraPaymentMethodId";
import BookingNowBill from "./components/BookingNowBill";
import { formatAddCart } from "utils/cart/formatAddCart";
import { fetchAsyncOrg } from "redux/org/orgSlice";
import { STATUS } from "redux/status";
import apointmentApi from "api/apointmentApi";
import { onSetStatusApp } from "redux/appointment/appSlice";
import { onRefreshServicesNoBookCount } from "redux/order/orderSlice";
import { Container } from "@mui/material";
import { PopUpVoucherOrg } from "pages/Carts/components/CartGroupItem";
import SectionTitle from "../SectionTitle";
import { onClearApplyVoucher } from "redux/cartSlice";
import { IDiscountPar } from "interface/discount";
import { AlertSnack, XButton } from "components/Layout";
import { PopupNotification } from "components/Notification";
import { checkPhoneValid } from "utils/phoneUpdate";
import UserPaymentInfo from "pages/Account/components/UserPaymentInfo";
import { useDeviceMobile } from "hooks";
import { AppContext } from "context/AppProvider";

// end
const date = dayjs();
const initOpenNoti = {
    content: "",
    open: false,
    children: <></>,
    load: false
}
function Booking() {
    const dispatch = useDispatch();
    const { t } = useContext(AppContext)
    const [finalAmount, setFinalAmount] = useState(0)
    const { SERVICES_BOOK } = useSelector((state: any) => state);
    const { org, status } = useSelector((state: any) => state.ORG);
    const IS_MB = useDeviceMobile();
    const FLAT_FORM = EXTRA_FLAT_FORM();
    const [openAlertSnack, setOpenAlertSnack] = useState({
        title: "",
        open: false,
    });
    const [openNoti, setOpenNoti] = useState(initOpenNoti);
    const [openVouchers, setOpenVouchers] = useState(false);
    const { USER } = useSelector((state: any) => state.USER);
    const { payments_method } = useSelector(
        (state: any) => state.PAYMENT.PAYMENT
    );
    const branchRef = useRef<any>();
    const history = useHistory();
    const location: any = useLocation();
    const TYPE_PAGE = location.state?.TYPE
    //api discount apply for book now
    //-------------------------------

    const callOrgDetail = () => {
        if (location.state.org.id !== org?.id || status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncOrg(location.state.org.id));
        }
    };
    useEffect(() => {
        dispatch(onClearApplyVoucher())
        if (location.state) {
            callOrgDetail();
            const action = {
                org: location.state.org,
                services: location.state.services,
            };
            dispatch(addServiceBookNow(action));
        } else {
            history.push("/home");
        }
    }, [location.state]);
    const { servicesBook } = SERVICES_BOOK;
    const branches = org?.branches?.concat(org);
    const [open, setOpen] = useState(false);
    const [chooseE_wall, setChooseE_wall] = useState<any>();
    const [bookTime, setBookTime] = useState({
        date: date.format("DD-MM-YYYY"),
        time: null,
        note: "",
        branch_id: null,
    });
    const services = servicesBook.map((item: any) => {
        return {
            id: item.service?.id,
            quantity: item.quantity,
        };
    });
    const [seatAmount, SetSeatAmount] = useState(1);
    const onDropBranchList = () => {
        branchRef?.current?.classList?.toggle("drop-show-branches");
    };
    const onChooseBranch = (item: any) => {
        onDropBranchList();
        setBookTime({
            ...bookTime,
            branch_id: item.subdomain ? null : item.id,
        });
    };
    const listCouponCode = servicesBook
        ?.map((item: any) => item?.service)
        ?.map((i: any) => i?.discount)
        ?.map((j: any) => j?.coupon_code)
        ?.filter(Boolean);

    //
    const payment_method_id = extraPaymentMethodId(
        payments_method,
        chooseE_wall
    );
    const { VOUCHER_APPLY } = useSelector((state: any) => state.carts);
    const coupon_codes = listCouponCode.concat(VOUCHER_APPLY.map((i: IDiscountPar) => i.coupon_code)).filter(Boolean)
    //[FIX]: Temple fix apply multi coupon code follow MYSPA Manager----
    const params_string = {
        products: [],
        services: services,
        treatment_combo: [],
        payment_method_id: FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX ? 1 : payment_method_id,
        coupon_code: coupon_codes.length > 0 ? coupon_codes : [],
        // coupon_code: VOUCHER_APPLY.length > 0 ? VOUCHER_APPLY.map((i: IDiscountPar) => i.coupon_code).filter(Boolean) : listCouponCode,
        description: "",
        branch_id: bookTime.branch_id,
    };
    const listPayment = location.state?.services?.map((item: any) => {
        const is_type = 2;
        const sale_price =
            item.service?.special_price > 0
                ? item.service?.special_price
                : item.service?.price;
        const values = formatAddCart(
            item.service,
            org,
            is_type,
            item.quantity,
            sale_price,
            item.service.discount
        );
        return values;
    });

    const dayBook = formatDatePost(bookTime.date);
    const action = {
        note: "[ Số lượng người: " + seatAmount + " ] " + bookTime.note,
        time_start: `${dayBook} ${bookTime.time}:00`,
        branch_id: bookTime.branch_id,
        order_id: location.state.order_id,
        service_ids: services?.map((item: any) => item?.id),
    };
    async function handlePostOrder() {
        const params = pickBy(params_string, identity);
        setOpenNoti({ ...initOpenNoti, load: true })
        try {
            //tracking.PAY_CONFIRM_CLICK(org?.id, formatProductList(params.products))
            const response = await order.postOrder(org?.id, params);
            const state_payment = await { ...response.data.context, FINAL_AMOUNT: finalAmount };
            const transaction_uuid =
                state_payment.payment_gateway.transaction_uuid;
            if (response.data.context.status !== "CANCELED") {
                const actionAfter = {
                    ...action,
                    org_id: org?.id,
                    order_id: response.data.context.id,
                    quantity: services[0]?.quantity,
                };
                history.push({
                    pathname: `/trang-thai-don-hang/`,
                    search: transaction_uuid,
                    state: { state_payment, actionAfter, listPayment },
                });
                setOpenNoti({ ...initOpenNoti, load: false })
                if (FLAT_FORM === 'MOMO') localStorage.setItem('APP_INFO', JSON.stringify(actionAfter))
            } else {
                setOpenNoti({
                    open: true,
                    content: "Tạo đơn hàng thất bại",
                    children: <>
                        <XButton
                            title="Đã hiểu"
                            onClick={() => setOpenNoti({ ...openNoti, open: false })}
                        />
                        <XButton
                            title="Về trang chủ"
                            onClick={() => history.push("/home")}
                        />
                    </>,
                    load: false
                });
            }
            //setLoading(false);
        } catch (err) {
            console.log(err);
            setOpenNoti({
                open: true,
                content: "Tạo đơn hàng thất bại",
                children: <>
                    <XButton
                        title="Đã hiểu"
                        onClick={() => setOpenNoti({ ...openNoti, open: false })}
                    />
                    <XButton
                        title="Về trang chủ"
                        onClick={() => history.push("/home")}
                    />
                </>,
                load: false
            });
        }
    }
    //func appointment
    const gotoAppointment = () => {
        dispatch(onSetStatusApp());
        history.push("/lich-hen?tab=1");
    };
    const handlePostApps = async () => {
        setOpenNoti({ ...initOpenNoti, load: true })
        try {
            await apointmentApi.postAppointment(action, org?.id);
            dispatch(onRefreshServicesNoBookCount());
            dispatch(clearAllServices())
            setOpenNoti({
                open: true,
                content: "Đặt hẹn thành công",
                children: <>
                    <XButton
                        title="Xem lịch hẹn"
                        onClick={gotoAppointment}
                    />
                </>,
                load: false
            });
        } catch (error) {
            console.log(error);
            setOpenNoti({
                open: true,
                content: "Có lỗi xảy ra trong quá trình đặt hẹn",
                children: <>
                    <XButton
                        title="Đã hiểu"
                        onClick={() => setOpenNoti({ ...openNoti, open: false })}
                    />
                    <XButton
                        title="Về trang chủ"
                        onClick={() => history.push("/home")}
                    />
                </>,
                load: false
            });
        }
    };
    const handleSeatsAmount = (props: any) => {
        switch (props) {
            case "asc":
                SetSeatAmount(seatAmount + 1);
                break;
            case "desc":
                SetSeatAmount(seatAmount - 1);
                break;
            default:
                break;
        }
    };

    const handleBooking = () => {
        if (USER) {
            if (bookTime.time) {
                if (location.state.TYPE === "BOOK_NOW") {
                    if (finalAmount < 1000) {
                        return setOpenNoti({
                            ...initOpenNoti,
                            open: true,
                            content: `Đơn hàng tối thiểu là 1.000đ`,
                            children: <></>
                        });
                    }
                    if (FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX) {

                        handlePostOrder();
                        // if (chooseE_wall) return 
                        // else {
                        //     setOpenAlertSnack({
                        //         ...openAlertSnack,
                        //         open: true,
                        //         title: "Bạn Chưa chọn phương thức thanh toán!",
                        //     });
                        // }
                    }
                    else if (FLAT_FORM === FLAT_FORM_TYPE.MB && !checkPhoneValid(USER?.telephone)) {
                        setOpenNoti({
                            ...initOpenNoti,
                            open: true,
                            content: `Cập nhập số điện thoại để tiếp tục thanh toán!`,
                            children: <>
                                <XButton
                                    title="Cập nhập"
                                    onClick={() => history.push('/otp-form')}
                                />
                                <XButton
                                    title="Để sau"
                                    onClick={() => setOpenNoti({ ...openNoti, open: false })}
                                />
                            </>
                        });
                    } else {
                        return handlePostOrder();
                    }
                } else {
                    handlePostApps();
                }
            } else {
                //pop up choose time request
                setOpenAlertSnack({
                    ...openAlertSnack,
                    open: true,
                    title: "Bạn cần chọn Thời Gian cho buổi hẹn!",
                });
            }
        } else {
            history.push("/sign-in?1");
        }
    };
    const [address, setAddress] = useState<any>();
    return (
        <>
            <Container>
                <AlertSnack
                    title={openAlertSnack.title}
                    open={openAlertSnack.open}
                    status="FAIL"
                    onClose={() =>
                        setOpenAlertSnack({
                            ...openAlertSnack,
                            open: false,
                        })
                    }
                />
                <HeadTitle title="Đặt hẹn" />
                {IS_MB && <HeadMobile title="Đặt hẹn" />}
                <div className="booking-wrap">
                    <div className="booking-cnt">
                        <div className="booking-cnt__left">
                            {IS_MB === false && org && (
                                <></>
                            )}

                        </div>
                        <div className="booking-cnt__right">
                            {IS_MB && <UserPaymentInfo
                                title={TYPE_PAGE === 'BOOK_NOW' ? t('pm.payment_info') : t('pm.payment_booking')}
                                onSetAddressDefault={setAddress}
                            />}
                            <br />
                            <div className="booking-cnt__right-org">
                                <img
                                    src={org?.image_url}
                                    onError={(e) => onErrorImg(e)}
                                    alt=""
                                    className="org-avt"
                                />
                                <div className="book-org-detail">
                                    <p className="org-name">{org?.name}</p>
                                    <p className="org-address">
                                        {org?.full_address}
                                    </p>
                                </div>
                            </div>
                            {
                                location.state?.vouchers?.length > 0 &&
                                <>
                                    <button
                                        onClick={() => setOpenVouchers(true)}
                                        className="flex-row booking-cnt__right-voucher"
                                    >
                                        Mã khuyếm mãi
                                        <img src={icon.cardDiscountOrange} alt="" />
                                    </button>
                                    <PopUpVoucherOrg
                                        org={org}
                                        open={openVouchers}
                                        setOpen={setOpenVouchers}
                                        vouchers={location.state.vouchers}
                                    />
                                </>
                            }
                            <div className="booking-cnt__right-services">
                                <ul className="booking-service-list">
                                    {servicesBook.map(
                                        (item: any, index: number) => (
                                            <li key={index}>
                                                <ServiceBookItem
                                                    org={org}
                                                    service={item}
                                                />
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div className="booking-cnt__right-branches">
                                <span className="book-section-title">
                                    Địa điểm
                                </span>
                                <div className="branch-drop">
                                    <div
                                        onClick={onDropBranchList}
                                        className="flex-row-sp branch-choose"
                                    >
                                        <span className="flex-row">
                                            <img
                                                style={{ marginRight: "4px" }}
                                                src={icon.mapPinRed}
                                                alt=""
                                            />
                                            {bookTime.branch_id
                                                ? 'Chi nhánh: ' + org?.branches?.find(
                                                    (i: any) =>
                                                        i.id ===
                                                        bookTime.branch_id
                                                )?.full_address
                                                : 'Trụ sở: ' + org?.full_address}
                                        </span>
                                        {org?.branches?.length > 0 && (
                                            <img
                                                src={icon.arrowDownPurple}
                                                alt=""
                                            />
                                        )}
                                    </div>
                                    {org?.branches?.length > 0 && (
                                        <ul
                                            ref={branchRef}
                                            className="branch-list"
                                        >
                                            {branches?.map(
                                                (item: any, index: number) => (
                                                    <li
                                                        onClick={() =>
                                                            onChooseBranch(item)
                                                        }
                                                        style={
                                                            bookTime.branch_id ===
                                                                item.id
                                                                ? {
                                                                    color: "var(--text-black)",
                                                                }
                                                                : {}
                                                        }
                                                        key={index}
                                                    >
                                                        {(index + 1 == branches.length) ? 'Trụ sở: ' : 'Chi nhánh: '}
                                                        {item?.full_address}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div className="flex-row-sp booking-cnt__right-time">
                                <div className="book-time">
                                    <span className="book-section-title">
                                        Thời gian
                                    </span>
                                    {bookTime.time && bookTime.time ? (
                                        <span>
                                            {bookTime.date} {bookTime.time}
                                        </span>
                                    ) : (
                                        <span
                                            style={{ color: "var(--red-cl)" }}
                                        >
                                            Vui lòng chọn thời gian
                                        </span>
                                    )}
                                </div>
                                <XButton
                                    title="Chọn"
                                    onClick={() => setOpen(true)}
                                    loading={false}
                                />
                            </div>
                            <div className="flex-row-sp booking-cnt__right-time">
                                <div className="book-seats-amount">
                                    <span className="book-section-title">
                                        Số người sử dụng dịch vụ
                                    </span>
                                    <div className="seats_amount-cnt">
                                        <button
                                            className="desc"
                                            disabled={
                                                seatAmount === 1 ? true : false
                                            }
                                            onClick={() =>
                                                handleSeatsAmount("desc")
                                            }
                                        >
                                            {"-"}
                                        </button>
                                        <div className="book-section-title amount">
                                            {seatAmount}
                                        </div>
                                        <button
                                            className="asc"
                                            disabled={
                                                (seatAmount >= 10 ||
                                                    seatAmount >=
                                                    services[0]?.quantity ||
                                                    services[0]?.quantity === 1)
                                                    ? true
                                                    : false
                                            }
                                            onClick={() =>
                                                handleSeatsAmount("asc")
                                            }
                                        >
                                            {"+"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="booking-cnt__right-time">
                                <span className="book-section-title">
                                    Ghi chú
                                </span>
                                <br />
                                <textarea
                                    onChange={(e) =>
                                        setBookTime({
                                            ...bookTime,
                                            note: e.target.value,
                                        })
                                    }
                                    name=""
                                    id=""
                                    cols={30}
                                    rows={5}
                                ></textarea>
                            </div>
                            <div
                                style={
                                    FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX &&
                                        location.state.TYPE === "BOOK_NOW"
                                        ? { display: "block" }
                                        : { display: "none" }
                                }
                            >
                                {
                                    FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX
                                        ?
                                        <>
                                            <SectionTitle title={'Phương thức thanh toán'} />
                                            <span style={{
                                                backgroundColor: "var(--pink-momo)",
                                                marginLeft: "12px",
                                                marginBottom: "12px",
                                                padding: "0px 8px",
                                                borderRadius: "6px",
                                                color: "var(--white)"
                                            }}>
                                                MOMO
                                            </span>
                                            <br />
                                        </>
                                        :
                                        <PaymentMethodCpn
                                            e={chooseE_wall}
                                            onPaymentMethodChange={setChooseE_wall}
                                        />
                                }
                            </div>
                            <div className="booking-cnt__bot">
                                {location.state.TYPE === "BOOK_NOW" && (
                                    <BookingNowBill org={org} setFinalAmount={setFinalAmount} />
                                )}
                                <XButton
                                    title={
                                        location.state?.TYPE === "BOOK_NOW"
                                            ? "Thanh toán và đặt hẹn ngay"
                                            : "Đặt hẹn ngay"
                                    }
                                    loading={openNoti.load}
                                    onClick={handleBooking}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <BookingTime
                    bookTime={bookTime}
                    setBookTime={setBookTime}
                    open={open}
                    setOpen={setOpen}
                    org={org}
                />
                <PopupNotification
                    title="Thông báo"
                    content={openNoti.content}
                    open={openNoti.open}
                    children={openNoti.children}
                    setOpen={() => setOpenNoti({ ...openNoti, open: false })}
                />
            </Container>
        </>
    );
}

export default Booking;
