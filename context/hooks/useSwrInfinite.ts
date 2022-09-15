import { useSWRInfinite } from "swr"

const useSwrInfinite = (
    API_URL: string,
    paramsURL?: string,
) => {
    const { data, isValidating, size, setSize } = useSWRInfinite(
        (index) => `${API_URL}?page=${index + 1}${paramsURL ? paramsURL : ""}`,
        {
            revalidateOnFocus: false,
            initialSize: 1
        }
    );
    let resData: any[] = [];
    let totalItem = 1;
    if (data) {
        totalItem = data[0]?.data.context.total;
        resData = data.map((i: any) => i.data.context.data)
    }
    const onLoadMore = () => {
        setSize(size + 1)
    }
    return {
        resData,
        totalItem,
        isValidating,
        onLoadMore
    }
}
export default useSwrInfinite