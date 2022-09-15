import axiosClient from "./axios";
import { pickBy, identity } from "lodash";
import { AUTH_HEADER_PARAM_GET } from "../utils/authHeader";
import { AUTH_LOCATION } from './authLocation';

class ProductApi {
    getByOrgId = (values: any) => {
        const url = `/organizations/${values.org_id}/products`;
        const paramsOb = {
            page: values.page || 1,
            limit: 15,
            "filter[keyword]": values.keyword,
            "filter[special]": values.special,
            "filter[product_category_id]": values.cate_id,
            "filter[is_momo_ecommerce_enable]": values.isEnable,
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
    getProductsAll = (values: any) => {
        const url = `/products`;
        const LOCATION = AUTH_LOCATION();
        const paramsOb = {
            page: values.page || 1,
            limit: 15,
            "filter[keyword]": values.keyword,
            "filter[min_price]": values.min_price || 1000,
            "filter[max_price]": values.max_price,
            "filter[special_min_price]": values.special_min_price || 1000,
            "filter[special_max_price]": values.special_max_price,
            "filter[discount_percent]": values.discount_percent,
            "filter[special_price]": values.special_price,
            "filter[is_momo_ecommerce_enable]": true,
            "filter[location]": values.sort === "distance" ? LOCATION : null,
            "sort": values.sort === "distance" ? null : values.sort
        }
        const params = pickBy(paramsOb, identity);
        return axiosClient.get(url, { params })
    }
}
const productsApi = new ProductApi();
export default productsApi;
