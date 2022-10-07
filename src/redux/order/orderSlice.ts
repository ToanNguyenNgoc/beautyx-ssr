import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import order from '../../api/orderApi';
import servicesUserApi from '../../api/servicesUser';
import { STATUS } from '../status';
import { IServiceUser } from '../../interface/servicesUser'

export const fetchAsyncOrderServices: any = createAsyncThunk(
    "ORDER/fetchAsyncOrderServices",
    async (values: any) => {
        const res = await servicesUserApi.getServices(values);
        return {
            services: res.data.context.data,
            page: values.page,
            totalItem: res.data.context.total,
            services_not_book: res.data.context.data
                .filter((val: IServiceUser) => val.appointments?.length === 0).length
        }
    }
)
export const fetchAsyncOrderPaid: any = createAsyncThunk(
    "ORDER/fetchAsyncOrderPaid",
    async (values: any) => {
        const res = await order.getOrders(values);
        return {
            orders: res.data.context.data,
            page: values.page,
            totalItem: res.data.context.total
        }
    }
)
export const fetchAsyncOrderCancel: any = createAsyncThunk(
    "ORDER/fetchAsyncOrderCancel",
    async (values: any) => {
        const res = await order.getOrders(values);
        return {
            orders: res.data.context.data,
            page: values.page,
            totalItem: res.data.context.total
        }
    }
)

export interface IORDER {
    tab: string,
    openDetail: {
        open: boolean,
        order_id: any
    },
    ORDER_SERVICES: {
        services: any[],
        page: number,
        totalItem: number,
        status: string
    },
    ORDER_SERVICES_NOT_BOOK_COUNT: number,
    ORDER: {
        orders: any[],
        page: number,
        totalItem: number,
        status: string
    },
    ORDER_CANCEL: {
        orders: any[],
        page: number,
        totalItem: number,
        status: string
    }
}

const initialState: IORDER = {
    tab: "PAID",
    openDetail: {
        open: false,
        order_id: null
    },
    ORDER_SERVICES_NOT_BOOK_COUNT: 0,
    ORDER_SERVICES: {
        services: [],
        page: 0,
        totalItem: 1,
        status: ""
    },
    ORDER: {
        orders: [],
        page: 1,
        totalItem: 1,
        status: ""
    },
    ORDER_CANCEL: {
        orders: [],
        page: 1,
        totalItem: 1,
        status: ""
    }
}
const orderSlice = createSlice({
    name: "ORDER",
    initialState,
    reducers: {
        onSetStatusServicesUser: (state) => {
            state.ORDER_SERVICES.status = STATUS.LOADING;
            state.ORDER_SERVICES.services = [];
            state.ORDER_SERVICES.page = 1
        },
        onClearOrder: (state) => {
            state.ORDER_CANCEL.status = "";
            state.ORDER.status = "";
            state.ORDER_CANCEL.orders = [];
            state.ORDER.orders = []
        },
        onSetTab: (state, action) => {
            state.tab = action.payload;
        },
        onSetOpenDetail: (state, action) => {
            state.openDetail.open = action.payload.open;
            state.openDetail.order_id = action.payload.order_id
        },
        onRefreshServicesNoBookCount: (state) => {
            state.ORDER_SERVICES.status = "";
            state.ORDER_SERVICES.services = [];
            state.ORDER_SERVICES_NOT_BOOK_COUNT = state.ORDER_SERVICES_NOT_BOOK_COUNT - 1
        },
        onAddServicesNoBookCount: (state) => {
            state.ORDER_SERVICES.status = "";
            state.ORDER_SERVICES.services = [];
            state.ORDER_SERVICES_NOT_BOOK_COUNT = state.ORDER_SERVICES_NOT_BOOK_COUNT + 1
        },
        onRefreshServices: (state) => {
            state.ORDER_SERVICES.status = "";
            state.ORDER_SERVICES.services = [];
        }
    },
    extraReducers: {
        [fetchAsyncOrderServices.pending]: (state) => {
            return { ...state, ORDER_SERVICES: { ...state.ORDER_SERVICES, status: STATUS.LOADING } }
        },
        [fetchAsyncOrderServices.fulfilled]: (state, { payload }) => {
            const { services, page, totalItem, services_not_book } = payload
            return {
                ...state,
                ORDER_SERVICES_NOT_BOOK_COUNT: services_not_book,
                ORDER_SERVICES: {
                    services: page === 1 ? services : [...state.ORDER_SERVICES.services, ...services],
                    page: page,
                    totalItem: totalItem,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncOrderServices.rejected]: (state) => {
            return { ...state, ORDER_SERVICES: { ...state.ORDER_SERVICES, status: STATUS.FAIL } }
        },

        [fetchAsyncOrderPaid.pending]: (state) => {
            return { ...state, ORDER: { ...state.ORDER, status: STATUS.LOADING } }
        },
        [fetchAsyncOrderPaid.fulfilled]: (state, { payload }) => {
            const { orders, page, totalItem } = payload
            return {
                ...state,
                ORDER: {
                    orders: [...state.ORDER.orders, ...orders],
                    page: page,
                    status: STATUS.SUCCESS,
                    totalItem: totalItem
                }
            }
        },
        [fetchAsyncOrderPaid.rejected]: (state) => {
            return { ...state, ORDER: { ...state.ORDER, status: STATUS.FAIL } }
        },

        [fetchAsyncOrderCancel.pending]: (state) => {
            return { ...state, ORDER_CANCEL: { ...state.ORDER_CANCEL, status: STATUS.LOADING } }
        },
        [fetchAsyncOrderCancel.fulfilled]: (state, { payload }) => {
            const { orders, page, totalItem } = payload
            return {
                ...state,
                ORDER_CANCEL: {
                    orders: [...state.ORDER_CANCEL.orders, ...orders],
                    page: page,
                    status: STATUS.SUCCESS,
                    totalItem: totalItem
                }
            }
        },
        [fetchAsyncOrderCancel.rejected]: (state) => {
            return { ...state, ORDER_CANCEL: { ...state.ORDER_CANCEL, status: STATUS.FAIL } }
        },
    }
})
const { actions } = orderSlice;
export const {
    onSetStatusServicesUser,
    onClearOrder,
    onSetTab,
    onSetOpenDetail,
    onRefreshServicesNoBookCount,
    onRefreshServices,
    onAddServicesNoBookCount
} = actions
export default orderSlice.reducer;