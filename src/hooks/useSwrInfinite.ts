import { useSWRInfinite } from "swr";
import { pickBy, identity } from "lodash"
import { SWROptions } from './useSwr'

interface SWRInOptions extends SWROptions {
    keyPage?: 'p' | 'page'
}

export function useSwrInfinite(options: SWRInOptions) {
    const { params, enable, API_URL, revalidateOnFocus = false, dedupingInterval, keyPage = 'page', onSuccess } = options
    let paramsURL = "";
    if (params) {
        paramsURL = `&${new URLSearchParams(pickBy(params, identity)).toString()}`
    }
    let newOptions: any = {
        revalidateOnFocus: revalidateOnFocus,
        initialSize: 1,
        dedupingInterval: 10000000,
    }
    if (dedupingInterval === 0) {
        newOptions = {
            revalidateOnFocus: revalidateOnFocus,
            initialSize: 1,

        }
    }
    const { data, isValidating, size, setSize, mutate } = useSWRInfinite(
        (index) => enable && `${API_URL}?${keyPage}=${index + 1}${paramsURL}`,
        {
            ...newOptions, onSuccess(data, key, config) {
                onSuccess && onSuccess(data, key)
            },
        }
    );
    let resData: any[] = [];
    let originData: any[] = []
    let totalItem = 1;
    if (data) {
        totalItem = data[0]?.data?.context?.total ?? data[0]?.data?.total;
        resData = Array.isArray(data) ? data?.map((i: any) => (i?.data?.context?.data ?? i?.data?.data?.hits)).flat() : [];
        originData = data
    }
    const onLoadMore = () => {
        setSize(size + 1)
    }
    return {
        resData,
        totalItem,
        isValidating,
        onLoadMore,
        originData,
        mutate
    }
}