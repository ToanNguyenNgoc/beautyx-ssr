import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orgApi from '../../api/organizationApi';
import provincesApi from '../../api/provinceApi';
import { STATUS } from '../status'

export const fetchAsyncDistrictsByProvince: any = createAsyncThunk(
    "FILTER/fetchAsyncDistrictsByProvince",
    async (province_code: any) => {
        const res = await provincesApi.getDistricts(province_code);
        return {
            province_code: province_code,
            districts: res.data.context.data
        }
    }
)

export const fetchAsyncOrgsByFilter: any = createAsyncThunk(
    "SEARCH_RESULT/fetchAsyncOrgsByTag",
    async (values: any) => {
        const res = await orgApi.getAll(values);
        return {
            orgs: res.data.context.data,
            totalItem: res.data.context.total,
            page: values.page,
            path_url: values.path_url
        }
    }
)

export interface IFILTER {
    FILTER_PROMO: {
        id: number,
        query: string
    },
    FILTER_PRODUCT_PROMO: {
        query: string
    }
    FILTER_ORG: {
        tags: any[],
        province: any,
        district: any,
        min_price: any,
        max_price: any,
        sort: any,
        location: any,
    },
    DISTRICTS: {
        province_code: any,
        districts: any[],
        status: string
    },
    TYPE_FILTER: string,
    ORGS: {
        path_url: string,
        orgs: any[],
        page: number,
        totalItem: number,
        status: string,
    }
}

const initialState: IFILTER = {
    FILTER_PROMO: {
        id: 2,
        query: "-discount_percent"
    },
    FILTER_PRODUCT_PROMO: {
        query: "-discount_percent"
    },
    FILTER_ORG: {
        tags: [],
        province: null,
        district: null,
        min_price: "",
        max_price: "",
        sort: null,
        location: null,
    },
    DISTRICTS: {
        province_code: null,
        districts: [],
        status: ""
    },
    TYPE_FILTER: "",
    ORGS: {
        path_url: "",
        orgs: [],
        page: 1,
        totalItem: 1,
        status: "",
    }

}
const filterSlice = createSlice({
    name: "FILTER",
    initialState,
    reducers: {
        onSetFilterPromo: (state, action) => {
            state.FILTER_PROMO.id = action.payload.id;
            state.FILTER_PROMO.query = action.payload.query
        },
        onSetFilterProductPromo: (state, action) => {
            state.FILTER_PRODUCT_PROMO.query = action.payload
        },
        onSetTagsOrg: (state, action) => {
            const iIndex = state.FILTER_ORG.tags.findIndex((item: any) =>
                item === action.payload
            );
            if (iIndex >= 0) {
                const newTags = state.FILTER_ORG.tags.filter((i: any) => i !== action.payload)
                state.FILTER_ORG.tags = newTags
            } else {
                state.FILTER_ORG.tags.push(action.payload)
            }
        },
        onSetSortOrg: (state, action) => {
            state.FILTER_ORG.sort = action.payload
        },
        onSetOrgsProvince: (state, action) => {
            state.FILTER_ORG.province = action.payload
        },
        onSetOrgsDistrict: (state, action) => {
            state.FILTER_ORG.district = action.payload
        },
        onSetMinPrice: (state, action) => {
            state.FILTER_ORG.min_price = action.payload
        },
        onSetMaxPrice: (state, action) => {
            state.FILTER_ORG.max_price = action.payload
        },
        onResetFilter: (state) => {
            state.FILTER_ORG = {
                tags: [],
                province: null,
                district: null,
                min_price: null,
                max_price: null,
                sort: null,
                location: null,
            }
        },
        onSetOrgsEmpty: (state) => {
            state.ORGS.orgs = [];
            state.ORGS.page = 1;
            state.ORGS.totalItem = 1
        },
        onSetFilterType: (state, action) => {
            state.TYPE_FILTER = action.payload
        }
    },
    extraReducers: {
        [fetchAsyncDistrictsByProvince.pending]: (state) => {
            return { ...state, DISTRICTS: { ...state.DISTRICTS, status: STATUS.LOADING } }
        },
        [fetchAsyncDistrictsByProvince.fulfilled]: (state, { payload }) => {
            const { province_code, districts } = payload;
            return {
                ...state,
                DISTRICTS: {
                    province_code: province_code,
                    districts: districts,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncDistrictsByProvince.pending]: (state) => {
            return { ...state, DISTRICTS: { ...state.DISTRICTS, status: STATUS.FAIL } }
        },
        [fetchAsyncOrgsByFilter.pending]: (state) => {
            return { ...state, ORGS: { ...state.ORGS, status: STATUS.LOADING } }
        },
        [fetchAsyncOrgsByFilter.fulfilled]: (state, { payload }) => {
            const { orgs, page, totalItem, path_url } = payload
            return {
                ...state,
                ORGS: {
                    ...state.ORGS,
                    path_url: path_url,
                    orgs: [...state.ORGS.orgs, ...orgs],
                    page: page,
                    totalItem: totalItem,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncOrgsByFilter.rejected]: (state) => {
            return { ...state, ORGS: { ...state.ORGS, status: STATUS.FAIL } }
        },
    }
})
const { actions } = filterSlice;
export const {
    onSetFilterPromo,
    onSetFilterProductPromo,
    onSetTagsOrg,
    onSetSortOrg,
    onSetOrgsProvince,
    onSetOrgsDistrict,
    onSetMinPrice,
    onSetMaxPrice,
    onResetFilter,
    onSetOrgsEmpty,
    onSetFilterType
} = actions;
export default filterSlice.reducer;