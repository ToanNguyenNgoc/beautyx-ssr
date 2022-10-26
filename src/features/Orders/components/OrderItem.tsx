import React, { useState } from "react";
import formatPrice from "../../../utils/formatPrice";
import icon from "../../../constants/icon";
import OrderDetail from "../../OrderDetail";
import { IOrderV2 } from "../../../interface/orderv2";
import { formatDate } from "../../../utils/format";
import PopupQr from "../../AppointmentDetail/PopupQr";

interface IProp {
    order: IOrderV2;
}

function OrderItem(props: IProp) {
    const [openQr, setOpenQr] = useState(false);
    const { order } = props;
    const countItem = order.items_count;
    const [open, setOpen] = useState(false);
    const checkStatus = (status: string) => {
        switch (status) {
            case "CANCELED":
                return (
                    <div
                        style={{ backgroundColor: "var(--red-cl)" }}
                        className="status"
                    >
                        Đã hủy
                    </div>
                );
            case "CANCELED_BY_USER":
                return (
                    <div
                        style={{ backgroundColor: "var(--red-cl)" }}
                        className="status"
                    >
                        Đã hủy
                    </div>
                );
            case "REFUND":
                return (
                    <div
                        style={{ backgroundColor: "var(--red-cl)" }}
                        className="status"
                    >
                        Đã hủy
                    </div>
                );
            case "PENDING":
                return (
                    <div
                        style={{ backgroundColor: "var(--red-cl)" }}
                        className="status"
                    >
                        Đã hủy
                    </div>
                );
            case "PAID":
                return (
                    <>
                        <div
                            style={{ backgroundColor: "var(--green)" }}
                            className="status"
                        >
                            Đã thanh toán
                        </div>
                        <div
                            onClick={() => setOpenQr(true)}
                            className="status status-qr"
                        >
                            Mã QR
                        </div>
                    </>
                );
            default:
                break;
        }
    };
    const handleOpenDetail = () => {
        setOpen(true);
    };
    return (
        <>
            <PopupQr open={openQr} setOpen={setOpenQr} qr={order.qr_link} />
            <li>
                <div className="order-item">
                    <div className="flex-row-sp order-item__head">
                        <div className="left">
                            Mã đơn hàng{" "}
                            <span>
                                #{order?.payment_gateway?.transaction_uuid}-
                                {order?.origin_id}
                            </span>
                        </div>
                        <span onClick={handleOpenDetail} className="right">
                            Xem chi tiết
                        </span>
                    </div>
                    <div className="flex-row-sp order-item__date">
                        <div className="flex-row left">
                            <img src={icon.Storefront} alt="" />
                            <span>{order?.organization?.name}</span>
                        </div>
                        <span className="right">
                            {formatDate(order?.created_at)}
                        </span>
                    </div>
                    <div className="flex-row-sp order-item__body">
                        <img
                            src={order?.organization?.image_url}
                            alt=""
                            className="order-item__body-img"
                        />
                        <div className="order-item__body-de">
                            <span className="org__address">
                                {order?.organization?.full_address}
                            </span>
                            <div className="flex-row price">
                                {order?.amount !==
                                order?.payment_gateway?.amount ? (
                                    <>
                                        <span
                                            style={{ color: "var(--orange)" }}
                                        >
                                            {formatPrice(
                                                order?.payment_gateway?.amount
                                            )}
                                            đ
                                        </span>
                                        <span>
                                            {formatPrice(order?.amount)}đ
                                        </span>
                                    </>
                                ) : (
                                    <span>
                                        {formatPrice(
                                            order?.payment_gateway?.amount
                                        )}
                                        đ
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex-row-sp order-item__status">
                        <span className="left">
                            {order?.items_count} sản phẩm/dịch vụ
                        </span>
                        <div className="flex-row right">
                            <span className="order-amount">
                                {formatPrice(order?.payment_gateway?.amount)}đ
                            </span>
                            {checkStatus(order?.status)}
                        </div>
                    </div>
                </div>
            </li>
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
