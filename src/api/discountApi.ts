import axiosClient from "./axios";
import { identity, pickBy } from "lodash";
import { AUTH_HEADER_PARAM_GET } from "./authHeader";


class Discounts {
    getById = (values: any) => {
        const url = `/discounts/${values.id}`
        const params = {
            "filter[organization_id]": values.org_id,
            "append": "user_available_purchase_count"
        }
        return axiosClient.get(url, AUTH_HEADER_PARAM_GET(pickBy(params, identity)))
    }
}
const discountApi = new Discounts();
export default discountApi;