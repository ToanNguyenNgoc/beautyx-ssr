import React, { useContext } from "react";
import onErrorImg from "../../../utils/errorImg";
import formatPrice, { formatSalePriceService } from "../../../utils/formatPrice";
import "../ServicePromoItem/service-promo-item.css";
import { Service } from "../../../interface/service";
import { IOrganization } from "../../../interface/organization";
import { useHistory } from "react-router-dom";
import scrollTop from "../../../utils/scrollTop";
import { formatRouterLinkService } from "../../../utils/formatRouterLink/formatRouter";

// ==== api tracking ====
import tracking from "../../../api/trackApi";
// end
// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../../utils/dataLayer";
import { analytics, logEvent } from "../../../firebase";
// end
interface IProps {
    service: Service;
    org: IOrganization;
    changeStyle?: boolean;
}

function ServiceItem(props: IProps) {
    const { service, org, changeStyle } = props;
    const history = useHistory();
    const serviceSaleSpecial = formatSalePriceService(service?.special_price, service?.special_price_momo);
    const percent: any = Math.round(
        100 - (serviceSaleSpecial / service?.price) * 100
    );

    const pathServiceOb = formatRouterLinkService(service, org);
    const onDetail = () => {
        scrollTop();
        tracking.USER_ITEM_CLICK(org.id, service.id);
        GoogleTagPush(GoogleTagEvents.PRODUCT_CLICK);
        logEvent(analytics,'detail_service', {
            service: service.service_name,
            merchant: org.name
        })
        history.push(pathServiceOb);
    };
    return (
        <div
            onClick={onDetail}
            className={
                changeStyle
                    ? "ser-pro-item ser-pro-item__change"
                    : "ser-pro-item"
            }
        >
            <div
                className={
                    changeStyle
                        ? "ser-img-cnt ser-img-cnt__change"
                        : "ser-img-cnt"
                }
            >
                <img
                    className={
                        changeStyle ? "ser-img ser-img__change" : "ser-img"
                    }
                    src={
                        service?.image_url ? service.image_url : org?.image_url
                    }
                    alt=""
                    onError={(e) => onErrorImg(e)}
                />
                <div className="ser-promo">
                    {service.special_price > 0 && percent < 50 && (
                        <div className="ser-promo__percent">
                            Giảm {percent} %
                        </div>
                    )}
                    {/* <div className="flex-row ser-promo__bot">
                        <div className="flex-row ser-promo__bot-start">
                            5
                            <img src={icon.star} alt="" />
                        </div>
                        <div className="ser-promo__bot-bought">
                            Lượt mua
                            <span>120</span>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="ser-pro-item__cnt">
                <span className="ser-name">{service?.service_name}</span>
                <div
                    className={
                        changeStyle
                            ? "ser-price ser-price__change"
                            : "ser-price"
                    }
                >
                    {serviceSaleSpecial > 0 ?
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
                {/* {
                    service._geoDistance ?
                        <div className="flex-row ser-distance">
                            <div></div>
                            <span>khoảng cách:
                                {
                                    service._geoDistance < 1000 ?
                                        `${service._geoDistance}(m)`
                                        :
                                        `${Math.round(service._geoDistance / 1000)}(km)`
                                }
                            </span>
                        </div>
                        :
                        <></>
                } */}
                <div className="ser-org-address">
                    <img
                        onError={(e) => onErrorImg(e)}
                        src={org?.image_url}
                        alt=""
                    />
                    <p>{org?.address}</p>
                </div>
            </div>
        </div>
    );
}

export default ServiceItem;
