import { identity, pickBy } from "lodash";
import useSWR from "swr"

export function useSwrCache(
    API_URL: string,
    condition: any,
    params?: any,
) {
    let result
    let response
    let paramsURL = "";
    let initData
    if (params) {
        paramsURL = `?${new URLSearchParams(pickBy(params, identity)).toString()}`
    }
    const cache = sessionStorage.getItem(`${API_URL}${paramsURL}`)
    let responseArray = cache ? JSON.parse(cache) : []
    const {
        data,
        isValidating,
        mutate,
        error
    } = useSWR((condition && !cache) && `${API_URL}${paramsURL}`, {
        revalidateOnFocus: false,
        onSuccess(data, key) {
            const dataCache = data.data.context.data ?? data.data.context
            sessionStorage.setItem(key, JSON.stringify(dataCache))
        },
    })
    if (data) {
        response = data.data?.context ?? data
        responseArray = data.data?.context.data
        result = data
    }
    return {
        result,
        response,
        responseArray,
        isValidating,
        mutate,
        initData,
        error
    }
}