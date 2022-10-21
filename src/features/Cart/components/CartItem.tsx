import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import ButtonCus from "../../../components/ButtonCus";
import {
    checkConfirm,
    descItem,
    removeItem,
    ascItem,
} from "../../../redux/cartSlice";
import { useDispatch } from "react-redux";
import icon from "../../../constants/icon";
import formatPrice from "../../../utils/formatPrice";
import slugify from "../../../utils/formatUrlString";
import { useHistory } from "react-router-dom";
import scrollTop from "../../../utils/scrollTop";
import onErrorImg from "../../../utils/errorImg";
import {PopupNotification} from 'components/Notification'

// ==== api tracking ====
 import tracking from "../../../api/trackApi";
// end

// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../../utils/dataLayer";
import { XButton } from "components/Layout";
// end
interface IProps {
    inPayment?: boolean;
    cartItem: any;
}

function CartItem(props: IProps) {
    const { cartItem, inPayment } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const [isCheck, setIsCheck] = useState(cartItem.isConfirm);
    const [openConfirm, setOpenConfirm] = useState(false);
    const isConfirm = isCheck;
    const handleConfirm = (e: any) => {
        setIsCheck(e.target.checked);
        const action = checkConfirm({ ...cartItem, isConfirm });
        dispatch(action);
    };
    const handleAscCart = () => {
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
    };
    const openConfirmClick = () => {
        setOpenConfirm(true);
    };
    const goBackDetail = () => {
        tracking.USER_ITEM_CLICK(cartItem.org_id,cartItem.id)
        GoogleTagPush(GoogleTagEvents.PRODUCT_CLICK);
        if (cartItem.is_type === 1) {
            history.push({
                pathname: `/san-pham/${slugify(cartItem.name)}`,
                search: `${cartItem.org_id},${cartItem.id},${cartItem.is_type}`,
            });
        } else if (cartItem.is_type === 2) {
            if (cartItem.discount) {
                history.push({
                    pathname: `/chi-tiet-giam-gia/${slugify(
                        cartItem.discount.items[0].productable.service_name
                    )}`,
                    search: `org_id=${cartItem.org_id}&id=${cartItem.discount?.id}`,
                });
            } else {
                history.push({
                    pathname: `/dich-vu/${slugify(cartItem.name)}`,
                    search: `${cartItem.org_id},${cartItem.id},${cartItem.is_type}`,
                });
            }
            // history.push({
            //     pathname: `/dich-vu/${slugify(cartItem.name)}`,
            //     search: `${cartItem.org_id},${cartItem.id},${cartItem.is_type}`
            // })
        } else if (cartItem.is_type === 3) {
            //page combo detail
        }
        scrollTop();
    };
    //when quantity discount > 1
    const total = cartItem.price * cartItem.quantity;
    const discount_value = cartItem.discount?.discount_value;
    return (
        <div className="flex-row-sp cart-item">
            <div className="flex-row cart-item__name">
                <Checkbox
                    size="small"
                    style={inPayment === true ? { display: "none" } : {}}
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
                <span onClick={goBackDetail} className="cart-item__name-text">
                    {cartItem.name} - {cartItem.org_id}
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
                            backgroundColor: "var(--bg-gray)",
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
                        : formatPrice(cartItem.price)}{" "}
                    đ
                </div>
                {cartItem.discount ? (
                    cartItem.quantity === 1 ? (
                        <div
                            style={inPayment === true ? { width: "16.6%" } : {}}
                            className="flex-row cart-item__total"
                        >
                            {formatPrice(cartItem.price_discount)} đ
                        </div>
                    ) : (
                        <div
                            style={inPayment === true ? { width: "16.6%" } : {}}
                            className="flex-column cart-item__total"
                        >
                            <span>{formatPrice(total)}đ</span>
                            <span>-{formatPrice(discount_value)}đ</span>
                            <span>{formatPrice(total - discount_value)}đ</span>
                        </div>
                    )
                ) : (
                    <div
                        style={inPayment === true ? { width: "16.6%" } : {}}
                        className="flex-row cart-item__total"
                    >
                        {formatPrice(cartItem.price * cartItem.quantity)} đ
                    </div>
                )}
                <div
                    style={inPayment === true ? { display: "none" } : {}}
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
    );
}

export default CartItem;
