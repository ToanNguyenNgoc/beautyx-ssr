import React from "react";
import { IServicePromo } from "../../../interface/servicePromo";
import { Link } from "react-router-dom";
import onErrorImg from "../../../utils/errorImg";
import formatPrice from "../../../utils/formatPrice";
import icon from "../../../constants/icon";
import { onToggleSearchCnt } from "../../../redux/search/searchSlice";
import { useDispatch } from "react-redux";
import { formatDistance } from "../../../utils/format";
import scrollTop from "../../../utils/scrollTop";
import { onSetStatusService } from "../../../redux/org_services/serviceSlice";
import { formatRouterLinkServicePromo } from "../../../utils/formatRouterLink/formatRouter";
import { AUTH_LOCATION } from "../../../api/authLocation";
// ==== api tracking ====
 import tracking from "../../../api/trackApi";
// end
// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../../utils/dataLayer";
import { analytics, logEvent } from "../../../firebase";
// end
interface IProps {
    service: IServicePromo;
    keyword?: String;
}

function ServiceResultItem(props: IProps) {
    const { service, keyword } = props;
    const dispatch = useDispatch();
    const distance = formatDistance(service?._geoDistance);

    const onItemClick = () => {
        scrollTop();
        const result = {
            store_id: service.org_id,
            product_id: service.id,
        };
        tracking.SEARCH_RESULT_ITEM_CLICK(
            keyword,
            result,
            'dịch vụ',
            (AUTH_LOCATION+'')
        );
        GoogleTagPush(GoogleTagEvents.PRODUCT_CLICK);
        logEvent(analytics,'detail_service', {
            service: service.service_name,
            merchant: service.org_name
        })
        dispatch(onToggleSearchCnt(false));
        dispatch(onSetStatusService("LOADING"));
    };
    const pathServiceOb = formatRouterLinkServicePromo(service);
    return (
        <Link
            to={pathServiceOb}
            className="service-result-item"
            onClick={onItemClick}
        >
            <img
                className="service-result-item__img"
                src={service?.image_url || service?.org_image}
                alt=""
                onError={(e) => onErrorImg(e)}
            />
            <div className="service-result-item__detail">
                <span className="name">{service?.service_name}</span>
                <div className="flex-row price">
                    {service?.special_price > 0 ? (
                        <>
                            <span>{formatPrice(service?.special_price)}đ</span>
                            <span>{formatPrice(service?.price)}đ</span>
                        </>
                    ) : (
                        <span>{formatPrice(service?.price)}đ</span>
                    )}
                </div>
                <div className="flex-row-sp bottom">
                    <div className="flex-row bottom-left">
                        <img
                            src={service?.org_image}
                            onError={(e) => onErrorImg(e)}
                            alt=""
                        />
                        <span>{service?.org_name}</span>
                    </div>
                    <div className="flex-row bottom-right">
                        <div className="flex-row bottom-right__item">
                            <img src={icon.star} alt="" className="item-icon" />
                            <span>{service?.rating} (987+)</span>
                        </div>
                        {service?._geoDistance && (
                            <div
                                style={{ marginLeft: "18px" }}
                                className="flex-row bottom-right__item"
                            >
                                <img
                                    src={icon.mapPinRed}
                                    alt=""
                                    className="item-icon"
                                />
                                <span>{distance}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ServiceResultItem;
