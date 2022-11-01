import { createSlice } from '@reduxjs/toolkit'
import { AppointmentNoti, Appointment } from 'interface/appointment'

const localNoti = localStorage.getItem('noti')
const appsNoti = localNoti ? JSON.parse(localNoti) : []

export interface INotification {
    appsNoti: AppointmentNoti[]
}

const initialState: INotification = {
    appsNoti: appsNoti
}
const notiSlice = createSlice({
    name: "NOTI",
    initialState,
    reducers: {
        onSetAppsNoti: (state, action) => {
            const inAppsNoti: AppointmentNoti[] = action.payload?.map((item: Appointment) => {
                return { ...item, viewed: false }
            })
            state.appsNoti = inAppsNoti
            localStorage.setItem('noti', JSON.stringify(state.appsNoti))
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
