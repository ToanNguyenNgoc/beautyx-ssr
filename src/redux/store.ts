import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import homeReducer from "./home/homeSlice";
import userReducer from "./user/userSlice";
import servicesBookReducer from "./booking";
import userAddressReducer from "./user/userAddressSlice";
import orgReducer from "./org/orgSlice";
import orgDiscountsReducer from "./org_discounts/orgDiscountsSlice";
import loginFlatFromReducer from "./loginFlatForm/loginFlatFrom";
import paymentsReducer from "./payments/paymentSlice";
import cateReducer from "./cate-tree/cateTreeSlice";
import orgMapReducer from "./org/orgMapSlice";
import filterResultReduce from "./filter-result";
import searchHistoryReducer from './search_history'
import communityReducer from './community'
// react toolkit query
import { homeApi } from "redux-toolkit-query/hook-home";
import { serProComDetailApi } from "redux-toolkit-query/hook-detail";
import { searchApi } from "redux-toolkit-query/hook-search-history";
import { orgPageApi } from 'redux-toolkit-query/hook-org'

const rootReducer = {
    carts: cartReducer,
    HOME: homeReducer,
    LOGIN: loginFlatFromReducer,
    SERVICES_BOOK: servicesBookReducer,
    USER: userReducer,
    ORG: orgReducer,
    ORG_DISCOUNTS: orgDiscountsReducer,
    ADDRESS: userAddressReducer,
    PAYMENT: paymentsReducer,
    CATE_TREE: cateReducer,
    ORGS_MAP: orgMapReducer,
    FILTER_RESULT: filterResultReduce,
    SEARCH_HIS: searchHistoryReducer,
    COMMUNITY: communityReducer,

    [homeApi.reducerPath]: homeApi.reducer,
    [serProComDetailApi.reducerPath]: serProComDetailApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [orgPageApi.reducerPath]: orgPageApi.reducer
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(
                [
                    homeApi.middleware,
                    serProComDetailApi.middleware,
                    searchApi.middleware,
                    orgPageApi.middleware
                ]
            )
});
export default store;
