/* eslint-disable react-hooks/exhaustive-deps */
import { XButton } from "components/Layout";
import { AppContext } from "context/AppProvider";
import IStore from "interface/IStore";
import { IOrderV2 } from "interface/orderv2";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import { paramOrder } from 'params-query'
import { ParamOrder } from "params-query/param.interface";
import { useSwrInfinite } from 'utils'
import API_ROUTE from "api/_api";
import { EmptyRes } from "components/Layout";
import Skeleton from "react-loading-skeleton";

function TabOrderPaid() {
    const { t } = useContext(AppContext);
    const { USER } = useSelector((state: IStore) => state.USER)
    const param: ParamOrder = {
        ...paramOrder,
        "filter[status]": 'PAID',
        "append": "qr_link|origin"
    }
    const { resData, totalItem, onLoadMore, isValidating } = useSwrInfinite(USER, API_ROUTE.ORDERS, param)
    const orders: IOrderV2[] = resData ?? []

    return (
        <div>
            {totalItem === 0 && <EmptyRes title='Bạn chưa có đơn hàng nào' />}
            {orders.length === 0 && isValidating && <OrderSkelton />}
            <ul className="order-list__cnt">
                {orders.map((order: IOrderV2, index: number) => (
                    <OrderItem key={index} order={order} />
                ))}
            </ul>
            <div className="order-list__bottom">
                {orders.length < totalItem && (
                    <XButton
                        title={t("trending.watch_all")}
                        loading={isValidating}
                        onClick={onLoadMore}
                    />
                )}
            </div>
        </div>
    );
}

export default TabOrderPaid;

export const OrderSkelton = () => {
    const count = [1, 2, 3, 4, 5, 6]
    return (
        <ul className="order-list__cnt order-load__cnt">
            {
                count.map(item => (
                    <li key={item} className="order_load_cnt">
                        <div className="order_load_cnt_head">
                            <Skeleton width={'100%'} height={'100%'} />
                        </div>
                        <div className="order_load_cnt_body">
                            <Skeleton width={'100%'} height={'100%'} />
                        </div>
                        <div className="order_load_cnt_bot">
                            <Skeleton width={'100%'} height={'100%'} />
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}
