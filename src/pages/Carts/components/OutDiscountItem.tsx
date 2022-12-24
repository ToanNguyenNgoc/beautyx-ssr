import img from 'constants/img';
import { IDiscountPar, IITEMS_DISCOUNT } from 'interface';
import moment from 'moment';
import React from 'react';
import { onErrorImg } from 'utils';
import { discountReducerItem } from 'utils/cart/cartReducer';
import formatPrice from 'utils/formatPrice';

function OutDiscountItem({ discount }: { discount: IDiscountPar }) {
    const orgOnVoucher = discount?.organizations[0]
    const { productsInDis, servicesInDis } = discountReducerItem(
        discount?.items?.filter((i: IITEMS_DISCOUNT) => i.organization_id === orgOnVoucher?.id)
    )
    const productName = productsInDis?.map((i: IITEMS_DISCOUNT) => i.productable?.product_name);
    const serviceName = servicesInDis?.map((i: IITEMS_DISCOUNT) => i.productable?.service_name);
    const displayName = serviceName?.concat(productName)?.filter(Boolean)
    return (
        discount ?
            <div
                style={{
                    backgroundColor: "#ffe3d2",
                    border: "1px solid var(--red-cl)",
                }}
                className="cart-vouchers-list__item"
            >
                <div
                    style={{ borderRight: "dashed 1px var(--red-cl)" }}
                    className="cart-vouchers-list__item-left"
                >
                    <div className="item-left__img">
                        <img
                            onError={(e) => onErrorImg(e)}
                            src={orgOnVoucher?.image_url ? orgOnVoucher?.image_url : img.imgDefault}
                            alt=""
                        />
                    </div>
                    <div className="item-left__name">
                        <span>{orgOnVoucher?.name}</span>
                    </div>
                </div>
                <div className="cart-vouchers-list__item-right">
                    <div className="item-right__top">
                        <span className="item-right__name">
                            {
                                discount?.discount_type === "FINAL_PRICE" ?
                                    `Giảm giá ${formatPrice(discount?.discount_value)}đ trên mỗi dịch vụ tương ứng `
                                    :
                                    `Giảm giá ${formatPrice(discount.discount_value)}đ`
                            }
                        </span>
                        {
                            discount?.minimum_order_value &&
                            <span className="item-right__desc">
                                Cho đơn hàng từ {formatPrice(discount.minimum_order_value)}đ
                            </span>
                        }
                        {
                            (productsInDis.length === 0 && servicesInDis.length === 0) ?
                                <span className="item-right__desc">
                                    Áp dụng tất cả sản phẩm, dịch vụ
                                </span>
                                :
                                <span className="item-right__desc">
                                    Áp dụng cho các dịch vụ, sản phẩm : <span
                                        style={{ fontWeight: "bold" }}
                                    >
                                        {displayName.join(", ")}
                                    </span>
                                </span>
                        }
                    </div>
                    <div className="item-right__bottom">
                        {
                            (discount.valid_from || discount.valid_util) ?
                                <span className="item-right__expired">
                                    Áp dụng: {discount.valid_from && moment(discount.valid_from).format("DD/MM/YYYY")} -
                                    {discount.valid_util && moment(discount.valid_util).format("DD/MM/YYYY")}
                                </span>
                                :
                                <span className="item-right__expired"></span>
                        }
                        <div
                            className="item-right__btn"
                        >
                            <span>Đã áp dụng</span>
                        </div>
                    </div>
                </div>
            </div>
            :
            <></>
    )
}

export default OutDiscountItem;