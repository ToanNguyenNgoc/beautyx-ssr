import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authentication from '../../api/authApi';
import discountApi from '../../api/discountApi';
import { STATUS } from '../status';
import { IDiscountPar } from '../../interface/discount'
import { checkPhoneValid } from '../../utils/phoneUpdate';
import { analytics, logEvent } from '../../firebase';

export const fetchAsyncUser: any = createAsyncThunk(
    "USER/fetchAsyncUser",
    async () => {
        try {
            const res = await authentication.getUserProfile();
            let context = res?.data.context;
            if (context.telephone && !checkPhoneValid(context.telephone)) {
                context = { ...context, telephone: 'số điện thoại' }
            }
            logEvent(analytics, 'login', {
                'User login': context.fullname
            })
            return context
        } catch (error) {
            localStorage.removeItem('_WEB_TK')
        }
    }
)
export const updateAsyncUser: any = createAsyncThunk(
    "USER/fetchAsyncUser",
    async (params) => {
        const res = await authentication.putUserProfile(params);
        const payload = res.data.context
        return payload
    }
)

export const fetchAsyncDiscountsUser: any = createAsyncThunk(
    "USER/fetchAsyncDiscountsUser",
    async (values: any) => {
        try {
            const res = await discountApi.getAll(values);
            const payload = {
                discounts: res.data.context.data,
                totalItem: res.data.context.total
            }
            return payload
        } catch (error) {
            console.log(error)
        }
    }
)

export interface IUSER {
    USER: any,
    DISCOUNTS_USER: {
        discounts: IDiscountPar[],
        page: number,
        totalItem: number,
        status_discount: string
    }
    loading: boolean
}

const initialState: IUSER = {
    USER: null,
    DISCOUNTS_USER: {
        discounts: [],
        page: 1,
        totalItem: 1,
        status_discount: ""
    },
    loading: true
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

        [updateAsyncUser.pending]: (state) => {
            return { ...state, loading: true }
        },
        [updateAsyncUser.fulfilled]: (state, { payload }) => {
            return { ...state, USER: payload, loading: false }
        },

        [fetchAsyncDiscountsUser.pending]: (state) => {
            return {
                ...state,
                DISCOUNTS_USER: {
                    ...state.DISCOUNTS_USER,
                    status_discount: STATUS.LOADING
                }
            }
        },
        [fetchAsyncDiscountsUser.fulfilled]: (state, { payload }) => {
            const { discounts, totalItem } = payload;
            return {
                ...state,
                DISCOUNTS_USER: {
                    ...state.DISCOUNTS_USER,
                    discounts: [...state.DISCOUNTS_USER.discounts, ...discounts],
                    totalItem: totalItem,
                    status_discount: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncDiscountsUser.rejected]: (state) => {
            return {
                ...state,
                DISCOUNTS_USER: {
                    ...state.DISCOUNTS_USER,
                    status_discount: STATUS.FAIL
                }
            }
        }
    }
})
// export const getUserProfile = (state: any) => state
const { actions } = userSlice;
export const { putUser, logoutUser } = actions;
export default userSlice.reducer