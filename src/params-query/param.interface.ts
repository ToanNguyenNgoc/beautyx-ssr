export interface ParamOrg {
    "page"?: number | string,
    "limit"?: number,
    "filter[keyword]"?: string,
    "filter[location]"?: string,
    "filter[is_momo_ecommerce_enable]"?: boolean | "",
    "filter[tags]"?: string[] | "",
    "filter[min_price]"?: number | string,
    "filter[max_price]"?: number | string,
    "filter[province_code]"?: number | string,
    "filter[district_code]"?: number | string,
    "sort"?: string,
    "include"?: string
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
    "limit": number,
    "filter[keyword]": string,
    "filter[min_price]": number,
    "filter[max_price]": string,
    "filter[special_min_price]": number | string,
    "filter[special_max_price]": number | string,
    "filter[discount_percent]": number | string,
    "filter[special_price]": boolean | string,
    "filter[is_momo_ecommerce_enable]": boolean,
    "filter[location]": string,
    "sort": string
}