import API_3RD from "api/3rd-api"
import axios from "axios"
import { AUTH_HEADER } from "config"
import { identity, pickBy } from "lodash"

export async function postHistorySearch(
    text: string,
    type: 'KEYWORD' | 'ORG' | 'SERVICE' | 'PRODUCT',
    organization_id?: number,
    productable_id?: number
) {
    const params = { text, type, organization_id, productable_id: productable_id }
    await axios.post(
        `${API_3RD.API_NODE}/search_history`,
        pickBy(params, identity),
        AUTH_HEADER()
    )
}