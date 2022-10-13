import React from 'react';
import { Dialog } from '@mui/material';
import style from "./appdetail.module.css";
import dayjs from 'dayjs';
import { useDeviceMobile } from 'utils';
import icon from 'constants/icon';
import formatPrice, { formatSalePriceService } from 'utils/formatPrice';
import { AppointmentTime } from 'interface/appointment';

interface AppDetailProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    app: AppointmentTime
}

function AppDetail(props: AppDetailProps) {
    const { open, setOpen, app } = props;
    const IS_MB = useDeviceMobile();
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullScreen={IS_MB && true}
        >
            <div className={style.app_detail_cnt}>
                <div className={style.app_detail_head}>
                    <div className={style.app_detail_head_left}>
                        <button
                            onClick={() => setOpen(false)}
                        >
                            <img
                                src={icon.chevronLeft} alt=""
                                width={26} height={26}
                            />
                        </button>
                        <span className={style.app_detail_head_text}>
                            Thông tin lịch hẹn
                        </span>
                        <div className={style.mb_right}></div>
                    </div>
                    <div className={style.app_detail_head_time}>
                        <div style={{ display: "flex" }} >
                            <div className={style.app_detail_date}>
                                ngày: <span>{dayjs(app.time_start).format("DD/MM/YYYY")}</span>
                            </div>
                            <div className={style.app_detail_date}>
                                Giờ: <span>{dayjs(app.time_start).format("hh:mm A")}</span>
                            </div>
                        </div>
                        <div className={style.app_detail_head_status}>
                            {app.status}
                        </div>
                    </div>
                </div>
                <div className={style.app_detail_body}>
                    <div className={style.app_detail_body_left}>
                        <span className={style.app_detail_title}>
                            Danh sách dịch vụ
                        </span>
                        <ul className={style.app_services}>
                            {
                                app.services?.map((item: any, index: number) => (
                                    <li key={index} className={style.app_service_item}>
                                        <div className={style.app_service_item_img}>
                                            <img
                                                src={item.image ? item.image_url : app.organization?.image_url}
                                                alt=''
                                                width={"100%"} height={"100%"}
                                            />
                                        </div>
                                        <div className={style.app_service_item_de}>
                                            <div>
                                                <span className={style.service_name}>
                                                    {item.service_name}
                                                </span>
                                                <div className={style.service_detail}>
                                                    {
                                                        item.duration > 0 &&
                                                        <div className={style.service_detail_item}>
                                                            <span>Thời gian:</span>
                                                            <h4>{item.duration} phút</h4>
                                                        </div>
                                                    }
                                                    <div className={style.service_detail_item}>
                                                        <h5>{item.description}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={style.app_service_item_price}>
                                                {
                                                    formatSalePriceService(item.special_price, item.special_price_momo) > 0 ?
                                                        `${formatPrice(formatSalePriceService(
                                                            item.special_price,
                                                            item.special_price_momo))}đ`
                                                        :
                                                        `${formatPrice(item.price)}đ`
                                                }
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={style.app_detail_body_right}>
                        <div className={style.app_detail_body_right_section}>
                            <span className={style.app_detail_title}>
                                Địa chỉ
                            </span>
                            <span className={style.app_detail_body_right_text}>
                                {app.branch?.full_address ?? app.organization?.full_address}
                            </span>
                        </div>
                        <div className={style.app_detail_body_right_section}>
                            <span className={style.app_detail_title}>
                                Ghi chú
                            </span>
                            <span className={style.app_detail_body_right_text}>
                                {app.note !== "" && app.note}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default AppDetail;