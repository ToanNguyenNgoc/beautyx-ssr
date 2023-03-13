import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bannerApi from "api/bannerApi";
import provincesApi from "api/provinceApi";
import tagsApi from "api/tagApi";
import { STATUS } from "../status";

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
            state.DISCOUNTS = initialState.DISCOUNTS
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchAsyncHome.pending, (state) => { return state })
        builder.addCase(fetchAsyncHome.fulfilled, (state, { payload }) => {
            return {
                ...state,
                ...payload,
                status: STATUS.SUCCESS,
            };
        })
        builder.addCase(fetchAsyncHome.rejected, (state) => {
            return { ...state, status: STATUS.FAIL }
        })
    },
});
const { actions } = homeSlice;
export const { clearHomeDiscount } = actions
export default homeSlice.reducer;
