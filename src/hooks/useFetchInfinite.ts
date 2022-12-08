import { identity, pickBy } from 'lodash';
import { useSWRInfinite } from 'swr'
import { AUTH_HEADER } from 'utils/authHeader';

export function useFetchInfinite(
    condition: any,
    API_URL: string,
    query?: any
) {
    let paramsURL = ''
    let resData: any[] = [].filter(Boolean)
    let totalItem: number = 1
    let totalPage: number = 1
    if (query) {
        paramsURL = `&${new URLSearchParams(pickBy(query, identity)).toString()}`
    }
    const fetcher = (url: string) => condition && fetch(url, AUTH_HEADER()).then((res) => res.json());
    const { data, error, mutate, isValidating, setSize, size } = useSWRInfinite(
        (index) =>
            `${API_URL}?page=${index + 1}${paramsURL}`,
        fetcher
    );
    if (data) {
        totalItem = data[0]?.data?.context?.total ?? data[0]?.data?.total;
        resData = Array.isArray(data) ? data?.map((i: any) => (i?.data?.context?.data ?? i?.data?.data?.hits)).flat().filter(Boolean) : [];
        totalPage = data[0]?.data?.context?.total_page ?? data[0]?.data?.total_page
    }
    const onLoadMore = () => {
        setSize(size + 1)
    }
    return {
        totalItem, resData, totalPage,
        onLoadMore, mutate, isValidating, error
    }
}