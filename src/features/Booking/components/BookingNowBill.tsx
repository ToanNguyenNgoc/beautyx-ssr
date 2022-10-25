import icon from 'constants/icon';
import { OpenVcProp } from 'pages/Carts/components/CartBottom';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import formatPrice from 'utils/formatPrice';
import { DISCOUNT_TYPE } from 'utils/formatRouterLink/fileType';
import { InputVoucher } from 'pages/Carts/components/CartBottom';
import { IOrganization } from 'interface/organization';
import { useSelector } from 'react-redux';
import { IDiscountPar, IITEMS_DISCOUNT } from 'interface/discount';

interface BookingNowBillProps {
    org: IOrganization
}

function BookingNowBill(props: BookingNowBillProps) {
    const { VOUCHER_APPLY } = useSelector((state: any) => state.carts);
    const { org } = props;
    const location: any = useLocation();
    const [openVc, setOpenVc] = useState<OpenVcProp>({
        open: false,
        voucher: ""
    })
    const services = location.state.services;
    let { total } = services?.reduce(
        (cartTotal: any, cartItem: any) => {
            const { quantity, service } = cartItem;
            const priceBuy = service.special_price > 0 ? service.special_price : service.price
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
    const vouchers_sub_total: IDiscountPar[] = VOUCHER_APPLY.filter((i: IDiscountPar) => i.discount_type === "SUB_TOTAL")
    const subTotalVouchers = vouchers_sub_total.length > 0 ?
        vouchers_sub_total.map((item: IDiscountPar) => item.discount_value).reduce((cur: number, pre: number) => cur + pre) : 0
    return (
        <>
            {
                location.state?.TYPE === "BOOK_NOW" &&
                <div className="flex-row re-cart-bottom__total-discount">
                    <button
                        onClick={() => setOpenVc({ ...openVc, open: true })}
                        className="open_voucher_btn"
                    >
                        Nhập mã khuyến mại
                        <img src={icon.cardDiscountOrange} alt="" />
                    </button>
                </div>
            }
            <div className="flex-row-sp booking-cnt__bot-bill">
                <div className="booking_calc_item">
                    <span className="booking_calc_item_left">Tổng tiền</span>
                    <span className="booking_calc_item_right">{formatPrice(total)}đ</span>
                </div>
                {
                    vouchers_calc.map((item: IDiscountPar, index: number) => (
                        <div key={index} className="booking_calc_item">
                            <span className="booking_calc_item_left">{item.description}</span>
                            <span
                                style={{ color: "var(--text-orange)" }}
                                className="booking_calc_item_right">
                                -{formatPrice(item.discount_value)}đ
                            </span>
                        </div>
                    ))
                }
                {
                    vouchers_sub_total.map((item: IDiscountPar, index: number) => (
                        <div key={index} className="booking_calc_item">
                            <span className="booking_calc_item_left">{item.title}</span>
                            <span
                                style={{ color: "var(--text-orange)" }}
                                className="booking_calc_item_right">
                                -{formatPrice(item.discount_value)}đ
                            </span>
                        </div>
                    ))
                }
                <div className="booking_calc_item">
                    <span className="booking_calc_item_left">Thanh toán</span>
                    <span style={{ fontWeight: "700" }} className="booking_calc_item_right">
                        {formatPrice(total - totalDiscounts - totalVouchers - subTotalVouchers)}đ
                    </span>
                </div>
            </div>
            <InputVoucher
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