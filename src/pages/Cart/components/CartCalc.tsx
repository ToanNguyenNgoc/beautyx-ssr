import { XButton } from 'components/Layout';
import icon from 'constants/icon';
import { useCartReducer, useVoucher } from 'hooks';
import { IDiscountPar, IOrganization } from 'interface';
import IStore from 'interface/IStore';
import { CartInputVoucher } from 'pages/Carts/components/CartInputVoucher';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotal } from 'redux/cart';
import { PostOrderType } from '../index'
import formatPrice from 'utils/formatPrice';
import style from '../cart.module.css'

interface CartCalcType {
    order: PostOrderType,
    orgChoose: IOrganization
}
export interface OpenVcType {
    open: boolean,
    voucher: string
}

export function CartCalc(props: CartCalcType) {
    const { order, orgChoose } = props
    const [openVc, setOpenVc] = useState<OpenVcType>({
        open: false,
        voucher: ""
    })
    const { USER } = useSelector((state: IStore) => state.USER)
    const { cartAmount, cartAmountDiscount, VOUCHER_APPLY, cartList } = useSelector((state: IStore) => state.carts)
    const { cart_confirm, services_id, products_id, combos_id, outDiscounts } = useCartReducer()
    let finalAmount = cartAmount - cartAmountDiscount

    const { vouchersFinal, totalVoucherValue } = useVoucher(finalAmount, VOUCHER_APPLY, services_id)
    const dispatch = useDispatch()
    useEffect(() => {
        let mount = true
        if (mount) {
            dispatch(getTotal(USER?.id));
        }
        return () => { mount = false }
    }, [dispatch, cartList, USER, VOUCHER_APPLY]);
    const listCouponCode = outDiscounts
        .map((i: IDiscountPar) => i.coupon_code)
        .concat(vouchersFinal.map(i => i.coupon_code))
        .filter(Boolean)

    const onPostOrder = () => {
        const param: PostOrderType = {
            ...order,
            products: products_id,
            treatment_combo: combos_id,
            services: services_id,
            coupon_code: listCouponCode
        }
        console.log(param)
    }


    return (
        <>
            <XButton
                title='Nhập mã khuyến mại'
                icon={icon.cardDiscountOrange}
                onClick={() => setOpenVc({ open: true, voucher: '' })}
                iconSize={14}
                className={style.open_voucher_bnt}
            />
            <div className={style.calc_body}>
                <div className={style.calc_body_row}>
                    <span className={style.calc_body_row_label}>Tạm tính</span>
                    <span className={style.calc_body_row_price}>{formatPrice(cartAmount)}đ</span>
                </div>
                {
                    cartAmountDiscount &&
                    <div className={style.calc_body_row}>
                        <span className={style.calc_body_row_label}>Giảm giá</span>
                        <span className={style.calc_body_row_price}>-{formatPrice(cartAmountDiscount)}đ</span>
                    </div>
                }
                {
                    vouchersFinal?.map((item: IDiscountPar) => (
                        <div key={item.id} className={style.calc_body_row}>
                            <span className={style.calc_body_row_label}>{item.description}</span>
                            <span className={style.calc_body_row_price}>-{formatPrice(item.discount_value)}đ</span>
                        </div>
                    ))
                }
            </div>
            <div className={style.checkout_out}>
                <div className={style.checkout_out_amount}>
                    <span className={style.checkout_out_amount_label}>Tổng tiền</span>
                    <span className={style.checkout_out_amount_price}>
                        {formatPrice(finalAmount - totalVoucherValue)}đ
                    </span>
                </div>
                <XButton
                    className={style.checkout_out_amount_btn}
                    title='Đặt hàng'
                    onClick={onPostOrder}
                />
            </div>
            <CartInputVoucher
                open={openVc}
                setOpen={setOpenVc}
                services_id={services_id.map(i => i.id)}
                products_id={products_id.map(i => i.id)}
                outDiscounts={outDiscounts ?? []}
                organization={orgChoose}
                cartAmount={cartAmount - cartAmountDiscount}
                cart_confirm={cart_confirm}
            />
        </>
    );
}