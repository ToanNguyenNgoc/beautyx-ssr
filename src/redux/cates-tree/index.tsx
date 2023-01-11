import { createSlice } from '@reduxjs/toolkit'

export interface CATE {
    tab: 'SERVICE' | 'PRODUCT',
    parentId: number | string | null,
    childId: number | string | null
}

const initialState: CATE = {
    tab: 'SERVICE',
    parentId: null,
    childId: null
}

const cateTree = createSlice({
    name: "CATE",
    initialState,
    reducers: {
        onSetCateParentId: (state, action) => {
            state.parentId = action.payload
            state.childId = null
        },
        onSetCateChildId: (state, action) => {
            state.childId = action.payload
        }
    }
})

const { actions } = cateTree
export const { onSetCateParentId, onSetCateChildId } = actions
export default cateTree.reducer