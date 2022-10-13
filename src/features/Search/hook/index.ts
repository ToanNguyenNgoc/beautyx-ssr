import { ParamOrg, ParamProduct, ParamService } from "params-query/param.interface"
import { useSwrInfinite } from "utils"

export const useOrgs = (paramOrg: ParamOrg, condition: boolean) => {
    const { resData, totalItem, onLoadMore, isValidating } = useSwrInfinite(condition, "/organizations", paramOrg)
    const orgs = resData
    const totalOrg = totalItem
    const onLoadMoreOrg = onLoadMore
    const isLoad = isValidating
    return { orgs, totalOrg, onLoadMoreOrg, isLoad }
}
export const useProducts = (paramProduct: ParamProduct, condition: boolean) => {
    const { resData, totalItem, onLoadMore, isValidating } = useSwrInfinite(condition, "/products", paramProduct)
    const products = resData
    const totalProduct = totalItem
    const onLoadMoreProduct = onLoadMore
    const isLoadPr = isValidating
    return { products, totalProduct, onLoadMoreProduct, isLoadPr }
}
export const useServices = (paramService: ParamService, condition: boolean) => {
    const { resData, totalItem, onLoadMore, isValidating } = useSwrInfinite(condition, "/services", paramService)
    const services = resData
    const totalService = totalItem
    const onLoadMoreService = onLoadMore
    const isLoadSer = isValidating
    return { services, totalService, onLoadMoreService, isLoadSer }
}