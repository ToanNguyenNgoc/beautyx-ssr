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
//----
import communityReducer from './community'

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
    COMMUNITY: communityReducer
};
const store = configureStore({
    reducer: rootReducer,
});
export default store;
