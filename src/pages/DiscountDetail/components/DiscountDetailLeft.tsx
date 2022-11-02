import React, { useContext } from "react";
import icon from "../../../constants/icon";
import { IDiscountPar, IITEMS_DISCOUNT } from "../../../interface/discount";
import { IOrganization } from "../../../interface/organization";
import onErrorImg from "../../../utils/errorImg";
import formatPrice from "../../../utils/formatPrice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    fetchAsyncCancelFavoriteService,
    fetchAsyncFavoriteService,
} from "../../../redux/org_services/serviceSlice";
import { AppContext } from "../../../context/AppProvider";
import { DISCOUNT_TYPE } from "../../../utils/formatRouterLink/fileType";

interface IProps {
    discount: IDiscountPar;
    org: IOrganization;
    detail: any;
}

function DiscountDetailLeft(props: IProps) {
    const {
        org,
        detail,
        discount
    } = props;
    const ITEM_DISCOUNT: IITEMS_DISCOUNT = useSelector(
        (state: any) => state.ORG_DISCOUNTS.ITEM_DISCOUNT
    );
    const { t } = useContext(AppContext);

    let finalDisplayPrice = ITEM_DISCOUNT?.view_price;
    if (discount?.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key) {
        finalDisplayPrice = discount?.discount_value
    }


    const percent = Math.round(
        100 -
        (finalDisplayPrice / (ITEM_DISCOUNT?.productable.price || ITEM_DISCOUNT?.productable.retail_price)) * 100
    );
    const history = useHistory();
    const dispatch = useDispatch();
    const { USER } = useSelector((state: any) => state.USER);
    const onFavorite = async () => {
        if (USER) {
            const valueService = {
                org_id: org?.id,
                detail: detail,
            };
            if (detail.is_favorite === false) {
                await dispatch(fetchAsyncFavoriteService(valueService));
            } else {
                await dispatch(fetchAsyncCancelFavoriteService(valueService));
            }
        } else {
            history.push("/sign-in");
        }
    };
    return (
        <div className="service-detail__left">
            <div className="detail-left__img">
                <img
                    src={
                        ITEM_DISCOUNT?.productable.image
                            ? ITEM_DISCOUNT?.productable?.image_url
                            : org?.image_url
                    }
                    alt=""
                    onError={(e) => onErrorImg(e)}
                />
            </div>
            {/* detail service mobile */}
            <div className="service-detail__mobile">
                <div className="service-detail__mobile-top">
                    <p className="service-detail__mobile-name">
                        {detail?.service_name || detail?.product_name}
                    </p>
                    <div
                        onClick={onFavorite}
                        className="service-detail__mobile-favorite"
                    >
                        <img
                            src={
                                detail?.is_favorite ? icon.heart : icon.unHeart
                            }
                            alt=""
                        />
                    </div>
                </div>

                {detail?.service_name ? (
                    <div className="service-detail__mobile-mid">
                        <img src={icon.alarmClock} alt="" />
                        <p>
                            {ITEM_DISCOUNT?.productable.duration}{" "}
                            {t("detail_item.minute")}
                        </p>
                    </div>
                ) : null}

                <div className="service-detail__mobile-bottom">
                    {
                        percent && percent > 1 ?
                            <div className="service-detail__mobile-percent">
                                {t("detail_item.off")} {percent}%
                            </div> : ''
                    }
                    <div className="service-detail__mobile-price">
                        <span>{formatPrice(finalDisplayPrice)}đ</span>
                        <span>
                            {formatPrice(ITEM_DISCOUNT?.productable.price || ITEM_DISCOUNT?.productable?.retail_price)}đ
                        </span>
                    </div>
                </div>
                {/* <div className="service-detail__mobile-avi">
                    Lượt mua còn lại : {discount?.user_available_purchase_count}
                </div> */}
            </div>
        </div>
    );
}

export default DiscountDetailLeft;
