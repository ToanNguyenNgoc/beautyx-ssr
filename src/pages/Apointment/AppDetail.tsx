import React, { useContext, useState } from 'react';
import { Dialog } from '@mui/material';
import style from "./appdetail.module.css";
import dayjs from 'dayjs';
import { useDeviceMobile } from 'hooks';
import icon from 'constants/icon';
import { AppointmentTime } from 'interface/appointment';
import { onErrorImg } from 'utils';
import HeadMobile from 'features/HeadMobile';
import { AppContext } from 'context/AppProvider';
import { XButton } from 'components/Layout';
import { PopupQr } from 'components/Notification';

interface AppDetailProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    app: AppointmentTime
}

function AppDetail(props: AppDetailProps) {
    const { t } = useContext(AppContext)
    const { open, setOpen, app } = props
    const [openQr, setOpenQr] = useState(false)
    const IS_MB = useDeviceMobile()
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullScreen={IS_MB}
        >
            {IS_MB &&
                <HeadMobile
                    onBack={() => setOpen(false)}
                    title={t('pm.payment_booking')}
                    element={<XButton
                        icon={icon.scanQrBtnOrange}
                        iconSize={22}
                        className={style.scan_btn}
                        onClick={() => setOpenQr(true)}
                    />}
                />}
            <PopupQr open={openQr} setOpen={setOpenQr} qr={app.qr_link} />
            <div className={style.container}>
                <div className={style.body}>
                    <div className={style.status}>
                        <img src={icon.calendarWhite} alt="" />
                        <div className={style.status_content}>
                            <span className={style.status_content_label}>
                               {t('Home.appointment_status')}
                            </span>
                            <span className={style.status_content_txt}>
                                {app.status}
                            </span>
                        </div>
                    </div>
                    <div className={style.info}>
                        <p className={style.info_title}>
                           {t('order.appo_detail')}
                        </p>
                        <div className={style.info_row}>
                            <span className={style.info_row_label}>{t('order.time')}:</span>
                            <span className={style.info_row_value}>
                                {dayjs(app.time_start).format('DD/MM/YYYY  HH:mm')}-
                                {dayjs(app.time_end).format('HH:mm')}
                            </span>
                        </div>
                        <div className={style.info_row}>
                            <span className={style.info_row_label}>{t('Mer_de.address')}:</span>
                            <span className={style.info_row_value}>
                                {app.branch?.full_address ?? app.organization?.full_address}
                            </span>
                        </div>
                    </div>
                    <div className={style.org}>
                        <div className={style.org_img}>
                            <img
                                src={app.branch?.image_url ?? app.organization?.image_url}
                                onError={(e) => onErrorImg(e)}
                                alt="" />
                        </div>
                        <span className={style.org_name}>
                            {app.branch?.name ?? app.organization?.name}
                        </span>
                    </div>
                    <ul className={style.list_service}>
                        {
                            app.services?.map(service => (
                                <li key={service.id} className={style.list_service_item}>
                                    <div className={style.service}>
                                        <div className={style.service_img}>
                                            <img src={service?.image_url ?? app.organization?.image_url}
                                                alt="" onError={(e) => onErrorImg(e)}
                                            />
                                        </div>
                                        <div className={style.service_detail}>
                                            <p className={style.service_name}>{service.service_name}</p>
                                            {
                                                service.duration &&
                                                <p className={style.service_duration}>
                                                    Thời gian:{" "}{service.duration}{""}{t('detail_item.minute')}
                                                </p>
                                            }
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    <div className={style.note}>
                        {app.note}
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default AppDetail;