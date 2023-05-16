import axios from "axios"
import API_3RD from "api/3rd-api"

interface PostHistoryViewProps {
    id: string | number,
    organization_id: number | string,
    type: "SERVICE" | "PRODUCT" | "DISCOUNT"
}
export async function postHistoryView(params: PostHistoryViewProps) {
    let response
    try {
        const res = await axios.post(`${API_3RD.API_NODE}/history`, params)
        response = res
    } catch (error) {
        response = error
    }
    return response
}