import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsApi from "../../api/productApi";
import categoryApi from "../../api/categoryApi";
import { STATUS } from "../status";
import { Product } from "../../interface/product";
import { Category } from '../../interface/category'

interface IPRODUCTS {
    products: Product[];
    page: number;
    totalItem: number;
    status_pr: string;
}
interface ICATE {
    categories: Category[];
    status: string;
}
export interface IORG_PRODUCTS {
    CATE: ICATE;
    PRODUCTS: IPRODUCTS;
    org_id: any;
    choose_cate: any;
}

export const fetchAsyncCateProducts: any = createAsyncThunk(
    "ORG_PRODUCTS/fetchAsyncCateProducts",
    async (org_id: any) => {
        try {
            const res = await categoryApi.getByOrgId(org_id);
            const payload = {
                org_id: org_id,
                categories: res.data.context.data,
            };
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);

export const fetchAsyncProducts: any = createAsyncThunk(
    "ORG_PRODUCTS/fetchAsyncProducts",
    async (values: any) => {
        const res = await productsApi.getByOrgId(values);
        const payload = {
            products: res?.data.context.data,
            page: values.page,
            totalItem: res?.data.context.total,
        };
        return payload;
    }
);
const initialState: IORG_PRODUCTS = {
    org_id: null,
    choose_cate: null,
    CATE: {
        categories: [],
        status: "",
    },
    PRODUCTS: {
        products: [],
        totalItem: 1,
        page: 1,
        status_pr: "",
    },
};
const orgProductsSlice = createSlice({
    initialState,
    name: "ORG_PRODUCTS",
    reducers: {
        clearProducts: (state: any) => {
            return {
                ...state,
                PRODUCTS: {
                    ...state.PRODUCTS,
                    products: [],
                    page: 1,
                },
            };
        },
        onChooseCateServices: (state, { payload }) => {
            state.choose_cate = payload;
        },
        onSetEmptyChooseCatePr: (state) => {
            state.choose_cate = null
        }
    },
    extraReducers: {
        //get services cate org
        [fetchAsyncCateProducts.pending]: (state, { payload }) => {
            return {
                ...state,
                CATE: { ...state.CATE, status: STATUS.LOADING },
            };
        },
        [fetchAsyncCateProducts.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                org_id: payload.org_id,
                CATE: {
                    categories: payload.categories,
                    status: STATUS.SUCCESS,
                },
            };
        },
        [fetchAsyncCateProducts.rejected]: (state) => {
            return {
                ...state,
                CATE: { ...state.CATE, status: STATUS.FAIL },
            };
        },
        //get prducts org
        [fetchAsyncProducts.pending]: (state) => {
            return {
                ...state,
                PRODUCTS: {
                    ...state.PRODUCTS,
                    //status_ser: STATUS.LOADING
                },
            };
        },
        [fetchAsyncProducts.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                PRODUCTS: {
                    products: [...state.PRODUCTS.products, ...payload.products],
                    totalItem: payload.totalItem,
                    page: payload.page,
                    status_pr: STATUS.SUCCESS,
                },
            };
        },
        [fetchAsyncProducts.rejected]: (state) => {
            return {
                ...state,
                PRODUCTS: { ...state.PRODUCTS, status_pr: STATUS.FAIL },
            };
        },
    },
});
const { actions } = orgProductsSlice;
export const { clearProducts, onChooseCateServices, onSetEmptyChooseCatePr } = actions;
export default orgProductsSlice.reducer;
