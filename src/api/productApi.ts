import axiosClient from "./axios";
import { pickBy, identity } from "lodash";
import { AUTH_HEADER_PARAM_GET } from "./authHeader";

class ProductApi {
    getByOrgId = (values: any) => {
        const url = `/organizations/${values.org_id}/products`;
        const paramsOb = {
            page: values.page || 1,
            limit: 15,
            "filter[keyword]": values.keyword,
            "filter[special]": values.special,
            "filter[product_category_id]": values.cate_id,
            "filter[is_momo_ecommerce_enable]": values.isEnable ?? true,
            "include": "favorites_count|category",
            "append": "is_favorite|rating",
        };
        const params = pickBy(paramsOb, identity);
        if (values.org_id) {
            return axiosClient.get(url, { params });
        }
    };
    getDetailById = (values: any) => {
        const url = `/organizations/${values.org_id}/products/${values.id}`;
        const params = {
            include: "category|favorites_count",
            append: "is_favorite|rating",
        };
        if (values.org_id && values.id) {
            return axiosClient.get(url, AUTH_HEADER_PARAM_GET(params));
        }
    };
}
const productsApi = new ProductApi();
export default productsApi;
