/* eslint-disable react-hooks/exhaustive-deps */
import { XButton } from "components/Layout";
import { AppContext } from "context/AppProvider";
import { IOrderV2 } from "interface/orderv2";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncOrderPaid } from "redux/order/orderSlice";
import OrderItem from "./OrderItem";

function TabOrderPaid() {
    const ORDER = useSelector((state: any) => state.ORDER.ORDER);
    const { t } = useContext(AppContext);
    const dispatch = useDispatch();
    const { orders, totalItem, page } = ORDER;
    const onMoreOrder = () => {
        dispatch(
            fetchAsyncOrderPaid({
                page: page + 1,
                status: "PAID",
            })
        );
    };
    return (
        <div>
            <ul className="order-list__cnt">
                {orders.map((order: IOrderV2, index: number) => (
                    <OrderItem key={index} order={order} />
                ))}
            </ul>
            <div className="order-list__bottom">
                {orders.length < totalItem && (
                    <XButton
                        title={t("trending.watch_all")}
                        loading={false}
                        onClick={onMoreOrder}
                    />
                )}
            </div>
        </div>
    );
}

export default TabOrderPaid;
