import Slider from "react-slick";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import icon from "../../constants/icon";
import {
    fetchAsyncServicesSpecial,
    fetchProductsSpecial,
} from "../../redux/org_specials/orgSpecialSlice";
import { Product } from "../../interface/product";
import { Service } from "../../interface/service";
import { SerProItem } from "components/Layout";
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
export default function MapSpecial() {
    const ORG = useSelector((state: any) => state.ORG);
    const dispatch = useDispatch();
    const ORG_SPECIALS = useSelector((state: any) => state.ORG_SPECIALS);
    const { SERVICES_SPECIAL, PRODUCTS_SPECIAL } = ORG_SPECIALS;
    const serviceSpecial: any = SERVICES_SPECIAL.services_special;
    const productSpecial: any = PRODUCTS_SPECIAL.products_special;
    let settingsServices = {
        infinity: true,
        slidesToShow: serviceSpecial?.length < 1 ? serviceSpecial?.length : 1,
        slidesToScroll: 1,
        autoplay: true,
        className: "center",
        centerPadding: "90px",
        centerMode: true,
        nextArrow: <NextButton />,
        prevArrow: <PrevButton />,
    };
    let settingsProducts = {
        ...settingsServices,
        slidesToShow: productSpecial?.length < 1 ? productSpecial?.length : 1,
    };
    const callOrgSpecial = () => {
        const values = {
            org_id: ORG?.org?.id,
            page: 1,
            special: true,
            special_ecommerce: true,
            isEnable: ORG?.org?.is_momo_ecommerce_enable && true,
        };
        dispatch(fetchAsyncServicesSpecial(values));
        dispatch(fetchProductsSpecial(values));
    };

    useEffect(() => {
        callOrgSpecial();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ORG?.org?.id]);
    return (
        <>
            {(serviceSpecial?.length > 0 || productSpecial?.length > 0) && (
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
            )}
        </>
    );
}
