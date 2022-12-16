import { EXTRA_FLAT_FORM } from "api/extraFlatForm"
import API_ROUTE from "api/_api"
import IStore from "interface/IStore"
import { paramOrder } from "params-query"
import { ParamOrder } from "params-query/param.interface"
import { useSelector } from "react-redux"
import { useSwrInfinite } from "./useSwrInfinite"

export function useOrderService() {
    const { USER } = useSelector((state: IStore) => state.USER)
    const PLAT_FORM = EXTRA_FLAT_FORM()
    const params: ParamOrder = {
        ...paramOrder,
        "filter[status]": 'PAID',
        'include': 'items|organization|appointments',
        "filter[withServicesSold]": true,
        "filter[platform]": PLAT_FORM === 'BEAUTYX' ? 'BEAUTYX|BEAUTYX MOBILE' : PLAT_FORM,
        "limit": 14
    }
    const { resData, totalItem, onLoadMore, isValidating } = useSwrInfinite(
        USER,
        `${API_ROUTE.ORDERS}`,
        params
    )
    const orderService = resData ?? []
    return { resData, orderService, totalItem, onLoadMore, isValidating }
}