import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apointmentApi from 'api/apointmentApi'
import dayjs from 'dayjs'
import { AppointmentNoti, Appointment } from 'interface/appointment'
const localNoti = localStorage.getItem('noti')
const appsNoti = localNoti ? JSON.parse(localNoti) : []

export interface INotification {
    appsNoti: AppointmentNoti[]
}

const curMoth = dayjs().format('YYYY-MM')
const prevApps = appsNoti.map((item: Appointment) => dayjs(item.time_start).format('YYYY-MM'))

export const fetchAsyncAppCur: any = createAsyncThunk(
    "NOTI/fetchAsyncAppCur",
    async () => {
        const res = await apointmentApi.getAppoitment(curMoth)
        console.log(res)
        const apps = res.data.context.data
        return apps
    }
)

const initialState: INotification = {
    appsNoti: appsNoti
}
const notiSlice = createSlice({
    name: "NOTI",
    initialState,
    extraReducers: {
        [fetchAsyncAppCur.fulfilled]: (state, { payload }) => {
            const inAppsNoti: AppointmentNoti[] = payload?.map((item: Appointment) => {
                return { ...item, viewed: false }
            })
            if (!prevApps.includes(curMoth)) {
                state.appsNoti = inAppsNoti
                localStorage.setItem('noti', JSON.stringify(state.appsNoti))
            }
        }
    },
    reducers: {
        onSetAppsNoti: (state, action) => {
            // const inAppsNoti: AppointmentNoti[] = action.payload?.map((item: Appointment) => {
            //     return { ...item, viewed: false }
            // })
            // state.appsNoti = inAppsNoti
            // localStorage.setItem('noti', JSON.stringify(state.appsNoti))
        },
        onSetViewedNoti: (state, action) => {
            const iIndex = state.appsNoti.findIndex(
                (item: AppointmentNoti) => item.id === action.payload
            );
            state.appsNoti[iIndex].viewed = true
            localStorage.setItem('noti', JSON.stringify(state.appsNoti))
        }
    }
})
const { actions, reducer } = notiSlice
export const { onSetAppsNoti, onSetViewedNoti } = actions
export default reducer
