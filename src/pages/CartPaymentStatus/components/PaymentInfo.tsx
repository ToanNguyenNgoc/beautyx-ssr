import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { EXTRA_PAYMENT } from 'rootComponents/extraPayment';
import { EXTRA_FLAT_FORM } from 'api/extraFlatForm';
import doPostMakePaymentMessageTiki from 'rootComponents/tiki/doPostMessageTiki';
import { FLAT_FORM_TYPE } from 'rootComponents/flatForm';
import doPostMakePaymentMessageMB from 'rootComponents/mb/doPostMessageMBbank';
import UserPaymentInfo from 'pages/Account/components/UserPaymentInfo';
import { onErrorImg } from 'utils';
import formatPrice from 'utils/formatPrice';
import '../cart-status.css'

function PaymentInfo(props: any) {
    const history = useHistory();
    const { data, handleCancelOrder, action, listPayment, setLoading } = props;
    const { organization } = data.res;
    const { cartList } = useSelector((state: any) => state.carts);
    const orderItems = listPayment ? listPayment : cartList.filter(
        (item: any) =>
            (item.isConfirm === true && item.org_id === organization?.id)
    );
    const EX_PAYMENT = EXTRA_PAYMENT(data.res);
    const FLAT_FORM = EXTRA_FLAT_FORM();
    const deepLink = EX_PAYMENT?.deepLink;
    const EXTRA_PAYMENT_ID = EX_PAYMENT?.EXTRA_PAYMENT_ID;
    const openPaymentPlatformTiki = () => {
        doPostMakePaymentMessageTiki({
            TYPE: "ORDER",
            params: EXTRA_PAYMENT_ID
        })
        setLoading(true)
    }
    const openDeepLinkPayment = () => {
        if (FLAT_FORM) {
            switch (FLAT_FORM) {
                case FLAT_FORM_TYPE.MOMO:
                    return window.location.assign(EX_PAYMENT?.deepLink);
                case FLAT_FORM_TYPE.TIKI:
                    return openPaymentPlatformTiki()
                case FLAT_FORM_TYPE.MB:
                    // return
                    return doPostMakePaymentMessageMB(EX_PAYMENT?.EXTRA_PAYMENT_DATA)
                default:
                    const newWindow = window.open(`${deepLink}`, '_blank', 'noopener,noreferrer');
                    if (newWindow) newWindow.opener = null
                    break
            }
        }
    }
    //func appointment
    const gotoAppointment = () => {
        history.push('/lich-hen?tab=1')
    }
    const gotoServiceUser = () => {
        history.push('/lich-hen?tab=2')
    }
    const goBackHome = () => {
        history.push('/homepage')
    }
    // const response =FLAT_FORM_TYPE.MB?useGetMessage():{'flatForm': FLAT_FORM};

    // useMemo(() => {
    // alert(JSON.stringify(response))
    // }, [response])
    const onCheckStatus = () => {
        switch (data.orderStatus) {
            case "PENDING":
                return <div className='flex-column pm-pending-cnt'>
                    <button
                        className="st-pm-info__bt"
                        onClick={handleCancelOrder}
                    >
                        Hủy thanh toán
                    </button>
                </div>
            case "PAID":
                return <div className="st-time__success">
                    <span className='st-time__success-title'>
                        {action ? 'Thanh toán và đặt hẹn thành công' : 'Thanh toán thành công'}
                    </span>
                    {
                        action ?
                            <div className="flex-row-sp control">
                                <button
                                    onClick={gotoAppointment}
                                >
                                    Xem lịch hẹn
                                </button>
                                <button
                                    onClick={goBackHome}
                                >
                                    Về trang chủ
                                </button>
                            </div>
                            :
                            <div className="flex-row-sp control">
                                {
                                    (data.services.length > 0 && !listPayment) &&
                                    <button
                                        onClick={gotoServiceUser}
                                    >
                                        Đặt hẹn ngay
                                    </button>
                                }
                                <button
                                    onClick={goBackHome}
                                >
                                    Về trang chủ
                                </button>
                            </div>
                    }
                </div>
            case "CANCELED":
                return <div className='flex-column st-cancel__cnt' >
                    <span>Đã hủy thanh toán</span>
                    <button
                        onClick={goBackHome}
                        className='st-pm-info__btn'
                    >
                        Về trang chủ
                    </button>
                </div>
            case "CANCELED_BY_USER":
                return <div className='flex-column st-cancel__cnt' >
                    <span>Đã hủy thanh toán</span>
                    <button
                        onClick={goBackHome}
                        className='st-pm-info__btn'
                    >
                        Về trang chủ
                    </button>
                </div>
            default:
                break
        }
    }
    return (
        <>
            <div className={"pm-status-user"}>
                <UserPaymentInfo disableEdit={true} />
                <div className="pm-status-user__detail">
                    <div className="flex-row org">
                        <img src={organization?.image_url} onError={(e) => onErrorImg(e)} alt="" />
                        <span>{organization?.name}</span>
                    </div>
                    <div className="pm-status-user__list">
                        <ul>
                            {
                                orderItems.map((item: any, index: number) => (
                                    <li
                                        className='pm-order-item'
                                        key={index}
                                    >
                                        <img className='pm-order-item__img' src={item.cart_item.image_url ?? ""} onError={(e) => onErrorImg(e)} alt="" />
                                        <div className="pm-order-item__de">
                                            <span className="pm-order-item__name">
                                                {item.name}
                                            </span>
                                            <div className="flex-row-sp pm-order-item__price">
                                                <div className="flex-row price">
                                                    {
                                                        item.discount ?
                                                            <>
                                                                <span>
                                                                    {
                                                                        item.quantity === 1
                                                                            ?
                                                                            formatPrice(item.price_discount)
                                                                            :
                                                                            (
                                                                                item.discount.discount_type === "FINAL_PRICE"
                                                                                    ?
                                                                                    formatPrice(item.price_discount * item.quantity)
                                                                                    :
                                                                                    formatPrice((item.price * (item.quantity - 1)) + item.price_discount)
                                                                            )
                                                                    }đ
                                                                </span>
                                                                <span style={{ textDecoration: "line-through", marginLeft: "5px", fontSize: "smaller" }}>{formatPrice(item.price * item.quantity)}đ</span>
                                                            </>
                                                            :
                                                            <span>{" "}{formatPrice(item.price)}</span>
                                                    }
                                                </div>
                                                <span className="quantity">x{item.quantity}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="guide_line">
                        <span>Bạn cần đặt hẹn sau khi thanh toán thành công nhé! Cửa hàng sẽ liên hệ với bạn sớm nhất có thể</span>
                    </div>
                    {
                        data.orderStatus === "PENDING" &&
                        <div className="pm-status-user__total">
                            <div className="flex-row-sp total">
                                <div className="total__left">
                                    <span style={{ color: "var(--text-hover)" }} >Tổng tiền</span>
                                    <span style={{ color: "var(--text-hover)" }} >Giảm giá</span>
                                </div>
                                <div className="total__right">
                                    <span>{formatPrice(data.res.amount)}đ</span>
                                    <span>-{formatPrice(data.res.discount_value)}</span>
                                </div>
                            </div>
                            <div className="flex-row-sp payment">
                                <span className="payment-title">Tổng thanh toán</span>
                                <div className="flex-row right">
                                    <span style={{ color: "var(--orange)" }} className="right-amount-total">
                                        {formatPrice(data.res.payment_gateway.amount)}
                                    </span>
                                    <button
                                        onClick={openDeepLinkPayment}
                                        className="pm-status-user__total-btn"
                                    >
                                        Thanh toán
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {onCheckStatus()}
        </>
    );
}

export default PaymentInfo;