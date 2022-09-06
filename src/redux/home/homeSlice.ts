import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bannerApi from "../../api/bannerApi";
import provincesApi from "../../api/provinceApi";
import tagsApi from "../../api/tagApi";
import { STATUS } from "../status";
import discountApi from "../../api/discountApi";

export const fetchAsyncHome: any = createAsyncThunk(
    "HOME/fetchAsyncHome",
    async () => {
        const res_banners = await bannerApi.getAll();
        const res_provinces = await provincesApi.getAll();
        const res_tags = await tagsApi.getAll();
        const payload = {
            banners: await res_banners.data.context.data,
            provinces: await res_provinces.data.context.data,
            provinces_org: await res_provinces.data.context.data.filter(
                (item: any) => item.organizations_count > 0
            ),
            tags: await res_tags.data.context.data,
        };
        return payload;
    }
);
export const fetchAsyncDiscounts: any = createAsyncThunk(
    "HOME/fetchAsyncDiscounts",
    async (values: any) => {
        try {
            const res = await discountApi.getAll(values);
            const payload = {
                discounts: res.data.context.data,
                totalItem: res.data.context.total,
            };
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);
const initialState = {
    banners: [],
    tags: [],
    DISCOUNTS: {
        discounts: [],
        page: 1,
        totalItem: 1,
        status_discount: "",
    },

    provinces_org: [],
    provinces: [],
    status: STATUS.LOADING,
}
const homeSlice = createSlice({
    name: "HOME",
    initialState,
    reducers: {
        clearHomeDiscount: (state) => {
            state.DISCOUNTS.discounts = [];
            state.DISCOUNTS.page = 1;
            state.DISCOUNTS.status_discount= ""
        }
    },
    extraReducers: {
        [fetchAsyncHome.pending]: (state) => {
            return state;
        },
        [fetchAsyncHome.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                ...payload,
                status: STATUS.SUCCESS,
            };
        },
        [fetchAsyncHome.rejected]: (state) => {
            return { ...state, status: STATUS.FAIL };
        },

        [fetchAsyncDiscounts.pending]: (state) => {
            return {
                ...state,
                DISCOUNTS: {
                    ...state.DISCOUNTS,
                    status_discount: STATUS.LOADING,
                },
            };
        },
        [fetchAsyncDiscounts.fulfilled]: (state, { payload }) => {
            const { discounts, totalItem } = payload;
            return {
                ...state,
                DISCOUNTS: {
                    ...state.DISCOUNTS,
                    discounts: [...state.DISCOUNTS.discounts, ...discounts],
                    totalItem: totalItem,
                    status_discount: STATUS.SUCCESS,
                },
            };
        },
        [fetchAsyncDiscounts.rejected]: (state) => {
            return {
                ...state,
                DISCOUNTS: {
                    ...state.DISCOUNTS,
                    status_discount: STATUS.FAIL,
                },
            };
        },
    },
});
const { actions } = homeSlice;
export const { clearHomeDiscount } = actions
export default homeSlice.reducer;
