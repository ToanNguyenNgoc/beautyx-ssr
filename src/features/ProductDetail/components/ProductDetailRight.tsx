import React, { useContext, useState } from "react";
import { Product } from "../../../interface/product";
import { IOrganization } from "../../../interface/organization";
import icon from "../../../constants/icon";
import formatPrice, { formatSalePriceService } from "../../../utils/formatPrice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    onFavoriteProduct,
    onDeleteFavorite,
} from "../../../redux/org_products/productSlice";
import { formatAddCart } from "../../../utils/cart/formatAddCart";
import { addCart } from "../../../redux/cartSlice";
import onErrorImg from "../../../utils/errorImg";
import PopupSuccess from "../../PopupSuccess";
import useFullScreen from "../../../utils/useDeviceMobile";
import DetailOrgCard from "../../ServiceDetail/components/DetailOrgCard";
import { extraOrgTimeWork } from "../../MerchantDetail/components/Functions/extraOrg";
import { AppContext } from "../../../context/AppProvider";
import ProductDetailRightReview from "./ProductDetailRightReview";
import DetailOrgVoucher from "../../../components/DetailVoucherOrg";

interface IProps {
    product: Product;
    org: IOrganization;
    NOW?: boolean;
}

function ProductDetailRight(props: IProps) {
    const { org, product, NOW } = props;
    const { COMMENTS } = useSelector((state: any) => state.SERVICE);

    const IS_MB = useFullScreen();
    const dispatch = useDispatch();
    const history = useHistory();
    const { USER } = useSelector((state: any) => state.USER);
    const [quantity, setQuantity] = useState(1);
    const [popupSuccess, setPopupSuccess] = useState(false);
    const { t } = useContext(AppContext);

    const productSaleSpecial = formatSalePriceService(product.special_price, product.special_price_momo);
    // console.log(productSaleSpecial)

    // get today's activity date in org
    const now = new Date();
    const today = now.getDay() + 1;
    const orgTimes: any = org && extraOrgTimeWork(org?.opening_time);
    const time_works_today = orgTimes?.find(
        (item: any, index: number) => index + 2 === today
    );

    const onFavorite = () => {
        if (USER) {
            const values = {
                product: product,
                org_id: org?.id,
            };
            if (product.is_favorite) {
                dispatch(onDeleteFavorite(values));
            } else {
                dispatch(onFavoriteProduct(values));
            }
        } else {
            history.push("/sign-in?1");
        }
    };
    const percent = Math.round(
        100 - (productSaleSpecial / product?.retail_price) * 100
    );
    //handle add cart
    const onDescQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };
    const handleAddCart = () => {
        if (
            product?.is_momo_ecommerce_enable &&
            org?.is_momo_ecommerce_enable
        ) {
            const sale_price =
                productSaleSpecial > 0
                    ? productSaleSpecial
                    : product.retail_price;
            const is_type = 1;
            if (USER) {
                const values = formatAddCart(
                    product,
                    org,
                    is_type,
                    quantity,
                    sale_price
                );
                dispatch(addCart({
                    ...values,
                    cart_id: parseInt(`${USER.id}${values.cart_id}`),
                    user_id: USER.id
                }));
                setPopupSuccess(true);
            } else {
                history.push("/sign-in?1")
            }
        }
    };
    const onBuyNow = () => {
        if (
            product?.is_momo_ecommerce_enable &&
            org?.is_momo_ecommerce_enable
        ) {
            const TYPE = "BOOK_NOW";
            const products = [{ product, quantity }];
            if (USER) {
                history.push({
                    pathname: "/mua-hang",
                    state: { org, products, TYPE },
                });
            } else {
                history.push("/sign-in?1");
            }
        }
    };
    return (
        <div className="service-detail__right">
            {/* service detail right head */}
            <div className="detail-right__head">
                <div className="detail-right__head-img">
                    <img
                        src={
                            product.image_url
                                ? product.image_url
                                : org.image_url
                        }
                        alt=""
                        onError={(e) => onErrorImg(e)}
                    />
                </div>
                <div className="detail-right__head-info">
                    <div className="detail-right__org">
                        <p>{org?.name}</p>
                        {time_works_today?.status && (
                            <>
                                {time_works_today?.status === "on" ? (
                                    <p style={{ color: "var(--green)" }}>{`${t(
                                        "detail_item.open"
                                    )}`}</p>
                                ) : (
                                    <p style={{ color: "var(--red_2)" }}>{`${t(
                                        "detail_item.close"
                                    )}`}</p>
                                )}
                            </>
                        )}
                    </div>
                    <div className="detail-right__name">
                        <p>{product?.product_name}</p>
                        <div onClick={onFavorite} className="favorite">
                            <img
                                src={
                                    product?.is_favorite
                                        ? icon.heart
                                        : icon.unHeart
                                }
                                alt=""
                            />
                        </div>
                    </div>
                    <ProductDetailRightReview
                        data={product}
                        comment={COMMENTS}
                    />
                </div>
            </div>
            {
                !IS_MB &&
                <DetailOrgVoucher org={org} />
            }
            {/* service detail right body */}
            <div className="detail-right__body">
                <div className="detail-right__info">
                    <div className="flexX-gap-8">
                        {productSaleSpecial > 0 && percent !== 0 && (
                            <div className="detail-right__percent">
                                <p>
                                    {`${t("detail_item.off")}`} {percent}%
                                </p>
                            </div>
                        )}
                        <div className="detail-right__price">
                            {productSaleSpecial > 0 ? (
                                <>
                                    <span>
                                        {formatPrice(productSaleSpecial)}đ
                                    </span>
                                    <span>
                                        {formatPrice(product?.retail_price)}đ
                                    </span>
                                </>
                            ) : (
                                <span>
                                    {formatPrice(product?.retail_price)}đ
                                </span>
                            )}
                        </div>
                    </div>
                    {/* <div style={{ padding: "8px 0" }}>
                        <p style={{ fontWeight: "bold", marginBottom: "8px" }}>
                            Thời gian:
                        </p>
                        <div className="detail-right__duration flexX-gap-4">
                            <img src={icon.Clock_purple} alt="" />
                            <p>{service.duration} Phút</p>
                        </div>
                    </div> */}
                </div>

                {/* detail org product  */}
                <DetailOrgCard org={org} />
            </div>
            {/* button add cart */}
            {(product?.is_momo_ecommerce_enable === false ||
                org?.is_momo_ecommerce_enable === false) && (
                    <span className="detail-right__no">
                        {t("detail_item.not_sale")}
                    </span>
                )}
            <div className="detail-right__bottom">
                <div className="bottom-quantity">
                    <p className="bottom-quantity__text">
                        {t("detail_item.quantity")}:
                    </p>
                    <div className="bottom-quantity__wrap">
                        <button
                            onClick={onDescQuantity}
                            className="quantity-btn"
                        >
                            <p>-</p>
                        </button>
                        <input
                            value={quantity}
                            disabled
                            className="quantity-input"
                            type="text"
                        />
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="quantity-btn"
                        >
                            <p>+</p>
                        </button>
                    </div>
                </div>

                {IS_MB ? (
                    <div className="flex-row flexX-gap-8">
                        {NOW ? (
                            <div
                                onClick={onBuyNow}
                                className="bottom-addCart bottom-buy__now"
                            >
                                <p>{t("cart.payment_now")}</p>
                            </div>
                        ) : (
                            <div
                                onClick={handleAddCart}
                                className="bottom-addCart"
                            >
                                <img
                                    src={icon.ShoppingCartSimpleWhite}
                                    alt=""
                                />
                                <p>{t("detail_item.add_cart")}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex-row flexX-gap-8">
                        <div
                            onClick={onBuyNow}
                            className="bottom-addCart bottom-buy__now"
                            style={
                                product.is_momo_ecommerce_enable &&
                                    org?.is_momo_ecommerce_enable
                                    ? {}
                                    : { opacity: "0.4", cursor: "not-allowed" }
                            }
                        >
                            <p>{t("cart.payment_now")}</p>
                        </div>
                        <div
                            style={
                                product.is_momo_ecommerce_enable &&
                                    org?.is_momo_ecommerce_enable
                                    ? {}
                                    : { opacity: "0.4", cursor: "not-allowed" }
                            }
                            onClick={handleAddCart}
                            className="bottom-addCart"
                        >
                            <img src={icon.ShoppingCartSimpleWhite} alt="" />
                            <p>{t("detail_item.add_cart")}</p>
                        </div>
                    </div>
                )}
            </div>
            <PopupSuccess
                popup={popupSuccess}
                setPopup={setPopupSuccess}
                title={`Đã thêm ${product?.product_name} vào giỏ hàng`}
            />
        </div>
    );
}

export default ProductDetailRight;
