import { Masonry } from "@mui/lab";
import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import icon from "../../constants/icon";
import useFullScreen from "../../utils/useDeviceMobile";
const PrevButton = (props: any) => {
    const { onClick } = props;
    return (
        <button onClick={onClick} className="galleries-btn__prev">
            <img src={icon.chevronRight} alt="" />
        </button>
    );
};
const NextButton = (props: any) => {
    const { onClick } = props;
    return (
        <button onClick={onClick} className="galleries-btn__next">
            <img src={icon.chevronRight} alt="" />
        </button>
    );
};
export default function MapGalleries(props: any) {
    const { GALLERIES, setTotalCountGalleries, open, setOpen } = props;
    const IS_MOBILE = useFullScreen();
    const galleriesChild = GALLERIES.map((i: any) => i.images)
        .flat()
        .map((i: any) => i.image_url);
    const galleriesPar = GALLERIES.map((i: any) => i.image_url);
    const totalGalleries = galleriesPar.concat(galleriesChild);
    const [chooseImg, setChooseImg] = useState(totalGalleries[0]);
    var settings = {
        slidesToShow: GALLERIES.length < 3 ? GALLERIES.length : 3,
        slidesToScroll: 1,
        nextArrow: <NextButton />,
        prevArrow: <PrevButton />,
    };
    const [children, setChildren] = useState([]);
    const handleGetChildGall = (item: any) => {
        setChildren(item.map((item: any) => item?.image_url));
        setOpen(true);
    };
    // useEffect(() => {
    //     setTotalCountGalleries(totalGalleries);
    //     if (open === false) {
    //         setChooseImg(null);
    //     } else {
    //         setChooseImg(totalGalleries[0]);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [GALLERIES, setChooseImg]);

    return (
        <>
            <div className="content-info__galleries">
                <span className="galleries-title">Hình ảnh</span>
                {GALLERIES.length > 0 ? (
                    <ul className="galleries-list">
                        <Slider {...settings}>
                            {GALLERIES.map((item: any, index: number) => (
                                <li
                                    onClick={() =>
                                        handleGetChildGall(item?.images)
                                    }
                                    key={index}
                                    className="galleries-item"
                                >
                                    <img src={item?.image_url} alt="" />
                                    <div className="item-text">
                                        <span>{item?.name}</span>
                                    </div>
                                </li>
                            ))}
                        </Slider>
                    </ul>
                ) : (
                    <p className="galleries-update">Đang cập nhật</p>
                )}
            </div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <div className="dialog-galleries">
                    <div className="dialog-galleries__left">
                        <div className="galleries-left__masonry">
                            <Masonry
                                columns={IS_MOBILE ? 2 : 2}
                                spacing={IS_MOBILE ? 1 : 1.5}
                            >
                                {totalGalleries.map(
                                    (item: any, index: number) => (
                                        <img
                                            className="cursor-pointer"
                                            onClick={() => setChooseImg(item)}
                                            key={index}
                                            src={item}
                                            alt=""
                                        />
                                    )
                                )}
                            </Masonry>
                        </div>
                    </div>
                    <div className="dialog-galleries__right">
                        <div className="galleries-right__img">
                            <img src={chooseImg ? chooseImg : null} alt="" />
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
