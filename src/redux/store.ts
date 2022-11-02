import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import homeReducer from "./home/homeSlice";
import userReducer from "./USER/userSlice";
import servicesBookReducer from "./servicesBookSlice";
import userAddressReducer from "./USER/userAddressSlice";
import orgReducer from "./org/orgSlice";
import orgCommentsReducer from "./org/orgCommentsSlice";
import orgSpecialReducer from "./org_specials/orgSpecialSlice";
import combosReducer from "./org_combos/orgCombosSlice";
import orgDiscountsReducer from "./org_discounts/orgDiscountsSlice";
import serviceReducer from "./org_services/serviceSlice";
import productReducer from "./org_products/productSlice";
import loginFlatFromReducer from "./loginFlatForm/loginFlatFrom";
import paymentsReducer from "./payments/paymentSlice";
import blogReducer from "./blog/blogSlice";
import cateReducer from "./CateTree/cateTreeSlice";
import comboReducer from "./org_combos/comboSlice";
import videosReducer from "./video/videosSlice";
import trendReducer from "./video/trendSlice";
import appReducer from "./appointment/appSlice";
import commentReducer from "./commentSlice";
import orderReducer from "./order/orderSlice";
import filterReducer from "./filter/filterSlice";
import homePageReducer from "./home/homePageSlice";
import chatOrgReducer from "./chat/chatOrgSlice";
import tagsReducer from "./Tags/tagsSlice";
import orgMapReducer from "./org/orgMapSlice";
import notiReducer from "./notifications"
import filterResultReduce from "./filter-result"

const rootReducer = {
    TAGS: tagsReducer,
    carts: cartReducer,
    HOME: homeReducer,
    LOGIN: loginFlatFromReducer,
    ORG_COMMENTS: orgCommentsReducer,
    SERVICES_BOOK: servicesBookReducer,
    USER: userReducer,
    ORG: orgReducer,
    SERVICE: serviceReducer,
    PRODUCT: productReducer,
    ORG_COMBOS: combosReducer,
    ORG_SPECIALS: orgSpecialReducer,
    ORG_DISCOUNTS: orgDiscountsReducer,
    ADDRESS: userAddressReducer,
    PAYMENT: paymentsReducer,
    BLOG: blogReducer,
    CATE_TREE: cateReducer,
    COMBO: comboReducer,
    VID: videosReducer,
    TRENDs: trendReducer,
    APP: appReducer,
    COMMENT_MEDIA: commentReducer,
    ORDER: orderReducer,
    FILTER: filterReducer,
    HOME_PAGE: homePageReducer,
    CHAT_ORG: chatOrgReducer,
    ORGS_MAP: orgMapReducer,
    NOTI: notiReducer,
    FILTER_RESULT: filterResultReduce
};
const store = configureStore({
    reducer: rootReducer,
});
export default store;
