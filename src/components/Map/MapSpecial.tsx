// import Slider from "react-slick";
import React from "react";
// import {  useSelector } from "react-redux";
// import icon from "../../constants/icon";
// import { Product } from "../../interface/product";
// import { Service } from "../../interface/service";
// import { SerProItem } from "components/Layout";
// const PrevButton = (props: any) => {
//     const { onClick } = props;
//     return (
//         <button onClick={onClick} className="galleries-btn__prev">
//             <img src={icon.chevronRight} alt="" />
//         </button>
//     );
// };
// const NextButton = (props: any) => {
//     const { onClick } = props;
//     return (
//         <button onClick={onClick} className="galleries-btn__next">
//             <img src={icon.chevronRight} alt="" />
//         </button>
//     );
// };
export default function MapSpecial() {
    // const ORG = useSelector((state: any) => state.ORG);
    // let settingsServices = {
    //     infinity: true,
    //     slidesToShow: serviceSpecial?.length < 1 ? serviceSpecial?.length : 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     className: "center",
    //     centerPadding: "90px",
    //     centerMode: true,
    //     nextArrow: <NextButton />,
    //     prevArrow: <PrevButton />,
    // };
    // let settingsProducts = {
    //     ...settingsServices,
    //     slidesToShow: productSpecial?.length < 1 ? productSpecial?.length : 1,
    // };

    return (
        <>
            {/* {(serviceSpecial?.length > 0 || productSpecial?.length > 0) && (
                <div className="content-info__special">
                    {serviceSpecial?.length > 0 && (
                        <>
                            <span className="special-title">
                                Dịch vụ ưu đãi
                            </span>
                            <ul className="special-list">
                                <Slider {...settingsServices}>
                                    {serviceSpecial.map(
                                        (item: Service, index: number) => (
                                            <li key={index}>
                                                <SerProItem
                                                    org={ORG}
                                                    item={item}
                                                    type="SERVICE"
                                                />
                                            </li>
                                        )
                                    )}
                                </Slider>
                            </ul>
                        </>
                    )}
                    {productSpecial?.length > 0 ? (
                        <>
                            <span className="special-title">
                                Sản phẩm ưu đãi
                            </span>
                            <ul className="special-list">
                                <Slider {...settingsProducts}>
                                    {productSpecial.map(
                                        (item: Product, index: number) => (
                                            <li key={index}>
                                                <SerProItem
                                                    org={ORG.org}
                                                    item={item}
                                                    type="PRODUCT"
                                                />
                                            </li>
                                        )
                                    )}
                                </Slider>
                            </ul>
                        </>
                    ) : null}
                </div>
            )} */}
        </>
    );
}
