/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect, useRef } from "react";
import "./head.css";
import { Container } from "@mui/material";
import ButtonCus from "../../components/ButtonCus";
import { AppContext } from "../../context/AppProvider";
import { Link, useHistory, useLocation } from "react-router-dom";
import icon from "../../constants/icon";
import img from "../../constants/img";
import Notification from "./components/Notification";
import Language from "./components/Language";
import Menu from "./components/Menu";
import { useSelector, useDispatch } from "react-redux";
import { getTotal } from "../../redux/cartSlice";
import MbMenu from "../../featuresMobile/Menu";
import scrollTop from "../../utils/scrollTop";
import { EXTRA_FLAT_FORM } from "../../api/extraFlatForm";
import Search from "../Search";
import { onToggleSearchCnt } from "../../redux/search/searchSlice";

// function hiddenFilter() {
//   document.querySelector('.header-filter')?.classList.remove('header-file__ac')
// }
// // onload event
// window.addEventListener("scroll", function () {
//   if (hiddenFilter) {
//     hiddenFilter()
//   }
// });
//////

interface IProps {
    IN_HOME?: boolean,
    setCloseDialog?: (closeDialog?: boolean) => void,
    headerStyle?: any,
    handleCancelPayment?: () => void,
    prev_url?: string,
}

function Head(props: IProps) {
    const {
        t,
        //profile,
        //userInfo
    } = useContext(AppContext);
    const location = useLocation();
    const currentUrl = location.pathname;
    const FLAT_FORM = EXTRA_FLAT_FORM();
    const dispatch = useDispatch();
    const {
        IN_HOME,
        setCloseDialog,
        headerStyle,
        handleCancelPayment,
        prev_url,
    } = props;
    const [openNo, setOpenNo] = useState(false);
    const [openLang, setOpenLang] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [openMbMenu, setOpenMbMenu] = useState(false);
    const { appsToday } = useSelector((state: any) => state.APP.APPS);
    const [unit, setUnit] = useState("VND");
    const history = useHistory();
    const { ORDER_SERVICES_NOT_BOOK_COUNT } = useSelector((state: any) => state.ORDER);

    //get total amount cart

    const carts = useSelector((state: any) => state.carts);
    const USER = useSelector((state: any) => state.USER.USER);
    const { open } = useSelector((state: any) => state.SEARCH);
    const refAva: any = useRef();
    const refMenu: any = useRef();
    const refLang: any = useRef();

    useEffect(() => {
        dispatch(getTotal(USER?.id));
    }, [dispatch, carts, USER?.id]);
    const gotoPartner = () => {
        if (IN_HOME === true) {
            history.push("/kenh-nguoi-ban");
        } else {
            if (handleCancelPayment) {
                handleCancelPayment();
            }
            if (prev_url) {
                history.push(`${prev_url}`);
            } else {
                history.goBack();
            }
        }
    };
    const gotoPageSignUp = () => {
        history.push({
            pathname: "/sign-up",
            search: "2",
        });
    };
    const gotoPageSignIn = () => {
        history.push({
            pathname: "/sign-in",
            search: "1",
        });
    };
    const openNotiClick = () => {
        setOpenNo(!openNo);
        setOpenLang(false);
        setOpenMenu(false);
    };

    const openLangClick = () => {
        setOpenLang(!openLang);
        setOpenNo(false);
        setOpenMenu(false);
    };
    const openMenuClick = () => {
        setOpenMenu(!openMenu);
        setOpenLang(false);
        setOpenNo(false);
    };
    const handleBack = () => {
        if (handleCancelPayment) {
            handleCancelPayment();
        }
        if (setCloseDialog) {
            return setCloseDialog(false);
        }
        if (prev_url) {
            history.push(`${prev_url}`);
        } else {
            history.goBack(-1);
        }
        scrollTop();
    };
    const onBackHome = () => {
        if (handleCancelPayment) {
            handleCancelPayment();
        }
        history.push("/");
    };
    const onOpenSearchContainer = () => {
        const action = open ? false : true;
        dispatch(onToggleSearchCnt(action));
    };
    const onGotoCart = () => {
        if (USER) {
            history.push("/gio-hang");
        } else {
            history.push("/sign-in?1");
        }
    };

    useEffect(() => {
        if (openNo === true || openLang === true || openMenu === true) {
            const handleClickWindow = () => {
                window.addEventListener("click", function (e: any) {
                    if (!refAva?.current?.contains(e.target)) {
                        setOpenNo(false);
                    }
                    if (!refLang?.current?.contains(e.target)) {
                        setOpenLang(false);
                    }
                    if (!refMenu?.current?.contains(e.target)) {
                        setOpenMenu(false);
                    }
                });
            };
            handleClickWindow();
        }
    }, [openNo, openLang, openMenu]);

    return (
        <div style={headerStyle} className="hd">
            <Container>
                <div className="flex-row-sp hd-cnt">
                    <div className="hd-logo">
                        <img onClick={onBackHome} src={img.beautyX} alt="" />
                    </div>
                    <div className="flex-row hd-cnt__left">
                        <ButtonCus
                            text={
                                IN_HOME === true
                                    ? t("Header.seller_center")
                                    : t("Header.back")
                            }
                            borderRadius="18px"
                            lineHeight="20px"
                            color="var(--purple)"
                            border="solid 1px var(--purple)"
                            onClick={gotoPartner}
                        />
                        {/* <button
              onClick={() => history.push('/beautyx-videos')}
              className="flex-row hd-cnt__left-btn"
            >
              <img src={icon.playCirclePurple} alt="" />
              Video
            </button> */}
                        <button onClick={() => window.open('https://beautyx.vn/blog','_blank')} className="flex-row hd-cnt__left-btn">
                            <img src={icon.newsPurple} alt="" />
                            Tin tức
                        </button>
                    </div>
                    <img
                        onClick={handleBack}
                        src={icon.backWhite}
                        alt=""
                        className="mb-back__btn"
                    />
                    <div
                        style={
                            USER
                                ? { justifyContent: "space-between" }
                                : { justifyContent: "flex-end" }
                        }
                        className="flex-row hd-cnt__right"
                    >
                        <div className="header-search">
                            <img
                                className="header-search-icon"
                                src={icon.searchPurple}
                                alt=""
                                onClick={() => onOpenSearchContainer()}
                            />
                        </div>
                        {!USER ? (
                            <>
                                <div className="flex-row hd-cnt__sign-btn">
                                    <ButtonCus
                                        text={t("Home.Sign_up")}
                                        fontSize="14px"
                                        lineHeight="20px"
                                        color="var(--purple)"
                                        onClick={gotoPageSignUp}
                                    />
                                    <ButtonCus
                                        text={t("Home.Sign_in")}
                                        color="var(--bg-gray)"
                                        fontSize="14px"
                                        lineHeight="20px"
                                        backColor="var(--purple)"
                                        borderRadius="18px"
                                        onClick={gotoPageSignIn}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="flex-row hd-cnt__right-user">
                                <span
                                    className="hd-cnt__right-user-name"
                                    onClick={() =>
                                        history.push(
                                            "/tai-khoan/thong-tin-ca-nhan"
                                        )
                                    }
                                >
                                    {USER?.fullname}
                                </span>
                                <div className="hd-cnt__right-avatar">
                                    {USER ? (
                                        <img
                                            ref={refAva}
                                            style={{ borderRadius: "100%" }}
                                            onClick={openNotiClick}
                                            src={USER?.avatar}
                                            alt=""
                                        />
                                    ) : (
                                        <div className="blank-avatar">
                                            {USER?.fullname?.slice(0, 1)}
                                        </div>
                                    )}
                                    {(appsToday.length > 0 || ORDER_SERVICES_NOT_BOOK_COUNT > 0) && (
                                        <div className="hd-cnt__right-avatar-dot"></div>
                                    )}
                                    <Notification openNo={openNo} />
                                </div>
                                {/* <Link
                                    to={{ pathname: "/chat", state: `${currentUrl}${location.search}` }}
                                    className="head-chat-btn"
                                >
                                    <img src={icon.chatPurple} alt="" />
                                </Link> */}
                            </div>
                        )}
                        {/* menu for mobile */}
                        <div className="mb-hd-cnt__right">
                            <div className="flex-row-sp">
                                <button
                                //onClick={() => setOpenSearch(true)}
                                >
                                    <img src={icon.search} alt="" />
                                </button>
                                <div className="flex-row">
                                    <div
                                        onClick={onGotoCart}
                                        className="hd-cnt__right-cart"
                                    >
                                        <img
                                            src={icon.ShoppingCartSimpleWhite}
                                            alt=""
                                        />
                                        <div className="hd-cnt__right-cart-total">
                                            {carts.cartQuantity}
                                        </div>
                                    </div>
                                    {FLAT_FORM === "BEAUTYX" && (
                                        <img
                                            onClick={() => setOpenMbMenu(true)}
                                            src={icon.menuWhite}
                                            alt=""
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        {FLAT_FORM === "BEAUTYX" && (
                            <MbMenu
                                openMbMenu={openMbMenu}
                                setOpenMbMenu={setOpenMbMenu}
                            />
                        )}
                        {/* --- */}
                        {USER && (
                            <div
                                onClick={openMenuClick}
                                ref={refMenu}
                                className="hd-cnt__right-menu"
                            >
                                <img src={icon.Menu} alt="" />
                                <Menu
                                    USER={USER}
                                    openMenu={openMenu}
                                    setOpenMenu={setOpenMenu}
                                />
                            </div>
                        )}
                        <div
                            ref={refLang}
                            onClick={openLangClick}
                            className="hd-cnt__right-lang"
                        >
                            <div className="flex-row">
                                <img src={icon.languagePurple} alt="" />
                                {t("Header.language")}
                            </div>
                            <Language
                                openLang={openLang}
                                unit={unit}
                                setUnit={setUnit}
                                setOpenLang={setOpenLang}
                            />
                        </div>
                        <div
                            onClick={onGotoCart}
                            className="hd-cnt__right-cart"
                        >
                            <img src={icon.ShoppingCartSimple} alt="" />
                            <div className="hd-cnt__right-cart-total">
                                {carts.cartQuantity}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Search />
        </div>
    );
}

export default Head;
