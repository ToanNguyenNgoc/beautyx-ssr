import { createSlice } from '@reduxjs/toolkit'
import { IPost, posts } from 'pages/Community/data'

export interface ICommunity {
    posts: IPost[]
}

const initialState: ICommunity = {
    posts: posts
}

const community = createSlice({
    name: 'COMMUNITY',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.unshift(action.payload)
        },
        onFavorite: (state, action) => {
            const iIndex = state.posts.findIndex(i => i.id === action.payload.id)
            state.posts[iIndex].isFavorite = action.payload.isFavorite;
            state.posts[iIndex].favorite_count =
                action.payload.isFavorite ?
                    state.posts[iIndex].favorite_count + 1 : state.posts[iIndex].favorite_count - 1
        }
    }
})
const { actions, reducer } = community
export const { addPost, onFavorite } = actions
export default reducer