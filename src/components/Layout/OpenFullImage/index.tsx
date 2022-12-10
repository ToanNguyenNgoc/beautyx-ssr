import { Dialog } from '@mui/material';
import icon from 'constants/icon';
import React from 'react';
import Slider from 'react-slick';
import { XButton } from '../XButton';
import style from './full-img.module.css'

interface FullImageProps {
    src: string[],
    content?: React.ReactNode,
    open: boolean,
    setOpen: (open: boolean) => void
}
const settings = {
    dots: false,
    arrows: false,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    // nextArrow: <NextButton />,
    // prevArrow: <PrevButton />,
    swipe: true,
    // autoplay: true,
    // autoplaySpeed: 2900,
    // appendDots: (dots: any) => (
    //     <div className="banner-dot">
    //         <ul>{dots}</ul>
    //     </div>
    // ),
};
export function FullImage(props: FullImageProps) {
    const { open, setOpen, src, content } = props;

    return (
        <Dialog fullScreen open={open}>
            <div className={style.container}>
                <div className={style.container_head}>
                    <XButton
                        onClick={() => setOpen(false)}
                        icon={icon.closeCircleWhite}
                        iconSize={30}
                    />
                </div>
                <div className={style.slide_img}>
                    <Slider {...settings}>
                        {
                            src?.map((item, index:number) => (
                                <div
                                    key={index} className={style.container_img}
                                >
                                    <img
                                        style={{ height: `${window.innerHeight}px` }}
                                        className={style.container_img_back} src={item} alt=""
                                    />
                                    <div className={style.container_img_box}>
                                        <img src={item} alt="" />
                                    </div>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
                <div className={style.content_container}>
                    {content ?? ''}
                </div>
            </div>
        </Dialog>
    );
}