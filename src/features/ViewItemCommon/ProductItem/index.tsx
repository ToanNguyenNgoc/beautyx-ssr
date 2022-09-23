import React, { useContext } from "react";
import "../ServicePromoItem/service-promo-item.css";
import { Product } from "../../../interface/product";
import { IOrganization } from "../../../interface/organization";
import formatPrice, {
    formatSalePriceService,
} from "../../../utils/formatPrice";
import onErrorImg from "../../../utils/errorImg";
import { Link } from "react-router-dom";
import scrollTop from "../../../utils/scrollTop";
import { formatRouterLinkProduct } from "../../../utils/formatRouterLink/formatRouter";

// ==== api tracking ====
import tracking from "../../../api/trackApi";
// end
// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../../utils/dataLayer";
import { AppContext } from "../../../context/AppProvider";
// end
interface IProps {
    product: Product;
    org: IOrganization;
    changeStyle?: boolean;
}

function ProductItem(props: IProps) {
    const { product, org, changeStyle } = props;
    const { t } = useContext(AppContext);
    const productSaleSpecial = formatSalePriceService(
        product?.special_price,
        product?.special_price_momo
    );

    const percent = Math.round(
        100 - (productSaleSpecial / product?.retail_price) * 100
    );
    const pathProductOb = formatRouterLinkProduct(product, org);
    return (
        <Link
            to={pathProductOb}
            onClick={() => {
                scrollTop();
                GoogleTagPush(GoogleTagEvents.PRODUCT_CLICK);
                tracking.USER_ITEM_CLICK(org.id, product.id);
            }}
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
                    src={product?.image ? product.image_url : org?.image_url}
                    alt=""
                    onError={(e) => onErrorImg(e)}
                />
                <img 
                    src={org?.image_url} alt="org logo" className="ser-img__org-logo"
                    onError={(e) => onErrorImg(e,true)}
                />
                <div className="ser-promo">
                    {product?.special_price > 0 && (
                        <div className="ser-promo__percent">
                            {`${t("detail_item.off")}`} {percent}%
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
                <span className="ser-name">{product?.product_name}</span>
                <div
                    className={
                        changeStyle
                            ? "ser-price ser-price__change"
                            : "ser-price"
                    }
                >
                    {productSaleSpecial > 0 ? (
                        <>
                            <span>{formatPrice(productSaleSpecial)}đ</span>
                            <span>{formatPrice(product?.retail_price)}đ</span>
                        </>
                    ) : (
                        <span style={{ color: "var(--purple)" }}>
                            {formatPrice(product?.retail_price)}đ
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
                        src={org?.image_url}
                        onError={(e) => onErrorImg(e)}
                        alt=""
                    />
                    <p>{org?.address}</p>
                </div>
            </div>
        </Link>
    );
}

export default ProductItem;
