/* eslint-disable react-hooks/exhaustive-deps */
import API_ROUTE from 'api/_api';
import { XButton } from 'components/Layout';
import img from 'constants/img';
import HeadMobile from 'features/HeadMobile';
import IStore from 'interface/IStore';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useNoti, useSwr } from 'hooks';
import formatPrice from 'utils/formatPrice';
import style from './style.module.css'
import apointmentApi from 'api/apointmentApi';
import { pick } from 'lodash';
import { ResponsePmStatus, IOrderV2 } from 'interface';
import { orderApi } from 'api/orderApi';
import { PopupBtxReward } from 'components/Notification';

function PaymentStatus() {
    const history = useHistory()
    const { firstLoad, resultLoad, noti } = useNoti()
    const params: any = useParams()
    const tran_uid = params.tran_uid
    const { USER } = useSelector((state: IStore) => state.USER)
    // const { response } = useSwr(API_ROUTE.PAYMENT_GATEWAYS(tran_uid), (tran_uid && USER))
    const {response} = useSwr({
        API_URL:API_ROUTE.PAYMENT_GATEWAYS(tran_uid),
        enable: tran_uid && USER
    })
    //handle post appointment after payment success
    const data = localStorage.getItem('APP_INFO') && JSON.parse(`${localStorage.getItem('APP_INFO')}`)
    const handlePostApp = useCallback(async () => {
        const params = pick(data, 'note', 'order_id', 'service_ids', 'time_start')
        firstLoad()
        try {
            await apointmentApi.postAppointment(params, data.org_id)
            resultLoad('Thanh toán và đặt hẹn thành công')
        } catch (error) {
            resultLoad('Có lỗi xảy ra trong quá trình đặt hẹn')
        }
    }, [])
    useEffect(() => {
        if (data) {
            handlePostApp()
        }
    }, [])
    const onClearAppointment = () => localStorage.removeItem('APP_INFO')
    const onNavigateBooking = () => {
        onClearAppointment()
        if (data) {
            history.push('/lich-hen?tab=1')
        } else {
            history.push('/lich-hen?tab=2')
        }
    }
    return (
        <>
            <HeadMobile onBackFunc={() => history.push('/')} title='Trạng thái' />
            <div className={style.container}>
                <div className={style.head}>
                    <img src={img.imgDefault} alt="" />
                    <div className={style.head_status}>
                        <span className={style.head_status_left}>
                            {/* Trạng thái thanh toán */}
                        </span>
                        <div className={style.head_status_right}>
                            {data ? noti.message : 'Thanh toán thành công'}
                        </div>
                    </div>
                </div>
                {
                    USER &&
                    <div className={style.user_info}>
                        <span className={style.user_info_title}>
                            Thông tin thanh toán
                        </span>
                        <div className={style.user_info_row}>
                            <span className={style.user_info_row_left}>Người mua</span>
                            <span className={style.user_info_row_right}>{USER?.fullname}</span>
                        </div>
                        <div className={style.user_info_row}>
                            <span className={style.user_info_row_left}>Số điện thoại</span>
                            <span className={style.user_info_row_right}>{USER?.telephone}</span>
                        </div>
                        <div className={style.user_info_row}>
                            <span className={style.user_info_row_left}>Mô tả</span>
                            <span className={style.user_info_row_right}>
                                {response?.description ?? ''}
                            </span>
                        </div>
                    </div>
                }
                {
                    response &&
                    <div className={style.bill}>
                        <span className={style.bill_title}>Tổng thanh toán</span>
                        <p className={style.bill_title_amount}>
                            {formatPrice(response?.amount_paid)}đ
                        </p>
                    </div>
                }
                {
                    !data &&
                    <div className={style.navigate_cnt}>
                        <div className={style.navigate_cnt_body}>
                            Xem các dịch vụ đã mua và đặt hẹn
                        </div>
                    </div>
                }
                <div className={style.bottom}>
                    <XButton
                        onClick={() => {
                            history.push('/');
                            onClearAppointment()
                        }}
                        className={style.bottom_bnt}
                        title='Trang chủ'
                    />
                    <XButton
                        onClick={onNavigateBooking}
                        className={style.bottom_bnt}
                        title={data ? 'Lịch hẹn' : 'Đặt hẹn'}
                    />
                </div>
            </div>
            {response?.paymentable_id && <NotificationBTX response={response} />}
        </>
    );
}

export default PaymentStatus;

const NotificationBTX = ({ response }: { response: ResponsePmStatus }) => {
    const [openBtx, setOpenBtx] = useState({ open: false, btx: 0 })
    const getOrderDetail = async () => {
        const res = await orderApi.getOrderById(response?.paymentable_id)
        const order: IOrderV2 = await res?.data?.context
        if (order?.btx_reward?.reward_points) {
            setOpenBtx({ open: true, btx: order?.btx_reward?.reward_points })
        }
    }
    useEffect(() => {
        getOrderDetail()
    }, [])
    return (
        <PopupBtxReward
            open={openBtx.open}
            onClose={() => setOpenBtx({ open: false, btx: 0 })}
            btxPoint={openBtx.btx}
        />
    )
}