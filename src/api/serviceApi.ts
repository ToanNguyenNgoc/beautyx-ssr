import {axiosClient} from "config";
import { pickBy, identity } from "lodash";

class ServiceApi {
    getByOrgId = (values: any) => {
        const url = `/organizations/${values.org_id}/services`;
        const paramsOb = {
            page: values.page || 1,
            limit: 15,
            "filter[keyword]": values.keyword,
            "filter[service_group_id]": values.cate_id,
            "filter[special]": values.special,
            "filter[special_ecommerce]": values.special_ecommerce,
            "filter[is_momo_ecommerce_enable]": values.isEnable ?? true,
            "include": "category|favorites_count",
            "append": "is_favorite|rating|bought_count",
        };
        const params = pickBy(paramsOb, identity);
        if (values.org_id) {
            return axiosClient.get(url, {params:params});
        }
    };
    getDetailById = (values: any) => {
        const url = `/organizations/${values.org_id}/services/${values.ser_id}`;
        const params = {
            include: "category|favorites_count",
            append: "is_favorite|rating|bought_count",
        };
        if (values.org_id && values.ser_id) {
            return axiosClient.get(url, {params});
        }
    };
}
const serviceApi = new ServiceApi();
export default serviceApi;
