import React, { useContext } from 'react';
import '../ServicePromoItem/service-promo-item.css';
import { IProductPromo } from '../../../interface/productPromo'
import { Link } from 'react-router-dom';
import onErrorImg from '../../../utils/errorImg';
import icon from '../../../constants/icon';
import formatPrice, { formatSalePriceService } from '../../../utils/formatPrice';
import scrollTop from '../../../utils/scrollTop';
import { formatRouterLinkProductPromo } from '../../../utils/formatRouterLink/formatRouter';
// ==== api tracking ====
import tracking from "../../../api/trackApi";
// end
// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../../utils/dataLayer";
import { AppContext } from "../../../context/AppProvider";
// end
interface IProps {
    product: IProductPromo;
}

function ProductPromoItem(props: IProps) {
    const { product } = props;
    const { t } = useContext(AppContext);
    const pathProductOb = formatRouterLinkProductPromo(product);
    const productSaleSpecial = formatSalePriceService(product?.special_price, product?.special_price_momo)
    return (
        <Link
            to={pathProductOb}
            onClick={() => {
                scrollTop();
                GoogleTagPush(GoogleTagEvents.PRODUCT_CLICK);
                tracking.USER_ITEM_CLICK(product.org_id, product.product_id);
            }}
            className="ser-pro-item"
        >
            <div className="ser-img-cnt">
                <img
                    className="ser-img"
                    src={
                        product?.image_url
                            ? `${product.image_url}`
                            : `${product?.org_image}`
                    }
                    alt=""
                    onError={(e) => onErrorImg(e)}
                />
                <img
                    src={product?.org_image} alt="org logo" className="ser-img__org-logo"
                    onError={(e) => onErrorImg(e, true)}
                />
                <div className="ser-promo">
                    {product.discount_percent > 0 &&
                        <div className="ser-promo__percent">
                            {t("detail_item.off")}{" "}
                            {Math.round(product?.discount_percent)}%
                        </div>
                    }
                    <div className="flex-row ser-promo__bot">
                        <div className="flexX-gap-4 ser-promo__bot-start">
                            <img src={icon.star} alt="" />
                            {product?.rating}
                        </div>
                        <div className="flexX-gap-4 ser-promo__bot-bought">
                            <img src={icon.cartCheckPurple} alt="" />
                            <p>{product?.bought_count}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ser-pro-item__cnt">
                <span className="ser-name">{product?.product_name}</span>
                <div className="ser-price">
                    {productSaleSpecial > 0 ?
                        (
                            <>
                                <span>{formatPrice(productSaleSpecial)}đ</span>
                                <span>
                                    {formatPrice(product?.retail_price)}đ
                                </span>
                            </>
                        )
                        :
                        (
                            <span style={{ color: "var(--purple)" }}>
                                {formatPrice(product?.retail_price)}đ
                            </span>
                        )}
                </div>
                {product._geoDistance ? (
                    <div className="flex-row ser-distance">
                        <div></div>
                        <span>
                            {t("se.distance")}
                            {": "}
                            {product?._geoDistance < 1000
                                ? `${product?._geoDistance}(m)`
                                : `${Math.round(
                                    product?._geoDistance / 1000
                                )}(km)`}
                        </span>
                    </div>
                ) : (
                    <></>
                )}
                <div className="ser-org-address">
                    <img src={icon.mapPinRed} alt="" />
                    <p>
                        {product?.org_district_name},
                        {product?.org_province_name}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default ProductPromoItem;
