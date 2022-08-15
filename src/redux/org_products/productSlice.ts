import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsApi from "../../api/productApi";
import commentsApi from "../../api/commentsApi";
import { STATUS } from "../status";
import favorites from "../../api/favorite";
import { IComment } from "../../interface/comments";
import { Product } from '../../interface/product';
import { productInit } from '../initials'

export interface IPRODUCT {
    PRODUCT: {
        product: Product,
        status: "",
    },
    PRODUCT_REC: {
        products: Product[],
        cate_id: any,
        status: string,
    },
    COMMENTS: {
        product_id: any,
        comments: IComment[],
        page: number,
        totalItem: number,
        status_cmt: string,
    },
}

// get product detail
export const fetchAsyncProductDetail: any = createAsyncThunk(
    "PRODUCT/fetchAsyncProductDetail",
    async (values: any) => {
        const res = await productsApi.getDetailById(values);
        return res?.data.context;
    }
);

// get product recomment
export const fetchAsynProductRecomment: any = createAsyncThunk(
    "PRODUCT/fetchAsynProductRecomment",
    async (values: any) => {
        const res = await productsApi.getByOrgId(values);
        const payload = {
            products: res?.data.context.data,
            cate_id: values.cate_id,
        };
        return payload;
    }
);

// get comment product
export const fetchAsyncProductCmt: any = createAsyncThunk(
    "PRODUCT/fetchAsyncProductCmt",
    async (values: any) => {
        const res = await commentsApi.getComments(values);
        const payload = {
            comments: res.data.context.data,
            totalItem: res.data.context.total,
            page: values.page,
            product_id: parseInt(values.id),
        };
        return payload;
    }
);
// post comment product
export const postAsyncProductComment: any = createAsyncThunk(
    "SERVICE/postAsyncProductComment",
    async (params: any) => {
        try {
            const res = await commentsApi.postComment(params.values);
            const payload = {
                comment: {
                    ...res.data.context,
                    children: [],
                    user: params.user,
                },
            };
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);
// post favorite product
export const onFavoriteProduct: any = createAsyncThunk(
    "PRODUCT/onFavoriteProduct",
    async (values: any) => {
        const payload = {
            ...values.product,
            is_favorite: true,
            favorites_count: values.product.favorites_count + 1,
        };
        await favorites.postFavoriteItem({
            org_id: values.org_id,
            product_id: values.product.id,
        });
        return payload;
    }
);
// delete favorite product
export const onDeleteFavorite: any = createAsyncThunk(
    "PRODUCT/onDeleteFavorite",
    async (values: any) => {
        const payload = {
            ...values.product,
            is_favorite: false,
            favorites_count: values.product.favorites_count - 1,
        };
        await favorites.deleteFavoriteItem({
            org_id: values.org_id,
            product_id: values.product.id,
        });
        return payload;
    }
);
//post reply comment 
export const postAsyncReplyProductComments: any = createAsyncThunk(
    "PRODUCT/postAsyncReplyProductComments",
    async (values: any) => {
        const res = await commentsApi.postComment(values.values)
        return {
            id: res.data.context.id,
            commentable_id: res.data.context.commentable_id,
            body: res.data.context.body,
            user_id: res.data.context.user_id,
            user: values.user
        }
    }
)
const initialState: IPRODUCT = {
    PRODUCT: {
        product: productInit,
        status: "",
    },
    PRODUCT_REC: {
        products: [],
        cate_id: null,
        status: "",
    },
    COMMENTS: {
        product_id: null,
        comments: [],
        page: 1,
        totalItem: 1,
        status_cmt: "",
    },
};
const productSlice = createSlice({
    initialState,
    name: "PRODUCT",
    reducers: {
        onSetStatusProduct: (state, action) => {
            state.PRODUCT.status = action.payload
        }
    },
    extraReducers: {
        // get product detail
        [fetchAsyncProductDetail.pending]: (state) => {
            return {
                ...state,
                PRODUCT: { ...state.PRODUCT, status: STATUS.LOADING },
            };
        },
        [fetchAsyncProductDetail.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                PRODUCT: {
                    product: payload,
                    status: STATUS.SUCCESS,
                },
            };
        },
        [fetchAsyncProductDetail.rejected]: (state) => {
            return {
                ...state,
                PRODUCT: { ...state.PRODUCT, status: STATUS.FAIL },
            };
        },
        // get product comment
        [fetchAsyncProductCmt.pending]: (state) => {
            return {
                ...state,
                COMMENTS: { ...state.COMMENTS, status_cmt: STATUS.LOADING },
            };
        },
        [fetchAsyncProductCmt.fulfilled]: (state, { payload }) => {
            const { comments, totalItem, page, product_id } = payload;
            return {
                ...state,
                COMMENTS: {
                    ...state.COMMENTS,
                    comments: comments,
                    totalItem: totalItem,
                    page: page,
                    product_id: product_id,
                    status_cmt: STATUS.SUCCESS,
                },
            };
        },
        [fetchAsyncProductCmt.rejected]: (state) => {
            return {
                ...state,
                COMMENTS: { ...state.COMMENTS, status_cmt: STATUS.FAIL },
            };
        },
        // favorite product
        [onFavoriteProduct.pending]: (state) => {
            return state;
        },
        [onFavoriteProduct.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                PRODUCT: {
                    ...state.PRODUCT,
                    product: payload,
                },
            };
        },
        [onFavoriteProduct.pending]: (state) => {
            return state;
        },
        // delete favorite
        [onDeleteFavorite.pending]: (state) => {
            return state;
        },
        [onDeleteFavorite.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                PRODUCT: {
                    ...state.PRODUCT,
                    product: payload,
                },
            };
        },
        [onDeleteFavorite.pending]: (state) => {
            return state;
        },
        // post comment product
        [postAsyncProductComment.pending]: (state, { payload }) => {
            return {
                ...state,
                COMMENTS: { ...state.COMMENTS, status_cmt: STATUS.LOADING },
            };
        },
        [postAsyncProductComment.fulfilled]: (state, { payload }) => {
            const { comment } = payload;
            return {
                ...state,
                COMMENTS: {
                    ...state.COMMENTS,
                    comments: [comment, ...state.COMMENTS.comments],
                    totalItem: state.COMMENTS.totalItem + 1,
                    status_cmt: STATUS.SUCCESS,
                },
            };
        },
        [postAsyncProductComment.rejected]: (state) => {
            return {
                ...state,
                status_cmt: STATUS.FAIL,
            };
        },
        // get product recomment
        [fetchAsynProductRecomment.pending]: (state) => {
            return {
                ...state,
                PRODUCT_REC: {
                    ...state.PRODUCT_REC,
                    status: STATUS.LOADING,
                },
            };
        },
        [fetchAsynProductRecomment.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                PRODUCT_REC: {
                    products: payload.products,
                    cate_id: payload.cate_id,
                    status: STATUS.SUCCESS,
                },
            };
        },
        [fetchAsynProductRecomment.rejected]: (state) => {
            return {
                ...state,
                PRODUCT_REC: {
                    ...state.PRODUCT_REC,
                    status: STATUS.FAIL,
                },
            };
        },
        //post reply comment
        [postAsyncReplyProductComments.pending]: (state) => {
            return state
        },
        [postAsyncReplyProductComments.fulfilled]: (state, { payload }) => {
            const { commentable_id } = payload;
            const iIndex = state.COMMENTS.comments.findIndex((i: IComment) =>
                i.id === commentable_id
            )
            state.COMMENTS.comments[iIndex].children.push(payload)
        },
        [postAsyncReplyProductComments.pending]: (state) => {
            return state
        },
    },
});
const { actions } = productSlice;
export const { onSetStatusProduct } = actions;
export default productSlice.reducer;
