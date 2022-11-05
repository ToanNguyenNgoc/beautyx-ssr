import API_ROUTE from 'api/_api';
import { XButton } from 'components/Layout';
import img from 'constants/img';
import HeadMobile from 'features/HeadMobile';
import IStore from 'interface/IStore';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useSwr } from 'utils';
import formatPrice from 'utils/formatPrice';
import style from './style.module.css'

function PaymentStatus() {
    const history = useHistory()
    const params: any = useParams()
    const tran_uid = params.tran_uid
    const { USER } = useSelector((state: IStore) => state.USER)
    const { response } = useSwr(API_ROUTE.PAYMENT_GATEWAYS(tran_uid), (tran_uid && USER))
    console.log(response)
    return (
        <>
            <HeadMobile onBackFunc={() => history.push('/')} title='Trạng thái' />
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
                <div className={style.bottom}>
                    <XButton
                        onClick={() => history.push('/')}
                        className={style.bottom_bnt}
                        title='Trở về trang chủ'
                    />
                </div>
            </div>
        </>
    );
}

export default PaymentStatus;