import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    orgCenter:null,
    locationCenter:null
}
const orgMapReducer = createSlice({
    name:"ORGS_MAP",
    initialState,
    reducers:{
        onSetOrgCenter:(state, action)=>{
            state.orgCenter = action.payload
        },
        onSetLocationCenter : (state, action)=>{
            console.log(action.payload)
            state.locationCenter = action.payload
        }
    }
})
const {  actions } = orgMapReducer;
export const {onSetOrgCenter, onSetLocationCenter} = actions;
export default orgMapReducer.reducer;