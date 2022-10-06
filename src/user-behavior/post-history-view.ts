import axios from "axios"
import { AUTH_HEADER } from "../api/authHeader"

interface PostHistoryViewProps {
    id: string | number,
    organization_id: number,
    type: "SERVICE" | "PRODUCT" | "ORGANIZATION"
}
export async function postHistoryView(params: PostHistoryViewProps) {
    let response
    try {
        const res = await axios.post("https://api-node-myspa.vercel.app/v1/history", params, AUTH_HEADER())
        response = res
    } catch (error) {
        response = error
    }
    return response
}