import React, { useContext, useState } from "react";
import { Container } from "@mui/material";
import { useHistory } from "react-router-dom";
import { identity, pickBy } from "lodash";
import { PopupNotification } from "components/Notification";
import tracking from "api/trackApi";
import { IDiscountPar } from "interface/discount"
import formatProductList from "utils/tracking";
import order from "api/orderApi";
import { FLAT_FORM_TYPE } from "rootComponents/flatForm";
import formatPrice from "utils/formatPrice";
import { AppContext } from "context/AppProvider";
import { checkPhoneValid } from "utils/phoneUpdate";
import icon from "constants/icon";
import { useCartReducer, useVoucherCalCart } from 'hooks';
import { XButton } from "components/Layout";
import { CartInputVoucher } from "./CartInputVoucher";
import { useSelector } from "react-redux";

export interface OpenVcProp {
    open: boolean,
    voucher: string
}

function CartBottom(props: any) {
    const { DATA_CART, DATA_PMT } = props;
    const cartAmount = DATA_CART.cartAmount;
    const { t } = useContext(AppContext);
    const VOUCHER_APPLY: IDiscountPar[] = useSelector((state: any) => state.carts.VOUCHER_APPLY);
    const { vouchersCal } = useVoucherCalCart(VOUCHER_APPLY)
    const [load, setLoad] = useState(false);
    const FLAT_FORM = sessionStorage.getItem('FLAT_FORM');
    const [openVc, setOpenVc] = useState<OpenVcProp>({
        open: false,
        voucher: ""
    })
    //* [END]  OTP  update telephone number
    //* [ Throw exception noti ]
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
        ?.map((item: any) => item.discount);
    const listCouponCode = listDiscount
        ?.map((item: any) => item?.coupon_code)
        .filter(Boolean)
        .concat(VOUCHER_APPLY?.map((i: IDiscountPar) => i.coupon_code))
        ;
    const {
        products, cart_confirm,
        combos_id, services_id, products_id
    } = useCartReducer()

    const coupon_code_arr = listCouponCode.length > 0 ? listCouponCode : []

    const pramsOrder = {
        user_address_id: DATA_PMT.address?.id,
        branch_id: DATA_PMT.branch?.id,
        payment_method_id: DATA_PMT.payment_method_id
            ? DATA_PMT.payment_method_id
            : DATA_PMT.pmtMethod?.id,
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
            const state_payment = await { ...response.data.context, FINAL_AMOUNT: FINAL_AMOUNT };
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
                return setOpenNoti({ ...openNoti, content: 'Chưa có địa chỉ giao hàng !' })
            }
            if (FLAT_FORM === FLAT_FORM_TYPE.MB && !checkPhoneValid(USER?.telephone)) {
                // else if (checkPhoneValid(USER?.telephone)) {
                return setOpenNoti({
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
            }
            if (FINAL_AMOUNT < 1000) {
                return setOpenNoti({
                    open: true,
                    content: `Giao dịch tối thiểu là 1.000đ `,
                    children: <>
                    </>
                });
            }
            else {
                handlePostOrder();
            }
        } else if (!pramsOrder.payment_method_id) {
            setOpenNoti({ ...openNoti, content: 'Bạn Chưa chọn phương thức thanh toán!' })
        }
    };




    let discountVoucherTotal = 0
    if (VOUCHER_APPLY.length > 0) {
        discountVoucherTotal = vouchersCal
            ?.map((i: IDiscountPar) => i.discount_value)
            ?.reduce((pre: number, cur: number) => pre + cur)
    }
    const outDiscounts = cart_confirm?.map((item: any) => item.discount)
    const FINAL_AMOUNT = DATA_CART.cartAmount -
        DATA_CART.cartAmountDiscount -
        discountVoucherTotal

    return (
        <>
            <CartInputVoucher
                outDiscounts={outDiscounts}
                open={openVc}
                setOpen={setOpenVc}
                cart_confirm={cart_confirm}
                organization={DATA_PMT.org}
                cartAmount={cartAmount}
                services_id={services_id?.map((i: any) => i.id)}
                products_id={products_id?.map((i: any) => i.id)}
            />
            <div className="re-cart-bottom">
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
                                {
                                    // [FIX]: Temple fix apply multi coupon code follow MYSPA Manager----
                                    // VOUCHER_APPLY.length === 0 &&
                                    //-------------------------------------------------------------------
                                    listDiscount.filter(Boolean).length > 0 && (
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
                                        ?.map((item: IDiscountPar) => (
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
                                        {formatPrice(FINAL_AMOUNT)}
                                        đ
                                    </span>
                                    <XButton
                                        title={`Đặt hàng`}
                                        loading={load}
                                        onClick={handleSubmitOrder}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
                <PopupNotification
                    title="Thông báo"
                    setOpen={() => setOpenNoti({ ...openNoti, open: false })}
                    open={openNoti.open}
                    children={openNoti.children}
                    content={openNoti.content}
                />
            </div>
        </>
    );
}

export default CartBottom;
