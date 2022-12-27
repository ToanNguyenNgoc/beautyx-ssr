import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    servicesBook: [] as any,
    org_id: null,
    order_id: null,
    org: null,
    note: null,
    time_start: {
        date: null, time: null
    },
    branch: null,
}
const services = createSlice({
    name: 'SERVICES_BOOK',
    initialState,
    reducers: {
        addService: (state, action) => {
            const iIndex = state.servicesBook.findIndex((item: any) =>
                item.ser_book_id === action.payload.ser_book_id
            );
            if (iIndex >= 0) {
                const list = state.servicesBook.filter((item: any) => item.ser_book_id !== action.payload.ser_book_id)
                state.servicesBook = list
            } else {
                const temp = { ...action.payload };
                state.servicesBook.push(temp)
            }
            state.org_id = action.payload.org_id;
            state.order_id = action.payload.order_id;
            state.org = action.payload.org
        },
        addServiceBookNow: (state, action) => {
            state.org = action.payload.org;
            state.servicesBook = action.payload.services
        },
        addAppointmentDetail: (state, { payload }) => {
            return {
                ...state,
                note: payload.note,
                time_start: payload.time_start,
                branch: payload.branch,
            }
        },
        clearAllServices: (state) => {
            state.servicesBook = [];
            state.org = null;
            state.order_id = null;
            state.org = null
        },
    }
})
const { reducer, actions } = services;
export const { addService, clearAllServices, addServiceBookNow, addAppointmentDetail } = actions;
export default reducer;