import { CACHE_TIME } from "common";
import { identity, pickBy } from "lodash";
import useSWR, { SWRResponse } from "swr"

export type SWROptions<Data = any, Error = any> = {
    API_URL: string;
    enable: any;
    params?: any;
    dedupingInterval?: number;
    revalidateOnMount?: boolean;
    revalidateOnFocus?: boolean;
    revalidateOnReconnect?: boolean;
    refreshInterval?: number;
    shouldRetryOnError?: (error: Error, swrState: SWRResponse<Data, Error>) => boolean;
    onError?: (error: Error, key: string) => void;
    onSuccess?: (data: Data, key: string) => void;
    onFocus?: (callback: () => void) => void;
    onReconnect?: (callback: () => void) => void;
};

export function useSwr(options: SWROptions) {
    const { API_URL, params, revalidateOnFocus, refreshInterval, dedupingInterval, enable } = options
    let result
    let response
    let responseArray = []
    let paramsURL = ""
    let initData
    let totalItem = 0
    if (params) {
        paramsURL = `?${new URLSearchParams(pickBy(params, identity)).toString()}`
    }
    const {
        data,
        isValidating,
        mutate,
        error
    } = useSWR(enable && `${API_URL}${paramsURL}`, {
        revalidateOnFocus: revalidateOnFocus ?? false,
        refreshInterval: refreshInterval,
        dedupingInterval: dedupingInterval === 0 ? 0 : CACHE_TIME
    })
    if (data) {
        response = data.data?.context ?? data
        responseArray = data.data?.context.data
        totalItem = data?.data?.context?.total
        result = data
    }
    return {
        result,
        response,
        responseArray,
        isValidating,
        mutate,
        initData,
        error,
        totalItem
    }
}