import { createSlice } from "@reduxjs/toolkit";
// ==== api tracking ====
import tracking from "api/trackApi";
import { IDiscountPar } from "interface/discount";
// end
// google tag event
import { GoogleTagPush, GoogleTagEvents } from "utils/dataLayer";
import { analytics, logEvent } from "../../firebase"
// end

export interface CartType {
    org: any,
    cartList: any[],
    cartQuantity: number,
    cartQuantityCheck: number,
    cartAmountDiscount: number,
    cartAmountDiscountTotal: number,
    cartAmount: number,
    VOUCHER_CART: {
        org_id: any,
        vouchers: any[]
    },
    VOUCHER_APPLY: IDiscountPar[]
}

const storageName = "web-booking-cart";
const storage = JSON.parse(`${localStorage.getItem(storageName)}`);
const initialState: CartType = {
    org: null,
    cartList: localStorage.getItem(storageName) ? storage : [],
    cartQuantity: 0,
    cartQuantityCheck: 0,
    cartAmountDiscount: 0,
    cartAmount: 0,
    VOUCHER_CART: {
        org_id: null,
        vouchers: []
    },
    cartAmountDiscountTotal: 0,
    VOUCHER_APPLY: []
};
const cart = createSlice({
    name: "carts",
    initialState,
    reducers: {
        addCart: (state, action) => {
            GoogleTagPush(GoogleTagEvents.ADD_TO_CART);
            const iIndex = state.cartList.findIndex(
                (item: any) => item.cart_id === action.payload.cart_id
            );

            if (iIndex >= 0) {
                state.cartList[iIndex].quantity += action.payload.quantity
                state.cartList[iIndex].isConfirm = action.payload.isConfirm
                tracking.ADD_CART_CLICK(
                    state.cartList[iIndex].org_id,
                    state.cartList[iIndex].id,
                    state.cartList[iIndex].price,
                    state.cartList[iIndex].quantity
                );
                logEvent(analytics, 'add_to_cart', {
                    items: state.cartList[iIndex],
                    value: state.cartList[iIndex].price,
                    currency: 'VND'
                });
            } else {
                const templeCart = {
                    ...action.payload,
                    quantity: action.payload.quantity,
                };
                tracking.ADD_CART_CLICK(
                    templeCart.org_id,
                    templeCart.id,
                    templeCart.price,
                    templeCart.quantity
                );
                logEvent(analytics, 'add_to_cart', {
                    items: templeCart,
                    value: templeCart.price,
                    currency: 'VND'
                });
                state.cartList.push(templeCart);
            }
            localStorage.setItem(storageName, JSON.stringify(state.cartList));
        },
        ascItem: (state, action) => {
            const iIndex = state.cartList.findIndex(
                (item: any) => item.cart_id === action.payload.cart_id
            );
            if (state.cartList[iIndex].quantity >= 1) {
                state.cartList[iIndex].quantity += 1;
            }
            localStorage.setItem(storageName, JSON.stringify(state.cartList));
        },
        descItem: (state, action) => {
            const iIndex = state.cartList.findIndex(
                (item: any) => item.cart_id === action.payload.cart_id
            );
            if (state.cartList[iIndex].quantity > 1) {
                state.cartList[iIndex].quantity -= 1;
            }
            localStorage.setItem(storageName, JSON.stringify(state.cartList));
        },
        checkConfirm: (state, action) => {
            const iIndex = state.cartList.findIndex(
                (item: any) => item.cart_id === action.payload.cart_id
            );
            if (state.cartList[iIndex].isConfirm === false) {
                state.cartList[iIndex].isConfirm = true;
            } else {
                state.cartList[iIndex].isConfirm = false;
            }
            localStorage.setItem(storageName, JSON.stringify(state.cartList));
        },
        unCheck: (state, action) => {
            const iIndex = state.cartList.findIndex(
                (item: any) => item.cart_id === action.payload.cart_id
            );
            state.cartList[iIndex].isConfirm = false;
            localStorage.setItem(storageName, JSON.stringify(state.cartList));
        },
        removeItem: (state, action) => {
            GoogleTagPush(GoogleTagEvents.REMOVE_FROM_CART);
            const nextItem = state.cartList.filter(
                (item: any) => item.cart_id !== action.payload.cart_id
            );
            state.cartList = nextItem;
            localStorage.setItem(storageName, JSON.stringify(nextItem));
        },
        chooseAll: (state, action) => {
            const cartTrue = [];
            const cartFalse = [];
            for (var item of storage) {
                let arr = item;
                if (item.org_id === action.payload) {
                    arr = { ...item, isConfirm: true };
                    cartTrue.push(arr);
                } else if (item.org_id !== action.payload) {
                    arr = { ...item, isConfirm: true };
                    cartFalse.push(arr);
                }
            }
            //state.cartList = cartTrue
            localStorage.setItem(storageName, JSON.stringify(state.cartList));
        },
        onApplyVoucherSubTotal: (state, action) => {
            const iIndex = state.VOUCHER_APPLY.findIndex((i: IDiscountPar) =>
                i.id === action.payload.id
            )
            if (iIndex < 0) {
                const newVoucher = action.payload
                state.VOUCHER_APPLY.push(newVoucher)
            }
        },
        getTotal: (state, { payload }) => {
            const cartListDiscounts = state.cartList
                .filter((item: any) => item.user_id === payload)
                .filter((item: any) => item.isConfirm === true)
                .map((item: any) => (
                    item.discount?.discount_type === "FINAL_PRICE" ?
                        item.discount?.discount_value * item.quantity
                        :
                        item.discount?.discount_value
                ))
                .filter(Boolean);
            state.cartAmountDiscount =
                cartListDiscounts.length > 0 &&
                cartListDiscounts.reduce(
                    (pre: number, cur: number) => pre + cur
                );

            //amount discount total, price
            let { total, quantity, quantityCheck } = state.cartList
                .filter((item: any) => item.user_id === payload)
                .reduce(
                    (cartTotal: any, cartItem: any) => {
                        const { quantity, price, isConfirm } = cartItem;
                        if (isConfirm === true) {
                            const itemTotal = price * quantity;
                            cartTotal.total += itemTotal;
                            cartTotal.quantityCheck += quantity;
                        }
                        cartTotal.quantity += quantity;
                        return cartTotal;
                    },
                    {
                        total: 0,
                        quantity: 0,
                        quantityCheck: 0
                    }
                );
            state.cartAmount = total;
            state.cartQuantity = quantity;
            state.cartQuantityCheck = quantityCheck
        },
        clearAllCart: (state) => {
            state.cartList = [];
            state.VOUCHER_APPLY = []
            localStorage.setItem(storageName, JSON.stringify(state.cartList));
        },
        onClearApplyVoucher: (state) => {
            state.VOUCHER_APPLY = []
        },
        clearByCheck: (state) => {
            state.VOUCHER_APPLY = []
            const cartConfirm = state.cartList.filter(
                (val: any) => val.isConfirm === true
            );
            const intersection = state.cartList.filter(
                (x: any) => !cartConfirm.includes(x)
            );
            state.cartList = intersection;
            localStorage.setItem(storageName, JSON.stringify(state.cartList));
        },
        onClearPrevCartItem: (state) => {
            const newCartList = state.cartList.map((item: any) => {
                return {
                    ...item,
                    isConfirm: false,
                };
            });
            state.cartList = newCartList;
            localStorage.setItem(storageName, JSON.stringify(state.cartList));
        },
        //add discount by org_id to cart
        addVoucherByOrg: (state, action) => {
            state.VOUCHER_CART = {
                org_id: action.payload.org.id,
                vouchers: action.payload.vouchers
            }
        },
        onCancelApplyVoucher: (state, action) => {
            const newVoucher = state.VOUCHER_APPLY.filter((i: IDiscountPar) => i.id !== action.payload)
            state.VOUCHER_APPLY = newVoucher
        }

    },
});
const { reducer, actions } = cart;
export const {
    addCart,
    descItem,
    ascItem,
    checkConfirm,
    removeItem,
    chooseAll,
    getTotal,
    unCheck,
    clearAllCart,
    clearByCheck,
    onClearPrevCartItem,
    addVoucherByOrg,
    onApplyVoucherSubTotal,
    onClearApplyVoucher,
    onCancelApplyVoucher
} = actions;
export default reducer;
