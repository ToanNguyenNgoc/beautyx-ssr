import React from "react";
import Slider from "react-slick";
import MapTagsItemMB from "./MapItemMB";

export default function MapTagsListMB(props: any) {
    const { listOrg, handleSetLocation, sliderRef, handleDirection } = props;
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerPadding: "30px",
        className: "center",
        centerMode: true,
        afterChange: function (index: any) {
            handleSetLocation(listOrg[index]);
        },
    };
    return (
        <div className="map-list__mobile">
            <Slider ref={sliderRef} {...settings}>
                {listOrg.map((item: any, index: number) => (
                    <MapTagsItemMB key={index} item={item} handleDirection={handleDirection} />
                ))}
            </Slider>
        </div>
    );
}
