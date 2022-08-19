import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DetailOrgVoucher from "../../../components/DetailVoucherOrg";
import icon from "../../../constants/icon";
import { AppContext } from "../../../context/AppProvider";
import { Combo } from "../../../interface/combo";
import { IOrganization } from "../../../interface/organization";
import { addCart } from "../../../redux/cartSlice";
import { formatAddCart } from "../../../utils/cart/formatAddCart";
import onErrorImg from "../../../utils/errorImg";
import formatPrice from "../../../utils/formatPrice";
import { extraOrgTimeWork } from "../../MerchantDetail/components/Functions/extraOrg";
import PopupSuccess from "../../PopupSuccess";
import "../../ProductDetail/product.css";
import DetailOrgCard from "../../ServiceDetail/components/DetailOrgCard";
import ComboDetailRightReview from "./ComboDetailRightReview";

interface IProps {
    combo: Combo;
    org: IOrganization;
}

function ComboDetailRight(props: IProps) {
    const { combo, org } = props;
    const dispatch = useDispatch();
    const list_price = [combo?.price, combo?.use_value].sort((a, b) => b - a);
    const price = list_price[0];
    const { COMMENTS } = useSelector((state: any) => state.COMBO);
    const { USER } = useSelector((state: any) => state.USER);
    const special_price = list_price[1];
    const percent = Math.round(100 - (special_price / price) * 100);
    const [popupSuccess, setPopupSuccess] = useState(false);
    const history = useHistory();
    const { t } = useContext(AppContext);
    // get today's activity date in org
    const now = new Date();
    const today = now.getDay() + 1;
    const orgTimes: any = org && extraOrgTimeWork(org?.opening_time);
    const time_works_today = orgTimes?.find(
        (item: any, index: number) => index + 2 === today
    );
    //handle add cart
    const [quantity, setQuantity] = useState(1);
    const onDescQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };
    const handleAddCart = () => {
        if (USER) {
            const sale_price = special_price;
            const is_type = 3;
            const valuesOb = formatAddCart(combo, org, is_type, quantity, sale_price);
            const values = {
                ...valuesOb,
                cart_id: parseInt(`${USER.id}${valuesOb.cart_id}`),
                user_id: USER.id
            };
            dispatch(addCart(values));
            setPopupSuccess(true);
        } else {
            history.push("/sign-in?1");
        }
    };
    return (
        <div className="service-detail__right">
            <div className="detail-right__head">
                <div className="detail-right__head-img">
                    <img
                        src={org?.image_url}
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
                        <p>{combo?.name}</p>
                        <div
                            //onClick={onFavorite}
                            className="favorite"
                        >
                            <img src={icon.heart} alt="" />
                        </div>
                    </div>
                    <ComboDetailRightReview data={combo} comment={COMMENTS} />
                </div>
            </div>
            <DetailOrgVoucher
                org={org}
            />

            <div className="detail-right__body">
                <div className="detail-right__info">
                    <div className="flexX-gap-8">
                        {special_price > 0 && percent !== 0 && (
                            <div className="detail-right__percent">
                                <p>
                                    {t("detail_item.off")} {percent}%
                                </p>
                            </div>
                        )}
                        <div className="detail-right__price">
                            {special_price > 0 ? (
                                <>
                                    <span>{formatPrice(special_price)}đ</span>
                                    <span>{formatPrice(price)}đ</span>
                                </>
                            ) : (
                                <span>{formatPrice(price)}đ</span>
                            )}
                        </div>
                    </div>
                </div>
                <DetailOrgCard org={org} />
            </div>
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
                <div onClick={handleAddCart} className="bottom-addCart">
                    <img src={icon.ShoppingCartSimpleWhite} alt="" />
                    <p>{t("detail_item.add_cart")}</p>
                </div>
            </div>
            {/* <Popu */}
            <PopupSuccess
                popup={popupSuccess}
                setPopup={setPopupSuccess}
                isNotSuccess={true}
                title={`Đã thêm ${combo?.name} vào giỏ hàng`}
                // title='Hiện tại BeautyX đang update tính năng sử dụng combo vui lòng thử lại sau nha!'
            />
        </div>
    );
}

export default ComboDetailRight;
