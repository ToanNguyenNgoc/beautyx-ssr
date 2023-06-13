import icon from 'constants/icon';
import IStore from 'interface/IStore';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getTotal } from 'redux/cart';
import { clst } from 'utils';
import style from './head.module.css'

interface HeadCartProps {
    changeStyle?: boolean
}

function HeadCart(props: HeadCartProps) {
    const { changeStyle } = props;
    const history = useHistory()
    const dispatch = useDispatch()
    const { USER } = useSelector((state: IStore) => state.USER)
    const { cartList, cartQuantity } = useSelector((state: any) => state.carts);
    useEffect(() => {
        dispatch(getTotal(USER?.id));
    }, [dispatch, cartList, USER]);
    return (
        <button
            onClick={() => history.push("/gio-hang")}
            className={
                changeStyle
                    ? clst([
                        style.head_top_right_btn,
                        style.head_top_right_btn_ch,
                    ])
                    : style.head_top_right_btn
            }
        >
            {cartQuantity > 0 && (
                <span
                    className={style.head_top_right_badge}
                >
                    {cartQuantity >= 9
                        ? "9+"
                        : cartQuantity}
                </span>
            )}
            <img
                src={
                    changeStyle
                        ? icon.cartWhiteBold
                        : icon.cartPurpleBold
                }
                alt=""
            />
        </button>
    );
}

export default HeadCart;