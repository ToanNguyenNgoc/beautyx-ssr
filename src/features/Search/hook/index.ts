import { IBranchV3, IServicePromo } from "interface"
import { ParamBranchV3, ParamOrg, ParamProduct, ParamService } from "params-query/param.interface"
import { unique } from "utils"
import { pick } from 'lodash'
import { useFetchInfinite, useSwrInfinite } from "hooks"
import { API_ROUTE_V } from "api/_api"

export const useOrgs = (paramOrg: ParamOrg, condition: boolean) => {
    const { resData, totalItem, onLoadMore, isValidating } = useSwrInfinite({
        enable: condition, API_URL: "/organizations", params: paramOrg
    })
    const orgs = resData
    const totalOrg = totalItem
    const onLoadMoreOrg = onLoadMore
    const isLoad = isValidating
    return { orgs, totalOrg, onLoadMoreOrg, isLoad }
}
export const useProducts = (paramProduct: ParamProduct, condition: boolean) => {
    const { resData, totalItem, onLoadMore, isValidating } = useSwrInfinite({
        enable: condition, API_URL: "/products", params: paramProduct
    })
    const products = resData
    const totalProduct = totalItem
    const onLoadMoreProduct = onLoadMore
    const isLoadPr = isValidating
    return { products, totalProduct, onLoadMoreProduct, isLoadPr }
}
export const useServices = (paramService: ParamService, condition: boolean) => {
    const { resData, totalItem, onLoadMore, isValidating } = useSwrInfinite({
        enable: condition, API_URL: "/services", params: paramService
    })
    const services = resData
    const totalService = totalItem
    const onLoadMoreService = onLoadMore
    const isLoadSer = isValidating
    return { services, totalService, onLoadMoreService, isLoadSer }
}
export const useServicesGroup = (
    paramService: ParamService,
    condition: boolean
) => {
    const { originData, totalItem, onLoadMore, isValidating, resData } = useSwrInfinite({
        enable: condition, API_URL: "/services", params: paramService
    })
    const itemInPage = originData?.map((i: any) => i.data?.data?.hits)
    // console.log(itemInPage)
    const itemOrgInPage = itemInPage?.map((i: any) => i?.map((j: any) => j.org_id))
    const itemOrgIdInPage = itemOrgInPage?.map((i: any) => unique(i))

    const servicesGroup = itemInPage?.map((services: IServicePromo[], index: number) => {
        const matchIndex = itemOrgIdInPage?.find((i: any, o_index: number) => o_index === index)
        const itemGroup = matchIndex?.map((id: number) => {
            return {
                org: pick(
                    services?.filter((ser: IServicePromo) => ser.org_id === id)[0],
                    [
                        'org_id',
                        'org_image',
                        'org_name',
                        'org_telephone',
                        'org_province_name',
                        'org_district_name',
                        'org_full_address',
                        '_geoDistance'
                    ]
                ),
                services: services?.filter((ser: IServicePromo) => ser.org_id === id)
            }
        })
        return itemGroup
    })
    const servicesGroupByOrg = servicesGroup?.flat() ?? []
    const services = resData
    const totalService = totalItem
    const onLoadMoreService = onLoadMore
    const isLoadSer = isValidating
    return { services, totalService, onLoadMoreService, isLoadSer, servicesGroupByOrg }
}
export const useBranches = (param: ParamBranchV3, condition: boolean) => {
    const { isValidating, onLoadMore, resDataV2, totalItemV2 } = useFetchInfinite(
        condition,
        API_ROUTE_V.BRANCHES('v3'),
        param
    )
    const branches: IBranchV3[] = resDataV2 ?? []
    const totalBranch = totalItemV2
    const onLoadMoreBranch = onLoadMore
    const isLoadBranch = isValidating
    return { branches, totalBranch, onLoadMoreBranch, isLoadBranch }
}

