import useSWR from "swr"

export function useSwr(
    API_URL: string,
    condition: any,
    params?: any,
    refresh_time?: number
) {
    let result
    let response
    let responseArray = []
    let paramsURL = "";
    let initData
    if (params) {
        paramsURL = `?${new URLSearchParams(params).toString()}`
    }
    const {
        data,
        isValidating,
        mutate,
        error
    } = useSWR(condition && `${API_URL}${paramsURL}`, {
        revalidateOnFocus: false,
        refreshInterval: refresh_time
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