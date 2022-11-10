// import momoApi from './_momoImport';
import { pickBy, identity } from "lodash";
// momoApi.init({ appId: process.env.REACT_APP_MOMO_APP_ID });
/**
 * @name MOMO_API
 * @description send event tracking to MOMO APPLITCATION
 * @returns {object} message
 */
export async function MOMO_API(EVENT_NAME: String, PARAMs: Object) {
    try {
        const params = pickBy(PARAMs, identity);
        // const res = await momoApi.track(EVENT_NAME, {
        //     service_name: 'myspa',
        //     ...params
        // });
        //   alert(JSON.stringify(EVENT_NAME+JSON.stringify(params)+JSON.stringify(res)));
        // return res;
    } catch (err) {
        console.log(err);
    }
}
// ==== interface for params ====
export type ComponentName =
    | "doanh nghiệp"
    | "khu vực"
    | "dịch vụ"
    | "sản phẩm"
    | "khuyến mãi hot"
    | "giá thấp"
    | "gần bạn"
    | "dịch vụ bạn chưa biết";

interface PRODUCT_LIST {
    product_id: Number;
    quantity: Number;
    price: Number;
}
interface RESULT {
    store_id: any;
    product_id?: String | Number;
}
// ==== end ====

// ===================

class TRACKING_EVENT {
    HOME_LOAD = () => {
        const params = {
            EVENT_NAME: "service_screen_viewed",
            PARAMs: {
                screen_name: "home",
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
    SEARCH_CLICK = () => {
        const params = {
            EVENT_NAME: "service_search_clicked",
            PARAMs: {
                screen_name: "home",
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
    SEARCH_ON_CHANGE = (keyword: String) => {
        const params = {
            EVENT_NAME: "service_search_inputed",
            PARAMs: {
                screen_name: "home",
                keyword: keyword,
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
    SEARCH_RESULT_LOAD = (quantity: Number, keyword: String) => {
        const params = {
            EVENT_NAME: "service_search_result_viewed",
            PARAMs: {
                screen_name: "search_result",
                quantity: quantity,
                keyword: keyword,
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
    SEARCH_RESULT_ITEM_CLICK = (
        keyword?: String,
        result?: RESULT,
        component_name?: ComponentName,
        position?: string
    ) => {
        const params = {
            EVENT_NAME: "service_search_result_clicked",
            PARAMs: {
                screen_name: "search_result",
                keyword: keyword,
                result: result,
                component_name: component_name,
                position: position,
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
    SEARCH_RESULT_ORG_LOAD = (store_id?: String) => {
        const params = {
            EVENT_NAME: "service_screen_viewed",
            PARAMs: {
                screen_name: "storelist",
                store_id: store_id,
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
    LIST_ORG_LOAD = (store_id?: String) => {
        const params = {
            EVENT_NAME: "service_screen_viewed",
            PARAMs: {
                screen_name: "storelist",
                store_id: store_id,
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
    DISCOOUNT_ITEM_CLICK = (
        store_id: String | Number,
        component_name: ComponentName,
        voucher_id: String | Number
    ) => {
        const params = {
            EVENT_NAME: "service_product_clicked",
            PARAMs: {
                screen_name: "home",
                button_name: "voucher",
                store_id: store_id,
                component_name: component_name,
                product_id: voucher_id,
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
    BANNER_CLICK = (banner_id: String | Number) => {
        const params = {
            EVENT_NAME: "service_button_clicked",
            PARAMs: {
                screen_name: "home",
                button_name: "banner",
                banner_id: banner_id,
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
    VIDEO_SCREEN_LOAD = () => {
        const params = {
            EVENT_NAME: "service_screen_viewed",
            PARAMs: {
                screen_name: "trending",
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
    CALENDAR_CLICK = () => {
        const params = {
            EVENT_NAME: "service_screen_viewed",
            PARAMs: {
                screen_name: "appointment",
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
    CATEGORY_TREE_LOAD = () => {
        const params = {
            EVENT_NAME: "service_screen_viewed",
            PARAMs: {
                screen_name: "category",
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
    CATEGORY_TREE_ITEM_CLICK = (
        category_id?: String,
        store_id?: String,
        product_id?: String
    ) => {
        const params = {
            EVENT_NAME: "service_product_clicked",
            PARAMs: {
                screen_name: "category",
                category_id: category_id,
                store_id: store_id,
                product_id: product_id,
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
    USER_ITEM_CLICK = (
        store_id: String | Number,
        product_id: String | Number | null
    ) => {
        const params = {
            EVENT_NAME: "service_product_clicked",
            PARAMs: {
                screen_name: "menu",
                store_id: store_id,
                product_id: product_id,
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
    ADD_CART_CLICK = (
        store_id: String,
        product_id: String,
        price: Number,
        quantity: Number,
        option?: Object[]
    ) => {
        const params = {
            EVENT_NAME: "service_button_clicked",
            PARAMs: {
                screen_name: "menu",
                button_name: "add_product",
                store_id: store_id,
                product_id: product_id,
                price: price,
                option: [
                    ...(option || []),
                    {
                        quantity: quantity,
                    },
                ],
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
    PAY_CLICK = (store_id: String, product_list: PRODUCT_LIST[]) => {
        const params = {
            EVENT_NAME: "service_product_continued",
            PARAMs: {
                screen_name: "menu",
                store_id: store_id,
                product_list: product_list,
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
    CONFIRM_SCREEN_LOAD = (
        store_id: String | Number,
        product_list: PRODUCT_LIST[],
        price: Number
    ) => {
        const params = {
            EVENT_NAME: "service_screen_viewed",
            PARAMs: {
                screen_name: "cart_view",
                price: price,
                store_id: store_id,
                product_list: product_list,
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
    CART_DELETE_ALL_CLICK = () => {
        const params = {
            EVENT_NAME: "service_screen_viewed",
            PARAMs: {
                screen_name: "cart_view",
                button_name: "delete_cart",
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
    PAY_CONFIRM_CLICK = (
        store_id: String | Number,
        product_list: PRODUCT_LIST[]
    ) => {
        const params = {
            EVENT_NAME: "service_product_continued",
            PARAMs: {
                screen_name: "order_info",
                store_id: store_id,
                product_list: product_list,
            },
        };
        return MOMO_API(params.EVENT_NAME, params.PARAMs);
    };
}
export const EVENT = new TRACKING_EVENT();
export default EVENT;

function extraParamsUrl() {
    throw new Error("Function not implemented.");
}
