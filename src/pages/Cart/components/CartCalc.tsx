import { XButton } from 'components/Layout';
import IStore from 'interface/IStore';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotal } from 'redux/cart';

interface CartCalcType{
    handlePostOrder:() => void
}

export function CartCalc(props:CartCalcType) {
    const {handlePostOrder} = props
    const { USER } = useSelector((state: IStore) => state.USER)
    const { cartAmount, cartAmountDiscount,VOUCHER_APPLY, cartList } = useSelector((state: IStore) => state.carts)
    const dispatch = useDispatch()
    useEffect(() => {
        let mount = true
        if (mount) {
            dispatch(getTotal(USER?.id));
        }
        return () => { mount = false }
    }, [dispatch, cartList, USER, VOUCHER_APPLY]);
    
    const onPostOrder = ()=>{
        handlePostOrder()
    }

    return (
        <div>
            {cartAmount - cartAmountDiscount}
            <XButton
                title='Đặt hàng'
                onClick={onPostOrder}
            />
        </div>
    );
}