import React, { useContext, useState } from 'react';
import { AppContext } from '../../../context/AppProvider';
import { IDiscountPar, IITEMS_DISCOUNT } from '../../../interface/discount';
import { IOrganization } from '../../../interface/organization';
import icon from '../../../constants/icon';
import formatPrice from '../../../utils/formatPrice';
import { addCart } from '../../../redux/cartSlice'
import { useDispatch, useSelector } from 'react-redux';
import { formatAddCart } from '../../../utils/cart/formatAddCart'
import { useHistory } from 'react-router-dom';

interface IProps {
    discount: IDiscountPar
}

function DetailRight(props: IProps) {
    const { t } = useContext(AppContext);
    const dispatch = useDispatch();
    const history = useHistory()
    const { discount } = props;
    const { USER } = useSelector((state: any) => state.USER);
    const org: IOrganization = discount?.organizations[0];

    const discount_item_child: IITEMS_DISCOUNT = discount?.items[0];
    const percent = Math.round(100 - discount_item_child.view_price / discount_item_child.productable.price * 100)
    const [quantity, setQuantity] = useState(1);
    const handleDesc = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
    const handleAddCart = () => {
        if (USER) {
            const is_type = 2
            const valuesOb = formatAddCart(
                discount_item_child.productable,
                org,
                is_type,
                quantity,
                discount_item_child.productable.price,
                discount
            )
            const values = {
                ...valuesOb,
                cart_id: parseInt(`${USER.id}${valuesOb.cart_id}`),
                uses_id: USER.id
            }
            dispatch(addCart(values))
        }
        else {
            history.push("/sign-in?1")
        }
    }
//when quantity discount > 1
const total = discount_item_child.productable.price * quantity;
const discount_value = discount.discount_value

return (
    <div className="product-cnt__right">
        <div className="product-cnt__card-wrapper__head">
            <div className="pr-detail-card-head">
                <div className="product-cnt__right-head">
                    <h2>{discount_item_child?.productable?.service_name}</h2>
                    <span>{discount?.title}</span><br />
                    <span>{org?.name}</span>
                    <div className="flex-row product-cnt__right-head__rate">
                        <span>{discount.used}</span>
                        {t('pr.purchases')}
                        <span>4.5</span>
                        <img src={icon.star} alt="" />
                        <span>250</span>
                        <img src={icon.chatAll} alt="" />
                    </div>
                </div>
                <div className="product-cnt__right-price">
                    <span className="price-old">{formatPrice(discount_item_child.productable.price)} đ</span>
                    <div className="price__discount-sale">
                        <span>Giảm {percent} %</span>
                        <span>{formatPrice(discount_item_child?.view_price)} đ</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="product-cnt__right-body">
            <div className="product-cnt__right-body-item">
                <div className="flex-row user-available-cnt">
                    Lượt mua còn lại :
                    <h4 className="user_available-text">
                        {discount?.user_available_purchase_count}
                    </h4>
                </div>
                <span>{t("pr.quantity")}</span>
                <div className="flex-row product-quantity">
                    <button onClick={handleDesc}>-</button>
                    <div className="product-quantity__number">{quantity}</div>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                {
                    quantity > 1 &&
                    <div className="user-available-cnt">
                        Giá dịch vụ đã thay đổi vị bạn chọn nhiều hơn số lượng được áp dụng mã
                    </div>
                }
            </div>
        </div>
        <div className="product-cnt__right-bot">
            <div className="flex-row-sp product-cnt__right-bot__total">
                <span>{t("pr.total")}</span>
                {
                    quantity === 1 ?
                        <div className="flex-column">
                            <span>{formatPrice(discount_item_child.view_price)} đ</span>
                        </div>
                        :
                        <div className="flex-column" style={{ alignItems: "flex-end" }}>
                            <span>{formatPrice(total)} đ</span>
                            <span>-{formatPrice(discount_value)} đ</span>
                            <span>{formatPrice(total - discount_value)} đ</span>
                        </div>
                }
            </div>
            <div className="flex-row" style={{ justifyContent: "flex-end" }}>
                <button
                    onClick={handleAddCart}
                    className="flex-row product-cnt__right-bot__add"
                >
                    <img src={icon.ShoppingCartSimpleWhite} alt="" />
                    {t("pr.add_to_cart")}
                </button>
            </div>
        </div>
    </div>
);
}

export default DetailRight;