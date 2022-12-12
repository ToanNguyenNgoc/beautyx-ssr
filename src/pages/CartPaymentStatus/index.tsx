/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useMemo } from "react";
import HeadTitle from "../../features/HeadTitle";
import "./cart-status.css";
import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import paymentGatewayApi from "../../api/paymentGatewayApi";
import { useDispatch, useSelector } from "react-redux";
import PaymentQr from "./components/PaymentQr";
import PaymentInfo from "./components/PaymentInfo";
import useGetMessageTiki from "../../rootComponents/useGetMessageTiki";
import apointmentApi from "../../api/apointmentApi";
import HeadMobile from "../../features/HeadMobile";
import { PopupNotification } from "components/Notification";
import { useHistory } from "react-router-dom";
import { clearByCheck } from "../../redux/cartSlice";
import { onClearOrder } from "../../redux/order/orderSlice";
import { ICart } from "../../interface/cart";
// ==== api tracking ====
import tracking from "../../api/trackApi";
import { formatProductList } from "../../utils/tracking";
import {
    onAddServicesNoBookCount,
} from "../../redux/order/orderSlice";
import ModalLoad from "../../components/ModalLoad";
import { XButton } from "components/Layout";
import { useCountDown } from "hooks";
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";

import style from './payment.module.css'
// end
const timerRender = [0];
const ORDER_STATUS = ["PENDING", "PAID", "CANCELED_BY_USER"];

const initOpen = {
    content: "",
    open: false,
    children: <></>
}

function CartPaymentStatus() {
    const PLAT_FORM = EXTRA_FLAT_FORM()
    const sec = useCountDown(600);
    const dispatch = useDispatch();
    const [orderStatus, setOrderStatus] = useState(ORDER_STATUS[0]);
    // const [openConf, setOpenConf] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const [open, setOpen] = useState(initOpen);

    const carts = useSelector((state: any) => state.carts);
    const list = carts.cartList.filter((item: any) => item.isConfirm === true);
    const services = list.filter((item: any) => item.is_type === 2);
    const location: any = useLocation();
    const res: any = location?.state?.state_payment;
    const intervalRef = useRef<any>();
    const transaction_uuid = res?.payment_gateway?.transaction_uuid;
    const action = location?.state?.actionAfter;
    //[CASE]: when apply voucher payment_gateway_amount !== display_price
    const onCloseNoti = () => setOpen({ ...open, open: false })
    useEffect(() => {
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
    }, [])
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
    //save appointment info after payment payment=MOMO
    const handleSaveApp = () => {
        const params = {
            order_id: action.order_id,
            service_ids: action.service_ids,
            branch_id: action.branch,
            time_start: action.time_start,
            note: action.note,
            org_id: action.org_id
        };
        localStorage.setItem('APP_INFO', JSON.stringify(params))
    }
    //
    const handleAfterOrder = () => {
        dispatch(clearByCheck());
        dispatch(onAddServicesNoBookCount());
    };
    const handleGetPaymentStatus = async (_status: boolean) => {
        try {
            const res_status = await paymentGatewayApi.getStatus({
                paymentId: transaction_uuid,
                status: _status,
            });
            const status = res_status.data.context.status;
            switch (status) {
                case "PAID":
                    if (action) {
                        if (PLAT_FORM === 'MOMO') {
                            handleSaveApp()
                        } else {
                            handlePostApp()
                        }
                    } else {
                        handleAfterOrder();
                    }
                    dispatch(onClearOrder());
                    setOrderStatus(status);
                    timerRender[0] = -1;
                    break;
                case "PENDING":
                    setOrderStatus(status);
                    setLoading(false)
                    break;
                case "CANCELED_BY_USER":
                    setOrderStatus(status);
                    timerRender[0] = -1;
                    dispatch(onClearOrder());
                    setLoading(false)
                    break;
                case "CANCELED":
                    setOrderStatus(status);
                    timerRender[0] = -1;
                    dispatch(onClearOrder());
                    setLoading(false)
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            handleCancelPayment()
        }
    };
    const setInter = () => {
        timerRender[0] = 200;
        intervalRef.current = setInterval(() => {
            if (timerRender[0] > 0) {
                timerRender[0] -= 1;
                handleGetPaymentStatus(false);
            } else {
                return clearInterval(intervalRef.current);
            }
        }, 1000);
    };
    useEffect(() => {
        if (transaction_uuid) {
            setInter();
            if (listPayment) {
                tracking.CONFIRM_SCREEN_LOAD(listPayment[0].org_id, formatProductList(listPayment), res.amount)
            }
        }
    }, []);
    const handleCancelPayment = () => {
        handleGetPaymentStatus(true);
        timerRender[0] = -1;
    };
    const handleCancelOrder = () => {
        setOpen({
            content: 'Bạn có muốn hủy thanh toán đơn hàng không ?',
            open: true,
            children: <>
                <XButton
                    title="Hủy đơn hàng"
                    onClick={()=>{
                        handleCancelPayment();
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
    useEffect(() => {
        if (sec === 0) {
            handleCancelPayment();
        }
    }, [sec]);
    //cancel payment TIKI
    const onGoBackCart = () => {
        const payment_url = location?.pathname;
        history.push({
            pathname: "/gio-hang",
            state: { payment_url },
        });
    };
    const response = useGetMessageTiki();
    useMemo(() => {
        if (response?.requestId && response?.result.status === "fail") {
            setLoading(false)
            handleCancelPayment();
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
    }, [response]);
    const dataCartInfo = { res, orderStatus, sec, services };
    return (
        <>
            {loading && <ModalLoad />}
            <HeadTitle
                title={
                    orderStatus === "PAID"
                        ? "Thanh toán thành công"
                        : "Thanh toán đơn hàng"
                }
            />
            <HeadMobile
                handleCancelPayment={handleCancelPayment}
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
                            listPayment={listPayment}
                            data={dataCartInfo}
                            handleCancelOrder={handleCancelOrder}
                            setLoading={setLoading}
                        />
                    </div>
                </div>
            </Container>
            {/* <PaymentConfirm
                open={openConf}
                setOpen={setOpenConf}
                handleCancelPayment={handleCancelPayment}
            /> */}
            <PopupNotification
                title="Thông báo"
                content={open.content}
                open={open.open}
                children={open.children}
            />
        </>
    );
}

export default CartPaymentStatus;
