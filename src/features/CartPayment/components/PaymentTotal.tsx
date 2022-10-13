import React, { useContext, useState } from "react";
import { Container } from "@mui/material";
import formatPrice from "../../../utils/formatPrice";
import PopupSuccess from "../../PopupSuccess/index";
import { AppContext } from "../../../context/AppProvider";
import order from "../../../api/orderApi";
import { useHistory } from "react-router-dom";
import { pickBy, identity } from "lodash";
import { useSelector } from "react-redux";
import REDUCER_CART from "../../../utils/reducerCart";
import { EXTRA_FLAT_FORM } from "../../../api/extraFlatForm";
import { FLAT_FORM_TYPE } from "../../../rootComponents/flatForm";
import PaymentCreateFail from "./PaymentCreateFail";
import { extraPaymentMethodId } from "../../PaymentMethod/extraPaymentMethodId";

// ==== api tracking ====
import tracking from "../../../api/trackApi";
import { formatProductList } from "../../../utils/tracking";
import { XButton } from "components/Layout";
// end
const useInPayment: boolean = true;
function PaymentTotal(props: any) {
    const { t } = useContext(AppContext);
    const FLAT_FORM = EXTRA_FLAT_FORM();
    const USER = useSelector((state: any) => state.USER.USER);
    const { payments_method } = useSelector(
        (state: any) => state.PAYMENT.PAYMENT
    );
    const { chooseE_wall, data_cart } = props;
    const history = useHistory();
    const [popup, setPopup] = useState(false);
    const [popupFail, setPopUpFail] = useState(false);
    const [loading, setLoading] = useState(false);
    const org_id = data_cart.list[0].org_id;
    const listDiscount = data_cart.carts.cartList
        .filter((item: any) => item.isConfirm === true)
        .map((item: any) => item.discount);
    const listCouponCode = listDiscount
        .map((item: any) => item?.coupon_code)
        .filter(Boolean);

    const payment_method_id = extraPaymentMethodId(
        payments_method,
        chooseE_wall
    );

    const { products, services, combos } = REDUCER_CART(data_cart);
    const params_string = {
        products: products,
        services: services,
        treatment_combo: combos,
        payment_method_id: payment_method_id,
        coupon_code: listCouponCode.length > 0 ? listCouponCode : [],
        user_address_id: data_cart.address?.id,
        description: data_cart.note,
        branch_id: data_cart.chooseBr?.id,
    };
    async function handlePostOrder(org_id: number, params: any) {
        setLoading(true);
        try {
            tracking.PAY_CONFIRM_CLICK(org_id, formatProductList(params.products))
            const response = await order.postOrder(org_id, params);
            const state_payment = await response.data.context;
            const desc = await state_payment.payment_gateway.description;
            const transaction_uuid =
                state_payment.payment_gateway.transaction_uuid;
            if (response.data.context.status !== "CANCELED") {
                history.push({
                    pathname: `/trang-thai-don-hang/${desc}`,
                    search: transaction_uuid,
                    state: { state_payment },
                });
            } else {
                setPopUpFail(true);
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }
    const handleSubmitPayment = () => {
        if (USER) {
            const params = pickBy(params_string, identity);
            if (FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX) {
                if (data_cart.address) {
                    handlePostOrder(org_id, params);
                } else {
                    alert(
                        "Trang web chỉ chấp nhận thanh toán qua ví điện tử Momo"
                    );
                }
            } else {
                if (data_cart.address) {
                    handlePostOrder(org_id, params);
                }
            }
        }
    };
    return (
        <div className="payment-total">
            <Container>
                <div className="flex-row payment-total__body">
                    <div className="payment-total__body-item">
                        <p>{t("pr.total")}</p>
                        {listCouponCode.length > 0 && (
                            <p>{t("pm.discounts")}</p>
                        )}
                        <p>{t("pm.payment_total")}</p>
                    </div>
                    <div className="payment-total__body-item">
                        <p>{formatPrice(data_cart.carts.cartAmount)} đ</p>
                        {listCouponCode.length > 0 && (
                            <p>
                                -
                                {formatPrice(
                                    data_cart.carts.cartAmountDiscount
                                )}{" "}
                                đ
                            </p>
                        )}
                        <p>
                            {formatPrice(
                                data_cart.carts.cartAmount -
                                    data_cart.carts.cartAmountDiscount
                            )}{" "}
                            đ
                        </p>
                    </div>
                </div>
                <div className="flex-row-sp payment-total__body-submit">
                    <span>{t("pm.enter_to_payment")}</span>
                    <XButton
                        title={t("pm.payment_2")}
                        loading={loading}
                        onClick={handleSubmitPayment}
                    />
                </div>
            </Container>
            <PopupSuccess
                popup={popup}
                setPopup={setPopup}
                useInPayment={useInPayment}
                title={t("pm.payment_success")}
            />
            <PaymentCreateFail
                popupFail={popupFail}
                setPopUpFail={setPopUpFail}
            />
        </div>
    );
}

export default PaymentTotal;
