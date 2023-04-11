/* eslint-disable react-hooks/exhaustive-deps */
import { Masonry } from '@mui/lab';
import API_ROUTE from 'api/_api';
import { EmptyRes, XButton } from 'components/Layout';
import { useDeviceMobile } from 'hooks';
import IStore from 'interface/IStore';
import { IOrderV2 } from 'interface/orderv2';
import { paramOrder } from 'params-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { useSwrInfinite } from 'hooks';
import OrderItem from './OrderItem';
import { OrderSkelton } from './TabOrderPaid';
import style from '../order.module.css'
import { EXTRA_FLAT_FORM } from 'api/extraFlatForm';


function TabOrderCancel() {
    const PLAT_FORM = EXTRA_FLAT_FORM()
    const { USER } = useSelector((state: IStore) => state.USER)
    const { resData, totalItem, onLoadMore, isValidating } = useSwrInfinite(USER, API_ROUTE.ORDERS, {
        ...paramOrder, 
        "filter[platform]": PLAT_FORM === 'BEAUTYX' ? 'BEAUTYX|BEAUTYX MOBILE|WEB' : PLAT_FORM,
    })
    const orders: IOrderV2[] = resData ?? []
    const IS_MB = useDeviceMobile()
    return (
        <div className={style.order_container} >
            {totalItem === 0 && <EmptyRes title='Bạn chưa có đơn hàng nào' />}
            {orders.length === 0 && isValidating && <OrderSkelton />}
            <Masonry
                columns={IS_MB ? 1 : 2}
                spacing={IS_MB ? 0 : 1}
            >
                {orders.map((order: IOrderV2, index: number) => (
                    <OrderItem key={index} order={order} />
                ))}
            </Masonry>
            <div className="order-list__bottom">
                {
                    orders.length < totalItem &&
                    <XButton
                        title='Xem thêm'
                        loading={isValidating}
                        onClick={onLoadMore}
                    />
                }
            </div>
        </div>
    );
}

export default TabOrderCancel;