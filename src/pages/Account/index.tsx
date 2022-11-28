/* eslint-disable react-hooks/exhaustive-deps */
import { RouteComponentProps } from "@reach/router";
import { Switch, useHistory, useLocation } from "react-router-dom";
import Information from "./components/Information/index";
import Head from "features/Head/index";
import Orders from "features/Orders/index";
import UserAddress from "./components/UserAddress/components/UserAddress";
import React, { useEffect, useState } from "react";
import { fetchAsyncDiscountsUser, logoutUser } from "redux/USER/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "redux/status";
import style from './account.module.css'
import { Container } from "@mui/system";
import IStore from "interface/IStore";
import { onErrorImg } from 'utils'
import icon from "constants/icon";
import { postMedia, useDeviceMobile } from "hooks";
import { updateAsyncUser } from 'redux/USER/userSlice'
import { ICON } from "constants/icon2";
import { XButton, Bottom } from "components/Layout";
import Favorites from "./components/Favorites";
import Address from "./components/UserAddress";
import { onClearApps } from "redux/appointment/appSlice";
import { onSetStatusServicesUser } from "redux/order/orderSlice";
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";
import { FLAT_FORM_TYPE } from "rootComponents/flatForm";
import Guide from "./components/Guide";
import { handleCallingPhone } from "utils/customChat";
import ChangePassword from "./components/ChangePassword";

const routes = [
    {
        path: `/tai-khoan/thong-tin-ca-nhan`,
        component: <Information />,
    },
    {
        path:'/tai-khoan/doi-mat-khau',
        component:<ChangePassword/>
    },
    {
        path: "/tai-khoan/lich-su-mua",
        component: <Orders />,
    },
    {
        path: "/tai-khoan/dia-chi",
        component: <UserAddress />,
    },
    {
        path: '/tai-khoan/theo-doi',
        component: <Favorites />
    },
    {
        path: '/tai-khoan/dia-chi-giao-hang',
        component: <Address />
    }
];
function Account() {
    const RouterPage = (
        props: { pageComponent: JSX.Element } & RouteComponentProps
    ) => props.pageComponent;
    const dispatch = useDispatch();
    const { DISCOUNTS_USER } = useSelector((state: any) => state.USER);
    const { status_discount } = DISCOUNTS_USER;
    const callDiscountsUser = () => {
        if (status_discount !== STATUS.SUCCESS) {
            dispatch(fetchAsyncDiscountsUser({ page: 1 }));
        }
    };
    useEffect(() => {
        callDiscountsUser();
    }, []);
    const history = useHistory()
    const location = useLocation()
    const IS_MB = useDeviceMobile();
    const { USER } = useSelector((state: IStore) => state.USER)
    const onChangeAvatar = async (e: any) => {
        const { model_id } = await postMedia(e)
        await dispatch(updateAsyncUser({
            media_id: model_id
        }))
    }
    const links = [
        { link: '/tai-khoan/thong-tin-ca-nhan', title: 'Tài khoản của tôi', hide: IS_MB, icon: ICON.userAct },
        { link: '/tai-khoan/lich-su-mua', title: 'Lịch sử đơn hàng', hide: false, icon: icon.boxAcc },
        { link: '/lich-hen?tab=1', title: 'Lịch hẹn', hide: false, icon: ICON.calendarAct },
        { link: '/lich-hen?tab=2', title: 'Gói dịch vụ đã mua', hide: false, icon: icon.boxAcc },
        { link: '/tai-khoan/theo-doi', title: 'Đang theo dõi', hide: false, icon: icon.heartAcc },
        { link: '/tai-khoan/dia-chi-giao-hang', title: 'Địa chỉ giao hàng', hide: false, icon: icon.markerAcc }
    ]
    const onNavigate = (link: string) => {
        history.push(link)
    }
    let ACC_SHOW = "left"
    if (location.pathname !== "/tai-khoan") ACC_SHOW = "right"
    const handleSignOut = () => {
        dispatch(logoutUser());
        dispatch(onClearApps());
        dispatch(onSetStatusServicesUser())
        history.push("/homepage")
        localStorage.removeItem('_WEB_TK')
        window.sessionStorage.removeItem('_WEB_TK')
    }
    const PLATFORM = EXTRA_FLAT_FORM()
    const [guide, setGuide] = useState(false)

    return (
        <>
            {!IS_MB && <Head />}
            <Container>
                <div className={style.container}>
                    <div
                        style={(IS_MB && ACC_SHOW === "right") ? {
                            marginLeft: '-100vh'
                        } : {}}
                        className={style.left_cnt}
                    >
                        {IS_MB && <HeadAccount />}
                        <div className={style.left_cnt_head}>
                            <div className={style.user_avatar_cnt}>
                                <img
                                    className={style.user_avatar}
                                    src={USER?.avatar} alt=""
                                    onError={(e) => onErrorImg(e)}
                                />
                                <label htmlFor="file" className={style.user_avatar_btn}>
                                    <img src={icon.Camera_purple} alt="" />
                                </label>
                                <input
                                    hidden
                                    id="file"
                                    type="file"
                                    name="file"
                                    accept="image/jpeg"
                                    onChange={onChangeAvatar}
                                />
                            </div>
                            <div className={style.user_info}>
                                <p className={style.user_fullname}>{USER?.fullname}</p>
                                <p className={style.user_email}>
                                    <img src={icon.phoneWhite} alt="" />
                                    {USER?.email}
                                </p>
                                <p className={style.user_telephone}>
                                    <img src={icon.emailWhite} alt="" />
                                    {USER?.telephone}
                                </p>
                            </div>
                        </div>
                        <div className={style.left_cnt_link}>
                            <ul className={style.link_list}>
                                {
                                    links
                                        .filter(item => item.hide === false)
                                        .map(item => (
                                            <li key={item.link} className={style.link_list_item}>
                                                <div
                                                    style={location.pathname === item.link ? {
                                                        backgroundColor: 'var(--bg-color)'
                                                    } : {}}
                                                    className={style.link_item}
                                                    onClick={() => onNavigate(item.link)}
                                                >
                                                    <img src={item.icon} className={style.link_item_icon} alt="" />
                                                    {item.title}
                                                </div>
                                            </li>
                                        ))
                                }
                                {
                                    PLATFORM === FLAT_FORM_TYPE.BEAUTYX &&
                                    <li className={style.link_list_item}>
                                        <div
                                            className={style.link_item}
                                            onClick={handleSignOut}
                                        >
                                            <img src={icon.signOut} className={style.link_item_icon} alt="" />
                                            Đăng xuất
                                        </div>
                                    </li>
                                }
                            </ul>
                            <div className={style.left_bot}>
                                <XButton
                                    iconSize={14}
                                    icon={icon.book}
                                    title="Hướng dẫn sử dụng"
                                    onClick={() => setGuide(true)}
                                />
                                <XButton
                                    iconSize={14}
                                    icon={icon.phonePurple}
                                    title="0289 9959 938"
                                    onClick={handleCallingPhone}
                                />
                            </div>
                        </div>

                    </div>
                    <div
                        style={(IS_MB && ACC_SHOW === "right") ? {
                            marginLeft: '0px'
                        } : {}}
                        className={style.right_cnt}>
                        <Switch>
                            {routes.map((item, index) => (
                                <RouterPage
                                    key={index}
                                    path={`${item.path}`}
                                    pageComponent={item.component}
                                />
                            ))}
                        </Switch>
                    </div>
                </div>
            </Container>
            {IS_MB && location.pathname === '/tai-khoan' && <Bottom />}
            <Guide open={guide} setOpen={setGuide} />
        </>
    );
}
export default Account;

export const HeadAccount = () => {
    const history = useHistory()
    return (
        <div className={style.header_container}>
            <div className={style.btn_cnt}>
                <XButton
                    onClick={() => history.push('/tai-khoan/thong-tin-ca-nhan')}
                    className={style.icon_btn}
                    icon={icon.settingLineBlack}
                />
            </div>
            <div className={style.btn_cnt}>
                <XButton
                    onClick={() => history.push('/gio-hang')}
                    className={style.icon_btn}
                    icon={icon.cartLineBlack}
                />
            </div>
        </div>
    )
}

export const HeadTitle = ({ title, rightBtn }: { title: string, rightBtn?: React.ReactNode }) => {
    const history = useHistory()
    return (
        <div className={style.head_title}>
            <XButton
                className={style.head_title_btn}
                icon={icon.chevronLeft}
                iconSize={24}
                onClick={() => history.goBack()}
            />
            <span className={style.head_title_text}>
                {title}
            </span>
            {rightBtn ?? <div className={style.head_title_right}></div>}
        </div>
    )
}
