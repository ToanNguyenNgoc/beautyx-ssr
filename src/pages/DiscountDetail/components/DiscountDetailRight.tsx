import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import icon from "../../../constants/icon";
import { IDiscountPar, IITEMS_DISCOUNT } from "../../../interface/discount";
import { IOrganization } from "../../../interface/organization";
import { addCart } from "../../../redux/cartSlice";
import {
    fetchAsyncCancelFavoriteService,
    fetchAsyncFavoriteService,
} from "../../../redux/org_services/serviceSlice";
import { clearAllServices } from "../../../redux/servicesBookSlice";
import { formatAddCart } from "../../../utils/cart/formatAddCart";
import onErrorImg from "../../../utils/errorImg";
import formatPrice from "../../../utils/formatPrice";
import DetailOrgCard from "../../ServiceDetail/components/DetailOrgCard";
import DiscountDetailRightReview from "./DiscountDetailRightReview";
// ==== api tracking ====
import tracking from '../../../api/trackApi'
// end
// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../../utils/dataLayer";
import useDeviceMobile from "../../../utils/useDeviceMobile";
import { AppContext } from "../../../context/AppProvider";
import { extraOrgTimeWork } from "../../MerchantDetail/Functions/extraOrg";
import { DISCOUNT_TYPE } from "../../../utils/formatRouterLink/fileType";
import { PopupNotification } from 'components/Notification'
import {  AlertSnack } from "components/Layout";
// end
interface IProps {
    discount: IDiscountPar;
    org: IOrganization;
    detail: any;
    NOW?: boolean;
    COMMENTS: any,
    TYPE_DE: string
}

function DiscountDetailRight(props: IProps) {
    const { org, detail, NOW, COMMENTS, TYPE_DE } = props;
    const discount = {
        ...props.discount,
        // user_available_purchase_count: 0
    }
    const [noti, setNoti] = useState(false)
    const IS_MB = useDeviceMobile();
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const ITEM_DISCOUNT: IITEMS_DISCOUNT = useSelector(
        (state: any) => state.ORG_DISCOUNTS.ITEM_DISCOUNT
    );
    const { t } = useContext(AppContext);
    const [popupSuccess, setPopupSuccess] = useState(false);

    let finalDisplayPrice = ITEM_DISCOUNT?.view_price;
    if (discount.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key) {
        finalDisplayPrice = discount?.discount_value;
    }

    const percent = Math.round(
        100 -
        (finalDisplayPrice / (ITEM_DISCOUNT?.productable.price || ITEM_DISCOUNT?.productable?.retail_price)) * 100
    );


    const { USER } = useSelector((state: any) => state.USER);
    const history = useHistory();
    // get today's activity date in org
    const now = new Date();
    const today = now.getDay() + 1;
    const orgTimes: any = org && extraOrgTimeWork(org?.opening_time);
    const time_works_today = orgTimes?.find(
        (item: any, index: number) => index + 2 === today
    );
    const valueService = {
        org_id: org?.id,
        detail: detail,
    };
    const onFavorite = async () => {
        if (USER) {
            if (detail.is_favorite === false) {
                await dispatch(fetchAsyncFavoriteService(valueService));
            } else {
                await dispatch(fetchAsyncCancelFavoriteService(valueService));
            }
        } else {
            history.push("/sign-in");
        }
    };

    const onDescQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };
    const is_type = TYPE_DE === "service" ? 2 : 1;
    const values = formatAddCart(
        detail,
        org,
        is_type,
        quantity,
        ITEM_DISCOUNT?.productable.price || ITEM_DISCOUNT?.productable.retail_price,
        discount.user_available_purchase_count > 0 ? discount : null
    );

    const handleAddCart = () => {
        if (USER) {
            GoogleTagPush(GoogleTagEvents.ADD_TO_CART);
            dispatch(addCart({
                ...values,
                cart_id: parseInt(`${USER.id}${values.cart_id}`),
                user_id: USER.id
            }));
            // console.log(values)
            setPopupSuccess(true);
            tracking.ADD_CART_CLICK(
                values.org_id,
                values.id,
                values.price,
                values.quantity
            );
            GoogleTagPush(GoogleTagEvents.ADD_TO_CART);
            setPopupSuccess(true);
        } else {
            history.push("/sign-in?1")
        }
        // tracking.ADD_CART_CLICK(
        //     values.org_id,
        //     values.id,
        //     values.price,
        //     values.quantity
        // );
    };
    //handle booking now
    const onBookNow = () => {
        const TYPE = "BOOK_NOW";
        const service = {
            ...detail,
            discount: discount.user_available_purchase_count > 0 ? discount : null
        };
        const services = [{ service, quantity: quantity }];
        tracking.ADD_CART_CLICK(values.org_id, values.id, values.price, values.quantity)
        GoogleTagPush(GoogleTagEvents.ADD_TO_CART);
        history.push({
            pathname: "/dat-hen",
            state: { org, services, TYPE },
        });
        dispatch(clearAllServices());
    };
    //handle buy now
    const onBuyNow = () => {
        const product = { ...detail, discount }
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
    };
    const onNow = () => {
        switch (TYPE_DE) {
            case "service":
                return onBookNow();
            case "product":
                return onBuyNow()
        }
    }
    //[NOTI]: when user_available_purchase_count = 0
    const onAddCartBtn = () => {
        handleAddCart()
        if (discount?.user_available_purchase_count === 0) {
            setNoti(true)
        }
    }
    const onBookNowBtn = () => {
        onNow()
        if (discount?.user_available_purchase_count === 0) {
            setNoti(true)
        }
    }
    return (
        <div className="service-detail__right">
            <div className="detail-right__head">
                <div className="detail-right__head-img">
                    <img
                        src={
                            detail?.image_url
                                ? detail?.image_url
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
                        <p>{detail?.service_name || detail?.product_name}</p>
                        <div onClick={onFavorite} className="favorite">
                            <img
                                src={
                                    detail?.is_favorite
                                        ? icon.heart
                                        : icon.unHeart
                                }
                                alt=""
                            />
                        </div>
                    </div>

                    {ITEM_DISCOUNT?.productable && COMMENTS && (
                        <DiscountDetailRightReview
                            data={ITEM_DISCOUNT?.productable}
                            comment={COMMENTS}
                        />
                    )}
                </div>
            </div>

            <div className="detail-right__body">
                <div className="detail-right__info">
                    <div className="flexX-gap-8">
                        {percent !== 0 && (
                            <div className="detail-right__percent">
                                <p>
                                    {`${t("detail_item.off")}`} {percent}%
                                </p>
                            </div>
                        )}
                        <div className="detail-right__price">
                            <span>
                                {formatPrice(finalDisplayPrice)}đ
                            </span>
                            <span>
                                {formatPrice(
                                    ITEM_DISCOUNT?.productable.price ||
                                    ITEM_DISCOUNT?.productable?.retail_price
                                )}đ
                            </span>
                        </div>
                    </div>
                    {/* {
                        discount.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key &&
                        <div className="service-detail__mobile-avi">
                            Lượt mua còn lại : {discount?.user_available_purchase_count}
                        </div>
                    } */}
                </div>
                <DetailOrgCard org={org} />
            </div>
            {(quantity > 1 && discount.discount_type !== DISCOUNT_TYPE.FINAL_PRICE.key) && (
                <div className="flex-row-sp detail-right__calc">
                    <span className="total-title">
                        {t("cart.total_payment")}
                    </span>
                    <div className="total-math">
                        <span>
                            {formatPrice(
                                ITEM_DISCOUNT?.productable.price * quantity
                            )}
                            đ
                        </span>
                        <span>-{formatPrice(discount.discount_value)}đ</span>
                        <span>
                            {formatPrice(
                                ITEM_DISCOUNT?.productable.price * quantity -
                                discount.discount_value
                            )}
                            đ
                        </span>
                    </div>
                </div>
            )}
            {(quantity > 1 && discount.discount_type !== DISCOUNT_TYPE.FINAL_PRICE.key) && (
                <div className="detail-right__warn">
                    {t("cart.limit_item_discount")}
                </div>
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
                                onClick={onBookNowBtn}
                                className="bottom-addCart bottom-buy__now"
                            >
                                <p>{t(TYPE_DE === "service" ? "detail_item.booking_now" : "Mua ngay")}</p>
                            </div>
                        ) : (
                            <div
                                onClick={onAddCartBtn}
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
                            onClick={onBookNowBtn}
                            className="bottom-addCart bottom-buy__now"
                        >
                            <p>{t(TYPE_DE === "service" ? "detail_item.booking_now" : "Mua ngay")}</p>
                        </div>
                        <div onClick={onAddCartBtn} className="bottom-addCart">
                            <img src={icon.ShoppingCartSimpleWhite} alt="" />
                            <p>{t("detail_item.add_cart")}</p>
                        </div>
                    </div>
                )}
            </div>
            <PopupNotification
                open={popupSuccess}
                setOpen={setPopupSuccess}
                title="Thông báo"
                content={`Đã thêm ${detail?.service_name} vào giỏ hàng`}
                autoClose={true}
            />
            <AlertSnack
                onClose={() => setNoti(false)}
                open={noti}
                status="WARNING"
                title={`Giá bán này chỉ áp dụng ${discount.limit}lượt mua/người`}
            />
        </div>
    );
}

export default DiscountDetailRight;
