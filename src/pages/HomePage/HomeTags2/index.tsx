import { XButton } from 'components/Layout';
import icon from 'constants/icon';
import { ITag } from 'interface';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { slugify, scrollTop } from 'utils';
import HomeTitle from '../Components/HomeTitle';
import style from './style.module.css'

const NextButton = (props: any) => {
    return (
        <XButton
            className={style.next_btn}
            onClick={() => props.onClick()}
            icon={icon.chevronRight}
        />
    )
}
const PrevButton = (props: any) => {
    const { onClick } = props;
    return (
        <XButton
            className={style.prev_btn}
            onClick={onClick}
            icon={icon.chevronLeft}
        />
    )
}

function HomeTags2() {
    const [slide, setSlide] = useState(0)
    const settings = {
        dots: false,
        infinite: false,
        arrows: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: slide === 0 ? <NextButton /> : <></>,
        prevArrow: slide === 1 ? <PrevButton /> : <></>,
        swipe: true,
        afterChange: function (index: number) {
            setSlide(index)
        },
    }

    //---
    const { tags } = useSelector((state: any) => state.HOME)
    const TAGS_SERVICE = tags?.map((i: ITag) => {
        return {
            // ...i,
            children: i.children?.filter((child: ITag) => child.group === "SERVICE")
        }
    })?.filter((tag: any) => tag.children?.length > 0)?.sort((a: any, b: any) => b.children?.length - a.children?.length)
    const cateList = TAGS_SERVICE.map((item: any) => item.children).flat()
    return (
        <div className={style.container}>
            <HomeTitle
                title={'Danh mục nối bật'}
            />
            <div className={style.cate_list_cnt}>
                <Slider {...settings} >
                    <ul
                        className={style.cate_list}
                    >
                        {
                            cateList.slice(0, 16).map((item: ITag, index: number) => (
                                <li key={index} className={style.cate_item_cnt}>
                                    <Link
                                        onClick={scrollTop}
                                        className={style.cate_link}
                                        to={{ pathname: `/danh-sach-dich-vu/${slugify(item.name)}?id=${item.id}` }}
                                    >
                                        <div className={style.cate_link_img}>
                                            <img src={item.media[0]?.original_url} alt="" />
                                        </div>
                                        <span className={style.cate_link_title}>
                                            {item.name}
                                        </span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    <ul
                        className={style.cate_list}
                    >
                        {
                            cateList.slice(16, 32).map((item: ITag, index: number) => (
                                <li key={index} className={style.cate_item_cnt}>
                                    <Link
                                        onClick={scrollTop}
                                        className={style.cate_link}
                                        to={{ pathname: `/danh-sach-dich-vu/${slugify(item.name)}?id=${item.id}` }}
                                    >
                                        <div className={style.cate_link_img}>
                                            <img src={item.media[0]?.original_url} alt="" />
                                        </div>
                                        <span className={style.cate_link_title}>
                                            {item.name}
                                        </span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </Slider>
            </div>
        </div>
    );
}

export default HomeTags2;