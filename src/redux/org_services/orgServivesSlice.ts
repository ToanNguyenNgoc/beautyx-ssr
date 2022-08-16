import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryApi from "../../api/categoryApi";
import serviceApi from "../../api/serviceApi";
import { STATUS } from "../status";
import { Service } from "../../interface/service";
import {CategoryService} from '../../interface/category'

interface ISERVICES {
    services: Service[];
    page: number;
    totalItem: number;
    status_ser: string;
}
interface ICATE {
    categories: CategoryService[];
    status: string;
}
export interface IORG_SERVICES {
    choose_cate: null;
    org_id: any;
    CATE: ICATE;
    SERVICES: ISERVICES;
}

export const fetchAsyncCateServices: any = createAsyncThunk(
    "ORG_SERVICES/fetchAsyncCateServices",
    async (org_id) => {
        const params = { org_id };
        try {
            const res = await categoryApi.getByOrgId_services(params);
            const payload = {
                categories: res.data.context.data,
                org_id: org_id,
            };
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);
export const fetchAsyncServices: any = createAsyncThunk(
    "ORG_SERVICES/fetchAsyncServices",
    async (values: any) => {
        const res = await serviceApi.getByOrgId(values);
        const payload = {
            services: res?.data.context.data,
            page: values.page,
            totalItem: res?.data.context.total,
            status_ser: STATUS.SUCCESS,
        };
        return payload;
    }
);
const initialState: IORG_SERVICES = {
    choose_cate: null,
    org_id: null,
    CATE: {
        categories: [],
        status: "",
    },
    SERVICES: {
        services: [],
        page: 1,
        totalItem: 1,
        status_ser: "",
    },
};
const orgServicesSlice = createSlice({
    name: "ORG_SERVICES",
    initialState,
    reducers: {
        onChooseCateServices: (state: any, { payload }) => {
            state.choose_cate = payload;
        },
        clearServices: (state: any) => {
            return {
                ...state,
                SERVICES: {
                    ...state.SERVICES,
                    services: [],
                    page: 1,
                    status_ser:""
                },
            };
        },
        onSetEmptyChooseCate:(state)=>{
            state.choose_cate = null
        }
    },
    extraReducers: {
        //get services cate org
        [fetchAsyncCateServices.pending]: (state) => {
            return {
                ...state,
                CATE: { ...state.CATE, status: STATUS.LOADING },
            };
        },
        [fetchAsyncCateServices.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                org_id: payload.org_id,
                CATE: {
                    categories: payload.categories,
                    status: STATUS.SUCCESS,
                },
            };
        },
        [fetchAsyncCateServices.rejected]: (state) => {
            return {
                ...state,
                CATE: { ...state.CATE, status: STATUS.FAIL },
            };
        },
        //get services org
        [fetchAsyncServices.pending]: (state) => {
            return {
                ...state,
                SERVICES: {
                    ...state.SERVICES,
                    //status_ser: STATUS.LOADING
                },
            };
        },
        [fetchAsyncServices.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                SERVICES: {
                    services: [...state.SERVICES.services, ...payload.services],
                    totalItem: payload.totalItem,
                    page: payload.page,
                    status_ser: payload.status_ser,
                },
            };
        },
        [fetchAsyncServices.rejected]: (state) => {
            return {
                ...state,
                SERVICES: { ...state.SERVICES, status_ser: STATUS.FAIL },
            };
        },
    },
});
const { actions } = orgServicesSlice;
export const { clearServices, onChooseCateServices, onSetEmptyChooseCate } = actions;
export default orgServicesSlice.reducer;
