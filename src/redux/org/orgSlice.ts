import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orgApi from "api/organizationApi";
import serviceApi from "api/serviceApi";
import productsApi from "api/productApi";
import { STATUS } from "../status";
import { IOrganization, Service, Product } from 'interface'
// end
export interface IOrgSlice {
    org: null | IOrganization,
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
    org: null,
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
    extraReducers(builder) {
        builder.addCase(fetchAsyncOrg.pending, (state) => {
            return { ...state, status: STATUS.LOADING };
        })
        builder.addCase(fetchAsyncOrg.fulfilled, (state, { payload }) => {
            return {
                ...state,
                org: payload,
                status: STATUS.SUCCESS,
            };
        })
        builder.addCase(fetchAsyncOrg.rejected, (state) => {
            return { ...state, status: STATUS.FAIL };
        })
        //
        builder.addCase(fetchAsyncByKeyword.pending, (state) => {
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
        })
        builder.addCase(fetchAsyncByKeyword.fulfilled, (state, { payload }) => {
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
        })
        builder.addCase(fetchAsyncByKeyword.rejected, (state) => {
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
        })
    },
});
const { actions } = orgSlice;
export const { onActiveTab, onSetOrgDetail } = actions;
export default orgSlice.reducer;
