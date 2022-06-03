import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import comboApi from '../../api/comboApi';
import { STATUS } from '../status';
import { Combo } from '../../interface/combo'

export const fetchAsyncCombosOrg: any = createAsyncThunk(
    "ORG_COMBOS/fetchAsyncCombosOrg",
    async (values: any) => {
        try {
            const res = await comboApi.getByOrg_id(values);
            const payload = {
                combos: res.data.context.data,
                totalItem: res.data.context.total,
                org_id: values.org_id
            }
            return payload
        } catch (error) {
            console.log(error)
        }
    }
)
export const fetchAsyncComboDetail: any = createAsyncThunk(
    "ORG_COMBOS/fetchAsyncComboDetail",
    async (values: any) => {
        try {
            const res = await comboApi.getComboDetail(values);
            return res.data.context;
        } catch (error) {
            console.log(error)
        }
    }
)
interface IState {
    org_id: any,
    combos: Combo[],
    totalItem: number,
    COMBO_DETAIL: {
        combo: any,
        status_detail: string
    },
    page: number,
    status: string
}
const initialState: IState = {
    org_id: null,
    combos: [],
    totalItem: 1,
    COMBO_DETAIL: {
        combo: {},
        status_detail: ""
    },
    page: 1,
    status: ''
}
const combosOrgSlice = createSlice({
    initialState,
    name: "ORG_COMBOS",
    reducers: {},
    extraReducers: {
        [fetchAsyncCombosOrg.pending]: (state) => {
            return { ...state, status: STATUS.LOADING }
        },
        [fetchAsyncCombosOrg.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                org_id: payload.org_id,
                combos: [...state.combos, ...payload.combos],
                totalItem: payload.totalItem,
                status: STATUS.SUCCESS
            }
        },
        [fetchAsyncCombosOrg.rejected]: (state) => {
            return { ...state, status: STATUS.FAIL }
        },

        [fetchAsyncComboDetail.pending]: (state) => {
            return {
                ...state,
                COMBO_DETAIL: {
                    ...state.COMBO_DETAIL,
                    status_detail: STATUS.LOADING
                }
            }
        },
        [fetchAsyncComboDetail.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                COMBO_DETAIL: {
                    combo: payload,
                    status_detail: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncComboDetail.rejected]: (state) => {
            return {
                ...state,
                COMBO_DETAIL: {
                    ...state.COMBO_DETAIL,
                    status_detail: STATUS.FAIL
                }
            }
        }
    }
})
export default combosOrgSlice.reducer;