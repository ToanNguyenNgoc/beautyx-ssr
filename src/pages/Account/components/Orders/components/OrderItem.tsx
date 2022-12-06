import React, { useState } from "react";
import { IOrderV2 } from "interface";
import icon from "constants/icon";
import { onErrorImg } from "utils";
import formatPrice from "utils/formatPrice";
import PopupQr from "features/AppointmentDetail/PopupQr";
import OrderDetail from "features/OrderDetail";
import style from '../order.module.css'
import dayjs from "dayjs";
import { XButton } from "components/Layout";
import { useDeviceMobile } from "hooks";

interface IProp {
    order: IOrderV2;
}

function OrderItem(props: IProp) {
    const IS_MB = useDeviceMobile()
    const [openQr, setOpenQr] = useState(false);
    const { order } = props;
    const countItem = order.items_count;
    const [open, setOpen] = useState(false);
    const checkStatus = (status: string) => {
        switch (status) {
            case "CANCELED":
                return (
                    <div
                        style={{ color: "var(--red-cl)" }}
                        className={style.status}
                    >
                        Đã hủy
                    </div>
                );
            case "CANCELED_BY_USER":
                return (
                    <div
                        style={{ color: "var(--red-cl)" }}
                        className={style.status}
                    >
                        Đã hủy
                    </div>
                );
            case "REFUND":
                return (
                    <div
                        style={{ color: "var(--red-cl)" }}
                        className={style.status}
                    >
                        Đã hủy
                    </div>
                );
            case "PENDING":
                return (
                    <div
                        style={{ color: "var(--red-cl)" }}
                        className={style.status}
                    >
                        Đã hủy
                    </div>
                );
            case "PAID":
                return (
                    <>
                        <div
                            style={{ color: "var(--green)" }}
                            className={style.status}
                        >
                            Đã thanh toán
                        </div>
                    </>
                );
            default:
                break;
        }
    };
    return (
        <>
            <PopupQr open={openQr} setOpen={setOpenQr} qr={order.qr_link} />
            <div className={style.container}>
                <div className={style.head_create}>
                    <div className={style.head_create_left}>
                        Mã
                        <h4>
                            #{order?.payment_gateway?.transaction_uuid}-
                            {order?.origin_id}
                        </h4>
                    </div>
                    <div className={style.head_create_right}>
                        <span className={style.created_at}>
                            {dayjs(order.created_at).format('HH:mm DD/MM/YYYY')}
                        </span>
                        {
                            (IS_MB && order.status === 'PAID') &&
                            <XButton
                                onClick={() => setOpenQr(true)}
                                className={style.head_create_right_btn}
                                icon={icon.scanQrBtn}
                                iconSize={22}
                            />
                        }
                    </div>
                </div>
                <div className={style.head_org}>
                    <span className={style.head_org_name}>{order?.organization?.name}</span>
                    {checkStatus(order.status)}
                </div>
                <ul className={style.order_items}>
                    {
                        order?.items?.map((item, index: number) => {
                            const displayPrice = item.discount ?
                                item.base_price - item.discount_value / item.quantity :
                                item.base_price
                            return (
                                <li key={index} className={style.order_items_pro}>
                                    <div className={style.pro_container}>
                                        <div className={style.pro_img}>
                                            <img src={
                                                item.productable?.image ?
                                                    item.productable?.image_url :
                                                    order?.organization?.image_url
                                            } onError={(e) => onErrorImg(e)} alt="" />
                                        </div>
                                        <div className={style.pro_detail}>
                                            <p className={style.pro_detail_name}>
                                                {item.productable?.service_name ?? item.productable?.product_name}
                                            </p>
                                            <div className={style.pro_detail_price}>
                                                <span>{formatPrice(displayPrice)}đ</span>
                                                <span>x {item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className={style.amount}>
                    <span className={style.amount_title}>Tổng cộng:</span>
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
                <div className={style.bottom}>
                    <XButton
                        onClick={() => setOpen(true)}
                        className={style.bottom_detail_btn}
                        title="Chi tiết"
                        icon={icon.arrownRightWhite}
                        iconSize={10}
                    />
                </div>
            </div>
            <OrderDetail
                open={open}
                setOpen={setOpen}
                org={order?.organization}
                order={order}
                countItem={countItem}
            />
        </>
    );
}

export default OrderItem;
