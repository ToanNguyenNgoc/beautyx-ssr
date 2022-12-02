import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_TIKTOK } from 'api/3rd-api'
import axios from 'axios'

export interface ITrendItemVideo {
    favorite_count: number,
    isFavorite: boolean,
    view_count: number,
    share_count: number,
    comment_count: number
}
export interface ITrendCommentChild {
    commentable_id: string,
    commentable_type: string,
    created_at: string,
    body: string,
    user: {
        avatar: string,
        fullname: string
    },
}
export interface ITrendComment {
    commentable_id: string,
    commentable_type: string,
    created_at: string,
    body: string,
    user: {
        avatar: string,
        fullname: string
    },
    children: ITrendCommentChild[]
}

export interface ITrendItem {
    _id: string | null,
    status: string,
    video: ITrendItemVideo,
    comments: ITrendComment[]
}
const initialState: ITrendItem = {
    _id: null,
    status: '',
    video: {
        favorite_count: 0,
        isFavorite: false,
        view_count: 0,
        share_count: 0,
        comment_count: 0
    },
    comments: []
}

export const fetchAsyncVideoByUrl: any = createAsyncThunk(
    'TREND_DETAIL/fetchAsyncVideoByUrl',
    async (values: any) => {
        const res = await axios.get(API_TIKTOK.getVideoByUrl, {
            params: { 'video_url': values.video_url }
        })
        const resComment = await axios.get(API_TIKTOK.getCommentsByUrl, {
            params: { 'video_url': values.video_url }
        })
        const comments = await resComment.data?.context.data ?? []
        const statistics = await res?.data?.tiktok?.aweme_detail?.statistics
        const payload = {
            _id: values._id,
            favorite_count: statistics?.digg_count,
            view_count: statistics?.play_count,
            share_count: statistics?.share_count,
            isFavorite: true,
            comment_count: statistics?.comment_count,
            comments: comments
        }
        return payload
    }
)

const TrendDetailSlice = createSlice({
    name: 'TREND_DETAIL',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAsyncVideoByUrl.pending]: (state) => {
            return { ...state, status: 'PENDING' }
        },
        [fetchAsyncVideoByUrl.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                status: 'SUCCESS',
                _id: payload._id,
                video: {
                    favorite_count: payload.favorite_count,
                    isFavorite: payload.isFavorite,
                    view_count: payload.view_count,
                    share_count: payload.share_count,
                    comment_count: payload.comment_count
                },
                comments: payload.comments
            }
        },
        [fetchAsyncVideoByUrl.rejected]: (state) => {
            return { ...state, status: 'FAIL' }
        },
    }
})
const { actions } = TrendDetailSlice;
// export const { onSetStatusProduct } = actions;
export default TrendDetailSlice.reducer;