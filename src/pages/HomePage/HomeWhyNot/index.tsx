import { useContext } from "react";
import { whyNots } from "../data";
import style from "./style.module.css";
import Slider from "react-slick";
import { AppContext } from "context/AppProvider";
import { HomeTitle } from "components/Layout";

function HomeWhyNot() {
    const {t} = useContext(AppContext) as any
    const settings: any = {
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        className: `${style.list}`,
        responsive: [
            {
                breakpoint: 10000, // a unrealistically big number to cover up greatest screen resolution
                settings: "unslick",
            },
            {
                breakpoint: 767,
                settings: {
                    swipe: true,
                    slidesToShow: 1,
                    infinite: false,
                    centerMode: true,
                },
            },
        ],
    };
    return (
        <div className={style.container}>
            <div className={style.whynot_title}>
                <HomeTitle title={t('Home.why_choose')} />
            </div>
            <Slider {...settings}>
                {whyNots.map((item) => (
                    <div key={item.content} className={style.list_item}>
                        <div className={style.list_item_content}>
                            <img src={item.image_url} alt="" />
                            <p className={style.list_item_title}>
                                {item.title}
                            </p>
                            <p className={style.list_item_desc}>
                                {item.content}
                            </p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default HomeWhyNot;
