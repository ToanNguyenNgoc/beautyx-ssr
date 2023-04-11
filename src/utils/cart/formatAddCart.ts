import { IDiscountPar } from "../../interface/discount";
import { DISCOUNT_TYPE } from "../formatRouterLink/fileType";

export const formatAddCart = (
    item: any,
    org: any,
    is_type: any,
    quantity: any,
    sale_price: any,
    discount?: IDiscountPar | any,
    isConfirm?: boolean,
) => {

    let price_discount = discount ? sale_price - discount.discount_value : null
    if (discount?.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key) {
        price_discount = discount?.discount_value
    }

    const calDiscount = {
        ...discount,
        discount_value: discount?.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key ?
            // sale_price * quantity - discount?.discount_value * quantity : discount?.discount_value
            sale_price - discount?.discount_value : discount?.discount_value
    }

    const cartValues = {
        id: item?.id,
        org_id: org?.id,
        org_name: org?.name,
        cart_id: `${org?.id}${is_type}${item?.id}`, // org_id + is_type + id
        name: item?.product_name || item?.service_name || item?.name,
        quantity: quantity,
        is_type: is_type,
        isConfirm: isConfirm ? isConfirm : false,
        price: sale_price,
        price_discount: price_discount,
        final_price: discount?.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key && discount?.discount_value,
        org: org,
        cart_item: item,
        discount: discount ? calDiscount : null,
    }
    return cartValues;
}