import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { EXTRA_PAYMENT } from 'rootComponents/extraPayment';
import { EXTRA_FLAT_FORM } from 'api/extraFlatForm';
import doPostMakePaymentMessageTiki from 'rootComponents/tiki/doPostMessageTiki';
import { FLAT_FORM_TYPE } from 'rootComponents/flatForm';
import doPostMakePaymentMessageMB from 'rootComponents/mb/doPostMessageMBbank';
import UserPaymentInfo from 'pages/Account/components/UserPaymentInfo';
import { onErrorImg } from 'utils';
import formatPrice from 'utils/formatPrice';
import style from '../payment.module.css'
import img from 'constants/img';
import { useDeviceMobile } from 'hooks';
import { ICart } from 'interface';
import { XButton } from 'components/Layout';

function PaymentInfo(props: any) {
  const history = useHistory()
  const IS_MB = useDeviceMobile()
  const { data, handleCancelOrder, action, orderItems } = props;
  const organization = data.res?.organization;
  const [items,] = useState(orderItems)
  const [servicesOrder,] = useState(items?.filter((i: ICart) => i.is_type === 'SERVICE'))
  const EX_PAYMENT = EXTRA_PAYMENT(data.res);
  const FLAT_FORM = EXTRA_FLAT_FORM();
  const deepLink = EX_PAYMENT?.deepLink;
  const EXTRA_PAYMENT_ID = EX_PAYMENT?.EXTRA_PAYMENT_ID;
  const openPaymentPlatformTiki = () => {
    doPostMakePaymentMessageTiki({
      TYPE: "ORDER",
      params: EXTRA_PAYMENT_ID
    })
  }
  const openDeepLinkPayment = () => {
    if (FLAT_FORM) {
      switch (FLAT_FORM) {
        case FLAT_FORM_TYPE.MOMO:
          return window.location.assign(EX_PAYMENT?.deepLink);
        case FLAT_FORM_TYPE.TIKI:
          return openPaymentPlatformTiki()
        case FLAT_FORM_TYPE.MB:
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
  const onCheckStatus = () => {
    switch (data.orderStatus) {
      case "PENDING":
        return <>
          <XButton
            onClick={handleCancelOrder}
            title='Hủy thanh toán'
            className={style.section_status_btn}
            style={{ backgroundColor: 'var(--pink-momo)' }}
          />
        </>
      case "PAID":
        return <>
          <p style={{ color: "var(--green)" }} className={style.section_status_title}>
            {action ? 'Thanh toán và đặt hẹn thành công' : 'Thanh toán thành công'}
          </p>
          {
            action ?
              <div className={style.section_status_btn_cnt}>
                <XButton
                  style={{ width: 'calc(50% - 6px)' }}
                  className={style.section_status_btn}
                  title='Xem lịch hẹn'
                  onClick={gotoAppointment}
                />
                <XButton
                  style={{ width: 'calc(50% - 6px)' }}
                  className={style.section_status_btn}
                  title='Về trang chủ'
                  onClick={goBackHome}
                />
              </div>
              :
              servicesOrder?.length > 0 ?
                <div className={style.section_status_btn_cnt}>
                  <XButton
                    style={{ width: 'calc(50% - 6px)' }}
                    className={style.section_status_btn}
                    title='Đặt hẹn ngay'
                    onClick={gotoServiceUser}
                  />
                  <XButton
                    style={{ width: 'calc(50% - 6px)' }}
                    className={style.section_status_btn}
                    title='Về trang chủ'
                    onClick={goBackHome}
                  />
                </div>
                :
                <XButton
                  onClick={goBackHome}
                  title='Về trang chủ'
                  className={style.section_status_btn}
                />
          }
        </>
      case "CANCELED":
        return <>
          <p className={style.section_status_title}>
            Đã hủy thanh toán
          </p>
          <XButton
            onClick={goBackHome}
            title='Về trang chủ'
            className={style.section_status_btn}
          />
        </>
      case "CANCELED_BY_USER":
        return <>
          <p className={style.section_status_title}>
            Đã hủy thanh toán
          </p>
          <XButton
            onClick={goBackHome}
            title='Về trang chủ'
            className={style.section_status_btn}
          />
        </>
      default:
        break
    }
  }
  console.log(action)
  return (
    <>
      <UserPaymentInfo disableEdit disableAddress />
      <div className={style.section_org}>
        <div className={style.org_img}>
          <img src={organization?.image_url ?? img.imgDefault} onError={(e) => onErrorImg(e)} alt="" />
        </div>
        <div className={style.org_right}>
          <p className={style.org_name}>{organization?.name}</p>
          <p className={style.org_address}>{organization?.full_address}</p>
        </div>
      </div>
      <ul className={style.order_list}>
        {
          items.map((item: ICart, index: number) => (
            <li key={index} className={style.order_list_item}>
              <div className={style.order_item}>
                <div className={style.org_img}>
                  <img
                    src={item.cart_item?.image_url ?? organization?.image_url ?? img.imgDefault}
                    onError={(e) => onErrorImg(e)}
                    alt=""
                  />
                </div>
                <div className={style.org_right}>
                  <p className={style.org_name}>{item.name}</p>
                  <div className={style.order_item_price}>
                    <div className={style.price}>
                      {
                        (item.discount && item.price_discount) ?
                          <>
                            <span style={{ color: "var(--text-orange)" }} >
                              {
                                item.quantity === 1 ? formatPrice(item.price_discount) :
                                  (
                                    item.discount.discount_type === "FINAL_PRICE"
                                      ?
                                      formatPrice(item.price_discount * item.quantity)
                                      :
                                      formatPrice((item.price * (item.quantity - 1)) + item.price_discount)
                                  )
                              }đ
                            </span>
                            <span>{formatPrice(item.price * item.quantity)}đ</span>
                          </>
                          :
                          <span>{" "}{formatPrice(item.price)}</span>
                      }
                    </div>
                    <div className={style.quantity}>
                      x{item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
      {
        !action &&
        <div className={style.section_guide}>
        <span>Bạn cần đặt hẹn sau khi thanh toán thành công nhé! Cửa hàng sẽ liên hệ với bạn sớm nhất có thể</span>
      </div>
      }
      <div className={style.section_bottom}>
        <div className={style.bottom_bill}>
          <div className={style.bottom_bill_row}>
            <span className={style.row_label}>Tổng tiền</span>
            <span className={style.row_value}>{formatPrice(data.res?.amount)}đ</span>
          </div>
          {data.res?.discount_value > 0 &&
            <div className={style.bottom_bill_row}>
              <span className={style.row_label}>Giảm giá</span>
              <span className={style.row_value}>-{formatPrice(data.res?.discount_value)}đ</span>
            </div>
          }
        </div>
        <div className={style.bottom_pay}>
          <div className={style.bottom_pay_left}>
            <span className={style.bottom_pay_left_label}>Tổng thanh toán</span>
            <span className={style.bottom_pay_left_value}>
              {formatPrice(data.res?.payment_gateway?.amount)}
            </span>
          </div>
          {
            IS_MB && data.orderStatus === 'PENDING' &&
            <div className={style.bottom_pay_right}>
              <XButton
                title='Thanh toán'
                onClick={openDeepLinkPayment}
                className={style.bottom_pay_right_btn}
              />
            </div>
          }
        </div>
      </div>
      {
        data.orderStatus !== 'PENDING' &&
        <div className={style.section_status_modal}>
          <div className={style.section_status}>
            {onCheckStatus()}
          </div>
        </div>
      }
    </>
  );
}

export default PaymentInfo;