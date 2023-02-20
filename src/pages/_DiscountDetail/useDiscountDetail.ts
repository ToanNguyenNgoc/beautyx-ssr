/* eslint-disable react-hooks/exhaustive-deps */
import { AUTH_LOCATION } from "api/authLocation"
import API_ROUTE from "api/_api"
import { useGetParamUrl, useSwr } from "hooks"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"

const routeType = [
    {
        path: 'service', type: 'SERVICE', api: 'services', params: {
            'include': 'category|favorites_count',
            'append': 'is_favorite|rating|bought_count'
        }
    },
    {
        path: 'product', type: 'PRODUCT', api: 'products', params: {
            'append': 'is_favorite|rating',
            'include': 'category|favorites_count'
        }
    },
]

export function useDiscountDetail() {
    const history = useHistory()
    const paramsUrl = useGetParamUrl()
    const typeItemProps = routeType.find(i => i.path === paramsUrl[0])
    const params = {
        id: paramsUrl[2],
        org_id: parseInt(paramsUrl[1]),
        item_id: parseInt(paramsUrl[3])
    }
    let redirectPageError = false
    if (!typeItemProps) redirectPageError = true
    useEffect(() => {
        if (redirectPageError) history.replace('/error')
    }, [])
    const discount = useDiscount(params)
    const detail = useItem(params, typeItemProps)
    const org = useOrg(params)

    return { discount, org, detail, typeItemProps }
}
const useDiscount = (params: any) => {
    const history = useHistory()
    const { response, error } = useSwr(
        `${API_ROUTE.DISCOUNTS_ID(params.id)}`,
        params.id,
        { 'append': 'user_available_purchase_count' }
    )
    useEffect(() => {
        if (error) history.replace('/error')
    }, [error])
    return response
}
const useItem = (params: any, typeItemProps: any) => {
    const history = useHistory()
    const { response, error } = useSwr(
        `/organizations/${params.org_id}/${typeItemProps?.api}/${params.item_id}`,
        (params.org_id && params.item_id && typeItemProps),
        typeItemProps?.params
    )
    useEffect(() => {
        if (error) history.replace('/error')
    }, [error])
    return response
}
const useOrg = (params: any) => {
    const history = useHistory()
    const LOCATION = AUTH_LOCATION()
    const { response, error } = useSwr(
        `${API_ROUTE.ORG(params.org_id)}`,
        params.org_id,
        { 'filter[location]': LOCATION }
    )
    useEffect(() => {
        if (error) history.replace('/error')
    }, [error])
    return response
}