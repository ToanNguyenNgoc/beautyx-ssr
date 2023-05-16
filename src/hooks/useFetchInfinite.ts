import { AUTH_HEADER } from 'config';
import { identity, pickBy } from 'lodash';
import { useSWRInfinite } from 'swr'

export function useFetchInfinite(
    condition: any,
    API_URL: string,
    query?: any
) {
    let paramsURL = ''
    let resData: any[] = [].filter(Boolean)
    let totalItem: number = 1
    let totalPage: number = 1

    let resDataV2: any[] = [].filter(Boolean)
    let totalItemV2: number = 1
    let totalPageV2: number = 1

    if (query) {
        paramsURL = `&${new URLSearchParams(pickBy(query, identity)).toString()}`
    }
    const fetcher = (url: string) => condition && fetch(url, AUTH_HEADER()).then((res) => res.json());
    const { data, error, mutate, isValidating, setSize, size } = useSWRInfinite(
        (index) =>
            `${API_URL}?page=${index + 1}${paramsURL}`,
        fetcher,
        {revalidateOnFocus:false}
    );
    if (data) {
        totalItem = data[0]?.data?.context?.total ?? data[0]?.data?.total;
        resData = Array.isArray(data) ? data?.map((i: any) => (i?.data?.context?.data ?? i?.data?.data?.hits)).flat().filter(Boolean) : [];
        totalPage = data[0]?.data?.context?.total_page ?? data[0]?.data?.total_page

        totalItemV2 = data[0]?.context?.total
        resDataV2 = Array.isArray(data) ? data?.map((i: any) => (i?.context?.data)).flat().filter(Boolean) : []
        totalPageV2 = data[0]?.context?.total_page ?? data[0]?.data?.total_page
    }
    const onLoadMore = () => {
        setSize(size + 1)
    }
    return {
        totalItem, resData, totalPage,
        totalItemV2, resDataV2, totalPageV2,
        onLoadMore, mutate, isValidating, error
    }
}