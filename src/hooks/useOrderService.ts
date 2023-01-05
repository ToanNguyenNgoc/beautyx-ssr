import { EXTRA_FLAT_FORM } from "api/extraFlatForm"
import API_ROUTE from "api/_api"
import IStore from "interface/IStore"
import { IServiceUser } from "interface/servicesUser"
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
        'include': 'items|organization|appointments|btxReward', //btxReward
        "filter[withServicesSold]": true,
        "filter[platform]": PLAT_FORM === 'BEAUTYX' ? 'BEAUTYX|BEAUTYX MOBILE|WEB' : PLAT_FORM,
        "limit": 8
    }
    const { resData, totalItem, onLoadMore, isValidating } = useSwrInfinite(
        USER,
        `${API_ROUTE.ORDERS}`,
        params
    )
    const order_app = resData?.filter(
        (a: IServiceUser) => a?.appointments?.length === 0
    );
    const orderService = resData ?? []
    return { resData, orderService, totalItem, onLoadMore, isValidating, order_app }
}