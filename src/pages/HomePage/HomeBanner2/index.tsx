import { XButton } from 'components/Layout';
import icon from 'constants/icon';
import { IBanner } from 'interface';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { clst, slugify, useDeviceMobile } from 'utils';
import tracking from 'api/trackApi'
import style from './banner-mobile.module.css'
import { formatRouterLinkOrg } from 'utils/formatRouterLink/formatRouter';
import { useHistory } from 'react-router-dom';
import { Dialog } from '@mui/material';
import ReactPlayer from 'react-player';

interface PopupProps {
    open: boolean, banner: IBanner | null
}

const PrevButton = (props: any) => {
    const { onClick } = props;
    return (
        <XButton
            onClick={onClick}
            className={style.slide_btn}
            icon={icon.chevronLeft}
            iconSize={24}
        />
    )
}

const NextButton = (props: any) => {
    const { onClick } = props;
    return (
        <XButton
            onClick={onClick}
            className={clst([style.slide_btn, style.slide_btn_right])}
            icon={icon.chevronRight}
        />
    )
}

const features = [
    { title: "Cộng đồng", icon: icon.communityPurple, func: "COM" },
    { title: "Lịch hẹn", icon: icon.calendarGreen, func: "CAL" },
    { title: "Mã giảm giá", icon: icon.ticketRed, func: "DIS" },
    { title: "Rewards", icon: icon.rewardOrange, func: "REW" }
]

function HomeBanner2() {
    const { banners } = useSelector((state: any) => state.HOME)
    const [popup, setPopup] = useState<PopupProps>({
        open: false, banner: null
    })
    const IS_MB = useDeviceMobile()
    const history = useHistory()
    const settings = {
        dots: true,
        arrows: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextButton />,
        prevArrow: <PrevButton />,
        swipe: true,
        appendDots: (dots: any) => (
            <div className="banner-dot">
                <ul>{dots}</ul>
            </div>
        ),
    }
    const onClickBanner = (item: IBanner) => {
        console.log(item)
        tracking.BANNER_CLICK(banners.id);
        if (item) {
            switch (item.type) {
                case "VIDEO":
                    return setPopup({ open: true, banner: item });
                case "HTML":
                    return setPopup({ open: true, banner: item });
                case "WEB":
                    return window.open(`${item.url}`, "_blank", "noopener,noreferrer");
                case "SEARCH_RESULT":
                    return history.push({
                        pathname: `/landingpage/${slugify(item.name)}?id=${item.id}`,
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
    }
    const onFeatureClick = (func: string) => {
        switch (func) {
            case "COM":
                return console.log(func);
            case "CAL":
                return history.push('/lich-hen?tab=1')
            default:
                break;
        }
    }

    return (
        <div className={style.container}>
            <div className={style.banner_container}>
                <Slider {...settings} >
                    {
                        banners.map((item: IBanner, index: number) => (
                            <div
                                onClick={() => onClickBanner(item)}
                                key={index} className={style.banner_item_cnt}
                            >
                                <img className={style.banner_img} src={item.imageURL} alt="" />
                                {
                                    IS_MB &&
                                    <div className={style.banner_mb_cnt}>
                                    <img className={style.banner_mb_cnt_img} src={item.imageURL} alt="" />
                                </div>
                                }
                            </div>
                        ))
                    }
                </Slider>
            </div>
            <PopupBanner popup={popup} setPopup={setPopup} />
            <div className={style.right_container_wrapper}>
                <div className={style.right_container}>
                    {
                        features.map(item => (
                            <div
                                onClick={() => onFeatureClick(item.func)}
                                key={item.title} className={style.feature_item_cnt}
                            >
                                <div className={style.feature_item_icon}>
                                    <img src={item.icon} alt="" />
                                </div>
                                <span className={style.feature_item_title}>
                                    {item.title}
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default HomeBanner2;

interface PopupBannerProps {
    popup: PopupProps, setPopup: (popup: PopupProps) => void
}

const PopupBanner = (props: PopupBannerProps) => {
    const { popup, setPopup } = props
    return (
        <Dialog
            open={popup.open}
            onClick={() => setPopup({ open: false, banner: null })}
        >
            <div className={style.popup_container}>
                {
                    popup.banner?.type === 'VIDEO' &&
                    <div className={style.video_container}>
                        <ReactPlayer
                            controls
                            width={"100%"}
                            height={"100%"}
                            url={`${popup.banner?.url}`}
                        />
                    </div>
                }
                {
                    popup.banner?.type === 'HTML' &&
                    <div className={style.html_container}>
                        <div dangerouslySetInnerHTML={{ __html: popup.banner?.htmlTemplate ?? '' }} ></div>
                    </div>
                }
            </div>
        </Dialog>
    )
}