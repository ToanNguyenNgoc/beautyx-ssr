import icon from 'constants/icon';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import formatPrice from 'utils/formatPrice';
import { DISCOUNT_TYPE } from 'utils/formatRouterLink/fileType';
import { InputVoucher } from 'pages/Carts/components/CartBottom';
import { IOrganization } from 'interface/organization';
import { useSelector } from 'react-redux';
import { IDiscountPar, IITEMS_DISCOUNT } from 'interface/discount';
import style from '../booking.module.css'
import { XButton } from 'components/Layout';
import { AppContext } from 'context/AppProvider';

interface BookingNowBillProps {
    org: IOrganization,
    setFinalAmount: (amount: number) => void
}

function BookingNowBill(props: BookingNowBillProps) {
    const { setFinalAmount } = props
    const {t} = useContext(AppContext)
    const { VOUCHER_APPLY } = useSelector((state: any) => state.carts);
    const { org } = props;
    const location: any = useLocation();
    const [openVc, setOpenVc] = useState<any>({
        open: false,
        voucher: ""
    })
    const services = location.state.services;
    let { total } = services?.reduce(
        (cartTotal: any, cartItem: any) => {
            const { quantity, service } = cartItem;
            const priceBuy = service.SPECIAL_PRICE > 0 ? service.SPECIAL_PRICE : service.price
            const itemTotal = priceBuy * quantity;
            cartTotal.total += itemTotal;
            return cartTotal;
        },
        {
            total: 0
        }
    );

    const discounts = services
        .map((item: any) => (
            item.service?.discount?.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key ?
                total - (item.service.discount?.discount_value * item.quantity)
                :
                item.service.discount?.discount_value
        ))
        .filter(Boolean);
    const totalDiscounts = discounts.length > 0 && discounts.reduce((cur: any, pre: any) => cur + pre);
    const services_id = services?.map((item: any) => item.service.id) ?? []
    const items = VOUCHER_APPLY.map((i: IDiscountPar) => i.items).flat()
    const vouchers_calc = items.map((item: IITEMS_DISCOUNT) => {
        let discount_value = item.discount.discount_value
        if (item.discount.discount_type === "FINAL_PRICE")
            discount_value = item.productable.price - item.discount.discount_value
        return {
            ...item.discount,
            discount_value: discount_value
        }
    })
    const totalVouchers = vouchers_calc.length > 0 &&
        vouchers_calc.map((item: IDiscountPar) => item.discount_value).reduce((cur: number, pre: number) => cur + pre)
    const vouchers_sub_total: IDiscountPar[] = VOUCHER_APPLY
        .filter((i: IDiscountPar) => i.discount_type === "SUB_TOTAL")
    const vouchers_sub_total_price = vouchers_sub_total.filter((item: IDiscountPar) => item.discount_unit === "PRICE")
    const subTotalVouchers = vouchers_sub_total_price.length > 0 ?
        vouchers_sub_total_price
            .map((item: IDiscountPar) => item.discount_value).reduce((cur: number, pre: number) => cur + pre) : 0

    //
    const outDiscounts = services.map((item: any) => item?.service?.discount).filter(Boolean)
    //handle discount unit === "PERCENT"

    const TOTAL_PAYMENT = total - totalDiscounts - totalVouchers - subTotalVouchers
    const disPercentTypeTotal = vouchers_sub_total.filter(i => (i.discount_type === 'SUB_TOTAL' && i.discount_unit === 'PERCENT'))
    const disPercentTypeTotalCal = disPercentTypeTotal.map(i => {
        let cal = 0
        const calTotal = TOTAL_PAYMENT * i.discount_value / 100
        if (!i.maximum_discount_value || calTotal < i.maximum_discount_value) {
            cal = calTotal
        }
        if (i.maximum_discount_value && calTotal > i.maximum_discount_value) {
            cal = i.maximum_discount_value
        }
        return { ...i, discount_value: cal }
    })
    const disPercentTypeTotalCalAmount = disPercentTypeTotalCal.filter(Boolean).length > 0 ?
        disPercentTypeTotalCal.map(i => i.discount_value).reduce((a, b) => a + b) : 0



    const totalDiscountPercent = disPercentTypeTotalCalAmount



    useEffect(() => {
        setFinalAmount(TOTAL_PAYMENT - disPercentTypeTotalCalAmount)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [TOTAL_PAYMENT, totalDiscountPercent])

    return (
        <>
            <div className={style.open_voucher}>
                <XButton
                    className={style.open_voucher_btn}
                    onClick={() => setOpenVc({ ...openVc, open: true })}
                    title={t('pm.enter_coupon_code')}
                    iconSize={16}
                    icon={icon.cardDiscountOrange}
                />
            </div>
            <div className={style.booking_cnt_bot_bill}>
                <div className={style.booking_calc_item}>
                    <span className={style.booking_calc_item_left}>{t('cart.total_payment')}</span>
                    <span className={style.booking_calc_item_right}>{formatPrice(total)}đ</span>
                </div>
                {
                    discounts.map((item: number) => (
                        <div key={item} className={style.booking_calc_item}>
                            <span className={style.booking_calc_item_left}>{t('pm.sale')}</span>
                            <span
                                style={{ color: "var(--text-orange)" }}
                                className={style.booking_calc_item_right}>
                                -{formatPrice(item)}đ
                            </span>
                        </div>
                    ))
                }
                {
                    vouchers_sub_total.map((item: IDiscountPar, index: number) => (
                        <div key={index} className={style.booking_calc_item}>
                            <span className={style.booking_calc_item_left}>{item.title}</span>
                            <span
                                style={{ color: "var(--text-orange)" }}
                                className={style.booking_calc_item_right}>
                                {
                                    item.discount_unit === "PRICE" && ` -${formatPrice(item.discount_value)}đ`
                                }
                                {
                                    item.discount_unit === "PERCENT" && ` -${(item.discount_value)}%`
                                }
                            </span>
                        </div>
                    ))
                }
                <div className={style.booking_calc_item}>
                    <span className={style.booking_calc_item_left}>{t('pm.pay')}</span>
                    <span style={{ fontWeight: "700" }} className={style.booking_calc_item_right}>
                        {formatPrice(TOTAL_PAYMENT - totalDiscountPercent)}đ
                    </span>
                </div>
            </div>
            <InputVoucher
                outDiscounts={outDiscounts}
                open={openVc}
                setOpen={setOpenVc}
                cart_confirm={services_id}
                services_id={services_id}
                products_id={[]}
                organization={org}
                cartAmount={total - totalDiscounts}
            />
        </>
    );
}

export default BookingNowBill;