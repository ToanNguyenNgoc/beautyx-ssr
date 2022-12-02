import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API_3RD from 'api/3rd-api'
import { AUTH_HEADER } from 'api/authHeader'
import axios from 'axios'
import { ISeachHistory } from 'features/Search/SearchHistory'

export interface ISearch {
    searches: ISeachHistory[]
}
const initialState: ISearch = {
    searches: []
}

export const onDeleteAll: any = createAsyncThunk(
    'SEARCH_HIS/onDeleteAll',
    async (values) => {
        await axios.delete(`${API_3RD.API_NODE}/search_history/delete`, AUTH_HEADER())
    }
)

const searchHistorySlice = createSlice({
    name: 'SEARCH_HIS',
    initialState,
    reducers: {
        onSetSearch: (state, action) => {
            state.searches = action.payload
        }
    },
    extraReducers: {
        [onDeleteAll.fulfilled]: (state) => {
            return { ...state, searches: [] }
        }
    }
})
const { reducer, actions } = searchHistorySlice;
export const { onSetSearch } = actions
export default reducer