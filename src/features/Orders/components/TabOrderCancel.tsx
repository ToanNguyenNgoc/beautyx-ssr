/* eslint-disable react-hooks/exhaustive-deps */
import API_ROUTE from 'api/_api';
import { EmptyRes, XButton } from 'components/Layout';
import IStore from 'interface/IStore';
import { IOrderV2 } from 'interface/orderv2';
import { paramOrder } from 'params-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { useSwrInfinite } from 'utils';
import OrderItem from './OrderItem';
import { OrderSkelton } from './TabOrderPaid';


function TabOrderCancel() {
    const { USER } = useSelector((state: IStore) => state.USER)
    const { resData, totalItem, onLoadMore, isValidating } = useSwrInfinite(USER, API_ROUTE.ORDERS, paramOrder)
    const orders: IOrderV2[] = resData ?? []

    return (
        <div>
            {totalItem === 0 && <EmptyRes title='Bạn chưa có đơn hàng nào' />}
            {orders.length === 0 && isValidating && <OrderSkelton />}
            <ul className="order-list__cnt">
                {
                    orders.map((order: IOrderV2, index: number) => (
                        <OrderItem
                            key={index}
                            order={order}
                        />
                    ))
                }
            </ul>
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