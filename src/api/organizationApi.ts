import {axiosClient} from "config";
import { pickBy, identity } from 'lodash';
import { AUTH_LOCATION } from "./authLocation";

class Organization {
  getOrgById = (id: any) => {
    const LOCATION = AUTH_LOCATION();
    const paramsOb = {
      "filter[location]": LOCATION,
    }
    const url = `/organizations/${id}`;
    return axiosClient.get(url, { params: pickBy(paramsOb, identity) });
  };
  //example get all-----------------
  getAll = (values?: any) => {
    const LOCATION = AUTH_LOCATION();
    const url = `/organizations`;
    const paramsOb = {
      page: values.page || 1,
      limit: values.limit || 15,
      "filter[keyword]": values.keyword ? decodeURI(values.keyword) : "",
      "filter[tags]": values.tags,
      "filter[is_momo_ecommerce_enable]": values.isEcommerce,
      "filter[min_price]": values.min_price,
      "filter[max_price]": values.max_price,
      "filter[location]": values.LatLng ? values.LatLng : (values.sort === "distance" ? LOCATION : null),
      "filter[province_code]": values.province_code,
      "filter[district_code]": values.district_code,
      "sort": values.sort !== "distance" ? values.sort : null,
      "include": "tags|province|district|ward|branches|favorites|favorites_count"
    }
    return axiosClient.get(url, { params: pickBy(paramsOb, identity) })
  };
}
const orgApi = new Organization();
export default orgApi;
