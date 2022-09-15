const discountParams = {
    "append": "user_available_purchase_count",
    "filter[platform]": "MOMO",
    "limit": "30",
    "sort": "-created_at"
}
export const discountParamsURL = new URLSearchParams(discountParams).toString()