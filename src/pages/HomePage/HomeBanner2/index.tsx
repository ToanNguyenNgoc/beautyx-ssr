import { XButton } from "components/Layout";
import icon from "constants/icon";
import { IBanner } from "interface";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { clst, slugify } from "utils";
import tracking from "api/trackApi";
import style from "./banner-mobile.module.css";
import { formatRouterLinkOrg } from "utils/formatRouterLink/formatRouter";
import { useHistory } from "react-router-dom";
import { Dialog } from "@mui/material";
import { PopupMessage } from "components/Notification";
import { useDeviceMobile } from "hooks";
import { AppContext } from "context/AppProvider";
import {bannersHard} from '../data'
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";

interface PopupProps {
    open: boolean;
    banner: IBanner | null;
}

const PrevButton = (props: any) => {
    const { onClick } = props;
    return (
        <XButton
            onClick={onClick}
            className={clst([style.slide_btn, style.slide_btn_left])}
            icon={icon.chevronRight}
            iconSize={24}
        />
    );
};

const NextButton = (props: any) => {
    const { onClick } = props;
    return (
        <XButton
            onClick={onClick}
            className={clst([style.slide_btn, style.slide_btn_right])}
            icon={icon.chevronRight}
        />
    );
};


function HomeBanner2() {
    const { t } = useContext(AppContext) as any
    const PLAT_FORM = EXTRA_FLAT_FORM()
    const features = [
        // { title: "Vị trí", icon: icon.pinMapRed, func: "MAP" },
        { title: t('Home.community'), icon: icon.communityPurple, func: "COM" },
        { title: t('Home.appointment'), icon: icon.calendarGreen, func: "CAL" },
        { title: t('Home.coupon_code'), icon: icon.ticketRed, func: "DIS" },
        { title: "Rewards", icon: icon.rewardOrange, func: "REW" },
    ];
    const { banners } = useSelector((state: any) => state.HOME);
    const [popup, setPopup] = useState<PopupProps>({
        open: false,
        banner: null,
    });
    const IS_MB = useDeviceMobile();
    const history = useHistory();
    const settings = {
        dots: true,
        arrows: !IS_MB,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextButton />,
        prevArrow: <PrevButton />,
        swipe: true,
        autoplay: IS_MB,
        autoplaySpeed: 3500,
        appendDots: (dots: any) => (
            <div className="banner-dot">
                <ul>{dots}</ul>
            </div>
        ),
    };
    const onClickBanner = (item: IBanner) => {
        tracking.BANNER_CLICK(banners.id);
        if (item) {
            switch (item.type) {
                case "VIDEO":
                    return setPopup({ open: true, banner: item });
                case "HTML":
                    return setPopup({ open: true, banner: item });
                case "WEB":
                    return window.open(
                        `${item.url}`,
                        "_blank",
                        "noopener,noreferrer"
                    );
                case "SEARCH_RESULT":
                    return history.push({
                        pathname: `/landingpage/${slugify(item.name)}?id=${item.id
                            }`,
                    });
                case "PROMOTION":
                    return console.log("PROMOTION");
                case "ORGANIZATION":
                    return history.push({
                        pathname: formatRouterLinkOrg(item.origin_id),
                    });
                default:
                    break;
            }
        }
    };
    const [message, setMessage] = useState({
        open: false,
        content: '',
        icon: ''
    })
    const onFeatureClick = (func: string) => {
        switch (func) {
            case "COM":
                return setMessage({
                    open: true,
                    content: 'Tính năng "Cộng đồng" đang trong giai đoạn phát triển.',
                    icon: icon.communityPurple
                });
            // return history.push('/cong-dong')
            case "REW":
                return setMessage({
                    open: true,
                    content: 'Tính năng "Rewards" đang trong giai đoạn phát triển.',
                    icon: icon.rewardOrange
                });
            // return history.push('/coins')
            case "CAL":
                return history.push("/lich-hen?tab=1");
            case "MAP":
                return history.push("/ban-do");
            case "DIS":
                return history.push("/ma-giam-gia");
            default:
                break;
        }
    };
    const banners2 = bannersHard(PLAT_FORM)
    const banners1 = banners.slice(0,1)
    const bannersLast = banners.slice(1, banners.length)
    const BANNERS = [...banners1,...banners2,...bannersLast]

    return (
        <div className={style.container}>
            <div className={style.banner_container}>
                <Slider {...settings}>
                    {BANNERS.map((item: IBanner, index: number) => (
                        <div
                            onClick={() => onClickBanner(item)}
                            key={index}
                            className={style.banner_item_cnt}
                        >
                            <img
                                className={style.banner_img}
                                src={item.imageURL}
                                // src='https://res.cloudinary.com/dt3auapd8/image/upload/v1673340495/Banner_BeautyX_Momo_1_btsvmb.jpg'
                                alt=""
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            <PopupBanner popup={popup} setPopup={setPopup} />
            <div className={style.right_container_wrapper}>
                <div className={style.right_container}>
                    {features.map((item) => (
                        <div
                            onClick={() => onFeatureClick(item.func)}
                            key={item.title}
                            className={style.feature_item_cnt}
                        >
                            <div className={style.feature_item_icon}>
                                <img src={item.icon} alt="" />
                            </div>
                            <span className={style.feature_item_title}>
                                {item.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <PopupMessage
                open={message.open}
                onClose={() => setMessage({ ...message, open: false })}
                content={message.content}
                autoHide={true}
                iconLabel={message.icon}
                iconSize={40}
            />
        </div>
    );
}

export default HomeBanner2;

interface PopupBannerProps {
    popup: PopupProps;
    setPopup: (popup: PopupProps) => void;
}

const PopupBanner = (props: PopupBannerProps) => {
    const { popup, setPopup } = props;
    return (
        <Dialog
            open={popup.open}
            onClick={() => setPopup({ open: false, banner: null })}
        >
            <div className={style.popup_container}>
                {/* {popup.banner?.type === "VIDEO" && (
                    <div className={style.video_container}>
                        <ReactPlayer
                            controls
                            width={"100%"}
                            height={"100%"}
                            url={`${popup.banner?.url}`}
                        />
                    </div>
                )} */}
                {popup.banner?.type === "HTML" && (
                    <div className={style.html_container}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: popup.banner?.htmlTemplate ?? "",
                            }}
                        ></div>
                    </div>
                )}
            </div>
        </Dialog>
    );
};
