import discountApi from "../../api/discountApi";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../status';
import { IDiscountPar, IITEMS_DISCOUNT } from '../../interface/discount'

export interface IORG_DISCOUNTS {
    org_id: null | number,
    DISCOUNTS: {
        discounts: IDiscountPar[],
        totalItem: number,
        status_list: string,
    },
    DISCOUNT: {
        discount: IDiscountPar | null,
        status: string
    },
    ITEM_DISCOUNT: IITEMS_DISCOUNT | null,
}

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
                org_id: values.org_id,
                totalItem: res.data.context.total
            }
            return payload
        } catch (error) {
            console.log(error)
        }
    }
)
const initialState: IORG_DISCOUNTS = {
    org_id: null,
    DISCOUNTS: {
        discounts: [],
        totalItem: 1,
        status_list: "",
    },
    DISCOUNT: {
        discount: null,
        status: ""
    },
    ITEM_DISCOUNT: null,
}
const orgDiscountsSlice = createSlice({
    name: "ORG_DISCOUNTS",
    initialState,
    reducers: {
        onSetItemDiscount: (state, action) => {
            state.ITEM_DISCOUNT = action.payload
        }
    },
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
                    status_list: STATUS.SUCCESS,
                    totalItem: payload.totalItem
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
const { actions } = orgDiscountsSlice;
export const { onSetItemDiscount } = actions
export default orgDiscountsSlice.reducer;