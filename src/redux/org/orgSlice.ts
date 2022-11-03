import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orgApi from "../../api/organizationApi";
import galleriesApi from "../../api/moboGalleriesApi";
import serviceApi from "../../api/serviceApi";
import favorites from "../../api/favorite";
import productsApi from "../../api/productApi";
import { STATUS } from "../status";
import { orgInit } from "../initials";
import { IOrganization } from '../../interface/organization'
// google tag event
import { Service } from '../../interface/service';
import { Product } from '../../interface/product';
// end
export interface IOrgSlice {
    org: IOrganization,
    SERVICES_KEYWORD: {
        services_keyword: Service[],
        status: string,
        total_services: number,
    },
    PRODUCTS_KEYWORD: {
        products_keyword: Product[],
        status: string,
        total_products: number,
    },
}

export const fetchAsyncOrg: any = createAsyncThunk(
    "ORG/fetchAsyncOrg",
    async (sub_domain: any) => {
        try {
            const res = await orgApi.getOrgById(sub_domain);
            const payload = res.data.context;
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);
export const fetchOrgGalleries: any = createAsyncThunk(
    "ORG/fetchOrgGalleries",
    async (org_id: any) => {
        try {
            const res = await galleriesApi.getByOrgId(org_id);
            const payload = {
                org_id: org_id,
                galleries: res.data.context.data,
            };
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);
export const onFavoriteOrg: any = createAsyncThunk(
    "ORG/onFavoriteOrg",
    async (org: any) => {
        await favorites.postFavorite(org?.id);
        const payload = org.favorites_count + 1;
        return payload;
    }
);
export const onDeleteFavoriteOrg: any = createAsyncThunk(
    "ORG/onDeleteFavoriteOrg",
    async (org: any) => {
        await favorites.deleteFavorite(org?.id);
        const payload = org.favorites_count - 1;
        return payload;
    }
);
export const fetchAsyncByKeyword: any = createAsyncThunk(
    "ORG/fetchAsyncByKeyword",
    async (values: any) => {
        try {
            const res = await serviceApi.getByOrgId(values);
            const res_products = await productsApi.getByOrgId(values);
            const payload = {
                services: res?.data.context.data,
                totalServices: res?.data.context.total,
                totalProducts: res_products?.data.context.total,
                products: res_products?.data.context.data,
            };
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);
const initialState: IOrgSlice = {
    org: orgInit,
    SERVICES_KEYWORD: {
        services_keyword: [],
        status: "",
        total_services: 1,
    },
    PRODUCTS_KEYWORD: {
        products_keyword: [],
        status: "",
        total_products: 1,
    },
};
const orgSlice = createSlice({
    initialState,
    name: "ORG",
    reducers: {
        onSetOrgDetail: (state: any, action: any) => {
            state.org = action.payload;
        },
        onActiveTab: (state: any, action: any) => {
            return {
                ...state,
                tab: action.payload,
            };
        },
    },
    extraReducers: {
        [fetchAsyncOrg.pending]: (state) => {
            return { ...state, status: STATUS.LOADING };
        },
        [fetchAsyncOrg.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                org: payload,
                status: STATUS.SUCCESS,
            };
        },
        [fetchAsyncOrg.rejected]: (state) => {
            return { ...state, status: STATUS.FAIL };
        },
        // favorites org
        [onFavoriteOrg.pending]: (state) => {
            return state;
        },
        [onFavoriteOrg.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                org: {
                    ...state.org,
                    is_favorite: true,
                    favorites_count: payload,
                },
            };
        },
        [onFavoriteOrg.rejected]: (state, { payload }) => {
            console.log(payload);
            return state;
        },
        //remove favorite org
        [onDeleteFavoriteOrg.pending]: (state) => {
            return state;
        },
        [onDeleteFavoriteOrg.fulfilled]: (state, { payload }) => {
            console.log(payload);
            return {
                ...state,
                org: {
                    ...state.org,
                    is_favorite: false,
                    favorites_count: payload,
                },
            };
        },
        [onDeleteFavoriteOrg.rejected]: (state) => {
            return state;
        },
        //fetch by keyword
        [fetchAsyncByKeyword.pending]: (state) => {
            return {
                ...state,
                SERVICES_KEYWORD: {
                    ...state.SERVICES_KEYWORD,
                    status: STATUS.LOADING,
                },
                PRODUCTS_KEYWORD: {
                    ...state.PRODUCTS_KEYWORD,
                    status: STATUS.LOADING,
                },
            };
        },
        [fetchAsyncByKeyword.fulfilled]: (state, { payload }) => {
            const { services, products, totalServices, totalProducts } =
                payload;
            return {
                ...state,
                SERVICES_KEYWORD: {
                    services_keyword: services,
                    status: STATUS.SUCCESS,
                    total_services: totalServices,
                },
                PRODUCTS_KEYWORD: {
                    products_keyword: products,
                    status: STATUS.SUCCESS,
                    total_products: totalProducts,
                },
            };
        },
        [fetchAsyncByKeyword.rejected]: (state) => {
            return {
                ...state,
                SERVICES_KEYWORD: {
                    ...state.SERVICES_KEYWORD,
                    status: STATUS.FAIL,
                },
                PRODUCTS_KEYWORD: {
                    ...state.PRODUCTS_KEYWORD,
                    status: STATUS.FAIL,
                },
            };
        },
    },
});
const { actions } = orgSlice;
export const { onActiveTab, onSetOrgDetail } = actions;
export default orgSlice.reducer;
