export interface ParamOrg {
    "limit": number,
    "filter[keyword]": string,
    "filter[location]": string,
}
export interface ParamService {
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