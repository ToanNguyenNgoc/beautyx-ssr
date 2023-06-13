import React from 'react';
import img from 'constants/img';
import { EXTRA_PAYMENT } from 'rootComponents/extraPayment';
import style from '../payment.module.css'

function PaymentQr(props: any) {
    const {
        orderStatus,
        res,
        sec
    } = props;
    const EX_PAYMENT = EXTRA_PAYMENT(res);
    const pay_url = EX_PAYMENT?.qrCode;
    // const orderStatus = 'PENDING'
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    //         const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    //         const windowFeatures = `toolbar=yes,scrollbars=yes,resizable=yes,top=${(windowHeight - windowHeight * 0.95) / 2},left=${(windowWidth - 573) / 2},width=573,height=${windowHeight * 0.95}`;
    //         window.open(pay_url, "_blank", windowFeatures);
    //     }, 1000)
    //     return () => {
    //         clearTimeout(timer);
    //     };
    // }, [])
    const checkStatus = () => {
        switch (orderStatus) {
            case "PENDING":
                return <div className={style.payment_left_body} >
                    <span className={style.title}>
                        Thực hiện theo hướng dẫn sau để thanh toán
                    </span>
                    <ul className={style.payment_left_body_guide}>
                        <li className={style.guide_item}>
                            <h4>Bước 1:</h4>Mở ứng dụng <h4>MOMO</h4> để thanh toán
                        </li>
                        <li className={style.guide_item}>
                            <h4>Bước 2:</h4>Chọn<h4>"Thanh toán"</h4> và quét mã QR tại đây
                        </li>
                        <li className={style.guide_item}>
                            <h4>Bước 3:</h4>Hoàn thành các bước thanh toán và đợi<h4>BeautyX</h4> xử lý trong giây lát
                        </li>
                    </ul>
                    <div className={style.payment_left_body_status}>
                        <div className={style.payment_status_icon}>
                            <img src={img.imgDefault} alt="" />
                        </div>
                        <div className={style.payment_status_decs}>
                            <div className={style.payment_status_decs_top}>
                                <span className={style.payment_status_decs_top_title}>
                                    Trạng thái thanh toán:
                                </span>
                                <span style={{ backgroundColor: "#F5D91D" }} className={style.payment_status_decs_top_box}>
                                    Chờ thanh toán
                                </span>
                            </div>
                            <div className={style.payment_status_decs_bot}>
                                <span>Đơn hàng sẽ bị hủy sau</span>
                                <h3>
                                    {`0${Math.floor(sec / 60)}`.slice(-2)}:
                                    {`0${sec - Math.floor(sec / 60) * 60}`.slice(-2)}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className={style.payment_left_qr_cnt}>
                        <iframe
                            className={style.payment_left_qr}
                            src={`${pay_url}`}
                            title="This is a unique title"
                        />
                    </div>
                </div>;
            case "PAID":
                return (
                    <div className={style.payment_left_body} >
                        <span className={style.title}>
                            Thông tin
                        </span>
                        <div className={style.payment_left_body_status}>
                            <div className={style.payment_status_icon}>
                                <img src={img.imgDefault} alt="" />
                            </div>
                            <div className={style.payment_status_decs}>
                                <div className={style.payment_status_decs_top}>
                                    <span className={style.payment_status_decs_top_title}>
                                        Trạng thái thanh toán:
                                    </span>
                                    <span
                                        style={{ backgroundColor: "var(--green)" }}
                                        className={style.payment_status_decs_top_box}
                                    >
                                        Thanh toán thành công
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "CANCELED_BY_USER":
                return (
                    <div className={style.payment_left_body} >
                        <span className={style.title}>
                            Thông tin
                        </span>
                        <div className={style.payment_left_body_status}>
                            <div className={style.payment_status_icon}>
                                <img src={img.imgDefault} alt="" />
                            </div>
                            <div className={style.payment_status_decs}>
                                <div className={style.payment_status_decs_top}>
                                    <span className={style.payment_status_decs_top_title}>
                                        Trạng thái thanh toán:
                                    </span>
                                    <span
                                        style={{ backgroundColor: "var(--red_2)" }}
                                        className={style.payment_status_decs_top_box}
                                    >
                                        Đơn hàng đã bị hủy
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "CANCELED":
                return (
                    <div className={style.payment_left_body} >
                        <span className={style.title}>
                            Thông tin
                        </span>
                        <div className={style.payment_left_body_status}>
                            <div className={style.payment_status_icon}>
                                <img src={img.imgDefault} alt="" />
                            </div>
                            <div className={style.payment_status_decs}>
                                <div className={style.payment_status_decs_top}>
                                    <span className={style.payment_status_decs_top_title}>
                                        Trạng thái thanh toán:
                                    </span>
                                    <span
                                        style={{ backgroundColor: "var(--red_2)" }}
                                        className={style.payment_status_decs_top_box}
                                    >
                                        Đơn hàng đã bị hủy
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                break;
        }
    }
    return (
        <div
            className={style.container_qr}
        >
            {checkStatus()}
        </div>
    );
}

export default PaymentQr;