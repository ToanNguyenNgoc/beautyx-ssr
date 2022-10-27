import React, { useContext, useState } from "react";
import ButtonCus from "../../../../components/ButtonCus";
import formatPrice from "../../../../utils/formatPrice";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart, onClearPrevCartItem } from "../../../../redux/cartSlice";
import { fetchAsyncServiceDetail } from "../../../../redux/org_services/serviceSlice";
import slugify from "../../../../utils/formatUrlString";
import { AppContext } from "../../../../context/AppProvider";
import onErrorImg from "../../../../utils/errorImg";
import { formatAddCart } from "../../../../utils/cart/formatAddCart";

// ==== api tracking ====
import tracking from "../../../../api/trackApi";
// end
// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../../../utils/dataLayer";
import { AlertSnack } from "components/Layout";
import { formatRouterLinkService } from "utils/formatRouterLink/formatRouter";
// end
function ServiceItem(props: any) {
    const { t } = useContext(AppContext);
    const { serviceItem, org, itemsDiscountOrg } = props;
    const { USER } = useSelector((state: any) => state.USER);
    const service = serviceItem.productable;
    const IS_DISCOUNT = itemsDiscountOrg.find(
        (i: any) => i.productable_id === service?.id
    );
    const [openNoti, setOpenNoti] = useState({
        open: false,
        title: "",
    });

    const onCheckType = () => {
        let type;
        switch (IS_DISCOUNT?.productable_type) {
            case "App\\Models\\CI\\Service":
                type = "service";
                break;
            case "App\\Models\\CI\\Product":
                type = "product";
                break;
        }
        return type;
    };
    const history = useHistory();
    const dispatch = useDispatch();
    const cartValues = formatAddCart(
        service,
        org,
        2,
        1,
        serviceItem.base_price,
        IS_DISCOUNT?.discount,
        true
    );
    const handleAddCart = async () => {
        //check exits discount or service detail in merchant
        //check org and services on commerce
        const res = await dispatch(
            fetchAsyncServiceDetail({
                org_id: org.id,
                ser_id: service.id,
            })
        );
        if (res?.meta?.requestStatus === "fulfilled" || IS_DISCOUNT) {
            //check org and services on commerce
            if (
                res?.payload?.service?.is_momo_ecommerce_enable &&
                org?.is_momo_ecommerce_enable
            ) {
                dispatch(onClearPrevCartItem());
                dispatch(addCart({
                    ...cartValues,
                    cart_id: parseInt(`${USER.id}${cartValues.cart_id}`),
                    user_id: USER?.id
                }));
                history.push("/gio-hang");
            } else {
                setOpenNoti({
                    open: true,
                    title: "Hiện tại dịch vụ này này không còn được bán Online !",
                });
            }
        } else {
            setOpenNoti({
                open: true,
                title: "Hiện tại dịch vụ này này không còn tồn tại !",
            });
        }
    };
    const handleDetailService = () => {
        tracking.USER_ITEM_CLICK(org.id, service.id);
        GoogleTagPush(GoogleTagEvents.PRODUCT_CLICK);
        if (IS_DISCOUNT) {
            const type = onCheckType();
            // history.push({
            //     pathname: `/chi-tiet-giam-gia/${slugify(
            //         IS_DISCOUNT.productable.service_name ||
            //         IS_DISCOUNT.productable.product_name
            //     )}`,
            //     search: `type=${type}&org_id=${org?.id}&dis_id=${IS_DISCOUNT?.discount_id}&item_id=${IS_DISCOUNT.productable_id}`,
            // });
            history.push({
                pathname: `/chi-tiet-giam-gia/${type}_${org.id}_${IS_DISCOUNT.discount_id}_${IS_DISCOUNT.productable_id}_${slugify(
                    IS_DISCOUNT.productable.service_name ||
                    IS_DISCOUNT.productable.product_name
                )}`,
            });
        } else {
            history.push({
                // pathname: `/dich-vu/${slugify(service?.service_name)}`,
                // search: `id=${service.id}?org=${org?.id}`,
                pathname: formatRouterLinkService(service.id, org.id, service.service_name)
            });
        }
    };

    return (
        <li>
            <AlertSnack
                title={openNoti.title}
                open={openNoti.open}
                status="WARNING"
                onClose={() =>
                    setOpenNoti({
                        ...openNoti,
                        open: false,
                    })
                }
            />
            <div className="order-de-list__item">
                {IS_DISCOUNT && (
                    <div className="flex-row order-de-list__item-discount">
                        <span>{IS_DISCOUNT?.discount?.coupon_code}</span>
                    </div>
                )}
                <img
                    src={service?.image ? service?.image_url : org?.image_url}
                    alt=""
                    onError={(e) => onErrorImg(e)}
                    className="order-de-pr-item__img"
                />
                <div className="order-de-pr-item__cnt">
                    <div className="item-detail">
                        <span className="flex-row-sp item-name">
                            {service?.service_name}
                            <span>x {serviceItem.quantity}</span>
                        </span>
                        <span className="item-org__name">{org.name}</span>
                    </div>
                    <div className="flex-row-sp item-bottom">
                        {serviceItem?.discount_value > 0 ? (
                            <div className="flex-row">
                                <span
                                    className="price"
                                    style={{ color: "var(--orange)" }}
                                >
                                    {formatPrice(
                                        service?.price -
                                        serviceItem?.discount_value
                                    )}
                                    đ
                                </span>
                                <span className="old-price">
                                    {formatPrice(service?.price)}
                                </span>
                            </div>
                        ) : (
                            <span className="price">
                                {formatPrice(serviceItem.base_price)}đ
                            </span>
                        )}
                        <div className="flex-row item-button">
                            <ButtonCus
                                onClick={handleDetailService}
                                text={t("order.watch_info")}
                            />
                            <ButtonCus
                                onClick={handleAddCart}
                                text="Pre-Order"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default ServiceItem;
