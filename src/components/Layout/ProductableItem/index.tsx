/* eslint-disable eqeqeq */
import icon from "constants/icon";
import { Productable } from "interface";
import { Link } from "react-router-dom";
import { formatDistanceKM, onErrorImg } from "utils";
import formatPrice, { formatSalePriceService } from "utils/formatPrice";
import style from "./productable.module.css";
import {
    formatRouterLinkCombo,
    formatRouterLinkProduct,
    formatRouterLinkService,
} from "utils/formatRouterLink/formatRouter";
import img from "constants/img";

interface ProductableItemProps {
    productable: Productable;
    changeStyle?: boolean;
}

export function ProductableItem(props: ProductableItemProps) {
    const { productable, changeStyle } = props;
    const org = productable?.organization[0];
    let image_url = org.image_url ?? img.imgDefault;
    if (productable.media) {
        image_url = productable.media[0]?.original_url;
    }
    const special_price = formatSalePriceService(
        productable?.discount_price,
        productable?.discount_ecommerce_price
    );
    const percent = 100 - Math.ceil((special_price / productable?.price) * 100);
    let LINK_DETAIL = formatRouterLinkService(
        productable?.origin_id,
        productable?.organization_id,
        productable?.name
    );
    if (productable?.type == 2)
        LINK_DETAIL = formatRouterLinkProduct(
            productable?.origin_id,
            productable?.organization_id,
            productable?.name
        );
    if (productable?.type == 4)
        LINK_DETAIL = formatRouterLinkCombo(
            productable?.origin_id,
            productable?.organization_id,
            productable?.name
        );
    const onItemClick = () => { };
    return (
        <Link to={{ pathname: LINK_DETAIL }} onClick={onItemClick}>
            <div
                className={
                    !changeStyle ? style.container : style.container_change
                }
            >
                <div
                    className={
                        !changeStyle
                            ? style.img_container
                            : style.img_container_change
                    }
                >
                    {special_price > 0 && percent && percent > 1 ? (
                        <div className={style.item_percent}>
                            Giảm {percent}%
                        </div>
                    ) : (
                        ""
                    )}
                    <img
                        style={changeStyle ? { borderRadius: "8px" } : {}}
                        className={style.item_img}
                        onError={(e) => onErrorImg(e)}
                        src={image_url ?? org.image_url}
                        alt=""
                    />
                    {!changeStyle && (
                        <img
                            className={style.item_org_avatar}
                            src={org?.image_url ?? img.imgDefault}
                            alt=""
                            onError={(e) => onErrorImg(e)}
                        />
                    )}
                </div>
                <div
                    className={
                        !changeStyle
                            ? style.detail_container
                            : style.detail_container_change
                    }
                >
                    <span
                        className={
                            !changeStyle
                                ? style.item_name
                                : `${style.item_name} ${style.item_name_ch}`
                        }
                    >
                        {productable?.name}
                    </span>
                    <div
                        className={
                            !changeStyle
                                ? style.item_price
                                : style.item_price_ch
                        }
                    >
                        {special_price > 0 ? (
                            <>
                                <span>{formatPrice(special_price)}</span>
                                <span>{formatPrice(productable?.price)}</span>
                            </>
                        ) : (
                            <span style={{ color: "var(--purple)" }}>
                                {formatPrice(productable?.price)}
                            </span>
                        )}
                    </div>
                    {productable?.distance && (
                        <div className={style.item_distance}>
                            <span></span>
                            <h5>{formatDistanceKM(productable?.distance)}</h5>
                        </div>
                    )}
                    <div className={style.item_address}>
                        <img src={icon.pinMapRed} alt="" />
                        <span>{org?.full_address}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
