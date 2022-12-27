/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeadTitle from "../HeadTitle";
import ServiceBookItem from "./components/ServiceItem";
import { useHistory, useLocation } from "react-router-dom";
import { addServiceBookNow, clearAllServices } from "redux/booking";
import icon from "constants/icon";
import BookingTime from "./components/BookingTime";
import dayjs from "dayjs";
import order from "api/orderApi";
import { pickBy, identity } from "lodash";
import HeadMobile from "../HeadMobile";
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";
import { FLAT_FORM_TYPE } from "rootComponents/flatForm";
import { formatDatePost } from "utils/formatDate";
import BookingNowBill from "./components/BookingNowBill";
import { formatAddCart } from "utils/cart/formatAddCart";
import apointmentApi from "api/apointmentApi";
import { Container } from "@mui/material";
import { onClearApplyVoucher } from "redux/cart";
import { IDiscountPar } from "interface/discount";
import { XButton } from "components/Layout";
import { PopupNotification } from "components/Notification";
import { checkPhoneValid } from "utils/phoneUpdate";
import UserPaymentInfo from "pages/Account/components/UserPaymentInfo";
import { useDeviceMobile, useSwr } from "hooks";
import { AppContext } from "context/AppProvider";
import style from './booking.module.css'
import img from "constants/img";
import { IBranch, IOrganization } from "interface";
import API_ROUTE from "api/_api";
import BookingMap from "./components/BookingMap";
import { AUTH_LOCATION } from "api/authLocation";
import PaymentMethod from "components/PaymentMethod";

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
    const LOCATION = AUTH_LOCATION()
    const IS_MB = useDeviceMobile();
    const FLAT_FORM = EXTRA_FLAT_FORM();
    const [openNoti, setOpenNoti] = useState(initOpenNoti);
    const { USER } = useSelector((state: any) => state.USER);
    const history = useHistory();
    const location: any = useLocation();
    const TYPE_PAGE = location.state?.TYPE
    // handle UI
    const refBranch = useRef<HTMLDivElement>(null)
    const refIconRight = useRef<HTMLImageElement>(null)
    const mapRef = useRef<any>(null)
    const openBranch = () => {
        refBranch?.current?.classList.add(style.branch_show);
        refIconRight?.current?.classList.add(style.right_icon_ch)
    }
    const closeBranch = () => {
        refBranch.current?.classList.remove(style.branch_show);
        refIconRight.current?.classList.remove(style.right_icon_ch)
    }
    window.onclick = () => closeBranch()
    //api discount apply for book now
    //-------------------------------
    const org: IOrganization = useSwr(
        `${API_ROUTE.ORG(location?.state?.org?.id)}`,
        location?.state?.org?.id,
        { 'filter[location]': LOCATION }
    )?.response

    useEffect(() => {
        let mount = true
        if (mount) {
            dispatch(onClearApplyVoucher())
            if (location.state) {
                const action = {
                    org: location.state.org,
                    services: location.state.services,
                };
                dispatch(addServiceBookNow(action));
            } else {
                history.push("/home");
            }
        }
        return () => { mount = false }
    }, [location.state]);
    const { servicesBook } = SERVICES_BOOK;
    const [open, setOpen] = useState(false);
    const [paymentMethodId, setPaymentMethodId] = useState<any>();
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
    // const [seatAmount, SetSeatAmount] = useState(1);
    const onChooseBranch = (item: any) => {
        setBookTime({
            ...bookTime,
            branch_id: item?.id
        });
        closeBranch()
        mapRef?.current?.flyTo({
            center: [item?.longitude ?? org.longitude, item?.latitude ?? org?.latitude],
        });
    };
    const listCouponCode = servicesBook
        ?.map((item: any) => item?.service)
        ?.map((i: any) => i?.discount)
        ?.map((j: any) => j?.coupon_code)
        ?.filter(Boolean);

    //
    const { VOUCHER_APPLY } = useSelector((state: any) => state.carts);
    const coupon_codes = listCouponCode.concat(VOUCHER_APPLY.map((i: IDiscountPar) => i.coupon_code)).filter(Boolean)
    //[FIX]: Temple fix apply multi coupon code follow MYSPA Manager----
    const params_string = {
        products: [],
        services: services,
        treatment_combo: [],
        payment_method_id: paymentMethodId,
        coupon_code: coupon_codes.length > 0 ? coupon_codes : [],
        // coupon_code: VOUCHER_APPLY.length > 0 ? VOUCHER_APPLY.map((i: IDiscountPar) => i.coupon_code).filter(Boolean) : listCouponCode,
        description: "",
        branch_id: bookTime.branch_id,
    };
    const listPayment = location.state?.services?.map((item: any) => {
        const is_type = 'SERVICE';
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
        // note: "[ Số lượng người: " + seatAmount + " ] " + bookTime.note,
        note: bookTime.note,
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
                    content: t('my_ser.create_order_fail'),
                    children: <>
                        <XButton
                            title={t('my_ser.ok')}
                            onClick={() => setOpenNoti({ ...openNoti, open: false })}
                        />
                        <XButton
                            title={t('pm.goto_home')}
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
                content: t('my_ser.create_order_fail'),
                children: <>
                    <XButton
                        title="Đã hiểu"
                        onClick={() => setOpenNoti({ ...openNoti, open: false })}
                    />
                    <XButton
                        title={t('pm.goto_home')}
                        onClick={() => history.push("/home")}
                    />
                </>,
                load: false
            });
        }
    }
    //func appointment
    const gotoAppointment = () => {
        history.push("/lich-hen?tab=1");
    };
    const handlePostApps = async () => {
        setOpenNoti({ ...initOpenNoti, load: true })
        try {
            await apointmentApi.postAppointment(action, org?.id);
            dispatch(clearAllServices())
            setOpenNoti({
                open: true,
                content: t('my_ser.bk_success'),
                children: <>
                    <XButton
                        title={t('Header.see_calendar')}
                        onClick={gotoAppointment}
                    />
                </>,
                load: false
            });
        } catch (error) {
            console.log(error);
            setOpenNoti({
                open: true,
                content: t('my_ser.bk_fail_title'),
                children: <>
                    <XButton
                        title={t('my_ser.ok')}
                        onClick={() => setOpenNoti({ ...openNoti, open: false })}
                    />
                    <XButton
                        title={t('Header.see_calendar')}
                        onClick={() => history.push("/home")}
                    />
                </>,
                load: false
            });
        }
    };
    const handleBooking = () => {
        if (!USER) return history.push('/sign-in?1')
        if (!bookTime.time)
            return setOpenNoti({
                ...initOpenNoti,
                open: true,
                content: t('my_ser.pl_select_date'),
                children: <></>
            });
        if (location.state.TYPE === "BOOK_NOW" && finalAmount < 1000)
            return setOpenNoti({
                ...initOpenNoti,
                open: true,
                content: t('my_ser.minimum_order_is_1_000_VND'),
                children: <></>
            });
        if (FLAT_FORM === FLAT_FORM_TYPE.MB && !checkPhoneValid(USER?.telephone))
            return setOpenNoti({
                ...initOpenNoti,
                open: true,
                content: t('my_ser.enter_update_phone'),
                children: <>
                    <XButton
                        title={t('my_ser.update')}
                        onClick={() => history.push('/otp-form')}
                    />
                    <XButton
                        title={t('pm.later')}
                        onClick={() => setOpenNoti({ ...openNoti, open: false })}
                    />
                </>
            });
        if (location.state.TYPE === "BOOK_NOW") return handlePostOrder();
        handlePostApps();
    };
    return (
        <>
            <HeadTitle title={t('Header.booking')} />
            {IS_MB && <HeadMobile
                onBack={() => {
                    dispatch(clearAllServices());
                    history.goBack();
                }}
                title={t('Header.booking')}
            />}
            <Container>
                <div className={style.container}>
                    {
                        !IS_MB &&
                        <div className={style.left}>
                            <div className={style.left_cnt}>
                                {org && <BookingMap mapRef={mapRef} onChooseBranch={onChooseBranch} org={org} />}
                            </div>
                        </div>
                    }
                    <div className={style.right}>
                        <div className={style.section_user}>
                            <UserPaymentInfo
                                disableAddress
                                title={TYPE_PAGE === 'BOOK_NOW' ? t('pm.payment_info') : t('pm.payment_booking')}
                            />
                        </div>
                        <div className={style.section_org}>
                            <div className={style.right_org}>
                                <div className={style.right_org_img}>
                                    <img src={org?.image_url ?? img.imgDefault} alt="" />
                                </div>
                                <span className={style.right_org_name}>{org?.name}</span>
                            </div>
                            <div className={style.right_branches}>
                                <div
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); openBranch() }}
                                    className={style.right_branch_default}
                                >
                                    <img src={icon.pinMapGreen} alt="" className={style.map_icon} />
                                    <span className={style.branch_default_address}>
                                        {
                                            org?.branches?.find((i: IBranch) => i.id === bookTime.branch_id)?.full_address ??
                                            org?.full_address
                                        }
                                    </span>
                                    <img ref={refIconRight}
                                        src={icon.chevronRightBlack}
                                        className={style.right_icon} alt=""
                                    />
                                </div>
                                <div
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
                                    ref={refBranch} className={style.right_org_list_branch}
                                >
                                    <ul className={style.branch_list}>
                                        <li onClick={() => onChooseBranch(null)} className={style.branch_item}>
                                            <div className={style.branch_item_check}>
                                                {!bookTime.branch_id && <span></span>}
                                            </div>
                                            <div className={style.branch_item_name}>
                                                <span>{t('pm.org')}:</span>
                                                {org?.full_address}
                                            </div>
                                        </li>
                                        {
                                            org?.branches?.map((item: IBranch, index: number) => (
                                                <li onClick={() => onChooseBranch(item)}
                                                    key={index} className={style.branch_item}
                                                >
                                                    <div className={style.branch_item_check}>
                                                        {item.id === bookTime.branch_id && <span></span>}
                                                    </div>
                                                    <div className={style.branch_item_name}>
                                                        <span>{t('Mer_de.branch')}:</span>
                                                        {item.full_address}
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={style.section_services}>
                            <ul className={style.service_list}>
                                {servicesBook.map(
                                    (item: any, index: number) => (
                                        <li key={index}>
                                            <ServiceBookItem org={org} service={item} />
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div className={style.section_time}>
                            <div className={style.section_time_left}>
                                <img src={icon.clockAppGray} alt="" />
                                <div className={style.section_time_text}>
                                    {
                                        (bookTime.date && bookTime.time) ?
                                            `${bookTime.date} ${bookTime.time}` : t('my_ser.pl_select_date')
                                    }
                                </div>
                            </div>
                            <XButton
                                className={style.section_time_btn}
                                icon={icon.chevronRightBlack}
                                iconSize={16}
                                title={t('my_ser.time_select')}
                                onClick={() => setOpen(true)}
                            />
                        </div>
                        <div className={style.section_note}>
                            <textarea
                                className={style.note_textarea}
                                onChange={(e) =>
                                    setBookTime({ ...bookTime, note: e.target.value })
                                }
                                placeholder={t('my_ser.note_1')}
                            />
                        </div>
                        {
                            TYPE_PAGE === 'BOOK_NOW' &&
                            <div
                                style={FLAT_FORM !== 'BEAUTYX' ? { display: 'none' } : {}}
                                className={style.section_payment}
                            >
                                <PaymentMethod
                                    onSetPaymentMethod={(method) => setPaymentMethodId(method.id)}
                                />
                            </div>
                        }
                        <div className={style.section_bill}>
                            {
                                TYPE_PAGE === 'BOOK_NOW' &&
                                <BookingNowBill org={org} setFinalAmount={setFinalAmount} />
                            }
                            <XButton
                                className={style.post_btn}
                                title={
                                    TYPE_PAGE === "BOOK_NOW"
                                        ? t('my_ser.pay_and_book')
                                        : t('Home.Order_step_4')
                                }
                                loading={openNoti.load}
                                onClick={handleBooking}
                            />
                        </div>
                    </div>
                </div>
            </Container>
            <BookingTime
                bookTime={bookTime}
                setBookTime={setBookTime}
                open={open}
                setOpen={setOpen}
                org={org}
            />
            <PopupNotification
                title={t('Header.noti')}
                content={openNoti.content}
                open={openNoti.open}
                children={openNoti.children}
                setOpen={() => setOpenNoti({ ...openNoti, open: false })}
            />
        </>
    );
}

export default Booking;
