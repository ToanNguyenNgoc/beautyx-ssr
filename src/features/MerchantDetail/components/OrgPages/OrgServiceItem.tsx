import React from "react";
import { Service } from "../../../../interface/service";
import { IOrganization } from "../../../../interface/organization";
import onErrorImg from "../../../../utils/errorImg";
import formatPrice, { formatSalePriceService } from "../../../../utils/formatPrice";
import icon from "../../../../constants/icon";
import scrollTop from "../../../../utils/scrollTop";
import { Link } from "react-router-dom";
import { formatRouterLinkService } from "../../../../utils/formatRouterLink/formatRouter";
// ==== api tracking ====
 import tracking from "../../../../api/trackApi";
// end
// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../../../utils/dataLayer";
import { analytics, logEvent } from "../../../../firebase";
// end
interface IProps {
    service: Service;
    org: IOrganization;
}

function OrgServiceItem(props: IProps) {
    const { org, service } = props;
    const pathServiceOb = formatRouterLinkService(service, org);
    const serviceSaleSpecial = formatSalePriceService(service?.special_price, service?.special_price_momo)
    return (
        <Link
            to={pathServiceOb}
            onClick={() => {
                scrollTop();
                GoogleTagPush(GoogleTagEvents.PRODUCT_CLICK);
                tracking.USER_ITEM_CLICK(org.id, service.id);
                logEvent(analytics,'detail_service', {
                    service: service.service_name,
                    merchant: org.name
                })
            }}
        >
            <div className="org-special-item">
                <div className="org-special-item__img">
                    <div className="org-special-item__rate">
                        <div className="flex-row rate-item">
                            <img src={icon.cartCheckPurple} alt="" />
                            <span className="rate-item__count">
                                {service?.bought_count}+
                            </span>
                        </div>
                    </div>
                    <img
                        src={
                            service?.image
                                ? `${service?.image_url}`
                                : `${org?.image_url}`
                        }
                        onError={(e) => onErrorImg(e)}
                        alt=""
                    />
                </div>
                <div className="org-special-item__detail">
                    <div className="item-head">
                        <span className="item-head__name">
                            {service?.service_name}
                        </span>
                        {/* <span className="item-head__desc">{service?.description}</span> */}
                    </div>
                    {serviceSaleSpecial > 0 ? (
                        <div className="item-price">
                            <span className="item-price__special">
                                {formatPrice(serviceSaleSpecial)}đ
                            </span>
                            <span className="item-price__old">
                                {formatPrice(service?.price)}đ
                            </span>
                        </div>
                    ) : (
                        <div className="item-price">
                            <span className="item-price__special">
                                {formatPrice(service?.price)}đ
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default OrgServiceItem;
