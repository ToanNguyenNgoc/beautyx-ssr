import { useSWRInfinite } from "swr";
import { pickBy, identity } from "lodash"
import { SWROptions } from './useSwr'

export function useSwrInfinite(options: SWROptions) {
    const { params, enable, API_URL, revalidateOnFocus = false, dedupingInterval } = options
    let paramsURL = "";
    if (params) {
        paramsURL = `&${new URLSearchParams(pickBy(params, identity)).toString()}`
    }
    let newOptions: any = {
        revalidateOnFocus: revalidateOnFocus,
        initialSize: 1,
        dedupingInterval: 10000000
    }
    if (dedupingInterval === 0) {
        newOptions = {
            revalidateOnFocus: revalidateOnFocus,
            initialSize: 1,
        }
    }
    const { data, isValidating, size, setSize, mutate } = useSWRInfinite(
        (index) => enable && `${API_URL}?page=${index + 1}${paramsURL}`,
        newOptions
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