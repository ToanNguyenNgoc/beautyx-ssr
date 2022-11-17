/* eslint-disable no-useless-concat */
import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import ButtonCus from "../../../components/ButtonCus";
import {
    checkConfirm,
    descItem,
    removeItem,
    ascItem,
    onClearPrevCartItem,
    onClearApplyVoucher,
} from "../../../redux/cartSlice";
import { useDispatch } from "react-redux";
import icon from "../../../constants/icon";
import formatPrice from "../../../utils/formatPrice";
import { useHistory } from "react-router-dom";
import scrollTop from "../../../utils/scrollTop";
import onErrorImg from "../../../utils/errorImg";
import {
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
    Type,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import {
    formatRouterLinkDiscount,
    formatRouterLinkProduct,
    formatRouterLinkService,
} from "../../../utils/formatRouterLink/formatRouter";

// ==== api tracking ====
import tracking from "../../../api/trackApi";
// end
// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../../utils/dataLayer";
import {useDeviceMobile} from "hooks";
import { DISCOUNT_TYPE } from "../../../utils/formatRouterLink/fileType";
import { analytics, logEvent } from "../../../firebase";
import { PopupNotification } from "components/Notification";
import { XButton } from "components/Layout";
// end
interface IProps {
    inPayment?: boolean;
    cartItem: any;
    org?: any;
    setOpenBranch?: any;
    openBranch?: any;
}

function CartItem(props: IProps) {
    const { cartItem, inPayment, org, setOpenBranch, openBranch } = props;
    const [open, setOpen] = useState(false);
    const IS_MB = useDeviceMobile();
    const dispatch = useDispatch();
    const history = useHistory();
    const [process, setProcess] = useState(0);
    const [openConfirm, setOpenConfirm] = useState(false);
    const handleConfirm = () => {
        dispatch(onClearApplyVoucher())
        if (!org || org?.id === cartItem.org_id) {
            const action = checkConfirm({
                ...cartItem,
                isConfirm: !cartItem.isConfirm,
            });
            dispatch(action);
        } else {
            dispatch(onClearPrevCartItem());
            const action = checkConfirm({
                ...cartItem,
                isConfirm: !cartItem.isConfirm,
            });
            dispatch(action);
        }
        //clear branch choose
        if (cartItem.org_id !== org?.id) {
            setOpenBranch({
                ...openBranch,
                branch: null,
                org: cartItem.org,
            });
        }
    };
    const handleAscCart = () => {
        if (
            cartItem.discount &&
            cartItem.quantity === 1 &&
            cartItem.discount?.discount_type !== DISCOUNT_TYPE.FINAL_PRICE.key
        ) {
            setOpen(true);
        }
        const action = ascItem(cartItem);
        dispatch(action);
    };
    const handleDesc = () => {
        if (cartItem.quantity === 1) {
            setOpenConfirm(true);
        } else {
            const action = descItem(cartItem);
            dispatch(action);
        }
    };
    const handleRemoveItemCart = () => {
        const action = removeItem(cartItem);
        dispatch(action);
        dispatch(onClearApplyVoucher())
        setOpenConfirm(false)
    };
    const openConfirmClick = () => {
        setOpenConfirm(true);
    };
    const goBackDetail = () => {
        tracking.USER_ITEM_CLICK(cartItem.org.id, cartItem.id);
        GoogleTagPush(GoogleTagEvents.PRODUCT_CLICK);
        if (cartItem.is_type === 1) {
            const pathProductOb = formatRouterLinkProduct(
                cartItem.cart_item.id,
                cartItem.org.id,
                cartItem.name
            );
            history.push(pathProductOb);
        } else if (cartItem.is_type === 2) {
            if (cartItem.discount) {
                const discount = cartItem.discount;
                const discountItem = discount.items.find(
                    (val: any) => val.productable_id === cartItem.id
                );
                const pathDiscountOb = formatRouterLinkDiscount(
                    discount,
                    discountItem
                );

                logEvent(analytics, 'detail_discount', {
                    service: cartItem.cart_item.service_name,
                    merchant: org.name
                })
                history.push(pathDiscountOb);
            } else {
                logEvent(analytics, 'detail_service', {
                    service: cartItem.cart_item.service_name,
                    merchant: org.name
                })
                const pathServiceOb = formatRouterLinkService(
                    cartItem.cart_item.id,
                    cartItem.org.id,
                    cartItem.name
                );
                history.push(pathServiceOb);
            }
        } else if (cartItem.is_type === 3) {
            //page combo detail
        }
        scrollTop();
    };
    //when quantity discount > 1
    let total = cartItem.price * cartItem.quantity;
    let cartItemPrice = cartItem?.price;
    if (cartItem?.discount?.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key) {
        total = cartItem.price_discount * cartItem.quantity
        cartItemPrice = cartItem.price_discount * cartItem.quantity
    }
    // console.log(total)
    const discount_value = cartItem.discount?.discount_value;
    return (
        <SwipeableList type={Type.IOS}>
            <SwipeableListItem
                className="re-cart-item-cnt"
                trailingActions={trailingActions(handleRemoveItemCart)}
                onSwipeProgress={(progress) => setProcess(progress)}
                listType={Type.IOS}
            >
                {cartItem?.discount && (
                    <div
                        style={
                            cartItem.isConfirm === false ? { opacity: 0.4 } : {}
                        }
                        className="flex-row re-cart-item__discount"
                    >
                        <span>{cartItem.discount?.coupon_code}</span>
                        <img
                            style={{ marginLeft: "4px" }}
                            src={icon.cardDiscountWhite}
                            alt=""
                        />
                    </div>
                )}
                <div
                    style={
                        process > 15 ? { backgroundColor: "var(--grey)" } : {}
                    }
                    className="flex-row-sp cart-item cart-item"
                >
                    <div className="flex-row cart-item__name">
                        <div className="flex-row">
                            <Checkbox
                                size="small"
                                style={
                                    inPayment === true
                                        ? { display: "none" }
                                        : {}
                                }
                                sx={{
                                    color: "#7161BA",
                                    "&.Mui-checked": {
                                        color: "#7161BA",
                                    },
                                    marginLeft: "-10px",
                                }}
                                checked={cartItem.isConfirm}
                                onChange={handleConfirm}
                            />
                            <img
                                className="cart-item__name-img"
                                src={
                                    cartItem?.cart_item?.image_url
                                        ? cartItem?.cart_item?.image_url
                                        : cartItem?.org?.image_url
                                }
                                onError={(e) => onErrorImg(e)}
                                alt=""
                            />
                        </div>
                        <span
                            onClick={goBackDetail}
                            className="cart-item__name-text"
                        >
                            {cartItem.name}
                        </span>
                    </div>
                    <div className="flex-row cart-item__info">
                        <div
                            style={inPayment === true ? { width: "25%" } : {}}
                            className="flex-row cart-item__quantity"
                        >
                            <button
                                onClick={handleDesc}
                                style={{
                                    backgroundColor: "transparent",
                                    color: "var(--purple)",
                                }}
                            >
                                -
                            </button>
                            <span>{cartItem.quantity}</span>
                            <button onClick={handleAscCart}>+</button>
                        </div>
                        <div
                            style={inPayment === true ? { width: "16.6%" } : {}}
                            className="flex-row cart-item__price"
                        >
                            {cartItem.discount && cartItem.quantity === 1
                                ? formatPrice(cartItem.price_discount)
                                : formatPrice(cartItemPrice)}{" "}
                            đ
                        </div>
                        {cartItem.discount ? (
                            cartItem.quantity === 1 ? (
                                <div
                                    style={
                                        inPayment === true
                                            ? { width: "16.6%" }
                                            : {}
                                    }
                                    className="flex-row cart-item__total"
                                >
                                    {formatPrice(cartItem.price_discount)} đ
                                </div>
                            ) : (
                                <div
                                    style={
                                        inPayment === true
                                            ? { width: "16.6%" }
                                            : {}
                                    }
                                    className="flex-column cart-item__total"
                                >
                                    {
                                        cartItem.discount?.discount_type !== DISCOUNT_TYPE.FINAL_PRICE.key ?
                                            <>
                                                <span>{formatPrice(total)}đ</span>
                                                {!IS_MB && (
                                                    <span>
                                                        -{formatPrice(discount_value)}đ
                                                    </span>
                                                )}
                                                <span>
                                                    {formatPrice(total - discount_value)}đ
                                                </span>
                                            </>
                                            :
                                            <>
                                                <span
                                                    style={{
                                                        textDecoration: "line-through"
                                                    }}
                                                >{formatPrice(cartItem.price * cartItem.quantity)}</span>
                                                <span>{formatPrice(total)}</span>
                                            </>
                                    }
                                </div>
                            )
                        ) : (
                            <div
                                style={
                                    inPayment === true ? { width: "16.6%" } : {}
                                }
                                className="flex-row cart-item__total"
                            >
                                {formatPrice(
                                    cartItem.price * cartItem.quantity
                                )}{" "}
                                đ
                            </div>
                        )}
                        <div
                            style={
                                inPayment === true ? { display: "none" } : {}
                            }
                            className="flex-row cart-item__control"
                        >
                            <ButtonCus
                                imgIcon={icon.trash}
                                padding="4px 4px 4px 4px"
                                backColor="var(--red-cl)"
                                borderRadius="8px"
                                onClick={openConfirmClick}
                            />
                        </div>
                    </div>
                    {cartItem.discount && (
                        <PopupNotification
                            title="Thông báo"
                            content={`
                            Giá bán này giới hạn mua tối đa chỉ 1 dịch vụ,\n
                            từ dịch vụ thứ 2 giá bán sẽ thay đổi thành ${formatPrice(
                                cartItem.discount?.items[0]?.view_price + cartItem.discount?.discount_value
                            )}đ.
                            `}
                            open={open}
                            setOpen={setOpen}
                            children={
                                <XButton title="Đã hiểu" onClick={() => setOpen(false)} />
                            }
                        />
                    )}
                    <PopupNotification
                        open={openConfirm}
                        setOpen={setOpenConfirm}
                        title="Thông báo"
                        content={`Bạn có muốn xóa "${cartItem.name}" khỏi giở hàng không ?`}
                        children={<>
                            <XButton
                                title="Hủy"
                                onClick={() => setOpenConfirm(false)}
                            />
                            <XButton
                                title="Đồng ý"
                                onClick={handleRemoveItemCart}
                            />
                        </>}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
}

export default CartItem;

const trailingActions = (handleRemoveItemCart: any) => (
    <TrailingActions>
        <SwipeAction onClick={() => handleRemoveItemCart()}>
            <div className="re-cart-swipe-btn">
                <button>
                    <img src={icon.trash} alt="" />
                </button>
            </div>
        </SwipeAction>
    </TrailingActions>
);
