import { XButton } from 'components/Layout';
import icon from 'constants/icon';
import { IBanner } from 'interface';
import React from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { clst } from 'utils';
import style from './banner-mobile.module.css'

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

const settings = {
    dots: true,
    // infinite: true,
    arrows: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextButton />,
    prevArrow: <PrevButton />,
    swipe: true,
    // autoplay: true,
    // autoplaySpeed: 2000,
    appendDots: (dots: any) => (
        <div className="banner-dot">
            <ul>{dots}</ul>
        </div>
    ),
}
const features = [
    { title: "Cộng đồng", icon: icon.communityPurple, func: "COM" },
    { title: "Lịch hẹn", icon: icon.calendarGreen, func: "CAL" },
    { title: "Mã giảm giá", icon: icon.ticketRed, func: "DIS" },
    { title: "Rewards", icon: icon.rewardOrange, func: "REW" }
]
const cates = [
    { title: 'Sản phẩm', icon: icon.cateSanpham, link: `product` },
    { title: 'Spa', icon: icon.cateSpa, link: `/ket-qua-tim-kiem/cua-hang?keyword=spa` },
    { title: 'Nail', icon: icon.cateNail, link: `/ket-qua-tim-kiem/cua-hang?keyword=nail` },
    { title: 'Salon', icon: icon.cateSalon, link: `/ket-qua-tim-kiem/cua-hang?keyword=salon` },
    { title: 'Clinic', icon: icon.cateClinic, link: `/ket-qua-tim-kiem/cua-hang?keyword=clinic` },
]

function HomeBanner2() {
    const { banners } = useSelector((state: any) => state.HOME)

    return (
        <div className={style.container}>
            <div className={style.banner_container}>
                <Slider {...settings} >
                    {
                        banners.map((item: IBanner, index: number) => (
                            <div key={index} className={style.banner_item_cnt}>
                                <img className={style.banner_img} src={item.imageURL} alt="" />
                            </div>
                        ))
                    }
                </Slider>
            </div>
            <div className={style.right_container}>
                {
                    features.map(item => (
                        <div key={item.title} className={style.feature_item_cnt}>
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
    );
}

export default HomeBanner2;