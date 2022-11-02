import { createSlice } from '@reduxjs/toolkit'
import { ParamOrg, ParamService, ParamProduct } from 'params-query/param.interface'

export interface IFilterResult {
    keyword_re: string,
    SERVICE_PR: ParamService,
    PRODUCT_PR: ParamProduct,
    ORG_PR: ParamOrg,
}
const initialState: IFilterResult = {
    keyword_re: "",
    SERVICE_PR: {
        "filter[location]": "",
        "filter[province_code]": "",
        "filter[district_code]": "",
        "filter[min_price]": "",
        "filter[max_price]": "",
        "sort": ""
    },
    PRODUCT_PR: {
        "filter[location]": "",
        "filter[province_code]": "",
        "filter[district_code]": "",
        "filter[min_price]": "",
        "filter[max_price]": "",
        "sort": ""
    },
    ORG_PR: {
        "filter[tags]": "",
        "filter[location]": "",
        "filter[province_code]": "",
        "filter[district_code]": "",
        "filter[min_price]": "",
        "filter[max_price]": "",
        "sort": ""
    }
}
const FilterResultSlice = createSlice({
    name: "FILTER_RESULT",
    initialState,
    reducers: {
        onSaveKeyword: (state, action) => {
            state.keyword_re = action.payload
        },
        onChangeFilterService: (state, action) => {
            state.SERVICE_PR = { ...state.SERVICE_PR, ...action.payload }
        },
        onChangeFilterProduct: (state, action) => {
            state.PRODUCT_PR = { ...state.PRODUCT_PR, ...action.payload }
        },
        onChangeFilterOrg: (state, action) => {
            state.ORG_PR = { ...state.ORG_PR, ...action.payload }
        },
        onResetFilter: (state) => {
            state.SERVICE_PR = initialState.SERVICE_PR
        }
    }
})
const { actions, reducer } = FilterResultSlice
export const {
    onChangeFilterService,
    onResetFilter,
    onSaveKeyword,
    onChangeFilterOrg,
    onChangeFilterProduct
} = actions
export default reducer