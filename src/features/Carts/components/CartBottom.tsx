import React, { useContext, useState } from "react";
import { Container, Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { identity, pickBy } from "lodash";
import { PopupNotification } from "components/Notification";
// ==== api tracking ====
import tracking from "api/trackApi";
import { IDataOtp } from "../../Otp/_model";
import { IDiscountPar } from "interface/discount";
import { cartReducer } from "utils/cart/cartReducer";
import formatProductList from "utils/tracking";
import order from "api/orderApi";
import { FLAT_FORM_TYPE } from "rootComponents/flatForm";
import authentication from "api/authApi";
import { putUser } from "redux/USER/userSlice";
import formatPrice from "utils/formatPrice";
import { AppContext } from "context/AppProvider";
import { checkPhoneValid } from "utils/phoneUpdate";
import icon from "constants/icon";
import RenderRecatpcha, { FieldOtps } from "features/Otp/dialogOtp";
import { useDeviceMobile, useSwr } from "utils/index"
import { VoucherOrgItem } from "./CartGroupItem";
import { IOrganization } from "interface/organization";
import { onClearApplyVoucher } from "redux/cartSlice";
import { AlertSnack, XButton } from "components/Layout";

export interface OpenVcProp {
    open: boolean,
    voucher: string
}

function CartBottom(props: any) {
    const { DATA_CART, DATA_PMT } = props;
    const cartAmount = DATA_CART.cartAmount;
    const { t } = useContext(AppContext);
    const dispatch = useDispatch();
    const VOUCHER_APPLY: IDiscountPar[] = useSelector((state: any) => state.carts.VOUCHER_APPLY);
    const { cartQuantityCheck } = useSelector((state: any) => state.carts);
    const [load, setLoad] = useState(false);
    const FLAT_FORM = sessionStorage.getItem('FLAT_FORM');
    //* [ OTP  update telephone number ]
    const [otp, setOtp] = useState(false);
    // const [otpCode, setOtpCode] = useState(false);
    const [dataOtp, setDataOtp] = useState({
        open: false,
        telephone: '',
        code: '',
        verification_id: ''
    });
    const [openVc, setOpenVc] = useState<OpenVcProp>({
        open: false,
        voucher: ""
    })
    //* [END]  OTP  update telephone number
    //* [ Throw exception noti ]
    const [openAlertSnack, setOpenAlertSnack] = useState({
        title: "",
        open: false,
    });
    const [openNoti, setOpenNoti] = useState({
        content: "",
        open: false,
        children: <></>
    });
    //* [END] Throw exception noti
    const history = useHistory();
    const USER = useSelector((state: any) => state.USER.USER);
    const listDiscount = DATA_CART.cartList
        .filter((item: any) => item.isConfirm === true)
        .map((item: any) => item.discount);
    const listCouponCode = listDiscount
        .map((item: any) => item?.coupon_code)
        .filter(Boolean)
        .concat(VOUCHER_APPLY.map((i: IDiscountPar) => i.coupon_code))
        ;
    const {
        products, cart_confirm,
        combos_id, services_id, products_id
    } = cartReducer(
        DATA_CART.cartList.filter((i: any) => i.isConfirm === true)
    );

    const coupon_code_arr = listCouponCode.length > 0 ? listCouponCode : []

    const pramsOrder = {
        user_address_id: DATA_PMT.address?.id,
        branch_id: DATA_PMT.branch?.id,
        payment_method_id: DATA_PMT.payment_method_id
            ? DATA_PMT.payment_method_id
            : DATA_PMT.pmtMethod?.id,
        // payment_method_id: 5,
        products: products_id,
        services: services_id,
        treatment_combo: combos_id,
        coupon_code: coupon_code_arr.concat([openVc.voucher]).filter(Boolean)
    };

    async function handlePostOrder() {
        setLoad(true)
        try {
            tracking.PAY_CONFIRM_CLICK(
                DATA_PMT.org.id,
                formatProductList(pramsOrder.products)
            );
            const response = await order.postOrder(
                DATA_PMT.org.id,
                pickBy(pramsOrder, identity)
            );
            const state_payment = await response.data.context;
            const transaction_uuid =
                state_payment.payment_gateway.transaction_uuid;
            if (response.data.context.status !== "CANCELED") {
                history.push({
                    pathname: `/trang-thai-don-hang/`,
                    search: transaction_uuid,
                    state: { state_payment },
                });
            } else {
                setOpenNoti({
                    open: true,
                    content: t("pm.order_fail"),
                    children: <>
                        <XButton
                            title={t("pm.agree")}
                            onClick={() => setOpenNoti({ ...openNoti, open: false })}
                        />
                        <XButton
                            title={t("pm.goto_home")}
                            onClick={() => history.push("/home")}
                        />
                    </>
                });
            }
            setLoad(false);
        } catch (err) {
            console.log(err);
            setLoad(false);
            setOpenNoti({
                open: true,
                content: t("pm.order_fail"),
                children: <>
                    <XButton
                        title={t("pm.agree")}
                        onClick={() => setOpenNoti({ ...openNoti, open: false })}
                    />
                    <XButton
                        title={t("pm.goto_home")}
                        onClick={() => history.push("/home")}
                    />
                </>
            });
        }
    }

    const handleSubmitOrder = () => {
        if (USER && DATA_PMT.org && pramsOrder.payment_method_id) {
            if (!DATA_PMT.address && products.length > 0) {
                setOpenAlertSnack({
                    ...openAlertSnack,
                    open: true,
                    title: "Chưa có địa chỉ giao hàng !",
                });
            }
            else if (FLAT_FORM === FLAT_FORM_TYPE.MB && !checkPhoneValid(USER?.telephone)) {
                setOpenNoti({
                    open: true,
                    content: `Cập nhập số điện thoại để tiếp tục thanh toán!`,
                    children: <>
                        <XButton
                            title="Cập nhập"
                            onClick={handleOtp}
                        />
                        <XButton
                            title="Để sau"
                            onClick={() => setOpenNoti({ ...openNoti, open: false })}
                        />
                    </>
                });
            }
            else {
                handlePostOrder();
            }
        } else if (!pramsOrder.payment_method_id) {
            setOpenAlertSnack({
                ...openAlertSnack,
                open: true,
                title: "Bạn Chưa chọn phương thức thanh toán!",
            });
        }
    };


    const vouchersCal = VOUCHER_APPLY.map((i: IDiscountPar) => {
        let discountValue = i.discount_value;
        if (!i.maximum_discount_value || cartAmount < i.maximum_discount_value) {
            discountValue = cartAmount - (cartAmount * i.discount_value / 100)
        }
        if (i.maximum_discount_value && cartAmount > i.maximum_discount_value) {
            discountValue = i.maximum_discount_value
        }
        if (i.discount_type === "PRODUCT" && i.items_count === 0 && i.discount_unit === "PRICE") {
            // console.log(cartQuantityCheck, i.discount_value)
            discountValue = cartQuantityCheck * i.discount_value
        }
        // console.log(discountValue)
        return {
            ...i,
            discount_value: (i.discount_unit === "PERCENT" || i.discount_type === "PRODUCT") ?
                discountValue : i.discount_value
        }
    })
    let discountVoucherTotal = 0
    if (VOUCHER_APPLY.length > 0) {
        discountVoucherTotal = vouchersCal
            .map((i: IDiscountPar) => i.discount_value)
            .reduce((pre: number, cur: number) => pre + cur)
    }
    // console.log(discountVoucherTotal, vouchersCal)
    const handleOtp = () => {
        setOtp(true);
        setOpenNoti({ ...openNoti, open: false })
    }
    const handleUpdatePhone = async (props: IDataOtp) => {
        console.log(props);
        try {

            const paramsOb = {
                "telephone": props.telephone,
                "code": props.code,
                "verification_id": props.verification_id
            }
            const res = await authentication.putUserProfile(paramsOb);
            dispatch(putUser({ ...USER, }));
            if (res) {
                setDataOtp({
                    ...dataOtp,
                    open: false
                })
                alert('cập nhập thành công');
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
            setOpenAlertSnack({
                ...openAlertSnack,
                open: true,
                // title: JSON.stringify(err),
                title: 'Đã có lỗi xảy ra vui lòng thử lại sau!'
            });
        }
    }
    return (
        <>
            <InputVoucher
                open={openVc}
                setOpen={setOpenVc}
                cart_confirm={cart_confirm}
                organization={DATA_PMT.org}
                cartAmount={cartAmount}
                services_id={services_id.map(i => i.id)}
                products_id={products_id.map(i => i.id)}
            />
            <div className="re-cart-bottom">
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
                <Container>
                    <div className="re-cart-bottom__cnt">
                        <div className="re-cart-bottom__total">
                            <div className="flex-row re-cart-bottom__total-discount">
                                <button
                                    onClick={() => setOpenVc({ ...openVc, open: true })}
                                    className="open_voucher_btn"
                                >
                                    Nhập mã khuyến mại
                                    <img src={icon.cardDiscountOrange} alt="" />
                                </button>
                            </div>
                            <div className="re-cart-bottom__cal">
                                {
                                    openVc.voucher !== "" &&
                                    <div className="flex-row-sp re-cart-bottom__cal-item">
                                        <span>Mã khuyến mại</span>
                                        <span>
                                            {openVc.voucher}
                                        </span>
                                    </div>
                                }
                                <div className="flex-row-sp re-cart-bottom__cal-item">
                                    <span>{`${t("pm.total_money")}`}</span>
                                    <span>
                                        {formatPrice(DATA_CART.cartAmount)}đ
                                    </span>
                                </div>
                                {listDiscount.filter(Boolean).length > 0 && (
                                    <div className="flex-row-sp re-cart-bottom__cal-item">
                                        <span>{`${t("pm.sale")}`}</span>
                                        <span>
                                            -
                                            {formatPrice(
                                                DATA_CART.cartAmountDiscount
                                            )}
                                            đ
                                        </span>
                                    </div>
                                )}
                                {
                                    VOUCHER_APPLY.length > 0 &&
                                    vouchersCal
                                        // .filter((i: IDiscountPar) => i.discount_type === "SUB_TOTAL")
                                        .map((item: IDiscountPar) => (
                                            <div key={item.id} className="flex-row-sp re-cart-bottom__cal-item">
                                                <span>{item.title}</span>
                                                <span>
                                                    -
                                                    {formatPrice(
                                                        item.discount_value
                                                    )}đ
                                                    {/* {item.discount_unit === "PERCENT" && "%"} */}
                                                    {/* {item.discount_unit === "PRICE" && "đ"} */}
                                                </span>
                                            </div>
                                        ))
                                }
                            </div>
                            <div className="flex-row-sp re-cart-bottom__pay">
                                <span className="left">{`${t(
                                    "pm.total_payment"
                                )}`}</span>
                                <div className="right">
                                    <span className="right-money">
                                        {formatPrice(
                                            DATA_CART.cartAmount -
                                            DATA_CART.cartAmountDiscount -
                                            discountVoucherTotal
                                        )}
                                        đ
                                    </span>
                                    <XButton
                                        title={`${t("pm.total_payment")}`}
                                        loading={load}
                                        onClick={handleSubmitOrder}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
                <PopupNotification
                    open={openNoti.open}
                    children={openNoti.children}
                    content={openNoti.content}
                />
            </div>
            {
                otp && <RenderRecatpcha
                    setOpen={setOtp}
                    open={otp}
                    dataOtp={dataOtp}
                    setDataOtp={setDataOtp}
                    handleSubmit={handleUpdatePhone}
                />
            }
            {
                dataOtp.verification_id && <FieldOtps
                    open={dataOtp.open}
                    setOpen={setDataOtp}
                    dataOtp={dataOtp}
                    setDataOtp={setDataOtp}
                    handleSubmit={handleUpdatePhone}
                />
            }
        </>
    );
}

export default CartBottom;

interface InputVoucherProps {
    open: OpenVcProp,
    setOpen: (open: OpenVcProp) => void,
    cart_confirm: any,
    organization?: IOrganization,
    services_id: number[],
    products_id: number[],
    cartAmount: number
}

export const InputVoucher = (props: InputVoucherProps) => {
    const dispatch = useDispatch();
    const IS_MB = useDeviceMobile();
    const { open, setOpen, cart_confirm, organization, cartAmount, services_id, products_id } = props;
    const [shouldFetch, setShouldFetch] = useState(false);
    const [text, setText] = useState("");
    const onInputChange = (e: any) => {
        if (text.length <= 25) {
            setText(e.target.value)
            setShouldFetch(false)
        }
    }
    const { response, error } = useSwr(`/discounts/${text}`, (shouldFetch && text !== ""))
    const voucher: IDiscountPar = { ...response, coupon_code: text }

    let voucher_org: any
    if (text !== "" && response) voucher_org = response?.organizations[0]

    return (
        <Dialog
            fullScreen={IS_MB}
            open={open.open}
            onClose={() => setOpen({ ...open, open: false })}
        >
            <div className="vc_container">
                <div className="vc_header">
                    <span className="vc_header_title">
                        Beautyx khuyến mại
                    </span>
                    <button
                        onClick={() => setOpen({ ...open, open: false })}
                        className="vc_header_btn"
                    >
                        <img src={icon.closeBlack} alt="" />
                    </button>
                </div>
                <div className="vc_body">
                    <div className="vc_body_input">
                        <input
                            disabled={cart_confirm.length > 0 && false}
                            value={text} onChange={onInputChange} type="text"
                        />
                        <XButton
                            style={text === "" ? {
                                backgroundColor: "var(--bg-color)",
                                cursor: "no-drop"
                            } : {}}
                            className="vc_body_input_btn"
                            title="Áp dụng"
                            loading={false}
                            onClick={() => setShouldFetch(true)}
                        />
                        {
                            text !== "" &&
                            <button
                                onClick={() => {
                                    setText("")
                                    setOpen({ ...open, voucher: "" })
                                    dispatch(onClearApplyVoucher())
                                }}
                                className="vc_body_input_del"
                            >
                                <img src={icon.closeBlack} alt="" />
                            </button>
                        }
                    </div>
                    {
                        error &&
                        <div className="vc_cart_none">
                            Mã giảm giá {text} không hợp lệ ! Bạn vui lòng kiểm tra lại mã nhé
                        </div>
                    }
                    {
                        cart_confirm.length === 0 &&
                        <div className="vc_cart_none">
                            Chọn Dịch vụ / sản phẩm trong giỏ hàng để áp dụng Voucher
                        </div>
                    }
                    {
                        voucher_org && cart_confirm.length > 0 &&
                        <div className="vc_cart_voucher_org">
                            Áp dụng khi thanh toán cho cửa hàng <h3>{voucher_org.name}</h3>
                        </div>
                    }
                    <ul className="vc_cart_voucher_list">
                        {
                            organization && response && text !== "" &&
                            <li >
                                <VoucherOrgItem
                                    voucher={voucher}
                                    org={voucher_org ?? organization}
                                    showApplyBtn={true}
                                    cartAmount={cartAmount}
                                    services_id={services_id}
                                    products_id={products_id}
                                />
                            </li>
                        }
                    </ul>
                    <div className="vc_bot">
                        <XButton
                            onClick={() => setOpen({ ...open, open: false })}
                            title="Đồng ý"
                        />
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
