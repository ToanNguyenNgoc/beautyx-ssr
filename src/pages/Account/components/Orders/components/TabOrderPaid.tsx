/* eslint-disable react-hooks/exhaustive-deps */
import { XButton } from "components/Layout";
import { AppContext } from "context/AppProvider";
import { IOrderV2 } from "interface/orderv2";
import React, { useContext } from "react";
import OrderItem from "./OrderItem";
import { EmptyRes } from "components/Layout";
import Skeleton from "react-loading-skeleton";
import { Masonry } from "@mui/lab";
import { useDeviceMobile, useOrderService } from "hooks";
import style from '../order.module.css'

function TabOrderPaid() {
    const { t } = useContext(AppContext) as any
    const IS_MB = useDeviceMobile()
    const { resData, totalItem, onLoadMore, isValidating } = useOrderService()
    const orders: IOrderV2[] = resData ?? []

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
