import React from "react";
import { IOrganization } from "../../../../interface/organization";
import { Product } from "../../../../interface/product";
import onErrorImg from "../../../../utils/errorImg";
import formatPrice, { formatSalePriceService } from "../../../../utils/formatPrice";
import icon from "../../../../constants/icon";
import scrollTop from "../../../../utils/scrollTop";
import { Link } from "react-router-dom";
import { formatRouterLinkProduct } from "../../../../utils/formatRouterLink/formatRouter";

// ==== api tracking ====
 import tracking from "../../../../api/trackApi";
// end
// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../../../utils/dataLayer";
import { analytics, logEvent } from "../../../../firebase";
// end
interface IProps {
    product: Product;
    org: IOrganization;
}

function OrgProductItem(props: IProps) {
    const { product, org } = props;
    const pathProductOb = formatRouterLinkProduct(product, org);
    const productSalePrice = formatSalePriceService(product.special_price, product.special_price_momo);
    return (
        <Link
            to={pathProductOb}
            onClick={() => {
                scrollTop();
                GoogleTagPush(GoogleTagEvents.PRODUCT_CLICK);
                tracking.USER_ITEM_CLICK(org.id, product.id);
                logEvent(analytics,'detail_product', {
                    service: product.product_name,
                    merchant: org.name
                })
            }}
        >
            <div className="org-special-item">
                <div className="org-special-item__img">
                    <div className="org-special-item__rate">
                        <div className="flex-row rate-item">
                            <img src={icon.cartCheckPurple} alt="" />
                            <span className="rate-item__count">112+</span>
                        </div>
                    </div>
                    <img
                        src={
                            product?.image
                                ? `${product?.image_url}`
                                : `${org?.image_url}`
                        }
                        onError={(e) => onErrorImg(e)}
                        alt=""
                    />
                </div>
                <div className="org-special-item__detail">
                    <div className="item-head">
                        <span className="item-head__name">
                            {product?.product_name}
                        </span>
                        {/* <span className="item-head__desc">{product?.description}</span> */}
                    </div>
                    <div className="item-price">
                        {productSalePrice> 0 ? (
                            <>
                                <span className="item-price__special">
                                    {formatPrice(productSalePrice)}đ
                                </span>
                                <span className="item-price__old">
                                    {formatPrice(product?.retail_price)}đ
                                </span>
                            </>
                        ) : (
                            <span className="item-price__special">
                                {formatPrice(product?.retail_price)}đ
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default OrgProductItem;
