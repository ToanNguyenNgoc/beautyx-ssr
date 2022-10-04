import React, { useContext } from "react";
import "./service-promo-item.css";
import { IServicePromo } from "../../../interface/servicePromo";
import icon from "../../../constants/icon";
import formatPrice, { formatSalePriceService } from "../../../utils/formatPrice";
import { Link } from "react-router-dom";
import onErrorImg from "../../../utils/errorImg";
import scrollTop from "../../../utils/scrollTop";
import { formatRouterLinkServicePromo } from "../../../utils/formatRouterLink/formatRouter";

// ==== api tracking ====
import tracking from "../../../api/trackApi";
// end
// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../../utils/dataLayer";
import { AppContext } from "../../../context/AppProvider";
import { formatDistance } from "../../../utils/format";
import { analytics, logEvent } from "../../../firebase";
// end

interface IProps {
    service: IServicePromo;
}

function ServicePromoItem(props: IProps) {
    const { service } = props;
    const { t } = useContext(AppContext);
    const patchServiceOb = formatRouterLinkServicePromo(service);
    const serviceSaleSpecial = formatSalePriceService(service.special_price, service?.special_price_momo)
    return (
        <Link
            to={patchServiceOb}
            onClick={() => {
                scrollTop();
                GoogleTagPush(GoogleTagEvents.PRODUCT_CLICK);
                tracking.USER_ITEM_CLICK(service.org_id, service.id);
                logEvent(analytics,'detail_service', {
                    service: service.service_name,
                    merchant: service.org_name
                })
            }}
            className="ser-pro-item"
        >
            <div className="ser-img-cnt">
                {service.org_image !== '' && service.org_image !== null && <img src={service.org_image} className="ser-img__org-logo" onError={(e)=>onErrorImg(e,true)} alt=""/> }
                <img
                    className="ser-img"
                    src={
                        service?.image_url
                            ? `${service.image_url}`
                            : `${service?.org_image}`
                    }
                    alt=""
                    onError={(e) => onErrorImg(e)}
                />
                <div className="ser-promo">
                    {
                        service.discount_percent > 0 &&
                        <div className="ser-promo__percent">
                            {t("detail_item.off")}{" "}
                            {Math.round(service?.discount_percent)}%
                        </div>
                    }
                    {/* {service.discount_percent > 0 &&
                    service.discount_percent < 50 ? (
                        <div className="ser-promo__percent">
                            {t("detail_item.off")}{" "}
                            {Math.round(service?.discount_percent)}%
                        </div>
                    ) : (
                        <div></div>
                    )} */}
                    <div className="flex-row ser-promo__bot">
                        <div className="flexX-gap-4 ser-promo__bot-start">
                            <img src={icon.star} alt="" />
                            {
                                service.rating === 5 ? 5 : `4.${service?.rating}`
                            }
                        </div>
                        {/* <div className="flexX-gap-4 ser-promo__bot-bought">
                            <img src={icon.cartCheckPurple} alt="" />
                            <p>{service?.bought_count}</p>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="ser-pro-item__cnt">
                <span className="ser-name">{service?.service_name}</span>
                <div className="ser-price">
                    {serviceSaleSpecial  > 0 ?
                        (
                            <>
                                <span>{formatPrice(serviceSaleSpecial)}đ</span>
                                <span>{formatPrice(service?.price)}đ</span>
                            </>
                        )
                        :
                        (
                            <span style={{ color: "var(--purple)" }}>
                                {formatPrice(service?.price)}đ
                            </span>
                        )}
                </div>
                {service._geoDistance ? (
                    <div className="flex-row ser-distance">
                        <div></div>
                        <span>
                            {t("se.distance")}
                            {": "}
                            {formatDistance(service?._geoDistance)}
                        </span>
                    </div>
                ) : (
                    <></>
                )}
                <div className="ser-org-address">
                    <img src={icon.mapPinRed} alt="" />
                    <p>
                        {service?.org_district_name},
                        {service?.org_province_name}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default ServicePromoItem;
// 