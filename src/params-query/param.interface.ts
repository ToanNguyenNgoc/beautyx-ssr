export interface ParamOrg {
    "page"?: number | string,
    "limit"?: number,
    "filter[keyword]"?: string,
    "filter[location]"?: string,
    "filter[is_momo_ecommerce_enable]"?: boolean | "",
    "filter[tags]"?: "",
    "filter[min_price]"?: number | string,
    "filter[max_price]"?: number | string,
    "filter[province_code]"?: number | string,
    "filter[district_code]"?: number | string,
    "filter[is_demo]"?: boolean | string,
    "sort"?: string,
    "include"?: string
}
export interface ParamDiscounts {
    "page"?: number,
    "limit"?: number,
    "filter[platform]": "" | "MOMO" | "MOBA" | "BEAUTYX" | "TIKI",
    "filter[discount_type]"?: "" | "SUB_TOTAL" | "FINAL_PRICE" | "PRODUCT",
    "filter[organization_id]"?: "" | number,
    "filter[location]"?: string,
    "sort"?: string   //title|created_at|coupon_code|discount_value|total|used|limit|priority
    "append"?: string
}
export interface ParamService {
    "limit"?: number,
    "filter[keyword]"?: string,
    "filter[min_price]"?: number | string,
    "filter[max_price]"?: number | string,
    "filter[special_min_price]"?: number | string,
    "filter[special_max_price]"?: number | string,
    "filter[discount_percent]"?: number | string,
    "filter[special_price]"?: boolean | string,
    "filter[is_momo_ecommerce_enable]"?: boolean,
    "filter[location]"?: string,
    "sort"?: string,
    "filter[province_code]"?: number | string,
    "filter[district_code]"?: number | string,
}
export interface ParamProduct {
    "limit"?: number,
    "filter[keyword]"?: string,
    "filter[min_price]"?: number | string,
    "filter[max_price]"?: string | number,
    "filter[special_min_price]"?: number | string,
    "filter[special_max_price]"?: number | string,
    "filter[discount_percent]"?: number | string,
    "filter[special_price]"?: boolean | string,
    "filter[is_momo_ecommerce_enable]"?: boolean,
    "filter[location]"?: string,
    "sort"?: string,
    "filter[province_code]"?: number | string,
    "filter[district_code]"?: number | string,
}
export interface ParamOrder {
    "limit": string | number,
    "filter[platform]": string,
    "filter[status]": string,
    "filter[withServicesSold]": boolean | any,
    "filter[productable]": boolean | any,
    "include": string,
    "sort": string,
    "append": string
}
export interface ParamsProductable {
    "limit"?: number | string,
    "keyword"?: string,
    "on_ecommerce"?: "" | boolean,
    "location"?: string,
    "sort"?: "distance|random" | "distance" | "random" | "",
    "type"?: "" | "1" | "2" | "3" | "4",  //SERVICE:1|PRODUCT:2|PREPAY CARD:3|TREATMENT COMBO:4
    "organization_id"?: "" | number,
    "discount_price"?: "" | boolean,
    "discount_ecommerce_price"?: "" | boolean,
    "min_price"?: "" | number,
    "max_price"?: "" | number,
    "discount_min_price"?: "" | number,
    "discount_max_price"?: "" | number,
    "discount_min_price_ecommerce"?: "" | number,
    "discount_max_price_ecommerce"?: "" | number,
}