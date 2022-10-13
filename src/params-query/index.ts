// import { AUTH_LOCATION } from "../api/authLocation"

import { EXTRA_FLAT_FORM } from "api/extraFlatForm"
import dayjs from "dayjs"
import { ParamOrg, ParamService, ParamProduct } from "./param.interface"

const PLAT_FORM = EXTRA_FLAT_FORM()

// const LOCATION = AUTH_LOCATION();
export const paramOrgs: ParamOrg = {
    "limit": 15,
    "filter[keyword]": "",
    "filter[location]": "",
}
export const paramsDiscounts = {
    "append": "user_available_purchase_count",
    "filter[platform]": "MOMO",
    "sort": "-priority|-created_at|discount_value",
}
export const paramsServices: ParamService = {
    limit: 30,
    "filter[keyword]": "",
    "filter[min_price]": 1000,
    "filter[max_price]": "",
    "filter[special_min_price]": 1000,
    "filter[special_max_price]": "",
    "filter[discount_percent]": "",
    "filter[special_price]": "",
    "filter[is_momo_ecommerce_enable]": true,
    "filter[location]": "",
    "sort": ""
}
export const paramsProducts: ParamProduct = {
    limit: 30,
    "filter[keyword]": "",
    "filter[min_price]": 1000,
    "filter[max_price]": "",
    "filter[special_min_price]": 1000,
    "filter[special_max_price]": "",
    "filter[discount_percent]": "",
    "filter[special_price]": "",
    "filter[is_momo_ecommerce_enable]": true,
    "filter[location]": "",
    "sort": ""
}
export const paramsProductsCate = {
    "filter[group]": "PRODUCT",
    "include": "parent.media|children.media|children.children.media|media",
    "sort": "-organizations_count"
}
export const paramAppointment = {
    "append": "services",
    "filter[time_start]": dayjs().format("YYYY-MM"),
    "include": "organization|order|branch",
    "limit": 300,
    "page": 1,
    "sort": "-created_at"
}
export const paramOrderService = {
    "page": "",
    "limit": 15,
    "filter[platform]": PLAT_FORM,
    "filter[status]": "PAID",
    "filter[withServicesSold]": true,
    "include": "items|items_count|organization|appointments",
    "sort": "-created_at"
}