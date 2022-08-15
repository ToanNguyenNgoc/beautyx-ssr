import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orgApi from '../../api/organizationApi';
import { IOrganization } from '../../interface/organization';
import { STATUS } from "../status";

export interface IORGS_MAP {
    orgCenter: any,
    orgsMap: {
        orgs: IOrganization[],
        page: number,
        totalItem: number,
        status: string
    },
    locationCenter: any,
    getValueCenter: boolean,
}

const initialState: IORGS_MAP = {
    orgCenter: null,
    orgsMap: {
        orgs: [],
        page: 1,
        totalItem: 1,
        status: ""
    },
    locationCenter: null,
    getValueCenter: false
}
export const fetchOrgsMapFilter: any = createAsyncThunk(
    "ORGS_MAP/fetchOrgsMapFilter",
    async (values: any) => {
        try {
            const res = await orgApi.getAll(values);
            return {
                orgs: res.data.context.data,
                totalItem: res.data.context.total,
                page: values.page
            }
        } catch (error) {
            console.log(error)
        }
    }
)
const orgMapReducer = createSlice({
    name: "ORGS_MAP",
    initialState,
    reducers: {
        onSetOrgsMapEmpty: (state) => {
            state.orgsMap = {
                orgs: [],
                page: 1,
                totalItem: 1,
                status: ""
            }
        },
        onSetOrgCenter: (state, action) => {
            state.orgCenter = action.payload
        },
        onSetLocationCenter: (state, action) => {
            console.log(action.payload)
            state.locationCenter = action.payload
        },
        onSwitchValueCenter: (state, action) => {
            state.getValueCenter = action.payload
        }
    },
    extraReducers: {
        [fetchOrgsMapFilter.pending]: (state) => {
            return { ...state, status: STATUS.LOADING };
        },
        [fetchOrgsMapFilter.fulfilled]: (state, { payload }) => {
            const { orgs, page, totalItem } = payload;
            return {
                ...state,
                orgsMap: {
                    orgs: [...state.orgsMap.orgs, ...orgs],
                    page: page,
                    totalItem: totalItem,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchOrgsMapFilter.rejected]: (state) => {
            return { ...state, status: STATUS.FAIL };
        },
    }
})
const { actions } = orgMapReducer;
export const {
    onSetOrgCenter,
    onSetLocationCenter,
    onSetOrgsMapEmpty,
    onSwitchValueCenter
} = actions;
export default orgMapReducer.reducer;