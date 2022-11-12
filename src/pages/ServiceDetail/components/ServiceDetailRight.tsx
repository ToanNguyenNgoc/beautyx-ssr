import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import icon from "../../../constants/icon";
import onErrorImg from "../../../utils/errorImg";
import formatPrice, { formatSalePriceService } from "../../../utils/formatPrice";
import { useHistory } from "react-router-dom";
import {
    fetchAsyncCancelFavoriteService,
    fetchAsyncFavoriteService,
} from "../../../redux/org_services/serviceSlice";
import { formatAddCart } from "../../../utils/cart/formatAddCart";
import { addCart } from "../../../redux/cartSlice";
import DetailOrgCard from "./DetailOrgCard";
import { clearAllServices } from "../../../redux/servicesBookSlice";
import { IOrganization } from "../../../interface/organization";
import { Service } from "../../../interface/service";
import useFullScreen from "../../../utils/useDeviceMobile";
import { AppContext } from "../../../context/AppProvider";
import { extraOrgTimeWork } from "../../MerchantDetail/Functions/extraOrg";
import { Rating } from "@mui/material";
import DetailOrgVoucher from "../../../components/DetailVoucherOrg";
import IStore from "../../../interface/IStore";
import { IS_VOUCHER } from "../../../utils/cart/checkConditionVoucher";
import { PopupNotification } from 'components/Notification'

interface IProps {
    org: IOrganization;
    service: Service;
    setOpenDrawer?: any;
    NOW?: boolean;
    setValue?: any;
}

export default function ServiceDetailRight(props: IProps) {
    const { org, service, setOpenDrawer, NOW } = props;
    const { t } = useContext(AppContext);
    const { discounts } = useSelector((state: IStore) => state.ORG_DISCOUNTS.DISCOUNTS);
    const vouchers = IS_VOUCHER(discounts);
    const IS_MB = useFullScreen();
    const dispatch = useDispatch();
    const { COMMENTS } = useSelector((state: any) => state.SERVICE);
    const history = useHistory();
    const [popupSuccess, setPopupSuccess] = useState(false);
    const serviceSaleSpecial = formatSalePriceService(service.special_price, service.special_price_momo);
    const percent: any = service
        ? Math.round(100 - (serviceSaleSpecial / service?.price) * 100)
        : null;
    const { USER } = useSelector((state: any) => state.USER);

    // get today's activity date in org
    const now = new Date();
    const today = now.getDay() + 1;
    const orgTimes: any = org && extraOrgTimeWork(org?.opening_time);
    const time_works_today = orgTimes?.find(
        (item: any, index: number) => index + 2 === today
    );

    const valueService = {
        org_id: org?.id,
        detail: service,
    };
    const onFavorite = async () => {
        if (USER) {
            if (service.is_favorite === false) {
                await dispatch(fetchAsyncFavoriteService(valueService));
            } else {
                await dispatch(fetchAsyncCancelFavoriteService(valueService));
            }
        } else {
            history.push("/sign-in");
        }
    };
    //handle add cart
    const [quantity, setQuantity] = useState(1);
    const onDescQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };
    const handleAddCart = () => {
        const sale_price =
            (serviceSaleSpecial > 0)
                ? serviceSaleSpecial
                : service?.price;
        const is_type = 2;
        if (service.is_momo_ecommerce_enable && org?.is_momo_ecommerce_enable) {
            if (USER) {
                const values = formatAddCart(
                    service,
                    org,
                    is_type,
                    quantity,
                    sale_price,
                );
                const valuesCart = {
                    ...values,
                    cart_id: parseInt(`${USER.id}${values.cart_id}`),
                    user_id: USER.id
                }
                setPopupSuccess(true);
                dispatch(addCart(valuesCart));
            } else {
                history.push("/sign-in?1")
            }
            if (setOpenDrawer) {
                setOpenDrawer({ NOW: true, open: false });
            }
        }
    };
    //handle booking now
    const onBookingNow = () => {
        if (service.is_momo_ecommerce_enable && org?.is_momo_ecommerce_enable) {
            const services = [{ service, quantity }];
            const TYPE = "BOOK_NOW";
            history.push({
                pathname: "/dat-hen",
                state: { org, services, TYPE, vouchers },
            });
            dispatch(clearAllServices());
        }
    };

    return (
        <div className="service-detail__right">
            <div className="detail-right__head">
                <div className="detail-right__head-img">
                    <img
                        src={
                            service.image_url
                                ? service.image_url
                                : org.image_url
                        }
                        alt=""
                        onError={(e) => onErrorImg(e)}
                    />
                </div>
                <div className="detail-right__head-info">
                    <div className="detail-right__org">
                        <p>{org.name}</p>
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
                        <p>{service.service_name}</p>
                        <div onClick={onFavorite} className="favorite">
                            <img
                                src={
                                    service?.is_favorite
                                        ? icon.heart
                                        : icon.unHeart
                                }
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="detail-right__evaluate">
                        <div className="evaluate-item cursor-pointer">
                            <Rating
                                size="small"
                                readOnly
                                name="simple-controlled"
                                value={(service.rating === 5) ? 5 : 4 + (service.rating / 10)}
                            />

                            {COMMENTS.totalItem > 0 ? (
                                <p>
                                    {`(${COMMENTS.totalItem} ${t(
                                        "detail_item.evaluate"
                                    )})`}
                                </p>
                            ) : (
                                <p>{`(${t("detail_item.not_evaluate")})`}</p>
                            )}
                        </div>
                        <div className="evaluate-item__wrap">
                            <div className="evaluate-item">
                                <img src={icon.Favorite} alt="" />
                                <p>{service.favorites_count}</p>
                            </div>
                            <div className="evaluate-item">
                                <img src={icon.ShoppingCartSimple} alt="" />
                                <p>
                                    {`${t("detail_item.sold")}`}{" "}
                                    {service.bought_count}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                !IS_MB &&
                <DetailOrgVoucher
                    org={org}
                />
            }

            <div className="detail-right__body">
                <div className="detail-right__info">
                    <div className="flexX-gap-8">
                        {/* {service?.special_price > 0 &&
                            percent < 50 &&
                            percent !== 0 && (
                                <div className="detail-right__percent">
                                    <p>
                                        {`${t("detail_item.off")} `}
                                        {percent}%
                                    </p>
                                </div>
                            )} */}
                        {serviceSaleSpecial > 0 &&
                            (
                                <div className="detail-right__percent">
                                    <p>
                                        {`${t("detail_item.off")} `}
                                        {percent}%
                                    </p>
                                </div>
                            )}
                        <div className="detail-right__price">
                            {serviceSaleSpecial > 0 ? (
                                <>
                                    <span>
                                        {formatPrice(
                                            serviceSaleSpecial
                                        )}đ
                                    </span>
                                    <span>
                                        {formatPrice(service?.price)}đ
                                    </span>
                                    {/* {percent < 50 && (
                                        <span>
                                            {formatPrice(service?.price)}đ
                                        </span>
                                    )} */}
                                </>
                            ) : (
                                <span>{formatPrice(service?.price)}đ</span>
                            )}
                        </div>
                    </div>

                    <div className="detail-right__duration-wrap">
                        <p>{t("order.time")}:</p>
                        <div className="detail-right__duration flexX-gap-4">
                            <img src={icon.alarmClock} alt="" />
                            <p>
                                {service.duration}{" "}
                                {`${t("detail_item.minute")}`}
                            </p>
                        </div>
                    </div>
                </div>
                <DetailOrgCard org={org} />
            </div>
            {(service?.is_momo_ecommerce_enable === false ||
                org?.is_momo_ecommerce_enable === false) && (
                    <span className="detail-right__no">{t("se.off_service")}</span>
                )}
            <div className="detail-right__bottom">
                <div className="bottom-quantity">
                    <p className="bottom-quantity__text">{t("pr.quantity")}:</p>
                    <div className="bottom-quantity__wrap">
                        <button
                            onClick={onDescQuantity}
                            className="quantity-btn"
                        >
                            <p>-</p>
                        </button>
                        <input
                            disabled
                            value={quantity}
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
                                onClick={onBookingNow}
                                className="bottom-addCart bottom-buy__now"
                            >
                                <p>{t("se.booking_now")}</p>
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
                                <p>{t("pr.add_to_cart")}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex-row flexX-gap-8">
                        <div
                            style={
                                service.is_momo_ecommerce_enable &&
                                    org.is_momo_ecommerce_enable
                                    ? {}
                                    : { opacity: "0.4", cursor: "not-allowed" }
                            }
                            onClick={onBookingNow}
                            className="bottom-addCart bottom-buy__now"
                        >
                            <p>{t("se.booking_now")}</p>
                        </div>
                        <div
                            style={
                                service.is_momo_ecommerce_enable &&
                                    org.is_momo_ecommerce_enable
                                    ? {}
                                    : { opacity: "0.4", cursor: "not-allowed" }
                            }
                            onClick={handleAddCart}
                            className="bottom-addCart"
                        >
                            <img src={icon.ShoppingCartSimpleWhite} alt="" />
                            <p>{t("pr.add_to_cart")}</p>
                        </div>
                    </div>
                )}
            </div>
            <PopupNotification
                open={popupSuccess}
                setOpen={setPopupSuccess}
                title="Thông báo"
                content={`Đã thêm ${service?.service_name} vào giỏ hàng`}
                autoClose={true}
            />
        </div>
    );
}
