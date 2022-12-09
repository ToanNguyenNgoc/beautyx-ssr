/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    KeyboardEvent,
} from "react";
import img from "constants/img";
import icon from "constants/icon";
import style from "./head.module.css";
import { Container, Dialog } from "@mui/material";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import IStore from "interface/IStore";
import { AppContext } from "context/AppProvider";
import Search from "features/Search";
import { debounce } from "lodash";
import { clst, extraParamsUrl } from "utils";
import { XButton } from "components/Layout";
import { onResetFilter } from "redux/filter-result";
import Slider from "react-slick";
import { useDeviceMobile } from "hooks";
import HeadTitle from "features/HeadTitle";
import { searchKeyRecommend } from 'pages/HomePage/data'
import { postHistorySearch } from "user-behavior";
import HeadCart from "./HeadCart";
import HeadMenu from "./HeadMenu";
import HeadNoti from "./HeadNoti";

interface IProps {
    title?: string,
    iconBack?: string
}
const homePath = [
    "/TIKI",
    "/MOMO",
    "/TIKI/",
    "/MOMO/",
    "/MBBANK",
    "/",
    "/homepage/",
    "/homepage",
];

const pathHeader = [
    "/TIKI",
    "/MOMO",
    "/TIKI/",
    "/MOMO/",
    "/MBBANK",
    "/",
    "/homepage/",
    "/homepage",
    "/ket-qua-tim-kiem/dich-vu",
    "/ket-qua-tim-kiem/san-pham",
    "/ket-qua-tim-kiem/cua-hang",
    "/xu-huong"
]
const notPathHeader = [
    '/sign-in',
    '/doi-mat-khau',
    '/trang-thai-don-hang/'
]


function Head(props: IProps) {
    const { title, iconBack } = props;
    const location: any = useLocation();
    const IS_MB = useDeviceMobile()
    const pathname = location.pathname;
    let showRecommendKey = false;
    if (homePath.includes(pathname)) showRecommendKey = true;
    let changeStyle = false
    let showHeader = false
    if (!IS_MB) showHeader = true
    if (IS_MB && pathHeader.includes(pathname)) showHeader = true
    if (notPathHeader.includes(pathname)) showHeader = false
    if (IS_MB && homePath.includes(pathname)) changeStyle = true


    const { t } = useContext(AppContext);
    const [key, setKey] = useState({ key: "", key_debounce: "" });
    const history = useHistory();
    const { USER } = useSelector((state: IStore) => state.USER);
    const refSearch = useRef<any>();
    const dispatch = useDispatch();
    //
    const [openSearch, setOpenSearch] = useState(false)
    const onToggleSearch = (dis: "show" | "hide") => {
        if (dis === "show")
            return refSearch?.current?.classList.add(style.head_search_show);
        if (dis === "hide" && !IS_MB)
            return refSearch?.current?.classList.remove(style.head_search_show);
    };
    const onCloseSearchTimeOut = () => {
        setTimeout(() => {
            refSearch?.current?.classList.remove(style.head_search_show);
        }, 100);
    };
    //
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSetDebounceKeyword = useCallback(
        debounce((text) => setKey({ key: text, key_debounce: text }), 600),
        []
    );
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSetDebounceKeyword(e.target.value);
        setKey({ ...key, key: e.target.value });
    };
    const onResult = () => {
        if (key.key_debounce !== "") {
            history.push({
                pathname: "/ket-qua-tim-kiem/dich-vu",
                search: `?keyword=${encodeURIComponent(key.key_debounce)}`,
            });
            onCloseSearchTimeOut();
            dispatch(onResetFilter());
            if (USER) postHistorySearch(key.key_debounce, 'KEYWORD')
        }
    };
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
            onResult();
        }
    };
    //
    const paramUrl: any = extraParamsUrl();
    const keywordUrl = paramUrl?.keyword ?? "";
    //handle scroll
    const scroll = () => {
        const scrolled = window.scrollY;
        const header = document.getElementById("header");
        const windowPosition = scrolled > 60;
        if (header && changeStyle) {
            header.classList.toggle(style.container_ch_white, windowPosition);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", scroll);
        return () => window.removeEventListener("scroll", scroll);
    }, [scroll]);
    return (
        showHeader ?
            <>
                <div
                    id="header"
                    className={
                        changeStyle
                            ? clst([style.container, style.container_ch])
                            : style.container
                    }
                >
                    <HeadTitle title={title} />
                    <Container>
                        <div className={style.head_wrapper}>
                            <div className={style.head_top}>
                                <div className={style.head_top_left}>
                                    <Link to={{ pathname: "/" }}>
                                        <img
                                            className={style.head_top_left_img}
                                            src={img.beautyxSlogan}
                                            alt=""
                                        />
                                    </Link>
                                    <BackContainer iconBack={iconBack} changeStyle={changeStyle} />
                                    <button
                                        className={style.head_top_left_search}
                                        onFocus={() => onToggleSearch("show")}
                                        onClick={() => {
                                            onToggleSearch("show");
                                            IS_MB && setOpenSearch(true)
                                        }}
                                        onBlur={() => onToggleSearch("hide")}
                                    >
                                        <img
                                            onClick={onResult}
                                            className={style.head_search_icon}
                                            alt=""
                                            src={icon.searchPurple}
                                        />
                                        <input
                                            onChange={onChange}
                                            className={style.head_search_input}
                                            type="text"
                                            placeholder="Bạn muốn tìm kiếm gì..."
                                            disabled={IS_MB}
                                            value={IS_MB ? keywordUrl : key.key}
                                            onKeyDown={handleKeyDown}
                                        />
                                        {IS_MB && showRecommendKey && (
                                            <SearchRecommend />
                                        )}
                                        {
                                            !IS_MB &&
                                            <div
                                                ref={refSearch}
                                                className={style.head_search}
                                            >
                                                <Search
                                                    onCloseSearchTimeOut={
                                                        onCloseSearchTimeOut
                                                    }
                                                    key_work={key.key}
                                                    key_work_debounce={key.key_debounce}
                                                />
                                            </div>
                                        }
                                    </button>
                                    <Dialog
                                        open={openSearch}
                                        fullScreen={true}
                                    >
                                        <Search
                                            onCloseSearchTimeOut={
                                                onCloseSearchTimeOut
                                            }
                                            onCloseSearchDialog={() => setOpenSearch(!openSearch)}
                                            key_work={key.key}
                                            key_work_debounce={key.key_debounce}
                                        />
                                    </Dialog>
                                </div>
                                <div className={style.head_top_right}>
                                    <XButton
                                        className={style.head_btn_partner}
                                        title={t("Header.1")}
                                        onClick={() => history.push("/partner")}
                                    />
                                    {USER ? (
                                        <>
                                            <Link
                                                to={{
                                                    pathname:
                                                        "/tai-khoan/thong-tin-ca-nhan",
                                                }}
                                                className={style.head_top_right_user}
                                            >
                                                <img
                                                    className={style.head_user_avatar}
                                                    src={USER?.avatar}
                                                    alt=""
                                                />
                                                <span className={style.head_user_name}>
                                                    {USER?.fullname}
                                                </span>
                                            </Link>
                                            <HeadNoti />
                                        </>
                                    ) : (
                                        <div className={style.head_top_right_auth}>
                                            <XButton
                                                className={style.head_sign_btn}
                                                title={t("Home.Sign_up")}
                                                onClick={() =>
                                                    history.push("/sign-up?2")
                                                }
                                            />
                                            <XButton
                                                onClick={() =>
                                                    history.push("/sign-in?1")
                                                }
                                                className={style.head_sign_btn}
                                                title={t("Home.Sign_in")}
                                            />
                                        </div>
                                    )}
                                    {!IS_MB && (
                                        <HeadMenu />
                                    )}
                                    <HeadCart />
                                </div>
                            </div>
                            <div className={style.head_bot}>

                            </div>
                        </div>
                    </Container>
                </div>
            </>
            :
            <></>
    );
}

export default Head;





const SearchRecommend = () => {
    const [key, setKey] = useState("Gội đầu");
    const history = useHistory();
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2600,
        speed: 650,
        afterChange: function (index: number) {
            setKey(searchKeyRecommend[index]);
        },
    };
    const onResult = () => {
        history.push({
            pathname: "/ket-qua-tim-kiem/dich-vu",
            search: `?keyword=${encodeURIComponent(key)}`,
        });
    };
    return (
        <div className={style.re_container}>
            <div className={style.slider_wrapper}></div>
            <Slider {...settings}>
                {searchKeyRecommend.map((item) => (
                    <span key={item} className={style.re_container_text}>
                        {item}
                    </span>
                ))}
            </Slider>
            <div
                onClick={(e) => {
                    onResult();
                    e.preventDefault();
                    e.stopPropagation();
                }}
                className={style.re_container_btn}
            >
                <img src={icon.searchPurple} alt="" />
            </div>
        </div>
    );
};
const BackContainer = ({ changeStyle, iconBack }: { changeStyle?: boolean, iconBack?: string }) => {
    const history = useHistory();
    const location = useLocation();
    const pathname = location.pathname;
    let show = true;
    if (homePath.includes(pathname)) show = false;
    return show ? (
        <XButton
            className={
                changeStyle ?
                    clst([style.head_back_btn, style.head_back_btn_change])
                    :
                    style.head_back_btn
            }
            icon={iconBack ?? icon.chevronLeft}
            iconSize={28}
            onClick={() => history.goBack()}
        />
    ) : (
        <></>
    );
};
