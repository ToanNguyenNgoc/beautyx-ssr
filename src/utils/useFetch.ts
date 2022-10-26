import { AUTH_HEADER } from "../api/authHeader"
import useSWR from "swr";

export function useFetch(condition: any, API_URL: string) {
    const { data, error, isValidating } = useSWR(API_URL,
        (apiURL: string) => condition && fetch(apiURL, AUTH_HEADER()).then(res => res.json()), {
        revalidateOnFocus: false,
    })
    let response = []
    if (data) {
        response = data.data ?? data
    }
    return {
        response, error, isValidating
    }
}
export default useFetch