/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import HomeTitle from "../Components/HomeTitle";
// import { AppContext } from "../../../context/AppProvider";
import { useSelector } from "react-redux";
import "./homeTopService.css";
import IStore from "interface/IStore";
import { paramsProducts } from "params-query";
import { useSwrInfinite } from "utils";
import FilterProduct from "features/Filter/FilterProduct";
import { LoadGrid } from "components/LoadingSketion";
import { IProductPromo } from "interface/productPromo";
import { SerProItem } from "components/Layout"

export default function HomeTopService() {
    // const { t } = useContext(AppContext);
    const { query } = useSelector((state: IStore) => state.FILTER.FILTER_PRODUCT_PROMO)
    const params = {
        ...paramsProducts,
        limit: 30,
        "sort": query,
        "filter[special_price]": true
    }
    const { resData, isValidating } = useSwrInfinite(true, "/products", params)

    return (
        <div className="home-top__service">
            <HomeTitle
                title={"Top sản phẩm đang giảm giá"}
                url={"/top-san-pham-giam-gia"}
                seemore={"Xem chi tiết >"}
            />
            <FilterProduct disable="location" />
            {(resData.length === 0 && isValidating) && <LoadGrid />}
            <div className="top-service">
                <ul className="top-service__list">
                    {
                        resData
                            .slice(0, 12)
                            .map((item: IProductPromo, index: number) => (
                                <li className="ser-pro-item" key={index} >
                                    <SerProItem item={item} type="PRODUCT" />
                                </li>
                            ))
                    }
                </ul>
            </div>
        </div>
    );
}
