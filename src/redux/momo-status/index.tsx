import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentPay: null
}
const momoStatusSlice = createSlice({
    name: 'MOMO_STATUS',
    initialState,
    reducers: {
        onSetMomoStatus:(state, action)=>{
            state.currentPay = action.payload
        }
    }
})
const {actions, reducer} = momoStatusSlice