import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./status";
import mediaApi from "../api/mediaApi";

export interface ICOMMENT_MEDIA {
    comment: {
        body: string,
        media_ids: number[],
        image_url: string,
        rate: number
    },
    status: string
}

export const postAsyncMediaComment: any = createAsyncThunk(
    "COMMENT_MEDIA/postAsyncMediaComment",
    async (media: any) => {
        try {
            let formData = new FormData();
            formData.append("file", media);
            const res = await mediaApi.postMedia(formData);
            return {
                model_id: res.data.context.model_id,
                original_url: res.data.context.original_url
            };
        } catch (error) {
            console.log(error);
        }
    }
);
const initialState: ICOMMENT_MEDIA = {
    comment: {
        body: "",
        media_ids: [],
        image_url: "",
        rate: 4
    },
    status: ""
};
const commentSlice = createSlice({
    initialState,
    name: "COMMENT_MEDIA",
    reducers: {
        onSetComment: (state, action) => {
            const newComment = {
                ...state.comment,
                ...action.payload
            }
            state.comment = newComment
        },
        clearPrevState: (state: any) => {
            const initComment = {
                body: "",
                media_ids: [],
                image_url: "",
                rate: 5
            }
            state.comment = initComment
        },
    },
    extraReducers: {
        // post comments
        [postAsyncMediaComment.pending]: (state) => {
            return { ...state, status: STATUS.LOADING };
        },
        [postAsyncMediaComment.fulfilled]: (state, { payload }) => {
            const { model_id, original_url } = payload;
            return {
                ...state,
                status: STATUS.SUCCESS,
                comment: {
                    ...state.comment,
                    media_ids: [model_id],
                    image_url: original_url
                }
            }
        },
        [postAsyncMediaComment.rejected]: (state) => {
            return {
                ...state,
                status: STATUS.FAIL,
            };
        },
    },
});
const { actions } = commentSlice;
export const { clearPrevState, onSetComment } = actions;
export default commentSlice.reducer;
