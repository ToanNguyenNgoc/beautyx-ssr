import { AUTH_HEADER } from "../api/authHeader"
import useSWR from "swr";

export default function useFetch(API_URL: string) {
    const { data, error, isValidating } = useSWR(API_URL,
        (apiURL: string) => fetch(apiURL, AUTH_HEADER()).then(res => res.json()), {
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