import { Dialog } from '@mui/material';
import { XButton } from 'components/Layout';
import icon from 'constants/icon';
import { AppContext } from 'context/AppProvider';
import dayjs from 'dayjs';
import PopupQr from 'features/AppointmentDetail/PopupQr';
import HeadMobile from 'features/HeadMobile';
import { useDeviceMobile, useTransformOrderStatus } from 'hooks';
import { IOrderV2, ITems } from 'interface';
import IStore from 'interface/IStore';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import formatPrice from 'utils/formatPrice';
import { formatRouterLinkOrg } from 'utils/formatRouterLink/formatRouter';
import { Item } from '../Orders/components/OrderItem';
import style from './order-detail.module.css'
import OrderDetailBottom from './OrderDetailBottom';

interface OrderDetailProp {
    open: boolean,
    setOpen: (open: boolean) => void,
    order: IOrderV2
}

function OrderDetail(props: OrderDetailProp) {
    const { t } = useContext(AppContext)
    const { open, setOpen, order } = props
    const { USER } = useSelector((state: IStore) => state.USER)
    const [openQr, setOpenQr] = useState(false)
    const { statusTransform } = useTransformOrderStatus(order.status)
    const IS_MB = useDeviceMobile()
    const checkBlockItem = (item: ITems) => {
        let isBlock = false
        if (item.discount && item.discount?.discount_type === 'FINAL_PRICE') {
            return isBlock = false
        }
        if (!order.organization?.is_momo_ecommerce_enable) return isBlock = true
        if (!item?.productable?.is_momo_ecommerce_enable) return isBlock = true
        return isBlock
    }
    return (
        <Dialog fullScreen={IS_MB} open={open} onClose={() => setOpen(false)} >
            {IS_MB &&
                <HeadMobile
                    onBack={() => setOpen(false)}
                    title='Thông tin đơn hàng'
                    element={order.status === 'PAID' ?
                        <XButton
                            icon={icon.scanQrBtnOrange}
                            iconSize={22}
                            className={style.scan_btn}
                            onClick={() => setOpenQr(true)}
                        /> : <></>}
                />
            }
            <PopupQr open={openQr} setOpen={setOpenQr} qr={order.qr_link} />
            <div className={style.container}>
                <div className={style.body}>
                    <div style={{ backgroundColor: statusTransform?.color }} className={style.panel}>
                        <img src={icon.paperWhite} className={style.panel_icon} alt="" />
                        <div className={style.panel_content}>
                            <p className={style.panel_content_title}>Đơn hàng</p>
                            <p className={style.panel_content_status}>{statusTransform?.title}</p>
                        </div>
                    </div>
                    <div className={style.order_user}>
                        <div className={style.order_user_head}>
                            <img src={icon.User_1} alt="" />
                            <span>Thông tin mua hàng</span>
                        </div>
                        <div className={style.order_user_body}>
                            <p className={style.order_user_body_row}>{USER?.fullname}</p>
                            <p className={style.order_user_body_row}>{USER?.telephone}</p>
                            <p className={style.order_user_body_row}>{USER?.email}</p>
                        </div>
                    </div>
                    <div className={style.order_item_cnt}>
                        <div className={style.order_item_cnt_head}>
                            {
                                order.organization &&
                                <Link
                                    className={style.org_name}
                                    to={{ pathname: formatRouterLinkOrg(order.organization?.subdomain) }}
                                >
                                    {order.organization?.name}
                                    <img src={icon.chevronRight} alt="" />
                                </Link>
                            }
                            <span style={{ color: statusTransform?.color }} className={style.order_status}>
                                {statusTransform?.title}
                            </span>
                        </div>
                        <ul className={style.list}>
                            {
                                order.items?.map((item, index: number) => (
                                    <li key={index} className={style.list_item}>
                                        <Item item={item} org={order.organization} />
                                        {
                                            checkBlockItem(item) &&
                                            <div className={style.list_item_block}>
                                                Dịch vụ/sản phẩm này không còn được bán
                                            </div>
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                        <div className={style.amount}>
                            <span className={style.amount_title}>{t('pr.total')}:</span>
                            <div className={style.amount_number}>
                                {order?.amount !== order?.payment_gateway?.amount ?
                                    <>
                                        <span style={{ color: "var(--orange)" }}>
                                            {formatPrice(order?.payment_gateway?.amount)}đ
                                        </span>
                                        <span>
                                            {formatPrice(order?.amount)}đ
                                        </span>
                                    </>
                                    :
                                    <span>
                                        {formatPrice(order?.payment_gateway?.amount)}đ
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={style.order_created}>
                        {
                            (order.payment_gateway?.transaction_uuid && order.origin_id) &&
                            <div className={style.order_created_row}>
                            <span className={style.order_created_row_label}>
                                Mã
                            </span>
                            <span className={style.order_created_row_value}>
                                {order.payment_gateway?.transaction_uuid}-{order.origin_id}
                            </span>
                        </div>
                        }
                        <div className={style.order_created_row}>
                            <span className={style.order_created_row_label}>
                                Thời gian đặt
                            </span>
                            <span className={style.order_created_row_value}>
                                {dayjs(order.created_at).format('DD/MM/YYYY')}{"  "}
                                {dayjs(order.created_at).format('HH:mm:ss')}
                            </span>
                        </div>
                        {
                            order.status === 'PAID' &&
                            <div className={style.order_created_row}>
                                <span className={style.order_created_row_label}>
                                    Thời gian thanh toán
                                </span>
                                <span className={style.order_created_row_value}>
                                    {dayjs(order.payment_gateway?.updated_at).format('DD/MM/YYYY')}{"  "}
                                    {dayjs(order.payment_gateway?.updated_at).format('HH:mm:ss')}
                                </span>
                            </div>
                        }
                    </div>
                </div>
                <OrderDetailBottom order={order} />
            </div>
        </Dialog>
    );
}

export default OrderDetail;