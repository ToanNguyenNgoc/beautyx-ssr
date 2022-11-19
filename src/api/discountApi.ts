import axiosClient from "./axios";
import { AUTH_HEADER_PARAM_GET } from "../utils/authHeader";
import { AUTH_LOCATION } from "./authLocation";
import { identity, pickBy } from "lodash";


class Discounts {
    getAll = (values: any) => {
        const url = `/discounts`;
        const LOCATION = AUTH_LOCATION();
        const params = {
            "page": values.page,
            "limit": 30,
            "filter[platform]": "MOMO",
            "append": "user_available_purchase_count",
            "filter[location]": LOCATION,
            "sort": "-priority|-created_at|discount_value"
        }
        return axiosClient.get(url, { params })
    }
    getByOrgId = (values: any) => {
        const url = `/discounts`;
        const params = {
            "page": 1,
            "limit": 30,
            "filter[platform]": "MOMO",
            "append": "user_available_purchase_count",
            "sort": "discount_value|-priority|-created_at",
            "filter[organization_id]": values.org_id
        }
        return axiosClient.get(url, { params })
    }
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