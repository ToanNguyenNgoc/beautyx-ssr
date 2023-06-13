import { HomeTitle, XButton } from 'components/Layout';
import icon from 'constants/icon';
import { AppContext } from 'context/AppProvider';
import { useDeviceMobile } from 'hooks';
import  { useContext } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { clst, scrollTop, slugify } from 'utils';
import {
    deals,
    // topics 
} from '../data'
import style from './style.module.css'

const Next = (props: any) => {
    return (
        <XButton
            icon={icon.chevronRight}
            onClick={props.onClick}
            className={clst([style.slide_btn, style.slide_btn_next])}
        />
    );
};
const Prev = (props: any) => {
    return (
        <XButton
            icon={icon.chevronLeft}
            onClick={props.onClick}
            className={clst([style.slide_btn, style.slide_btn_prev])}
        />
    );
};

// const settingsSlideBot = {
//     dots: false,
//     infinite: true,
//     arrows: true,
//     speed: 800,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     swipe: true,
//     nextArrow: <Next />,
//     prevArrow: <Prev />,
// };

function HomeTopic() {
    const { t } = useContext(AppContext) as any
    const IS_MB = useDeviceMobile();
    const settingsSlideTop = {
        dots: false,
        infinite: true,
        arrows: true,
        centerPadding: IS_MB ? "14px" : "62px",
        centerMode: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        autoplay: true,
        autoplaySpeed: 2800,
        nextArrow: <Next />,
        prevArrow: <Prev />,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    arrows: false,
                },
            },
        ],
    };
    return (
        <div className={style.container}>
            <div className={style.topic_title}>
                <div className={style.title}>
                    <img src={icon.flash} className={style.title_icon} alt="" />
                    <HomeTitle title={t('Home.Vietnamese_women_totally_beautiful')} />
                </div>
            </div>
            <div className={style.body}>
                <div className={style.body_top}>
                    <Slider {...settingsSlideTop} >
                        {
                            deals.map(item => (
                                <Link
                                    onClick={()=>scrollTop()}
                                    to={{
                                        pathname: `/deal/${slugify(item.title)}`
                                    }}
                                    key={item.id} className={style.detail_item_cnt}
                                >
                                    <img className={style.detail_item_cnt_img} src={item.banner} alt="" />
                                </Link>
                            ))
                        }
                    </Slider>
                </div>
                <div className={style.body_bot}>
                    {/* {!IS_MB ? (
                        <Slider {...settingsSlideBot}>
                            {topics.map((item) => (
                                <TopicItem key={item.id} item={item} />
                            ))}
                        </Slider>
                    ) : (
                        <div className={style.topic_cnt_mb}>
                            {topics.map((item) => (
                                <TopicItem key={item.id} item={item} />
                            ))}
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}

export default HomeTopic;

// const TopicItem = (props: any) => {
//     const { item } = props;
//     return (
//         <div className={style.topic_item}>
//             <img src={item.image_url} className={style.topic_item_img} alt="" />
//             <div className={style.topic_item_desc}>
//                 <div>
//                     <p className={style.topic_item_desc_title}>{item.title}</p>
//                     <p className={style.topic_item_desc_content}>
//                         {item.content}
//                     </p>
//                 </div>
//                 <XButton
//                     className={style.topic_item_btn}
//                     title="Xem chi tiết"
//                 />
//             </div>
//         </div>
//     );
// };
