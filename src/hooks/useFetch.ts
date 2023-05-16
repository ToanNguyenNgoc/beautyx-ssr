import useSWR from "swr";
import { identity, pickBy } from "lodash";
import { AUTH_HEADER } from "config";

export function useFetch(condition: any, API_URL: string, query?: any) {
    let paramsURL = ''
    if (query) {
        paramsURL = `?${new URLSearchParams(pickBy(query, identity)).toString()}`
    }
    const { data, error, isValidating } = useSWR(API_URL,
        (apiURL: string) => condition && fetch(`${apiURL}${paramsURL}`, AUTH_HEADER()).then(res => res.json()), {
        revalidateOnFocus: false,
    })
    let response = []
    if (data) {
        response = data.data ?? data
    }
    return {
        response, error, isValidating, data
    }
}
export default useFetch