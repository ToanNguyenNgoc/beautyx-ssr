/* eslint-disable react-hooks/exhaustive-deps */
import API_ROUTE from 'api/_api';
import { XButton } from 'components/Layout';
import img from 'constants/img';
import HeadMobile from 'features/HeadMobile';
import IStore from 'interface/IStore';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useNoti, useSwr } from 'hooks';
import formatPrice from 'utils/formatPrice';
import style from './style.module.css'
import apointmentApi from 'api/apointmentApi';
import { pick } from 'lodash';
import { PopupMessage } from 'components/Notification';
import icon from 'constants/icon';

function PaymentStatus() {
    const history = useHistory()
    const { firstLoad, resultLoad, noti, onCloseNoti } = useNoti()
    const params: any = useParams()
    const tran_uid = params.tran_uid
    const { USER } = useSelector((state: IStore) => state.USER)
    const { response } = useSwr(API_ROUTE.PAYMENT_GATEWAYS(tran_uid), (tran_uid && USER))
    //handle post appointment after payment success
    const data = localStorage.getItem('APP_INFO') && JSON.parse(`${localStorage.getItem('APP_INFO')}`)
    const handlePostApp = async () => {
        const params = pick(data, 'note', 'order_id', 'service_ids', 'time_start')
        firstLoad()
        try {
            await apointmentApi.postAppointment(params, data.org_id)
            resultLoad('Thanh toán và đặt hẹn thành công')
        } catch (error) {
            resultLoad('Có lỗi xảy ra trong quá trình đặt hẹn')
        }
    }
    useEffect(() => {
        if (data) {
            handlePostApp()
        }
    }, [])
    const onClearAppointment = () => localStorage.removeItem('APP_INFO')
    return (
        <>
            <HeadMobile onBackFunc={() => history.push('/')} title='Trạng thái' />
            <PopupMessage
                content={noti.message}
                open={noti.openAlert}
                onClose={onCloseNoti}
                iconLabel={icon.calendarGreen}
                iconSize={40}
                child={
                    <XButton
                        className={style.navigate_app_btn}
                        title='Xem lịch hẹn'
                        onClick={() => {
                            history.push('/lich-hen?tab=1');
                            onClearAppointment()
                        }}
                    />
                }
            />
            <div className={style.container}>
                <div className={style.head}>
                    <img src={img.imgDefault} alt="" />
                    <div className={style.head_status}>
                        <span className={style.head_status_left}>
                            Trạng thái thanh toán
                        </span>
                        <div className={style.head_status_right}>
                            Thanh toán thành công
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
                            <span
                                onClick={() => {
                                    history.push('/lich-hen?tab=2');
                                    onClearAppointment()
                                }}
                                className={style.navigate_cnt_btn}
                            >Tại đây</span>
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
                        title='Trở về trang chủ'
                    />
                </div>
            </div>
        </>
    );
}

export default PaymentStatus;