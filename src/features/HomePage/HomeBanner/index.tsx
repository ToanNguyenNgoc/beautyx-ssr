import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { Container } from "@mui/material";
import Slider from "react-slick";
import icon from "../../../constants/icon";
import { dealHot } from "../../../constants/img";
import { IBanner } from "../../../interface/banner";
import slugify from "../../../utils/formatUrlString";
import scrollTop from "../../../utils/scrollTop";
import HomeBannerPopup from "./HomeBannerPopup";
// import {LazyLoadImage} from 'react-lazy-load-image-component'

import "../../../assets/styles/main.css";
import "./homeBanner.css";
// ==== api tracking ====
import tracking from "../../../api/trackApi";
import { formatRouterLinkOrg } from "../../../utils/formatRouterLink/formatRouter";
// end
const PrevButton = (props: any) => {
    const { onClick } = props;
    return (
        <button onClick={onClick} className="homepage-btn__prev">
            <img src={icon.chevronRight} alt="" />
        </button>
    );
};
const NextButton = (props: any) => {
    const { onClick } = props;
    return (
        <button onClick={onClick} className="homepage-btn__next">
            <img src={icon.chevronRight} alt="" />
        </button>
    );
};

export const deals = [
    {
        id: 1,
        title: "Deal hot từ 50-100k",
        min_price: 50000,
        max_price: 100000,
        img: dealHot.dealhot,
    },
    {
        id: 2,
        title: "Deal chăm sóc da làm đẹp Giảm 50%",
        min_price: null,
        img: dealHot.dealhot1,
        percent: 50,
    },
    {
        id: 3,
        title: "Dịch vụ xâm lấn Giảm 30%",
        min_price: null,
        img: dealHot.dealhot2,
        percent: 30,
    },
];

export default function HomeBanner() {
    const history = useHistory();
    const HOME = useSelector((state: any) => state.HOME);
    const { banners } = HOME;
    const [chooseBanner, setChooseBanner] = useState<IBanner>();
    const [open, setOpen] = useState(false);
    const [openVideo, setOpenVideo] = useState(false);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        //autoplay: true,
        nextArrow: <NextButton />,
        prevArrow: <PrevButton />,
        swipe: true,
        autoplaySpeed: 2000,
        //fade: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    swipe: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    swipe: true,
                    dots: true,
                    speed: 500,
                },
            },
        ],
        appendDots: (dots: any) => (
            <div className="banner-dot">
                <ul>{dots}</ul>
            </div>
        ),
        afterChange: function (index: number) {
            setChooseBanner(banners[index]);
        },
    };
    function openWeb() {
        const payUrl = chooseBanner?.url;
        window.open(`${payUrl}`, "_blank", "noopener,noreferrer");
    }
    function closePopupVideo() {
        setOpenVideo(false);
    }
    const handleClick = () => {
        tracking.BANNER_CLICK(banners.id);
        if (chooseBanner) {
            switch (chooseBanner.type) {
                case "VIDEO":
                    return setOpenVideo(true);
                case "HTML":
                    return setOpen(true);
                case "WEB":
                    return openWeb();
                case "SEARCH_RESULT":
                    console.log(chooseBanner);
                    return history.push({
                        pathname: `/campaign/${encodeURIComponent(chooseBanner.name+'')}`,
                        state: chooseBanner,
                    });
                case "PROMOTION":
                    return console.log("PROMOTION");
                case "ORGANIZATION":
                    return history.push({
                        pathname: formatRouterLinkOrg(chooseBanner.origin_id),
                    });
                default:
                    break;
            }
        }
    };
    const gotoDetail = (item: any) => {
        scrollTop();
        history.push({
            pathname: `/deal/${slugify(item.title)}`,
            search: `${item.id}`,
        });
    };
    useEffect(() => {
        banners.length > 0 && setChooseBanner(banners[0]);
    }, [banners]);
    return (
        <div className="homepage-banner">
            <Container>
                <div className="banner-wraper">
                    <div className="banner-slide">
                        <Slider {...settings}>
                            {banners.map((item: any, index: number) => (
                                <div
                                    onClick={handleClick}
                                    key={index + item.url}
                                    className="banner-slide__img"
                                >
                                    <img
                                        src={item.imageURL}
                                        alt=""

                                    />
                                    {/* <img src={item.imageURL} alt="" /> */}
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="banner-right">
                        <Link
                            to={{
                                pathname: `/deal/${slugify(deals[0].title)}`,
                                search: `${deals[0].id}`,
                            }}
                            className="banner-right__top"
                        >
                            <img src={dealHot.dealhot} alt="" />
                        </Link>
                        <div className="banner-right__bottom">
                            <Link
                                to={{
                                    pathname: `/deal/${slugify(
                                        deals[1].title
                                    )}`,
                                    search: `${deals[1].id}`,
                                }}
                                className="banner-bottom__item"
                            >
                                <img src={dealHot.dealhot1} alt="" />
                            </Link>
                            <Link
                                to={{
                                    pathname: `/deal/${slugify(
                                        deals[2].title
                                    )}`,
                                    search: `${deals[2].id}`,
                                }}
                                className="banner-bottom__item"
                            >
                                <img
                                    onClick={() => gotoDetail(deals[2])}
                                    src={dealHot.dealhot2}
                                    alt=""
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
            <HomeBannerPopup
                data={chooseBanner}
                open={open}
                setOpen={setOpen}
            />

            {openVideo === true ? (
                <div className="homebanner__popup-videobox">
                    <div className="homebanner__popup-video">
                        <span className="close-icon" onClick={closePopupVideo}>
                            x
                        </span>
                        <div className="banner-video">
                            <ReactPlayer
                                controls
                                width={"100%"}
                                height={"100%"}
                                url={`${chooseBanner?.url}`}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
