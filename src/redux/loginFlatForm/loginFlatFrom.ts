import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import tikiAuthApi from '../../api/_tikiAuthApi';
import momoAuthApi from '../../api/_momoAuthApi';
import mbAuthApi from '../../api/_mbAuthApi';
import { STATUS } from '../status'

export const loginAsyncMomo: any = createAsyncThunk(
    "LOGIN/loginAsyncMomo",
    async (params: any) => {
        try {
            const res = await momoAuthApi.login(params);
            localStorage.setItem("_WEB_TK", res.data.context.token)
            const payload = res.data.context;
            return payload;
        } catch (error) {
            console.log(error)
        }
    }
)
export const loginAsyncTiki: any = createAsyncThunk(
    "LOGIN/loginAsyncTiki",
    async (params: any) => {
        try {
            const res = await tikiAuthApi.login(params);
            window.sessionStorage.setItem("_WEB_TK", res.data.context.token)
            const payload = res.data.context;
            return payload;
        } catch (error) {
            console.log(error)
        }
    }
)
export const loginAsyncMb: any = createAsyncThunk(
    "LOGIN/loginAsyncMbbank",
    async (params: any) => {
        try {
            const res = await mbAuthApi.login(params);
            window.sessionStorage.setItem("_WEB_TK", res.data.context.token)
            const payload = res.data.context;
            return payload;
        } catch (error) {
            console.log(error)
            return error
        }
    }
)
const initialState = {
    response: null,
    status: ''
}
const loginFlatFormSlice = createSlice({
    name: "LOGIN",
    initialState,
    reducers: {
    },
    extraReducers: {
        [loginAsyncMomo.pending]: (state) => {
            return { ...state, status: STATUS.LOADING }
        },
        [loginAsyncMomo.fulfilled]: (state, { payload }) => {
            return {
                response: payload,
                status: STATUS.SUCCESS
            }
        },
        [loginAsyncMomo.rejected]: (state) => {
            return { ...state, status: STATUS.FAIL }
        },
        //tiki
        [loginAsyncTiki.pending]: (state) => {
            return { ...state, status: STATUS.LOADING }
        },
        [loginAsyncTiki.fulfilled]: (state, { payload }) => {
            return {
                response: payload,
                status: STATUS.SUCCESS
            }
        },
        [loginAsyncTiki.rejected]: (state) => {
            return { ...state, status: STATUS.FAIL }
        },
        //Mb bank
        [loginAsyncMb.pending]: (state) => {
            return { ...state, status: STATUS.LOADING }
        },
        [loginAsyncMb.fulfilled]: (state, { payload }) => {
            return {
                response: payload,
                status: STATUS.SUCCESS
            }
        },
        [loginAsyncMb.rejected]: (state) => {
            return { ...state, status: STATUS.FAIL }
        }
    }
})
export default loginFlatFormSlice.reducer;