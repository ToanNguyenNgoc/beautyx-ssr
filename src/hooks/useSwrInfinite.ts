import { useSWRInfinite } from "swr";
import { pickBy, identity } from "lodash"

export function useSwrInfinite<ResData = any>(
    condition: any,
    API_URL: string,
    params?: any,
) {
    let paramsURL = "";
    if (params) {
        paramsURL = `&${new URLSearchParams(pickBy(params, identity)).toString()}`
    }
    const { data, isValidating, size, setSize, mutate } = useSWRInfinite(
        (index) => condition && `${API_URL}?page=${index + 1}${paramsURL}`,
        {
            revalidateOnFocus: false,
            initialSize: 1
        }
    );
    let resData: ResData[] = [];
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