import discountApi from "../../api/discountApi";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../status'

export const fetchAsyncDiscountDetail: any = createAsyncThunk(
    "ORG_DISCOUNTS/fetchAsyncDiscountDetail",
    async (values: any) => {
        try {
            const res = await discountApi.getById(values)
            return res.data.context
        } catch (error) {
            console.log(error)
        }
    }
)
export const fetchAsyncOrgDiscounts: any = createAsyncThunk(
    "ORG_DISCOUNTS/fetchAsyncOrgDiscounts",
    async (values: any) => {
        try {
            const res = await discountApi.getByOrgId(values);
            const payload = {
                discounts: res.data.context.data,
                org_id: values.org_id
            }
            return payload
        } catch (error) {
            console.log(error)
        }
    }
)
const initialState = {
    org_id: null,
    DISCOUNTS: {
        discounts: [],
        status_list: "",
    },
    DISCOUNT: {
        discount: {},
        status: ""
    }
}
const orgDiscountsSlice = createSlice({
    name: "ORG_DISCOUNTS",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAsyncDiscountDetail.pending]: (state) => {
            return { ...state, DISCOUNT: { ...state.DISCOUNT, status: STATUS.LOADING } }
        },
        [fetchAsyncDiscountDetail.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                DISCOUNT: {
                    discount: payload,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncDiscountDetail.rejected]: (state) => {
            return { ...state, DISCOUNT: { ...state.DISCOUNT, status: STATUS.FAIL } }
        },

        [fetchAsyncOrgDiscounts.pending]: (state) => {
            return {
                ...state,
                DISCOUNTS: { ...state.DISCOUNTS, status_list: STATUS.LOADING }
            }
        },
        [fetchAsyncOrgDiscounts.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                org_id: payload.org_id,
                DISCOUNTS: {
                    discounts: payload.discounts,
                    status_list: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncOrgDiscounts.rejected]: (state) => {
            return {
                ...state,
                DISCOUNTS: { ...state.DISCOUNTS, status_list: STATUS.FAIL }
            }
        }
    },
})
export default orgDiscountsSlice.reducer;