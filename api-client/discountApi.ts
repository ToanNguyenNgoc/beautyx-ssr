import axiosClient from "./axios";
import { AUTH_HEADER_PARAM_GET } from "../utils/authHeader";


class Discounts {
    getAll = (values: any) => {
        const url = `/discounts`;
        const params = {
            "page": values.page,
            "limit": 30,
            "filter[platform]": "MOMO", // update change platform "BEAUTYX"
            "append": "user_available_purchase_count",
            "sort": "-created_at"
        }
        return axiosClient.get(url, { params })
    }
    getByOrgId = (values: any) => {
        const url = `/discounts`;
        const params = {
            "page": 1,
            "limit": 30,
            "filter[platform]": "MOMO", // update change platform "BEAUTYX"
            "append": "user_available_purchase_count",
            "sort": "discount_value|created_at",
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
        return axiosClient.get(url, AUTH_HEADER_PARAM_GET(params))
    }
}
const discountApi = new Discounts();
export default discountApi;