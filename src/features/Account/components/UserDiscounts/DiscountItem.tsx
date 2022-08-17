import React from "react";
import { IDiscountPar, IITEMS_DISCOUNT } from "../../../../interface/discount";
import formatDate from "../../../../utils/formatDate";
import formatPrice from "../../../../utils/formatPrice";
import { useHistory } from "react-router-dom";
import { formatRouterLinkDiscount } from "../../../../utils/formatRouterLink/formatRouter";
import { DISCOUNT_TYPE } from "../../../../utils/formatRouterLink/fileType";

interface IProps {
    discountPar: IDiscountPar;
    discountItem: IITEMS_DISCOUNT;
}

function DiscountItem(props: IProps) {
    const history = useHistory();
    const { discountPar, discountItem } = props;
    const pathDiscountOb = formatRouterLinkDiscount(discountPar, discountItem);
    const onDetail = () => {
        history.push(pathDiscountOb);
    };
    return (
        <li onClick={onDetail} className="discount-item">
            <div className="img">
                <img
                    className="discount-item__img"
                    src={discountItem.productable.image_url}
                    alt=""
                />
                {discountPar.valid_util && (
                    <div className="vail_util">
                        <span>HSD:{formatDate(discountPar.valid_util)} </span>
                    </div>
                )}
            </div>
            <div className="discount-item__cnt">
                <div className="discount-item__cnt-top">
                    <span className="discount-item__cnt-title">
                        {discountPar.title}
                    </span>
                    <span className="discount-item__cnt-name">
                        {discountItem.productable.service_name}
                    </span>
                </div>
                <div className="flex-row discount-item__cnt-price">
                    <span>
                        {
                            discountPar.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key ?
                                `${formatPrice(discountPar.discount_value)}đ`
                                :
                                `${formatPrice(discountItem.view_price)}đ`
                        }
                    </span>
                    <span>{formatPrice(discountItem.productable.price)}đ</span>
                </div>
            </div>
        </li>
    );
}

export default DiscountItem;
