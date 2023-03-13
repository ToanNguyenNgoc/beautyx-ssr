import { createSlice } from '@reduxjs/toolkit'
import { ParamOrg, ParamService, ParamProduct, ParamBranchV3, ParamsProductable } from 'params-query/param.interface'

export interface IFilterResult {
    prev_param: string,
    SERVICE_PR: ParamService,
    SERVICE_PRODUCTABLE_PR: ParamsProductable,
    PRODUCT_PRODUCTABLE_PR: ParamsProductable,
    PRODUCT_PR: ParamProduct,
    ORG_PR: ParamOrg,
    BRANCH_PR: ParamBranchV3
}
const initialState: IFilterResult = {
    prev_param: "",
    SERVICE_PR: {
        "filter[keyword]": '',
        "filter[location]": "",
        "filter[province_code]": "",
        "filter[district_code]": "",
        "filter[min_price]": 1000,
        "filter[max_price]": "",
        "sort": ""
    },
    SERVICE_PRODUCTABLE_PR: {
        "keyword": "",
        "min_price": 1000,
        "max_price": "",
        "location": "",
        "district_code": "",
        "province_code": "",
        "discount_price": ""
    },
    PRODUCT_PRODUCTABLE_PR: {
        "keyword": "",
        "min_price": 1000,
        "max_price": "",
        "location": "",
        "district_code": "",
        "province_code": "",
        "discount_price": ""
    },
    PRODUCT_PR: {
        "filter[location]": "",
        "filter[province_code]": "",
        "filter[district_code]": "",
        "filter[min_price]": 1000,
        "filter[max_price]": "",
        "filter[special_price]": "",
        "sort": ""
    },
    ORG_PR: {
        "filter[tags]": "",
        "filter[location]": "",
        "filter[province_code]": "",
        "filter[district_code]": "",
        "filter[min_price]": "",
        "filter[max_price]": "",
        "sort": "",
        "include": "favorites_count|favorites|branches"
    },
    BRANCH_PR: {
        "location": "",
        "district_code": "",
        "province_code": "",
        "sort": "",
    }
}
const FilterResultSlice = createSlice({
    name: "FILTER_RESULT",
    initialState,
    reducers: {
        onSavePrevPa: (state, action) => {
            state.prev_param = action.payload
        },
        onChangeFilterService: (state, action) => {
            state.SERVICE_PR = { ...state.SERVICE_PR, ...action.payload }
        },
        onChangeFilterServiceProductable: (state, action) => {
            state.SERVICE_PRODUCTABLE_PR = { ...state.SERVICE_PRODUCTABLE_PR, ...action.payload }
        },
        onChangeFilterProductProductable: (state, action) => {
            state.PRODUCT_PRODUCTABLE_PR = { ...state.PRODUCT_PRODUCTABLE_PR, ...action.payload }
        },
        onChangeFilterProduct: (state, action) => {
            state.PRODUCT_PR = { ...state.PRODUCT_PR, ...action.payload }
        },
        onChangeFilterOrg: (state, action) => {
            state.ORG_PR = { ...state.ORG_PR, ...action.payload }
        },
        onChangeFilterBranch: (state, action) => {
            state.BRANCH_PR = { ...state.BRANCH_PR, ...action.payload }
        },
        onResetFilter: (state) => {
            state.SERVICE_PR = initialState.SERVICE_PR
            state.PRODUCT_PR = initialState.PRODUCT_PR
            state.SERVICE_PRODUCTABLE_PR = initialState.SERVICE_PRODUCTABLE_PR
            state.PRODUCT_PRODUCTABLE_PR = initialState.PRODUCT_PRODUCTABLE_PR
            state.ORG_PR = initialState.ORG_PR
            state.BRANCH_PR = initialState.BRANCH_PR
        },
        onResetFilterOrg: (state) => {
            state.ORG_PR = {
                ...state.ORG_PR,
                "filter[district_code]": '',
                "filter[province_code]": '',
                'sort': ''
            }
        }
    }
})
const { actions, reducer } = FilterResultSlice
export const {
    onChangeFilterService,
    onResetFilter,
    onResetFilterOrg,
    onSavePrevPa,
    onChangeFilterOrg,
    onChangeFilterProduct,
    onChangeFilterBranch,
    onChangeFilterServiceProductable,
    onChangeFilterProductProductable
} = actions
export default reducer