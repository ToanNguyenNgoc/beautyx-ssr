import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import homeReducer from "./home/homeSlice";
import userReducer from "./USER/userSlice";
import servicesBookReducer from "./servicesBookSlice";
import userAddressReducer from "./USER/userAddressSlice";
import orgReducer from "./org/orgSlice";
import orgCommentsReducer from "./org/orgCommentsSlice";
import orgDiscountsReducer from "./org_discounts/orgDiscountsSlice";
import loginFlatFromReducer from "./loginFlatForm/loginFlatFrom";
import paymentsReducer from "./payments/paymentSlice";
import blogReducer from "./blog/blogSlice";
import cateReducer from "./CateTree/cateTreeSlice";
import appReducer from "./appointment/appSlice";
import orderReducer from "./order/orderSlice";
import chatOrgReducer from "./chat/chatOrgSlice";
import tagsReducer from "./Tags/tagsSlice";
import orgMapReducer from "./org/orgMapSlice";
import notiReducer from "./notifications"
import filterResultReduce from "./filter-result";
import searchHistoryReducer from './search_history'

const rootReducer = {
    TAGS: tagsReducer,
    carts: cartReducer,
    HOME: homeReducer,
    LOGIN: loginFlatFromReducer,
    ORG_COMMENTS: orgCommentsReducer,
    SERVICES_BOOK: servicesBookReducer,
    USER: userReducer,
    ORG: orgReducer,
    ORG_DISCOUNTS: orgDiscountsReducer,
    ADDRESS: userAddressReducer,
    PAYMENT: paymentsReducer,
    BLOG: blogReducer,
    CATE_TREE: cateReducer,
    APP: appReducer,
    ORDER: orderReducer,
    CHAT_ORG: chatOrgReducer,
    ORGS_MAP: orgMapReducer,
    NOTI: notiReducer,
    FILTER_RESULT: filterResultReduce,
    SEARCH_HIS: searchHistoryReducer
};
const store = configureStore({
    reducer: rootReducer,
});
export default store;
