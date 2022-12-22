import { ICart, IDiscountPar } from "interface";
import { useSelector } from "react-redux";
import { useCartReducer } from "./useCartReducer";

export function useVoucherCalCart(VOUCHER_APPLY: IDiscountPar[]) {
    const { cartQuantityCheck, cartAmount } = useSelector((state: any) => state.carts);
    const { services } = useCartReducer()
    const vouchersCal = VOUCHER_APPLY?.map((i: IDiscountPar) => {
        let discountValue = i.discount_value;
        if (i.discount_unit === 'PERCENT' && i.discount_type === 'SUB_TOTAL') {
            let cal = 0
            const calTotal = cartAmount * i.discount_value / 100
            if (!i.maximum_discount_value || calTotal < i.maximum_discount_value) {
                cal = calTotal
            }
            if (i.maximum_discount_value && calTotal > i.maximum_discount_value) {
                cal = i.maximum_discount_value
            }
            discountValue = cal
        }
        if (i.discount_type === "PRODUCT" && i.items_count === 0 && i.discount_unit === "PRICE") {
            discountValue = cartQuantityCheck * i.discount_value
        }
        if (i.discount_type === "FINAL_PRICE" && i.items_count > 0) {
            const org_id = i.organizations[0]?.id
            const itemCartByDiscount = services
                // eslint-disable-next-line eqeqeq
                ?.find((service: ICart) => service.cart_id == `${org_id}SERVICE${i.items[0]?.productable_id}`)
            discountValue = (i.items[0]?.productable?.price - i.discount_value) * (itemCartByDiscount?.quantity ?? 1)
        }
        return {
            ...i,
            discount_value: (i.discount_unit === "PERCENT" || i.discount_type === "PRODUCT" || i.discount_type === "FINAL_PRICE") ?
                discountValue : i.discount_value
        }
    })
    return { vouchersCal }
}