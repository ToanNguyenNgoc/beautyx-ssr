/* eslint-disable react-hooks/exhaustive-deps */
import { RouteComponentProps } from "@reach/router";
import { Switch, useHistory, useLocation } from "react-router-dom";
import Information from "./components/Information/index";
import UserAddress from "./components/UserAddress/components/UserAddress";
import React, { useContext, useEffect, useState } from "react";
import { logoutUser } from "redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import style from "./account.module.css";
import { Container } from "@mui/system";
import IStore from "interface/IStore";
import { clst, formatPhoneNumber, onErrorImg } from "utils";
import icon from "constants/icon";
import { postMedia, useDeviceMobile, useSwr } from "hooks";
import { updateAsyncUser } from "redux/user/userSlice";
import { ICON } from "constants/icon2";
import { FullImage, XButton } from "components/Layout";
import Favorites from "./components/Favorites";
import Address from "./components/UserAddress";
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";
import { FLAT_FORM_TYPE } from "rootComponents/flatForm";
import Guide from "./components/Guide";
import { handleCallingPhone } from "utils/customChat";
import ChangePassword from "./components/ChangePassword";
import Orders from "./components/Orders";
import { getTotal } from "redux/cart";
import languages from "data/languages";
import { AppContext } from "context/AppProvider";
import i18next from "i18next";
import { PopupMessage } from "components/Notification";
import API_ROUTE from "api/_api";
import { paramsUserProfile } from "params-query";
import { phoneSupport } from "constants/index";
import { User } from "interface";
import CardCoin from "./components/CardCoin";
import Member from "./components/Member";

const routes = [
    {
        path: "/tai-khoan/thong-tin-ca-nhan",
        component: <Information />,
    },
    {
        path: "/tai-khoan/doi-mat-khau",
        component: <ChangePassword />,
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
        path: "/tai-khoan/theo-doi",
        component: <Favorites />,
    },
    {
        path: "/tai-khoan/dia-chi-giao-hang",
        component: <Address />,
    },
    {
        path: "/tai-khoan/thanh-vien",
        component: <Member />,
    },
];
function Account() {
    const { t, appointment_today } = useContext(AppContext);
    const RouterPage = (
        props: { pageComponent: JSX.Element } & RouteComponentProps
    ) => props.pageComponent;
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const IS_MB = useDeviceMobile();
    const { USER } = useSelector((state: IStore) => state.USER);
    const userResponse: User = useSwr(
        API_ROUTE.USER_PROFILE,
        USER,
        paramsUserProfile
    ).response;
    const onChangeAvatar = async (e: any) => {
        const { model_id } = await postMedia(e);
        await dispatch(
            updateAsyncUser({
                media_id: model_id,
            })
        );
    };
    const links = [
        {
            link: "/tai-khoan/thong-tin-ca-nhan",
            title: t("Header.my_acc"),
            hide: IS_MB,
            icon: ICON.userAct,
            notiCount: 0,
            content: "",
        },
        {
            link: "/tai-khoan/lich-su-mua",
            title: t("Header.my_order"),
            hide: false,
            icon: icon.boxAcc,
            notiCount: 0,
            content: "",
        },
        {
            link: "/lich-hen?tab=1",
            title: t("Header.appointment"),
            hide: false,
            icon: ICON.calendarAct,
            notiCount: appointment_today?.length,
            content: t("Header.appointment"),
        },
        {
            link: "/lich-hen?tab=2",
            title: t("Header.Service pack purchased"),
            hide: false,
            icon: icon.boxAcc,
            notiCount: 0,
            content: "",
        },
        {
            link: "/tai-khoan/theo-doi",
            title: t("Header.Following"),
            hide: false,
            icon: icon.heartAcc,
            notiCount: 0,
            content: "",
        },
        {
            link: "/tai-khoan/dia-chi-giao-hang",
            title: t("Header.Delivery address"),
            hide: false,
            icon: icon.markerAcc,
            notiCount: 0,
            content: "",
        },
        {
            link: "/tai-khoan/thanh-vien",
            title: "Thành viên",
            hide: false,
            icon: ICON.userAct,
            notiCount: 0,
            content: "",
        },
    ];
    const onNavigate = (link: string) => {
        history.push(link);
    };
    let ACC_SHOW = "left";
    if (location.pathname !== "/tai-khoan") ACC_SHOW = "right";
    const handleSignOut = () => {
        dispatch(logoutUser());
        history.push("/homepage");
        localStorage.removeItem("_WEB_TK");
        window.sessionStorage.removeItem("_WEB_TK");
    };
    const PLATFORM = EXTRA_FLAT_FORM();
    const [guide, setGuide] = useState(false);
    const [openImg, setOpenImg] = useState(false);
    const [openP, setOpenP] = useState(false);
    const [openCard, setOpenCard] = useState(false);
    const onOpenAvatar = () => IS_MB && setOpenImg(true);

    return (
        <>
            <FullImage
                open={openImg}
                setOpen={setOpenImg}
                src={[USER?.avatar]}
            />
            <CardCoin
                open={openCard}
                setOpen={setOpenCard}
                user={userResponse}
            />
            <Container>
                <div className={style.container}>
                    <div
                        style={
                            IS_MB && ACC_SHOW === "right"
                                ? {
                                      marginLeft: "-100vh",
                                  }
                                : {}
                        }
                        className={style.left_cnt}
                    >
                        {IS_MB && <HeadAccount />}
                        <div
                            onClick={() => setOpenCard(true)}
                            className={style.left_user}
                        >
                            <div className={style.left_cnt_head}>
                                <div className={style.user_avatar_cnt}>
                                    <img
                                        onClick={onOpenAvatar}
                                        className={style.user_avatar}
                                        src={USER?.avatar}
                                        alt=""
                                        onError={(e) => onErrorImg(e)}
                                    />
                                    <label
                                        htmlFor="file"
                                        className={style.user_avatar_btn}
                                    >
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
                                    <p className={style.user_fullname}>
                                        {USER?.fullname}
                                    </p>
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
                            <div className={style.user_coin}>
                                <span className={style.user_coin_label}>
                                    BEAUTYX COIN
                                </span>
                                <div className={style.coin_cnt}>
                                    <img
                                        className={style.icon_left}
                                        src={icon.coins}
                                        alt=""
                                    />
                                    <div className={style.coin_value}>
                                        <p className={style.coin_value_label}>
                                            BTX
                                        </p>
                                        <div className={style.coin_value_count}>
                                            <span>
                                                {userResponse?.btx_points ??
                                                    USER?.btx_points}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.left_cnt_link}>
                            <ul className={style.link_list}>
                                {links
                                    .filter((item) => item.hide === false)
                                    .map((item) => (
                                        <li
                                            onClick={() =>
                                                onNavigate(item.link)
                                            }
                                            key={item.link}
                                            className={style.link_list_item}
                                        >
                                            <div
                                                style={
                                                    location.pathname ===
                                                    item.link
                                                        ? {
                                                              backgroundColor:
                                                                  "var(--bg-color)",
                                                          }
                                                        : {}
                                                }
                                                className={style.link_item}
                                            >
                                                <div
                                                    className={
                                                        style.link_item_left
                                                    }
                                                >
                                                    <img
                                                        src={item.icon}
                                                        className={
                                                            style.link_item_icon
                                                        }
                                                        alt=""
                                                    />
                                                    {item.title}
                                                </div>
                                                {item.notiCount > 0 && (
                                                    <div
                                                        className={
                                                            style.link_list_item_count
                                                        }
                                                    >
                                                        ({item.notiCount}{" "}
                                                        {item.content})
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                {PLATFORM === FLAT_FORM_TYPE.BEAUTYX && (
                                    <li className={style.link_list_item}>
                                        <div
                                            className={style.link_item}
                                            onClick={handleSignOut}
                                        >
                                            <div
                                                className={style.link_item_left}
                                            >
                                                <img
                                                    src={icon.signOut}
                                                    className={
                                                        style.link_item_icon
                                                    }
                                                    alt=""
                                                />
                                                {t("Header.sign_out")}
                                            </div>
                                        </div>
                                    </li>
                                )}
                                <li className={style.link_list_item}>
                                    <SwitchLanguage />
                                </li>
                            </ul>
                            <div className={style.left_bot}>
                                <div className={style.left_bot_head}>
                                    <XButton
                                        iconSize={14}
                                        icon={icon.book}
                                        title={t("se.guide")}
                                        onClick={() => setGuide(true)}
                                    />
                                    <XButton
                                        onClick={() => setOpenP(true)}
                                        className={style.left_bot_head_btn}
                                    />
                                    <PopupMessage
                                        open={openP}
                                        onClose={() => setOpenP(false)}
                                        content={EXTRA_FLAT_FORM()}
                                    />
                                </div>
                                <XButton
                                    iconSize={14}
                                    icon={icon.phonePurple}
                                    title={formatPhoneNumber(phoneSupport)}
                                    onClick={handleCallingPhone}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        style={
                            IS_MB && ACC_SHOW === "right"
                                ? {
                                      marginLeft: "0px",
                                  }
                                : {}
                        }
                        className={style.right_cnt}
                    >
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
            <Guide open={guide} setOpen={setGuide} />
        </>
    );
}
export default Account;

const SwitchLanguage = () => {
    const { t, language, setLanguage } = useContext(AppContext);
    const handleChangeLang = (code: string) => {
        setLanguage(code);
        i18next.changeLanguage(code);
    };
    return (
        <div className={clst([style.link_item, style.link_item_lang])}>
            <div className={style.link_item_lang_left}>
                <img
                    src={icon.languagePurple}
                    className={style.link_item_icon}
                    alt=""
                />
                {t("Header.language")}
            </div>
            <div className={style.link_item_lang_right}>
                <div
                    style={
                        language === "en"
                            ? {
                                  marginLeft: "30px",
                              }
                            : {}
                    }
                    className={style.switch_btn}
                >
                    {language}
                </div>
                {languages.map((lang) => (
                    <div
                        onClick={() => handleChangeLang(lang.code)}
                        key={lang.code}
                        className={style.link_item_lang_item}
                    >
                        {lang.code}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const HeadAccount = () => {
    const history = useHistory();
    const { USER } = useSelector((state: IStore) => state.USER);
    const dispatch = useDispatch();
    const { cartList, cartQuantity } = useSelector((state: any) => state.carts);
    useEffect(() => {
        dispatch(getTotal(USER?.id));
    }, [cartList]);
    return (
        <div className={style.header_container}>
            <div className={style.btn_cnt}>
                <XButton
                    onClick={() => history.push("/tai-khoan/thong-tin-ca-nhan")}
                    className={style.icon_btn}
                    icon={icon.settingLineBlack}
                />
            </div>
            <div className={style.btn_cnt}>
                <XButton
                    onClick={() => history.push("/gio-hang")}
                    className={style.icon_btn}
                    icon={icon.cartLineBlack}
                />
                {cartQuantity > 0 && (
                    <span className={style.btn_cnt_count}>
                        {cartList > 9 ? "9+" : cartQuantity}
                    </span>
                )}
            </div>
        </div>
    );
};

export const HeadTitle = ({
    title,
    rightBtn,
}: {
    title: string;
    rightBtn?: React.ReactNode;
}) => {
    const history = useHistory();
    return (
        <div className={style.head_title}>
            <XButton
                className={style.head_title_btn}
                icon={icon.chevronLeft}
                iconSize={24}
                onClick={() => history.goBack()}
            />
            <span className={style.head_title_text}>{title}</span>
            {rightBtn ?? <div className={style.head_title_right}></div>}
        </div>
    );
};
