// import { AUTH_LOCATION } from "../api/authLocation"

// const LOCATION = AUTH_LOCATION();
export const paramsDiscounts = {
    "append": "user_available_purchase_count",
    "filter[platform]": "MOMO",
    "sort": "-priority|-created_at|discount_value",
}
export const paramsServices = {
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
export const paramsProducts = {
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