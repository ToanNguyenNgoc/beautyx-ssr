/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { IProductPromo } from "../../../interface/productPromo"
import ProductPromoItem from "../../ViewItemCommon/ProductPromoItem";
import HomeTitle from "../Components/HomeTitle";
import useSwrInfinite from "../../../utils/useSwrInfinite";
import { paramsProducts } from "../../../params-query"
// import { AppContext } from "../../../context/AppProvider";
import FilterProduct from "../../Filter/FilterProduct";
import { LoadGrid } from "../../../components/LoadingSketion";
import { useSelector } from "react-redux";
import IStore from "../../../interface/IStore";
import "./homeTopService.css";


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
            <FilterProduct />
            {(resData.length === 0 && isValidating) && <LoadGrid />}
            <div className="top-service__list">
                {
                    resData
                        .slice(0, 12)
                        .map((item: IProductPromo, index: number) => (
                            <ProductPromoItem
                                key={index}
                                product={item}
                            />
                        ))
                }
            </div>
        </div>
    );
}
