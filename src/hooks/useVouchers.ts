/* eslint-disable eqeqeq */
import { IDiscountPar } from "interface";

interface Item {
    id: number, quantity: number
}

export function useVoucher(
    amountOrigin: number,
    VOUCHER_APPLY: IDiscountPar[],
    items: Item[]
) {

    let { totalQuantity } = items?.reduce(
        (total, item) => {
            const { quantity } = item;
            total.totalQuantity += quantity;
            return total;
        },
        { totalQuantity: 0 }
    );

    const vouchersFinal = VOUCHER_APPLY.map((i: IDiscountPar) => {
        let discount_value = i.discount_value
        //[type: SUB_TOTAL]
        if (i.discount_type === 'SUB_TOTAL' && i.discount_unit === 'PRICE') {
            discount_value = i.discount_value
        }
        if (i.discount_type === 'SUB_TOTAL' && i.discount_unit === 'PERCENT') {
            let tempDiscount = amountOrigin * i.discount_value / 100
            if (i.maximum_discount_value && tempDiscount > i.maximum_discount_value) {
                tempDiscount = i.maximum_discount_value
            }
            discount_value = tempDiscount
        }

        //[type: PRODUCT]
        if (i.discount_type === "PRODUCT" && i.items_count === 0 && i.discount_unit === "PRICE") {
            discount_value = totalQuantity * i.discount_value
        }

        //[type: FINAL_PRICE]
        if (i.discount_type === "FINAL_PRICE" && i.items_count > 0) {
            const itemDiscount = items?.find((items) => items.id == i.items[0]?.productable_id)
            discount_value = (i.items[0]?.productable?.price - i.discount_value) * (itemDiscount?.quantity ?? 1)
        }
        return {
            ...i,
            discount_value: discount_value
        }
    })

    let { totalVoucherValue } = vouchersFinal.reduce((total, discount) => {
        total.totalVoucherValue += discount.discount_value
        return total
    }, { totalVoucherValue: 0 })

    return { vouchersFinal, totalVoucherValue }
}