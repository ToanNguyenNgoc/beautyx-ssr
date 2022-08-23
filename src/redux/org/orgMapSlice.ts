import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orgApi from "../../api/organizationApi";
import { IOrganization } from "../../interface/organization";
import { STATUS } from "../status";

export interface IORGS_MAP {
    orgCenter: any,
    orgsMap: {
        orgs: IOrganization[],
        page: number,
        totalItem: number,
        status: string,
        mountNth: number
    },
    locationCenter: any,
    getValueCenter: boolean,
    tags: string[]
}

const initialState: IORGS_MAP = {
    orgCenter: null,
    orgsMap: {
        orgs: [],
        page: 1,
        totalItem: 1,
        mountNth: 1,
        status: "",
    },
    locationCenter: null,
    getValueCenter: true,
    tags: []
}
export const fetchOrgsMapFilter: any = createAsyncThunk(
    "ORGS_MAP/fetchOrgsMapFilter",
    async (values: any) => {
        try {
            const res = await orgApi.getAll(values);
            return {
                orgs: res.data.context.data,
                totalItem: res.data.context.total,
                page: values.page,
                mountNth: values.mountNth
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
                status: "",
                mountNth: 2
            }
        },
        onSetOrgCenter: (state, action) => {
            state.orgCenter = action.payload;
        },
        onSetLocationCenter: (state, action) => {
            console.log(action.payload);
            state.locationCenter = action.payload;
        },
        onSwitchValueCenter: (state, action) => {
            state.getValueCenter = action.payload;
        },
        onSetTagsFilter: (state, action) => {
            if (state.tags.includes(action.payload)) {
                const newTags = state.tags.filter(i => i !== action.payload)
                state.tags = newTags
            } else {
                state.tags.push(action.payload)
            }
        }
    },
    extraReducers: {
        [fetchOrgsMapFilter.pending]: (state) => {
            return {
                ...state,
                orgsMap: {
                    ...state.orgsMap,
                    status: STATUS.LOADING
                }
            };
        },
        [fetchOrgsMapFilter.fulfilled]: (state, { payload }) => {
            const { orgs, page, totalItem, mountNth } = payload;
            return {
                ...state,
                orgsMap: {
                    orgs: page === 1 ? orgs : [...state.orgsMap.orgs, ...orgs],
                    page: page,
                    mountNth: mountNth,
                    totalItem: totalItem,
                    status: STATUS.SUCCESS,
                },
            };
        },
        [fetchOrgsMapFilter.rejected]: (state) => {
            return {
                ...state,
                orgsMap: {
                    ...state.orgsMap,
                    status: STATUS.FAIL
                }
            };
        },
    },
});
const { actions } = orgMapReducer;
export const {
    onSetOrgCenter,
    onSetLocationCenter,
    onSetOrgsMapEmpty,
    onSwitchValueCenter,
    onSetTagsFilter
} = actions;
export default orgMapReducer.reducer;
