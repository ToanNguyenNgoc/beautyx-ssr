import React, { useContext, useState } from "react";
import { Container } from "@mui/material";
//import icon from '../../../constants/icon';
import ButtonLoading from "../../../components/ButtonLoading";
import formatPrice from "../../../utils/formatPrice";
import { cartReducer } from "../../../utils/cart/cartReducer";
import { useSelector } from "react-redux";
import order from "../../../api/orderApi";
import { useHistory } from "react-router-dom";
import { identity, pickBy } from "lodash";
import Notification from "../../../components/Notification";
import AlertSnack from "../../../components/AlertSnack";
// ==== api tracking ====
import tracking from "../../../api/trackApi";
import { formatProductList } from "../../../utils/tracking";
import { AppContext } from "../../../context/AppProvider";
import { IDiscountPar } from "../../../interface/discount";
// end
import { checkPhoneValid } from "../../../utils/phoneUpdate";
import { FLAT_FORM_TYPE } from "../../../rootComponents/flatForm";
function CartBottom(props: any) {
    const { DATA_CART, DATA_PMT } = props;
    const cartAmount = DATA_CART.cartAmount;
    const { t } = useContext(AppContext);
    const VOUCHER_APPLY: IDiscountPar[] = useSelector((state: any) => state.carts.VOUCHER_APPLY);
    const { cartQuantityCheck } = useSelector((state: any) => state.carts);
    const FLAT_FORM = sessionStorage.getItem('FLAT_FORM');
    // console.log(VOUCHER_APPLY, cartQuantityCheck)
    const [openAlertSnack, setOpenAlertSnack] = useState({
        title: "",
        open: false,
    });
    const [openNoti, setOpenNoti] = useState({
        title: "",
        open: false,
        titleLeft: "",
        titleRight: "",
        onClickLeft: () => { },
        onClickRight: () => { },
    });

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
    const { products, services, combos } = cartReducer(
        DATA_CART.cartList.filter((i: any) => i.isConfirm === true)
    );

    const pramsOrder = {
        user_address_id: DATA_PMT.address?.id,
        branch_id: DATA_PMT.branch?.id,
        payment_method_id: DATA_PMT.payment_method_id
            ? DATA_PMT.payment_method_id
            : DATA_PMT.pmtMethod?.id,
        // payment_method_id: 5,
        products: products.map((item: any) => {
            return { id: item.id, quantity: item.quantity };
        }),
        services: services.map((item: any) => {
            return { id: item.id, quantity: item.quantity };
        }),
        treatment_combo: combos.map((item: any) => {
            return { id: item.id, quantity: item.quantity };
        }),
        coupon_code: listCouponCode.length > 0 ? listCouponCode : [],
        // coupon_code: ["d"]
    };

    async function handlePostOrder() {
        //setLoading(true)
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
                    title: `${t("pm.order_fail")}`,
                    titleLeft: `${t("pm.agree")}`,
                    titleRight: `${t("pm.goto_home")}`,
                    onClickLeft: () =>
                        setOpenNoti({ ...openNoti, open: false }),
                    onClickRight: () => history.push("/home"),
                });
            }
            //setLoading(false);
        } catch (err) {
            console.log(err);
            setOpenNoti({
                open: true,
                title: `${t("pm.order_fail")}`,
                titleLeft: `${t("pm.agree")}`,
                titleRight: `${t("pm.goto_home")}`,
                onClickLeft: () => setOpenNoti({ ...openNoti, open: false }),
                onClickRight: () => history.push("/home"),
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
            else if (FLAT_FORM === FLAT_FORM_TYPE.MB && !checkPhoneValid(USER?.telephone)){
                setOpenNoti({
                    open: true,
                    title: ``,
                    titleLeft: `Cập nhập`,
                    titleRight: `Để sau`,
                    onClickLeft: () => history.push("/tai-khoan"),
                    onClickRight: () => history.push("/"),
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


    return (
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
                        {/* <div className="flex-row re-cart-bottom__total-discount">
                            <span>Mã khuyến mãi</span>
                            <img src={icon.cardDiscountOrange} alt="" className="icon" />
                        </div> */}
                        <div className="re-cart-bottom__cal">
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
                                <ButtonLoading
                                    title={`${t("pm.total_payment")}`}
                                    loading={false}
                                    onClick={handleSubmitOrder}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Notification
                content={openNoti.title}
                open={openNoti.open}
                titleBtnLeft={openNoti.titleLeft}
                titleBtnRight={openNoti.titleRight}
                onClickLeft={openNoti.onClickLeft}
                onClickRight={openNoti.onClickRight}
            />
        </div>
    );
}

export default CartBottom;
