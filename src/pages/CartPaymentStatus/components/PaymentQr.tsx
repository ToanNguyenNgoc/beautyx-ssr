import React from 'react';
import img from '../../../constants/img';
import { EXTRA_PAYMENT } from '../../../rootComponents/extraPayment';

function PaymentQr(props: any) {
    const { orderStatus, res, sec } = props;
    const EX_PAYMENT = EXTRA_PAYMENT(res);
    const pay_url = EX_PAYMENT?.qrCode;
    const checkStatus = () => {
        switch (orderStatus) {
            case "PENDING":
                return <div>
                    <div className="pay-view-mb">
                        <div className="flex-column pay-view-mb__cnt">
                            <img src={img.imgDefault} alt="" className="pay-view-mb__img" />
                            <div className="pay-view-mb__cnt-status-pending">
                                <span className="left">
                                    Trạng thái đơn hàng
                                </span>
                                <div className="right">
                                    <div className="right-status">
                                        Chờ thanh toán
                                    </div>
                                    <div className="right-time">
                                        <span>Đơn hàng sẽ hủy sau </span>
                                        <span style={{ fontWeight: "bold" }} >
                                            {`0${Math.floor(sec / 60)}`.slice(-2)}:
                                            {`0${sec - Math.floor(sec / 60) * 60}`.slice(-2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pay-view-pc' >
                        <iframe
                            className='pm-st-cnt__qr-cnt'
                            src={`${pay_url}`}
                            title="This is a unique title"
                        />
                    </div>
                </div>;
            case "PAID":
                return <div>
                    <div className="pay-view-mb pay-view-mb__other">
                        <div className="flex-column pay-view-mb__cnt">
                            <img src={img.imgDefault} alt="" className="pay-view-mb__img" />
                            <div className="pay-view-mb__cnt-status-pending">
                                <span className="left">
                                    Trạng thái đơn hàng
                                </span>
                                <div className="right">
                                    <div className="right-status">
                                        Thanh toán thành công
                                    </div>
                                    <div className="right-time">
                                        <span>Đơn hàng đã thanh toán thành công</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>;
            case "CANCELED_BY_USER":
                return <div>
                    <div className="pay-view-mb pay-view-mb__other">
                        <div className="flex-column pay-view-mb__cnt">
                            <img src={img.imgDefault} alt="" className="pay-view-mb__img" />
                            <div className="pay-view-mb__cnt-status-pending">
                                <span className="left">
                                    Trạng thái đơn hàng
                                </span>
                                <div className="right">
                                    <div style={{ backgroundColor: "var(--red-cl)" }} className="right-status">
                                        Đã hủy
                                    </div>
                                    <div className="right-time">
                                        <span>Đơn hàng đã bị hủy thanh toán </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>;
            case "CANCELED":
                return <div>
                    <div className="pay-view-mb pay-view-mb__other">
                        <div className="flex-column pay-view-mb__cnt">
                            <img src={img.imgDefault} alt="" className="pay-view-mb__img" />
                            <div className="pay-view-mb__cnt-status-pending">
                                <span className="left">
                                    Trạng thái đơn hàng
                                </span>
                                <div className="right">
                                    <div style={{ backgroundColor: "var(--red-cl)" }} className="right-status">
                                        Đã hủy
                                    </div>
                                    <div className="right-time">
                                        <span>Đơn hàng đã bị hủy thanh toán </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>;
            default:
                break;
        }
    }
    return (
        <div
            className='pm-st-cnt__qr'
        >
            {checkStatus()}
        </div>
    );
}

export default PaymentQr;