/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import HeadTitle from "features/HeadTitle";
import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import PaymentQr from "./components/PaymentQr";
import PaymentInfo from "./components/PaymentInfo";
import useGetMessageTiki from "rootComponents/useGetMessageTiki";
import apointmentApi from "api/apointmentApi";
import HeadMobile from "features/HeadMobile";
import { PopupBtxReward, PopupNotification } from "components/Notification";
import { useHistory } from "react-router-dom";
import { clearByCheck } from "redux/cart";
import { ICart } from "interface/cart";
import { orderApi } from "api/orderApi";
// ==== api tracking ====
import tracking from "api/trackApi";
import { formatProductList } from "utils/tracking";
import { XButton } from "components/Layout";
import { useCartReducer, useCountDown, useSwr } from "hooks";

import style from './payment.module.css'
import { IOrderV2 } from "interface";

const initOpen = {
    content: "",
    open: false,
    children: <></>
}


interface StatusOrderProps {
    cancel: boolean,
    time_refresh: any
}

function CartPaymentStatus() {
    const {sec} = useCountDown(600);
    const dispatch = useDispatch();
    const history = useHistory();
    const [open, setOpen] = useState(initOpen);
    const { services, products, combos } = useCartReducer()
    const location: any = useLocation();
    const res: any = location?.state?.state_payment;
    const transaction_uuid = res?.payment_gateway?.transaction_uuid;
    const action = location?.state?.actionAfter;
    const orderItems = location.state?.listPayment ?? services?.concat(products)?.concat(combos)

    const [statusOrder, setStatusOrder] = useState<StatusOrderProps>({
        cancel: false,
        time_refresh: 1000
    })
    const { response } = useSwr({
        API_URL: `/paymentgateways/${transaction_uuid}/status`,
        enable: transaction_uuid,
        params: { cancel: statusOrder.cancel },
        refreshInterval: statusOrder.time_refresh,
        dedupingInterval:0
    })
    const orderStatus = response?.status ?? 'PENDING'

    const handleCancelCallStatus = () => {
        setStatusOrder({
            cancel: true,
            time_refresh: false
        })
    }

    //[CASE]: when apply voucher payment_gateway_amount !== display_price
    const onCloseNoti = () => setOpen({ ...open, open: false })
    const handleNotiApplyFail = () => {
        if (res?.payment_gateway?.amount !== res?.FINAL_AMOUNT && res?.discounts?.length > 0) {
            setOpen({
                content: "Áp dụng mã thất bại. Bạn có muốn tiếp tục thanh toán",
                open: true,
                children: <>
                    <XButton
                        title="Trở lại"
                        onClick={() => history.goBack()}
                    />
                    <XButton
                        title="Tiếp tục"
                        onClick={onCloseNoti}
                    />
                </>
            })
        }
    }
    //-------------------------------------------------------------------
    //listPayment from page buy now product, booking now
    const listPayment: ICart[] = location.state?.listPayment;
    const handlePostApp = async () => {
        const params = {
            order_id: action.order_id,
            service_ids: action.service_ids,
            branch_id: action.branch,
            time_start: action.time_start,
            note: action.note,
        };
        try {
            await apointmentApi.postAppointment(params, action.org_id);
        } catch (error) {
            console.log(error);
        }
    };
    //show btx reward after payment "PAID"
    const [openBtx, setOpenBtx] = useState({ open: false, btx_point: 0 })
    const onShowNotiBTXPoint = async (order_id: number) => {
        const res = await orderApi.getOrderById(order_id)
        // const btx_reward = await res?.data?.context?.btx_reward?.reward_points
        const orderDetail: IOrderV2 = await res.data?.context
        const btx_reward = orderDetail?.payment_gateway?.amount / 100
        if (btx_reward && btx_reward >= 500) {
            setOpenBtx({ open: true, btx_point: btx_reward })
        }
    }
    useEffect(() => {
        if (response && response?.status !== "PENDING") {
            setStatusOrder({
                ...statusOrder,
                time_refresh: false
            })
        }
        if (response?.status === "PAID") {
            dispatch(clearByCheck())
            if (action) handlePostApp()
            if (response?.paymentable_id) onShowNotiBTXPoint(response?.paymentable_id)
        }
    }, [response?.status])
    useCancelByTime(sec, handleCancelCallStatus)

    useEffect(() => {
        handleNotiApplyFail()
        if (listPayment && transaction_uuid) {
            tracking.CONFIRM_SCREEN_LOAD(listPayment[0].org_id, formatProductList(listPayment), res.amount)
        }
    }, []);
    const handleCancelOrder = () => {
        setOpen({
            content: 'Bạn có muốn hủy thanh toán đơn hàng không ?',
            open: true,
            children: <>
                <XButton
                    title="Hủy đơn hàng"
                    onClick={() => {
                        handleCancelCallStatus();
                        setOpen(initOpen)
                    }}
                />
                <XButton
                    title="Không"
                    onClick={() => setOpen(initOpen)}
                />
            </>
        });
    };

    //cancel payment TIKI
    const onGoBackCart = () => {
        const payment_url = location?.pathname;
        history.push({
            pathname: "/gio-hang",
            state: { payment_url },
        });
    };
    const responseTiki = useGetMessageTiki();
    useMemo(() => {
        if (responseTiki?.requestId && responseTiki?.result.status === "fail") {
            handleCancelCallStatus();
            let title = `Thanh toán thất bại \n Bạn có muốn tiếp tục thanh toán không ?`;
            if (action) {
                title = `Thanh toán và đặt hẹn thất bại`;
            }
            setOpen({
                content: title,
                open: true,
                children: <>
                    <XButton
                        title="Về trang chủ"
                        onClick={() => history.push("")}
                    />
                    <XButton
                        title="Tiếp tục"
                        onClick={() => onGoBackCart()}
                    />
                </>
            });
        }
    }, [responseTiki]);
    const dataCartInfo = { res, orderStatus, services };
    return (
        <>
            <HeadTitle
                title={
                    orderStatus === "PAID"
                        ? "Thanh toán thành công"
                        : "Thanh toán đơn hàng"
                }
            />
            <HeadMobile
                handleCancelPayment={handleCancelCallStatus}
                title="Thanh toán"
            />
            <Container>
                <div className={style.container}>
                    <PaymentQr
                        res={res}
                        sec={sec}
                        orderStatus={orderStatus}
                    />
                    <div className={style.container_right}>
                        <PaymentInfo
                            action={action}
                            data={dataCartInfo}
                            orderItems={orderItems}
                            handleCancelOrder={handleCancelOrder}
                        />
                    </div>
                </div>
            </Container>
            <PopupNotification
                title="Thông báo"
                content={open.content}
                open={open.open}
                children={open.children}
            />
            <PopupBtxReward
                open={openBtx.open}
                onClose={() => setOpenBtx({ ...openBtx, open: false })}
                btxPoint={openBtx.btx_point}
            />
        </>
    );
}

export default CartPaymentStatus;

const useCancelByTime = (sec: number, onCancel: () => void) => {
    useEffect(() => {
        if (sec === 0) onCancel()
    }, [sec])
}
