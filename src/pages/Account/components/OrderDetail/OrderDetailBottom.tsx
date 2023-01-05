import { XButton } from 'components/Layout';
import { IOrderV2 } from 'interface';
import IStore from 'interface/IStore';
import { DetailProp } from 'pages/_SerProCoDetail/detail.interface';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatAddCart } from 'utils/cart/formatAddCart';
import { formatSalePriceService } from 'utils/formatPrice';
import { addCart, onClearPrevCartItem } from 'redux/cart';
import style from './order-detail.module.css'
import { useHistory } from 'react-router-dom';

function OrderDetailBottom({ order }: { order: IOrderV2 }) {
    const org = order.organization
    const dispatch = useDispatch()
    const history = useHistory()
    const { USER } = useSelector((state: IStore) => state.USER)
    const items = order.items ?? []
    const checkType = (productable_type: string) => {
        let type = 'SERVICE'
        if (productable_type === 'App\\Models\\CI\\Product') {
            type = 'PRODUCT'
        }
        if (productable_type === 'App\\Models\\CI\\Treatment_combo') {
            type = 'COMBO'
        }
        return type
    }
    const handleReOrder = () => {
        dispatch(onClearPrevCartItem())
        for (var i = 0; i < items.length; i++) {
            const type = checkType(items[i].productable_type)
            const productable = items[i].productable
            const detail: DetailProp = {
                name: productable?.service_name ?? productable?.product_name ?? productable?.name,
                type: type,
                SPECIAL_PRICE: formatSalePriceService(productable?.special_price, productable?.special_price_momo),
                PRICE: type === 'COMBO' ? productable?.use_value : (productable?.price ?? productable?.retail_price),
                ...productable
            }
            const sale_price = detail.SPECIAL_PRICE > 0 ? detail.SPECIAL_PRICE : detail.PRICE
            const values = formatAddCart(detail, org, detail.type, 1, sale_price, null, true);
            dispatch(addCart({ ...values, user_id: USER.id }))
            history.push('/gio-hang')
        }
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