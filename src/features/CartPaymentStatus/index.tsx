/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import HeadTitle from '../HeadTitle';
import Head from '../Head';
import './cart-status.css';
import { Container } from '@mui/material';
import useCountDown from '../../utils/useCountDown';
import { useLocation } from 'react-router-dom';
import paymentGatewayApi from '../../api/paymentGatewayApi';
import { useSelector } from 'react-redux';
import PaymentQr from './components/PaymentQr';
import PaymentInfo from './components/PaymentInfo';
import PaymentConfirm from './components/PaymentConfirm';
import useGetMessageTiki from '../../rootComponents/tiki/useGetMessageTiki';
import apointmentApi from '../../api/apointmentApi';
import HeadMobile from '../HeadMobile';
import useFullScreen from '../../utils/useFullScreen';
import Notification from '../../components/Notification/index';
import { useHistory } from 'react-router-dom';

const timerRender = [0];
const ORDER_STATUS = ['PENDING', 'PAID', 'CANCELED_BY_USER']

function CartPaymentStatus() {
    const sec = useCountDown(600);
    const IS_MB = useFullScreen();
    const [orderStatus, setOrderStatus] = useState(ORDER_STATUS[0])
    const [openConf, setOpenConf] = useState(false);
    const history = useHistory();

    const [open, setOpen] = useState({
        title: "",
        open: false,
        titleLeft: "",
        titleRight: "",
        onClickLeft: () => { },
        onClickRight: () => { }
    })

    const carts = useSelector((state: any) => state.carts);
    const list = carts.cartList.filter((item: any) => item.isConfirm === true);
    const services = list.filter((item: any) => item.is_type === 2);
    const location: any = useLocation();
    const res: any = location?.state?.state_payment;
    const intervalRef = useRef<any>();
    const transaction_uuid = res?.payment_gateway?.transaction_uuid;
    const action = location?.state?.actionAfter
    const listPayment = location.state?.listPayment;

    const handlePostApp = async () => {
        const params = {
            order_id: action.order_id,
            service_ids: action.service_ids,
            branch_id: action.branch,
            time_start: action.time_start,
            note: action.note,
        }
        try {
            await apointmentApi.postAppointment(params, action.org_id);
        } catch (error) {
            console.log(error)
        }
    }
    const handleGetPaymentStatus = async (_status: boolean) => {
        try {
            const res_status = await paymentGatewayApi.getStatus({
                paymentId: transaction_uuid,
                status: _status
            })
            const status = res_status.data.context.status;
            switch (status) {
                case "PAID":
                    if (action) {
                        handlePostApp()
                    }
                    setOrderStatus(status)
                    timerRender[0] = -1;
                    break;
                case "PENDING":
                    setOrderStatus(status)
                    break;
                case "CANCELED_BY_USER":
                    setOrderStatus(status)
                    timerRender[0] = -1;
                    break;
                case "CANCELED":
                    setOrderStatus(status)
                    timerRender[0] = -1;
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error)
        }
    }
    const setInter = () => {
        timerRender[0] = 200;
        intervalRef.current = setInterval(() => {
            if (timerRender[0] > 0) {
                timerRender[0] -= 1;
                handleGetPaymentStatus(false);
            } else {
                return clearInterval(intervalRef.current);
            }
        }, 3000);
    };
    useEffect(() => {
        if (transaction_uuid) {
            setInter();
        }
    }, []);
    const handleCancelPayment = () => {
        handleGetPaymentStatus(true)
        timerRender[0] = -1
    }
    const handleCancelOrder = () => {
        setOpenConf(true)
    }
    useEffect(() => {
        if (sec === 0) {
            handleCancelPayment()
        }
    }, [sec])
    //cancel payment TIKI
    const onGoBackCart = () => {
        const payment_url = location?.pathname;
        history.push({
            pathname: "/gio-hang",
            state: { payment_url }
        })
    }
    const response = useGetMessageTiki();
    useMemo(() => {
        if (response?.requestId && response?.result.status === "fail") {
            handleCancelPayment()
            setOpen({
                ...open,
                title: "Thanh toán thất bại \n Bạn có muốn tiếp tục thanh toán không ?",
                open: true,
                titleLeft: "Về trang chủ",
                titleRight: "Tiếp tục",
                onClickLeft: () => history.push("/Home"),
                onClickRight: () => onGoBackCart()
            })
        }
    }, [response])
    const dataCartInfo = { res, orderStatus, sec, services }
    return (
        <>
            <HeadTitle
                title={orderStatus === "PAID" ? 'Thanh toán thành công' : 'Thanh toán đơn hàng'}
            />
            {
                IS_MB ?
                    <HeadMobile handleCancelPayment={handleCancelPayment} title='Thanh toán' />
                    : <Head
                        handleCancelPayment={handleCancelPayment}
                    />}
            <Container>
                <div
                    className='pm-st-cnt'
                >
                    <PaymentQr
                        res={res}
                        sec={sec}
                        orderStatus={orderStatus}
                    //pay_url={pay_url}
                    />
                    <div className="pm-st-cnt__body">
                        <PaymentInfo
                            action={action}
                            listPayment={listPayment}
                            data={dataCartInfo}
                            handleCancelOrder={handleCancelOrder}
                        />
                    </div>
                </div>
            </Container>
            <PaymentConfirm
                open={openConf}
                setOpen={setOpenConf}
                handleCancelPayment={handleCancelPayment}
            />
            <Notification
                open={open.open}
                content={open.title}
                titleBtnLeft={open.titleLeft}
                titleBtnRight={open.titleRight}
                onClickLeft={open.onClickLeft}
                onClickRight={open.onClickRight}
            />
        </>
    );
}

export default CartPaymentStatus;