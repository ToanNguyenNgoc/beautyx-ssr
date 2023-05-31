import API_3RD from "api/3rd-api"
import { AUTH_HEADER } from "api/authHeader"
import axios from "axios"
import { identity, pickBy } from "lodash"

export async function postHistorySearch(
    text: string,
    type: 'KEYWORD' | 'ORG' | 'SERVICE' | 'PRODUCT',
    organization_id?: number,
    productable_id?: number
) {
    const params = { text, type, organization_id, productable_id: productable_id }
    // console.log(params)
    await axios.post(
        `${API_3RD.API_NODE}/search_history`,
        pickBy(params, identity),
        AUTH_HEADER()
    )
}