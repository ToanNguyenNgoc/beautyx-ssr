import React from "react";
import { IDiscountPar, IITEMS_DISCOUNT } from "../../interface/discount";
import onErrorImg from "../../utils/errorImg";
import {formatDistance} from "../../utils/format"
import formatPrice from "../../utils/formatPrice";
import icon from "../../constants/icon";
import { useHistory } from "react-router-dom";
import { formatRouterLinkDiscount } from "../../utils/formatRouterLink/formatRouter";
import { DISCOUNT_TYPE } from "../../utils/formatRouterLink/fileType";
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// ==== api tracking ====
import tracking from "../../api/trackApi";
import { analytics, logEvent } from "../../firebase";
// end
interface IProps {
    discountPar: IDiscountPar;
    discountItem: IITEMS_DISCOUNT;
}

function DiscountItem(props: IProps) {
    const { discountPar, discountItem } = props;
    const pathDiscountOb = formatRouterLinkDiscount(discountPar, discountItem);
    const history = useHistory();
    const onDetail = () => {
        tracking.DISCOOUNT_ITEM_CLICK(
            discountItem.organization.id,
            'khuyến mãi hot',
            discountItem.discount_id
        );
        logEvent(analytics,'detail_discount', {
            service: discountItem.productable.product_name,
            merchant: discountItem.organization.name
        })
        history.push(pathDiscountOb);
    };
    // console.log(discountItem);
    return (
        <div onClick={onDetail} className="home-discount-item__cnt">
            {
                discountItem.organization.image_url !== '' &&
                discountItem.organization.image_url !== null &&
                <img src={discountItem.organization.image_url} onError={(e) => onErrorImg(e)} className="home-discount-item__org-logo" alt="" />
            }
            <img
                alt=""
                src={
                    discountItem.productable.image
                        ? discountItem.productable.image_url
                        : discountItem.organization.image_url
                }
                width="100%"
                height="100%"
                className="home-discount-item__img"
                onError={(e)=>onErrorImg(e)}
            />
            <div className="home-discount-item__detail">
                <h2 className="name">
                    {discountItem.productable.service_name || discountItem.productable.product_name}
                </h2>
                <div className="flex-row price">
                    <span className="sale-price">
                        {
                            discountPar.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key ?
                                `${formatPrice(discountPar.discount_value)}đ`
                                :
                                `${formatPrice(discountItem.view_price)}đ`
                        }
                    </span>
                    <span className="old-price">

                        {formatPrice(discountItem.productable.price || discountItem.productable.retail_price)}đ
                    </span>
                </div>
                {
                    discountPar.distance_organization &&
                    <div className="distance">
                        <span className="dot"></span>
                        Cách bạn: {formatDistance(discountPar.distance_organization)}
                    </div>
                }
                <div className="address">
                    <img src={icon.mapPinRed} alt="" />
                    <span>{discountItem.organization.full_address}</span>
                </div>
                <div className="limit-bar">
                    <div
                        style={
                            !discountPar.total ||
                                discountPar.total === discountPar.used
                                ? { width: "100%" }
                                : {
                                    width: `${(discountPar.used /
                                        discountPar.total) *
                                        100
                                        }%`,
                                }
                        }
                        className="limit-bar__used"
                    ></div>
                    <span className="limit-bar__num">
                        {discountPar?.total
                            ? `Đã bán ${discountPar.used}/${discountPar.total}`
                            : "Đang mở"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default DiscountItem;
