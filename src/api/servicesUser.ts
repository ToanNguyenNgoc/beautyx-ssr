import axiosClient from "./axios";
import { AUTH_HEADER_PARAM_GET } from "../utils/authHeader";
import { EXTRA_FLAT_FORM } from "./extraFlatForm";


class ServicesUser {
    getServices = (values:any) => {
        const PLAT_FORM = EXTRA_FLAT_FORM();
        const url = `/orders`;
        const params = {
            page: values.page || 1,
            limit: 15,
            "filter[status]": "PAID",
            "filter[withServicesSold]": true,
            "include": "items|items_count|organization|appointments",
            "sort": "-created_at",
            "filter[platform]": PLAT_FORM === 'BEAUTYX' ? 'BEAUTYX|BEAUTYX MOBILE' : PLAT_FORM
        }
        return axiosClient.get(url, AUTH_HEADER_PARAM_GET(params))
    }
}
const servicesUserApi = new ServicesUser();
export default servicesUserApi;
