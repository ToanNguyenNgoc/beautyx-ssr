import { HomeTitle, XButton } from 'components/Layout';
import icon from 'constants/icon';
import { AppContext } from 'context/AppProvider';
import { useTags } from 'hooks';
import { ITag } from 'interface';
import  { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { slugify, scrollTop } from 'utils';
import style from './style.module.css'

interface IPageGroup {
    page: number,
    items: ITag[]
}

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
    const { t } = useContext(AppContext) as any
    const [slide, setSlide] = useState(1)
    //---
    const { tagsChildServiceLevel2 } = useTags()
    //pagination tags child
    const perPage = 16
    const totalTagChild = tagsChildServiceLevel2?.length ?? 0
    const totalPage = Math.ceil(totalTagChild / perPage)
    const pageGroup: IPageGroup[] = []
    for (var i = 0; i < totalPage; i++) {
        const pageItem = {
            page: i + 1,
            items: tagsChildServiceLevel2
                ?.sort((a, b) => (b.children?.length ?? 0) - (a.children?.length ?? 0))
                ?.slice(i * perPage, i * perPage + perPage) ?? []
        }
        pageGroup.push(pageItem)
    }
    let showNext = false
    let showPrev = false
    if (slide >= 1 && slide < pageGroup.length) showNext = true
    if (slide > 1) showPrev = true
    const settings = {
        dots: false,
        infinite: false,
        arrows: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: showNext ? <NextButton /> : <></>,
        prevArrow: showPrev ? <PrevButton /> : <></>,
        swipe: true,
        afterChange: function (index: number) {
            setSlide(index + 1)
        },
    }
    return (
        <div className={style.container}>
            <HomeTitle
                title={t('Home.linked_directory')}
            />
            <div className={style.cate_list_cnt}>
                <Slider {...settings} >
                    {
                        pageGroup?.map(page => (
                            <ul key={page.page} className={style.cate_list}>
                                {
                                    page?.items?.map((item: ITag, index: number) => (
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
                        ))
                    }
                </Slider>
            </div>
        </div>
    );
}

export default HomeTags2;