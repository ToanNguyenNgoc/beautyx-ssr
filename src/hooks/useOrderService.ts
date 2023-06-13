import { EXTRA_FLAT_FORM } from "api/extraFlatForm"
import API_ROUTE from "api/_api"
import dayjs from "dayjs"
import { IUser_Items } from "interface"
import IStore from "interface/IStore"
import { IServiceUser } from "interface"
import { paramOrder } from "params-query"
import { ParamOrder } from "params-query/param.interface"
import { useSelector } from "react-redux"
import { useSwrInfinite } from "./useSwrInfinite"

const todayNumber = parseInt(dayjs().format('YYYYMMDD'))

export function useOrderService() {
    const { USER } = useSelector((state: IStore) => state.USER)
    const PLAT_FORM = EXTRA_FLAT_FORM()
    const params: ParamOrder = {
        ...paramOrder,
        "filter[status]": 'PAID',
        "filter[withServicesSold]": true,
        "filter[platform]": PLAT_FORM === 'BEAUTYX' ? 'BEAUTYX|BEAUTYX MOBILE|WEB' : PLAT_FORM,
        "limit": 8
    }
    const { resData, totalItem, onLoadMore, isValidating, } = useSwrInfinite({
        enable: USER,
        API_URL: `${API_ROUTE.ORDERS}`,
        params: params,
        dedupingInterval: 0
    })
    const checkTimeExpired = (items: IUser_Items[]) => {
        let condition = false
        const services_sold_ex_time = items
            .map(i => i.services_sold)
            .map(i => parseInt(dayjs(i.time_expired).format('YYYYMMDD'))).filter(Boolean)
            .sort((a, b) => b - a)
        const services_sold_ex_time_max = services_sold_ex_time[0]
        if (services_sold_ex_time_max >= todayNumber) {
            condition = true
        }
        return condition
    }

    const order_app = resData?.filter(
        (a: IServiceUser) => (a?.appointments?.length === 0 && checkTimeExpired(a?.items))
    );
    const orderService = resData ?? []
    return {
        resData,
        orderService,
        totalItem,
        onLoadMore,
        isValidating,
        order_app, checkTimeExpired
    }
}