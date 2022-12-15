import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authentication from 'api/authApi';
import { handleValidToken } from 'api/authHeader';
import { checkPhoneValid } from 'utils/phoneUpdate';
import { analytics, logEvent } from '../../firebase';

export const fetchAsyncUser: any = createAsyncThunk(
    "USER/fetchAsyncUser",
    async (values, { rejectWithValue }) => {
        try {
            const res = await authentication.getUserProfile();
            let context = res?.data.context;
            if (context.telephone && !checkPhoneValid(context.telephone)) {
                // if (context.telephone && !checkPhoneValid('context.telephone')) {
                context = { ...context, telephone: 'số điện thoại' }
            }
            logEvent(analytics, 'login', {
                'User login': context.fullname
            })
            return context
        } catch (error) {
            if (!error.response) {
                throw error
            }
            const refresh = handleValidToken()
            if(!refresh) localStorage.removeItem('_WEB_TK')
            return rejectWithValue(refresh)
        }
    }
)
export const updateAsyncUser: any = createAsyncThunk(
    "USER/updateAsyncUser",
    async (params, { rejectWithValue }) => {
        try {
            const res:any = await authentication.putUserProfile(params);
            const payload = res.data.context
            if (res.data.context.token) {
                localStorage.setItem('_WEB_TK', res.data.context.token)
            }
            return payload
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export interface IUSER {
    USER: any,
    error: any,
    loading: boolean,
    refresh: boolean
}

const initialState: IUSER = {
    USER: null,
    error: null,
    loading: true,
    refresh: false
}
const userSlice = createSlice({
    initialState,
    name: "USER",
    reducers: {
        putUser: (state, action) => {
            state.USER = action.payload
        },
        logoutUser: (state) => {
            state.USER = null;
            state.loading = false
        }
    },
    extraReducers: {
        [fetchAsyncUser.pending]: (state) => {
            return { ...state, loading: true }
        },
        [fetchAsyncUser.fulfilled]: (state, { payload }) => {
            return { ...state, USER: payload, loading: false }
        },
        [fetchAsyncUser.rejected]: (state, { payload }) => {
            return { ...state, refresh: payload }
        },
        //---
        [updateAsyncUser.pending]: (state) => {
            return { ...state, loading: true }
        },
        [updateAsyncUser.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                USER: payload,
                loading: false
            }
        },
        [updateAsyncUser.rejected]: (state, { payload }) => {
            return { ...state, loading: false, error: payload }
        },
    }
})
const { actions } = userSlice;
export const { putUser, logoutUser } = actions;
export default userSlice.reducer