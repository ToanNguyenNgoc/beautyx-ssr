import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 0,
}
const testSlice = createSlice({
    name: "TEST",
    initialState,
    reducers: {
        onSetCount: (state, action) => {
            console.log(action.payload)
            state.count = action.payload
        }
    },
    extraReducers: {}
})
const { reducer, actions } = testSlice;
export const { onSetCount } = actions;
export default testSlice.reducer;

