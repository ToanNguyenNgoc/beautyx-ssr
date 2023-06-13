import { API_ROUTE_V } from "api/_api";
import {  ParamsProductable } from "params-query/param.interface";
import { useFetchInfinite } from "./useFetchInfinite";

export function useProductable(
    type: '1' | '2' | '3' | '4',
    params: ParamsProductable,
    condition: boolean
) {
    const { resDataV2, totalItemV2, totalPageV2, onLoadMore, isValidating } = useFetchInfinite(
        condition, API_ROUTE_V.PRODUCTABLE('v3'), { ...params, type: type }
    )
    const serviceData = {
        productable: resDataV2,
        totalItem: totalItemV2,
        totalPage: totalPageV2,
        onLoadMore: onLoadMore,
        isLoad: isValidating
    }
    const productData = {
        productable: resDataV2,
        totalItem: totalItemV2,
        totalPage: totalPageV2,
        onLoadMore: onLoadMore,
        isLoad: isValidating
    }
    return { serviceData, productData }
}