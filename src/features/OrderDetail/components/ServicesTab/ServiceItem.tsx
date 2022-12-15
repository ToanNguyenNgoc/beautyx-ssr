import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart, onClearPrevCartItem } from "redux/cartSlice";
import { AppContext } from "context/AppProvider";
import { formatAddCart } from "utils/cart/formatAddCart";
import tracking from "api/trackApi";
import { GoogleTagPush, GoogleTagEvents } from "utils/dataLayer";
import { AlertSnack, XButton } from "components/Layout";
import { formatRouterLinkService } from "utils/formatRouterLink/formatRouter";
import { onErrorImg, slugify } from "utils";
import formatPrice from "utils/formatPrice";
import serviceApi from "api/serviceApi";

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
        (IS_DISCOUNT?.discount ? 'DISCOUNT':'SERVICE'),
        1,
        serviceItem.base_price,
        IS_DISCOUNT?.discount,
        true
    );
    const getServiceDetail = async ()=>{
        let resService
        try {
            const res = await serviceApi.getDetailById({
                org_id: org.id, ser_id: service.id
            })
            resService = res?.data.context
        } catch (error) {
            console.log(error)
        }
        return resService
    }
    const handleAddCart = async () => {
        const resService = await getServiceDetail()
        if (resService || IS_DISCOUNT) {
            //check org and services on commerce
            if (
                resService?.is_momo_ecommerce_enable &&
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
            history.push({
                pathname: `/chi-tiet-giam-gia/${type}_${org.id}_${IS_DISCOUNT.discount_id}_${IS_DISCOUNT.productable_id}_${slugify(
                    IS_DISCOUNT.productable.service_name ||
                    IS_DISCOUNT.productable.product_name
                )}`,
            });
        } else {
            history.push({
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
                            <XButton
                                onClick={handleDetailService}
                                title={t("order.watch_info")}
                            />
                            <XButton
                                onClick={handleAddCart}
                                title="Re-Order"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default ServiceItem;
