import icon from 'constants/icon';
import { ICON } from 'constants/icon2';
import { AppContext } from 'context/AppProvider';
import { useDeviceMobile } from 'hooks';
import { AppointmentNoti } from 'interface/appointment';
import IStore from 'interface/IStore';
import { IServiceUser } from 'interface/servicesUser';
import React, { useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clst } from 'utils';
import style from './head.module.css'

function HeadNoti({ changeStyle }: { changeStyle?: boolean }) {
    const refNoti = useRef<HTMLDivElement>();
    const { appointment_today, order_app } = useContext(AppContext);
    const IS_MB = useDeviceMobile()
    const onToggleNoti = (dis: "show" | "hide") => {
        if (IS_MB) {
            return refNoti?.current?.classList.toggle(style.head_menu_show);
        } else {
            if (dis === "show")
                return refNoti?.current?.classList.add(style.head_menu_show);
            if (dis === "hide")
                return refNoti?.current?.classList.remove(style.head_menu_show);
        }
    };
    // window.onclick = () => onToggleNoti('hide')
    //
    const notiCount = appointment_today.concat(order_app).length;
    return (
        <button
            onClick={() => onToggleNoti('show')}
            onFocus={() => onToggleNoti('show')}
            onBlur={() => onToggleNoti('hide')}
            className={
                changeStyle
                    ? clst([
                        style.head_top_right_btn,
                        style.head_top_right_btn_ch,
                    ])
                    : style.head_top_right_btn
            }
        >
            <HeadNotification
                refNoti={refNoti}
                appointment_today={appointment_today}
                order_app={order_app}
            />
            {notiCount > 0 && (
                <span className={style.head_top_right_badge} >
                    {notiCount}
                </span>
            )}
            <img
                src={changeStyle ? icon.bellWhite : icon.Bell}
                alt=""
            />
        </button>
    );
}

export default HeadNoti;

interface HeadNotificationProps {
    appointment_today: AppointmentNoti[];
    order_app: IServiceUser[];
    refNoti: any;
}

const HeadNotification = (props: HeadNotificationProps) => {
    const { t } = useContext(AppContext)
    const { refNoti, appointment_today, order_app } = props;
    const { USER } = useSelector((state: IStore) => state.USER);
    const history = useHistory();
    const noti = appointment_today.length + order_app.length;
    const notiList = [
        {
            id: 1,
            count: appointment_today.length,
            title: `${USER?.fullname} ơi ! Hôm nay bạn có ${appointment_today.length} lịch hẹn ! Xem ngay nhé !`,
            url: "/lich-hen?tab=1",
            icon: ICON.calendarAct,
            type: "APP",
        },
        {
            id: 2,
            count: order_app.length,
            title: `${USER?.fullname} ơi ! Hôm nay bạn có ${order_app.length} thẻ dịch vụ chưa đặt hẹn ! Xem ngay nhé !`,
            url: "/lich-hen?tab=2",
            icon: icon.servicesPurpleBold,
            type: "SER",
        },
    ];
    return (
        <div
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            ref={refNoti} className={style.head_noti}
        >
            <div className={style.head_menu_title}>{t('Header.noti')}</div>
            {!USER && (
                <div className={style.head_required_sign}>
                    Đăng nhập để xem thông báo
                </div>
            )}
            {noti === 0 ? (
                <div className={style.head_required_sign}>
                    {t('Header.not_noti')}
                </div>
            ) : (
                <ul className={style.noti_list}>
                    {notiList
                        .filter((i) => i.count > 0)
                        .map((item) => (
                            <li key={item.id}>
                                <div
                                    onClick={() => history.push(item.url)}
                                    className={style.noti_list_link}
                                >
                                    <img src={item.icon} alt="" />
                                    <span>{item.title}</span>
                                </div>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};