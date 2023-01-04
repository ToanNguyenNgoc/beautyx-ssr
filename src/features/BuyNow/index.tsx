/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import HeadMobile from '../HeadMobile';
import HeadTitle from '../HeadTitle';
import { Container } from '@mui/material'
import './style.css';
import './serviceDetail.css';
import UserPaymentInfo from '../../pages/Account/components/UserPaymentInfo';
import ProductItem from './ProductItem';
import formatPrice from '../../utils/formatPrice';
import { FLAT_FORM_TYPE } from '../../rootComponents/flatForm';
import { EXTRA_FLAT_FORM } from '../../api/extraFlatForm';
import { pickBy, identity } from 'lodash'
import order from '../../api/orderApi';
import { IUserAddress } from '../../interface/userAddress'
import { formatAddCart } from '../../utils/cart/formatAddCart';
import { DISCOUNT_TYPE } from '../../utils/formatRouterLink/fileType';

// ==== api tracking ====
import tracking from "../../api/trackApi";
import { formatProductList } from "../../utils/tracking";
import { XButton } from 'components/Layout';
import { useDeviceMobile } from 'hooks';
import { DetailOrgCard } from 'pages/_SerProCoDetail';
import PaymentMethod from 'components/PaymentMethod';
// end
function BuyNow() {
    const IS_MB = useDeviceMobile();
    const location: any = useLocation();
    const history = useHistory();
    const FLAT_FORM = EXTRA_FLAT_FORM();
    const [address, setAddress] = useState<IUserAddress>();
    const { org, products } = location.state;
    let { total } = products?.reduce(
        (cartTotal: any, cartItem: any) => {
            const { quantity, product } = cartItem;
            let priceBuy = product.special_price > 0 ? product.special_price : product.retail_price
            if (product.discount?.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key) {
                priceBuy = product.discount?.discount_value
            }
            const itemTotal = priceBuy * quantity;
            cartTotal.total += itemTotal;
            return cartTotal;
        },
        {
            total: 0
        }
    );

    const [methodId, setMethodId] = useState<null | number>()
    const productsPost = products.map((item: any) => {
        return {
            id: item.product.id,
            quantity: item.quantity
        }
    })
    const listPayment = location.state?.products.map((item: any) => {
        const sale_price =
            item.product?.special_price > 0
                ? item.product?.special_price
                : item.product?.retail_price;
        const values = formatAddCart(
            item.product,
            org,
            "PRODUCT",
            item.quantity,
            sale_price,
        );
        return values
    })
    const params_string = {
        products: productsPost,
        services: [],
        treatment_combo: [],
        payment_method_id: methodId,
        coupon_code: [],
        description: "",
        user_address_id: address?.id
    }
    async function handlePostOrder() {
        //setLoading(true)
        const params = pickBy(params_string, identity);
        try {
            const productsForTracking = products.map((i: any) => {
                return {
                    ...i.product,
                    quantity: i.quantity
                }
            })
            tracking.PAY_CONFIRM_CLICK(org?.id, formatProductList(productsForTracking))
            const response = await order.postOrder(org?.id, params);
            const state_payment = await response.data.context;
            const desc = await state_payment.payment_gateway.description;
            const transaction_uuid =
                state_payment.payment_gateway.transaction_uuid;
            if (response.data.context.status !== "CANCELED") {
                history.push({
                    pathname: `/trang-thai-don-hang/${desc}`,
                    search: transaction_uuid,
                    state: { state_payment, listPayment },
                });
            } else {
                //setPopUpFail(true)
            }
            //setLoading(false);
        } catch (err) {
            console.log(err);
            //setLoading(false);
        }
    }
    const onClickPayment = () => {
        if (address) {
            if (FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX) {
                // if (chooseE_wall) {
                handlePostOrder()
                // }
            } else {
                handlePostOrder()
            }
        }
    }

    return (
        <>
            <HeadTitle title="Chi tiết thanh toán" />
            {IS_MB && <HeadMobile title='Chi tiết thanh toán' />}
            <Container>
                <div className="service-detail buy-now-cnt">
                    <div className="flex-row-sp buy-now__user">
                        <div className="buy-now__user-left">
                            <UserPaymentInfo
                                onSetAddressDefault={setAddress}
                            />
                        </div>
                        <div className="buy-now__user-right">
                            {org && <DetailOrgCard org={org} />}
                        </div>
                    </div>
                    <div className="buy-now__list">
                        <span className="title">Sản phẩm</span>
                        <ul className="list">
                            {
                                products?.map((item: any, index: number) => (
                                    <li key={index} >
                                        <ProductItem
                                            product={item.product}
                                            quantity={item.quantity}
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div
                        style={
                            FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX &&
                                location.state.TYPE === "BOOK_NOW"
                                ? { display: "block" }
                                : { display: "none" }
                        }
                    >
                        <div
                            style={FLAT_FORM !== 'BEAUTYX' ? { display: 'none' } : {}}
                        >
                            <PaymentMethod
                                onSetPaymentMethod={(method) => setMethodId(method.id)}
                            />
                        </div>
                    </div>
                    <div className="buy-now__total-cnt">
                        <div className="buy-now__total">
                            <div className="flex-row-sp buy-now__total-bill">
                                <span>Tổng tiền</span>
                                <span>{formatPrice(total)}đ</span>
                            </div>
                            <div className="buy-now__total-pay">
                                <div className="flex-row-sp amount-total">
                                    <span>Tổng thanh toán</span>
                                    <span>{formatPrice(total)}đ</span>
                                </div>
                                <div className="amount-btn">
                                    <XButton
                                        onClick={onClickPayment}
                                        title='Thanh toán'
                                        loading={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default BuyNow;