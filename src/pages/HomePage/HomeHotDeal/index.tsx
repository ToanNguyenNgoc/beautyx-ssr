import React, { useContext } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import img from "../../../constants/img";
import { AppContext } from "../../../context/AppProvider";
import HomeTitle from "../Components/HomeTitle";
import HomePromo from "../HomePromo";
import "./homeHotDeal.css";
export default function HomeHotDeal() {
    const { t } = useContext(AppContext);
    const { FILTER_PROMO } = useSelector((state: any) => state.FILTER);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        //    nextArrow: <NextButton />,
        //    prevArrow: <PrevButton />,
        swipe: true,
        autoplaySpeed: 2000,
        //fade: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    swipe: false,
                    className: "center",
                    centerMode: true,
                    centerPadding: "100px",
                    autoplay: false,
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    swipe: true,
                    dots: false,
                    speed: 500,
                    autoplaySpeed: 3000,
                    slidesToShow: 1,
                    className: "center",
                    centerMode: true,
                    centerPadding: "30px",
                },
            },
        ],
        appendDots: (dots: any) => (
            <div className="banner-dot">
                <ul>{dots}</ul>
            </div>
        ),
        // afterChange: function (index: number) {
        //     setChooseBanner(banners[index]);
        // },
    };
    return (
        <div className="home-hot__deal">
            <HomeTitle
                title={t("home_2.top_deal")}
                url={`/deal-lam-dep-cuc-HOT?sort=${FILTER_PROMO.query}`}
                seemore={t("trending.watch_all") + " > "}
            />
            {/* <ul className="dealHot-listBanner">
                <Slider {...settings}>
                    <li className="dealHot-listBanner__item">
                        <img src={img.banner} alt="" />
                    </li>
                    <li className="dealHot-listBanner__item">
                        <img
                            src={"https://source.unsplash.com/random"}
                            alt=""
                        />
                    </li>
                    <li className="dealHot-listBanner__item">
                        <img src={img.banner} alt="" />
                    </li>
                    <li className="dealHot-listBanner__item">
                        <img
                            src={"https://source.unsplash.com/random"}
                            alt=""
                        />
                    </li>
                </Slider>
            </ul> */}

            <HomePromo />
        </div>
    );
}
