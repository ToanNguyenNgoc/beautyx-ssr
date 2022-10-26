/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useRef, useState, KeyboardEvent } from "react";
import img from "constants/img";
import icon from "constants/icon";
import { ICON } from "constants/icon2"
import style from "./head.module.css"
import { Container } from "@mui/material"
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import IStore from "interface/IStore";
import { AppContext } from "context/AppProvider";
import languages from "data/languages"
import i18next from "i18next";
import { logoutUser } from "redux/USER/userSlice";
import { onClearApps } from "redux/appointment/appSlice";
import { onSetStatusServicesUser } from "redux/order/orderSlice";
import { Appointment } from "interface/appointment";
import dayjs from "dayjs";
import { getTotal } from "redux/cartSlice";
import Search from "features/Search";
import { debounce } from "lodash";
import { useDeviceMobile } from "utils";
import { IServiceUser } from "interface/servicesUser";
import { XButton } from "components/Layout";

interface IProps {
    IN_HOME?: boolean,
    setCloseDialog?: (closeDialog?: boolean) => void,
    headerStyle?: any,
    handleCancelPayment?: () => void,
    prev_url?: string,
}

function Head(props: IProps) {
    const { t, appointment, orderService } = useContext(AppContext)
    const [key, setKey] = useState({ key: "", key_debounce: "" });
    const history = useHistory();
    const { USER } = useSelector((state: IStore) => state.USER)
    const IS_MB = useDeviceMobile()
    const refMenu = useRef<HTMLDivElement>()
    const refNoti = useRef<HTMLDivElement>()
    const refSearch = useRef<any>()
    const dispatch = useDispatch();

    const { cartList, cartQuantity } = useSelector((state: any) => state.carts);
    useEffect(() => {
        dispatch(getTotal(USER?.id));
    }, [dispatch, cartList, USER]);

    const onToggleMenu = (dis: "show" | "hide") => {
        if (dis === "show") return refMenu?.current?.classList.add(style.head_menu_show)
        if (dis === "hide") return refMenu?.current?.classList.remove(style.head_menu_show)
    }
    const onToggleNoti = (dis: "show" | "hide") => {
        if (IS_MB) {
            return refNoti?.current?.classList.toggle(style.head_menu_show)
        } else {
            if (dis === "show") return refNoti?.current?.classList.add(style.head_menu_show)
            if (dis === "hide") return refNoti?.current?.classList.remove(style.head_menu_show)
        }
    }
    const onToggleSearch = (dis: "show" | "hide") => {
        if (dis === "show") return refSearch?.current?.classList.add(style.head_search_show)
        if (dis === "hide" && !IS_MB) return refSearch?.current?.classList.remove(style.head_search_show)
    }
    const onCloseSearchTimeOut = () => {
        setTimeout(() => {
            refSearch?.current?.classList.remove(style.head_search_show)
        }, 100)
    }
    //
    const appointment_today = appointment.filter((a: Appointment) =>
        dayjs(a.time_start).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")
    )
    const order_app = orderService.filter((a: IServiceUser) => a.appointments.length === 0)
    const notiCount = appointment_today.concat(order_app).length

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSetDebounceKeyword = useCallback(
        debounce((text) => setKey({ key: text, key_debounce: text }), 1000),
        []
    )
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSetDebounceKeyword(e.target.value)
        setKey({ ...key, key: e.target.value })
    }
    const onResult = () => {
        if (key.key_debounce !== "") history.push({
            pathname: "/ket-qua-tim-kiem/dich-vu",
            search: `?keyword=${encodeURIComponent(key.key_debounce)}`,
        })
    }
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
            onResult()
        }
    }
    return (
        <div className={style.container}>
            <Container>
                <div className={style.head_wrapper}>
                    <div className={style.head_top}>
                        <div className={style.head_top_left}>
                            <Link to={{ pathname: "/" }}>
                                <img className={style.head_top_left_img} src={img.beautyX} alt="" />
                            </Link>
                            <button
                                className={style.head_top_left_search}
                                onFocus={() => onToggleSearch("show")}
                                onClick={() => onToggleSearch("show")}
                                onBlur={() => onToggleSearch("hide")}
                            >
                                <img onClick={onResult} className={style.head_search_icon} alt="" src={icon.searchPurple} />
                                <input
                                    onChange={onChange}
                                    className={style.head_search_input}
                                    type="text" placeholder="Bạn muốn tìm kiếm gì..."
                                    disabled={IS_MB}
                                    onKeyDown={handleKeyDown}
                                />
                                <div ref={refSearch} className={style.head_search}>
                                    <Search
                                        onCloseSearchTimeOut={onCloseSearchTimeOut}
                                        key_work={key.key} key_work_debounce={key.key_debounce}
                                    />
                                </div>
                            </button>
                        </div>
                        <div className={style.head_top_right}>
                            {
                                USER ?
                                    <>
                                        <Link
                                            to={{ pathname: "/tai-khoan/thong-tin-ca-nhan" }}
                                            className={style.head_top_right_user}
                                        >
                                            <img className={style.head_user_avatar} src={USER?.avatar} alt="" />
                                            <span className={style.head_user_name}>{USER?.fullname}</span>
                                        </Link >
                                        <button
                                            onClick={() => history.push("/lich-hen?tab=1")}
                                            className={style.head_top_right_btn}
                                        >
                                            {
                                                appointment_today.length > 0 &&
                                                <span className={style.head_top_right_badge}>
                                                    {appointment_today.length}
                                                </span>
                                            }
                                            <img src={ICON.calendarAct} alt="" />
                                        </button>
                                        <button
                                            onClick={() => onToggleNoti("show")}
                                            onFocus={() => onToggleNoti("show")}
                                            onBlur={() => onToggleNoti("hide")}
                                            className={style.head_top_right_btn}
                                        >
                                            <HeadNotification
                                                refNoti={refNoti}
                                                appointment_today={appointment_today}
                                                order_app={order_app}
                                            />
                                            {
                                                notiCount > 0 &&
                                                <span className={style.head_top_right_badge}>
                                                    {notiCount}
                                                </span>
                                            }
                                            <img src={icon.Bell} alt="" />
                                        </button>
                                    </>
                                    :
                                    <div className={style.head_top_right_auth}>
                                        <XButton
                                            className={style.head_sign_btn}
                                            title={t("Home.Sign_up")}
                                            onClick={() => history.push("/sign-up?2")}
                                        />
                                        <XButton
                                            onClick={() => history.push("/sign-in?1")}
                                            className={style.head_sign_btn} title={t("Home.Sign_in")}
                                        />
                                    </div>
                            }
                            {
                                !IS_MB &&
                                <button
                                    onFocus={() => onToggleMenu("show")}
                                    onBlur={() => onToggleMenu("hide")}
                                    className={style.head_top_right_btn}
                                >
                                    <img src={icon.Menu} alt="" />
                                    <HeadMenu refMenu={refMenu} />
                                </button>
                            }
                            <button
                                onClick={() => history.push("/gio-hang")}
                                className={style.head_top_right_btn}
                            >
                                <span className={style.head_top_right_badge}>
                                    {cartQuantity >= 9 ? "9+" : cartQuantity}
                                </span>
                                <img src={icon.cartPurpleBold} alt="" />
                            </button>
                        </div>
                    </div>
                    <div className={style.head_bot}>
                        <XButton
                            onClick={() => history.push("/kenh-nguoi-ban")}
                            className={style.head_bot_btn}
                            title={t("Header.seller_center")}
                        />
                        <div
                            onClick={() => window.open('https://beautyx.vn/blog', '_blank')}
                            className={style.head_bot_link}
                        >
                            Tin tức
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Head;

interface HeadNotificationProps {
    appointment_today: Appointment[],
    order_app: IServiceUser[]
    refNoti: any
}

const HeadNotification = (props: HeadNotificationProps) => {
    const { refNoti, appointment_today, order_app } = props;
    const { USER } = useSelector((state: IStore) => state.USER)
    const history = useHistory()
    const noti = appointment_today.length + order_app.length
    const notiList = [
        {
            id: 1,
            count: appointment_today.length,
            title: `${USER?.fullname} ơi ! Hôm nay bạn có ${appointment_today.length} lịch hẹn ! Xem ngay nhé !`,
            url: "/lich-hen?tab=1",
            icon: ICON.calendarAct
        },
        {
            id: 2,
            count: order_app.length,
            title: `${USER?.fullname} ơi ! Hôm nay bạn có ${order_app.length} thẻ dịch vụ chưa đặt hẹn ! Xem ngay nhé !`,
            url: "/lich-hen?tab=2",
            icon: icon.servicesPurpleBold
        }
    ]
    return (
        <div ref={refNoti} className={style.head_noti}>
            <div className={style.head_menu_title}>Thông báo</div>
            {
                !USER &&
                <div className={style.head_required_sign}>
                    Đăng nhập để xem thông báo
                </div>
            }
            {
                noti === 0 ?
                    <div className={style.head_required_sign}>
                        Không có thông báo
                    </div>
                    :
                    <ul className={style.noti_list}>
                        {
                            notiList
                                .filter(i => i.count > 0)
                                .map(item => (
                                    <li key={item.id} >
                                        <div
                                            onClick={() => history.push(item.url)}
                                            className={style.noti_list_link}
                                        >
                                            <img src={item.icon} alt="" />
                                            <span>{item.title}</span>
                                        </div>
                                    </li>
                                ))
                        }
                    </ul>
            }
        </div>
    )
}

interface HeadMenuProps {
    refMenu: any
}

const HeadMenu = (props: HeadMenuProps) => {
    const history = useHistory();
    const { t, language, setLanguage, setSign } = useContext(AppContext);
    const { USER } = useSelector((state: IStore) => state.USER)
    const dispatch = useDispatch()
    const listMenu = [
        { id: 1, icon: icon.User, text: t("Header.my_acc"), url: "/tai-khoan/thong-tin-ca-nhan" },
        { id: 2, icon: icon.Clock_purple, text: "Order history", url: "/tai-khoan/lich-su-mua" },
        { id: 3, icon: icon.bag, text: t("Header.appointment"), url: "/lich-hen?tab=1" },
        { id: 4, icon: icon.bag, text: t("app.my_services"), url: "/lich-hen?tab=2" }
    ]
    const handleChangeLang = (code: string) => {
        setLanguage(code)
        i18next.changeLanguage(code);
    }
    const handleSignOut = () => {
        setSign(false);
        dispatch(logoutUser());
        dispatch(onClearApps());
        dispatch(onSetStatusServicesUser())
        localStorage.removeItem('_WEB_TK')
        window.sessionStorage.removeItem('_WEB_TK')
    }

    return (
        <div ref={props.refMenu} className={style.head_menu}>
            <div className={style.head_menu_title}>Menu</div>
            <ul className={style.menu_list}>
                {
                    USER &&
                    listMenu.map(item => (
                        <li onClick={() => history.push(item.url)} key={item.id} className={style.menu_list_item}>
                            <div className={style.menu_item}>
                                <img src={item.icon} alt="" />
                                <span className={style.menu_item_text}>{item.text}</span>
                            </div>
                        </li>
                    ))
                }
                <li className={style.menu_list_item}>
                    <div className={style.menu_list_item_left}>
                        <img src={icon.languagePurple} alt="" />
                        <span className={style.menu_item_text}>Ngôn ngữ</span>
                    </div>
                    <div className={style.switch_lang}>
                        {
                            languages.map(lang => (
                                <div
                                    style={language === lang.code ? {
                                        backgroundColor: "var(--purple)",
                                        color: "var(--bg-white)"
                                    } : {}}
                                    onClick={() => handleChangeLang(lang.code)}
                                    className={style.switch_lang_item}
                                    key={lang.code}
                                >
                                    {lang.code}
                                </div>
                            ))
                        }
                    </div>
                </li>
            </ul>
            {
                USER &&
                <div className={style.menu_bottom}>
                    <div
                        onClick={handleSignOut}
                        className={style.menu_bottom_btn}
                    >
                        {t('Header.sign_out')}
                    </div>
                </div>
            }
        </div>
    )
}
