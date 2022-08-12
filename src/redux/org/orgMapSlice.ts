import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orgApi from '../../api/organizationApi';
import { IOrganization } from '../../interface/organization';
import { STATUS } from "../status";

interface IInitialState {
    orgCenter: any,
    orgsMap: {
        orgs: IOrganization[],
        page: number,
        totalItem: number,
        status: string
    },
    locationCenter: any
}

const initialState: IInitialState = {
    orgCenter: null,
    orgsMap: {
        orgs: [],
        page: 1,
        totalItem: 1,
        status: ""
    },
    locationCenter: null
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
export const { onSetOrgCenter, onSetLocationCenter, onSetOrgsMapEmpty } = actions;
export default orgMapReducer.reducer;