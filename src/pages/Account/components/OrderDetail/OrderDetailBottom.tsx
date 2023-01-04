import { XButton } from 'components/Layout';
import { IOrderV2 } from 'interface';
import React from 'react';
import style from './order-detail.module.css'

function OrderDetailBottom({ order }: { order: IOrderV2 }) {
    const handleReOrder = () => {
        console.log(order.items)
    }
    return (
        <div className={style.bottom}>
            <XButton
                title='Mua lại'
                className={style.bottom_btn}
                onClick={handleReOrder}
            />
        </div>
    );
}

export default OrderDetailBottom;