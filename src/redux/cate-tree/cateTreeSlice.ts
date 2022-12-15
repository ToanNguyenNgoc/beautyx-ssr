import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orgApi from "../../api/organizationApi";
import servicePromoApi from '../../api/servicePromoApi';
import productsApi from '../../api/productApi';
import { STATUS } from '../status';
import { IProductPromo } from '../../interface/productPromo';
import { IOrganization } from '../../interface/organization';
import { IServicePromo } from '../../interface/servicePromo';

export const fetchOrgsByTag: any = createAsyncThunk(
    "CATE_TREE/fetchOrgsByTag",
    async (values: any) => {
        const res = await orgApi.getAll(values);
        const payload = {
            orgs: res.data.context.data,
            totalItem: res.data.context.total,
            page: values.page,
        }
        return payload
    }
)
export const fetchServiceByCateChild: any = createAsyncThunk(
    "CATE_TREE/fetchServiceByCateChild",
    async (values: any) => {
        const res = await servicePromoApi.getServicesPromo(values);
        const payload = {
            services: res.data.data.hits,
            page: values.page,
            totalItem: res.data.total,
            CATE_CHILD: values.CATE_CHILD,
            CATE: values.CATE
        }
        return payload
    }
)
export const fetProductsByCateChild: any = createAsyncThunk(
    "CATE_TREE/fetProductsByCateChild",
    async (values: any) => {
       
        const res = await productsApi.getProductsAll(values);
        return {
            products: res.data.data.hits.map((item: any) => {
                return {
                    ...item,
                    CATE_NAME: values.keyword
                }
            }),
            page: values.page,
            totalItem: res.data.total,
            CATE_CHILD: values.CATE_CHILD,
            keyword: values.keyword
        }
    }
)

interface IInitialState {
    VALUE: string,
    CATE: {
        title: string,
        cate_id: number
    },
    ORGS: {
        orgs: IOrganization[],
        page: number,
        totalItem: number,
        status: string,
        tag: any,
    },
    SERVICES: {
        services: IServicePromo[],
        page: number,
        totalItem: number,
        status: string,
        CATE_CHILD: any,
        CATE: any
    },
    PRODUCTS: {
        products: IProductPromo[],
        page: number,
        totalItem: number,
        status: string,
        CATE_CHILD: any,
        keyword: string,
    }
}

const initialState: IInitialState = {
    VALUE: "SERVICE",
    CATE: {
        title: "SPA",
        cate_id: 1
    },
    ORGS: {
        orgs: [],
        page: 1,
        totalItem: 1,
        status: "",
        tag: null,
    },
    SERVICES: {
        services: [],
        page: 1,
        totalItem: 1,
        status: "",
        CATE_CHILD: {},
        CATE: {}
    },
    PRODUCTS: {
        products: [],
        page: 1,
        totalItem: 1,
        status: "",
        CATE_CHILD: null,
        keyword: "",
    }
}
const cateTreeSlice = createSlice({
    name: "CATE_TREE",
    initialState,
    reducers: {
        onChooseCate: (state, action) => {
            state.CATE = action.payload
        },
        onChooseTab: (state, action) => {
            state.VALUE = action.payload
        },
        onSetFirstCateProducts: (state, action) => {
            state.PRODUCTS.CATE_CHILD = action.payload
        },
        onClearProducts: (state) => {
            state.PRODUCTS.products = [];
        }
    },
    extraReducers: {
        [fetchOrgsByTag.pending]: (state) => {
            return { ...state, ORGS: { ...state.ORGS, state: STATUS.LOADING } }
        },
        [fetchOrgsByTag.fulfilled]: (state, { payload }) => {
            const { orgs, totalItem, page } = payload;
            return {
                ...state,
                ORGS: {
                    ...state.ORGS,
                    orgs: orgs,
                    totalItem: totalItem,
                    page: page,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchOrgsByTag.rejected]: (state) => {
            return { ...state, ORGS: { ...state.ORGS, state: STATUS.FAIL } }
        },
        //fetch service by cate child
        [fetchServiceByCateChild.pending]: (state) => {
            return { ...state, SERVICES: { ...state.SERVICES, status: STATUS.LOADING } }
        },
        [fetchServiceByCateChild.fulfilled]: (state, { payload }) => {
            const { services, totalItem, page, CATE_CHILD, CATE } = payload
            return {
                ...state,
                SERVICES: {
                    ...state.SERVICES,
                    services: services,
                    totalItem: totalItem,
                    page: page,
                    CATE_CHILD: CATE_CHILD,
                    status: STATUS.SUCCESS,
                    CATE: CATE
                }
            }
        },
        [fetchServiceByCateChild.pending]: (state) => {
            return { ...state, SERVICES: { ...state.SERVICES, status: STATUS.FAIL } }
        },
        //fetch product by cate child
        [fetProductsByCateChild.pending]: (state) => {
            return { ...state, PRODUCTS: { ...state.PRODUCTS, status: STATUS.LOADING } }
        },
        [fetProductsByCateChild.fulfilled]: (state, { payload }) => {
            const {
                products,
                totalItem,
                page,
                //CATE_CHILD 
                keyword
            } = payload
            return {
                ...state,
                PRODUCTS: {
                    ...state.PRODUCTS,
                    products: [...state.PRODUCTS.products, ...products],
                    totalItem: totalItem,
                    page: page,
                    //CATE_CHILD: CATE_CHILD,
                    status: STATUS.SUCCESS,
                    keyword: keyword
                }
            }
        },
        [fetProductsByCateChild.pending]: (state) => {
            return { ...state, PRODUCTS: { ...state.PRODUCTS, status: STATUS.FAIL } }
        },
    }
})
const { actions } = cateTreeSlice;
export const { onChooseCate, onChooseTab, onSetFirstCateProducts, onClearProducts } = actions;
export default cateTreeSlice.reducer;