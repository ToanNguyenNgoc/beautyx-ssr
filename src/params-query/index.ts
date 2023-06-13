import { EXTRA_FLAT_FORM } from "api/extraFlatForm"
import dayjs from "dayjs"
import {
    ParamOrg,
    ParamService,
    ParamProduct,
    ParamOrder,
    ParamsProductable,
    ParamDiscounts,
    ParamBranchV3
} from "./param.interface"

const PLAT_FORM = EXTRA_FLAT_FORM()
export const paramsUserProfile = {
    "append": "btx_points"
}
export const paramsGalleries = {
    "include": "images|videos",
    "limit": "15",
    "page": "1"
}
export const paramOrgs: ParamOrg = {
    "limit": 15,
    "filter[keyword]": "",
    "filter[location]": "",
    "filter[is_momo_ecommerce_enable]": "",
    "filter[tags]": "",
    "filter[min_price]": "",
    "filter[max_price]": "",
    "filter[province_code]": "",
    "filter[district_code]": "",
    "sort": "",
    "include": "tags|province|district|ward|branches|favorites|favorites_count"
}
export const pramsBranchV3: ParamBranchV3 = {
    "limit": 15,
    "keyword": "",
    "is_momo_ecommerce_enable": "",
    "location": "",
    "sort": "",
    "province_code": "",
    "district_code": "",
    "is_demo": 'false'
}
export const paramsDiscounts = {
    // "append": "user_available_purchase_count",
    "filter[platform]": "MOMO",
    "limit": 12,
    // "sort": "-priority|-created_at|discount_value",
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
    "filter[platform]": PLAT_FORM === 'BEAUTYX' ? 'BEAUTYX | BEAUTYX MOBILE' : PLAT_FORM,
    "filter[status]": "PAID",
    "filter[withServicesSold]": true,
    "include": "items|organization|appointments",
    "sort": "-created_at"
}
export const paramOrder: ParamOrder = {
    "limit": "14",
    "filter[platform]": '',
    "filter[status]": "",
    "filter[withServicesSold]": true,
    "filter[productable]": true,
    // "include": "items|organization|branch|user|paymentMethod|deliveryAddress|appointments",
    'include': 'items|organization|appointments|btxReward', //btxReward
    "sort": "-created_at",
    "append": "qr_link"
}
export const paramDiscounts: ParamDiscounts = {
    "limit": 20,
    "filter[platform]": "MOMO",
    "filter[discount_type]": "",
    "filter[organization_id]": "",
    "filter[location]": "",
    "sort": "-priority|-created_at|discount_value",
    "append": "user_available_purchase_count"
}
export const paramServiceCatesOrg = {
    "page": 1,
    "limit": 80,
    "include": "servicesCount",
    "filter[is_momo_ecommerce_enable]": true
}
export const paramProductCatesOrg = {
    "page": 1,
    "limit": 80,
    "include": "productsCount",
    "filter[is_momo_ecommerce_enable]": true
}
export const paramsServicesOrg = {
    "limit": 15,
    "filter[keyword]": "",
    "filter[service_group_id]": "",
    "filter[special]": "",
    "filter[is_momo_ecommerce_enable]": true,
    "include": "category|favorites_count",
    "append": "is_favorite|rating|bought_count"
}
export const paramsProductsOrg = {
    "limit": 15,
    "filter[keyword]": "",
    "filter[product_category_id]": "",
    "filter[special]": "",
    "filter[is_momo_ecommerce_enable]": true,
    "include": "category | favorites",
    "append": "is_favorite|rating"
}
export const paramsComment = {
    "limit": 10,
    "filter[commentable_type]": "",
    "filter[commentable_id]": "",
    "filter[organization_id]": "",
    "include": "rate|children|children.media",
    "sort": "-created_at",
    "append": "media_url"
}
export const paramsProductable: ParamsProductable = {
    "limit": 15,
    "keyword": "",
    "on_ecommerce": "true",
    "location": "",
    "sort": "",
    "type": "",
    "organization_id": "",
    "discount_price": "",
    "discount_ecommerce_price": "",
    "min_price": "",
    "max_price": "",
    "discount_min_price": "",
    "discount_max_price": "",
    "discount_min_price_ecommerce": "",
    "discount_max_price_ecommerce": "",
    "is_demo": "false"
}
export const paramsTopic = {
    "org": "",
    "search": "",
    "sort": "-update_at"
}