import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentsApi from "../../api/commentsApi";
import { STATUS } from "../status";
import { IComment } from "../../interface/comments";

export interface IORG_COMMENTS {
    org_id: any;
    comments: IComment[];
    page: number;
    totalItem: number;
    status: string;
    status_ac: string;
}

export const fetchAsyncOrgComments: any = createAsyncThunk(
    "ORG_COMMENTS/fetchAsyncOrgComments",
    async (values: any) => {
        console.log(values)
        try {
            const res = commentsApi.getCommentsOrg({
                org_id: values.org_id,
                page: values.page,
            });
            const payload = {
                org_id: values.org_id,
                comments: (await res).data.context.data,
                totalItem: (await res).data.context.total,
                page: values.page,
            };
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);
export const postAsyncOrgComments: any = createAsyncThunk(
    "ORG_COMMENTS/postAsyncOrgComments",
    async (values: any) => {
        try {
            const res = await commentsApi.postCommentOrg(values.values);
            const payload = {
                comment: {
                    ...res.data.context,
                    children: [],
                    user: values.user,
                    media_url: [values.values.image_url]
                },
            };
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);
export const postAsyncReplyOrgComments: any = createAsyncThunk(
    "ORG_COMMENTS/postAsyncReplyOrgComments",
    async (values: any) => {
        console.log(values)
        const res = await commentsApi.postComment(values.values);
        return {
            id: res.data.context.id,
            commentable_id: res.data.context.commentable_id,
            body: res.data.context.body,
            user_id: res.data.context.user_id,
            user: values.user,
            media:[{original_url: values.values.original_url}]
        };
    }
);
const initialState: IORG_COMMENTS = {
    org_id: null,
    comments: [],
    page: 1,
    totalItem: 0,
    status: "",
    status_ac: "",
};
const orgCommentsSlice = createSlice({
    initialState,
    name: "ORG_COMMENTS",
    reducers: {
        clearPrevState: (state: any) => {
            state.comments = [];
        },
        // postReplyComment: (state, { payload }) => {
        //     const newCommentChild = {
        //         user: payload.USER,
        //         commentable_id: payload.values.id,
        //         body: payload.values.body,
        //         user_id: payload.USER.id,
        //     }
        //     const iIndex = state.comments.findIndex((i:IComment) =>
        //         i.id === payload.values.id
        //     )
        //     state.comments[iIndex].children.push(newCommentChild)
        // }
    },
    extraReducers: {
        [fetchAsyncOrgComments.pending]: (state) => {
            return { ...state, status: STATUS.LOADING };
        },
        [fetchAsyncOrgComments.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                org_id: payload.org_id,
                comments: [...state.comments, ...payload.comments],
                page: payload.page,
                totalItem: payload.totalItem,
                status: STATUS.SUCCESS,
            };
        },
        [fetchAsyncOrgComments.rejected]: (state) => {
            return {
                ...state,
                status: STATUS.FAIL,
            };
        },
        // post comments
        [postAsyncOrgComments.pending]: (state) => {
            return { ...state, status_ac: STATUS.LOADING };
        },
        [postAsyncOrgComments.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                comments: [payload.comment, ...state.comments],
                totalItem: state.totalItem + 1,
                status_ac: STATUS.SUCCESS,
            };
        },
        [postAsyncOrgComments.rejected]: (state) => {
            return {
                ...state,
                status_ac: STATUS.FAIL,
            };
        },
        //post reply comment
        [postAsyncReplyOrgComments.pending]: (state) => {
            return state;
        },
        [postAsyncReplyOrgComments.fulfilled]: (state, { payload }) => {
            const { commentable_id } = payload;
            const iIndex = state.comments.findIndex(
                (i: IComment) => i.id === commentable_id
            );
            state.comments[iIndex].children.push(payload);
        },
        [postAsyncReplyOrgComments.pending]: (state) => {
            return state;
        },
    },
});
const { actions } = orgCommentsSlice;
export const { clearPrevState } = actions;
export default orgCommentsSlice.reducer;
