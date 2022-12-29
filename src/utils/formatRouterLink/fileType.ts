import { IDiscountPar } from "../../interface/discount";
import formatPrice from "../formatPrice";
import moment from "moment";

export interface IORDER_SHIP_STATUS {
    id: number,
    title: string,
    process: number,
}
const date = new Date();
const dayNow = moment(date).format("YYYY-MM-YY HH:MM:SS");
export const DISCOUNT_TYPE = {
    PRODUCT: {
        key: 'PRODUCT',
        text: "Giảm từng sản phẩm, dịch vụ"
    },
    SUB_TOTAL: {
        key: "SUB_TOTAL",
        text: "Giảm trên tổng đơn"
    },
    FINAL_PRICE: {
        key: "FINAL_PRICE",
        text: "Giá thanh toán"
    },
}
export const EX_VOUCHER_TITLE_DISCOUNT = (discount:IDiscountPar)=>{
    let displayTitle="";
    if(discount.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key){
        displayTitle = `Giảm còn ${formatPrice(discount.discount_value)}đ`
    }
    if(discount.discount_unit === "PERCENT"){
        displayTitle = `Giảm ${discount.discount_value}%`
    }
    if(discount.discount_unit === "PRICE"){
        displayTitle = `Giảm ${formatPrice(discount.discount_value)}đ`
    }
    return displayTitle
}
export const EX_APPLY_DATE = (discount: IDiscountPar) => {
    let validDate = false;
    if (!discount.valid_from && !discount.valid_util) {
        validDate = true
    } else if (discount.valid_from && dayNow > discount.valid_from && !discount.valid_util) {
        validDate = true
    } else if (discount.valid_from < dayNow && discount.valid_util > dayNow) {
        validDate = true
    }
    return validDate
}
export const EX_DISCOUNT_UNIT = (discount: IDiscountPar) => {
    let value = ``;
    switch (discount.discount_unit) {
        case "PERCENT": return value = `${discount.discount_value}%`;
        case "PRICE": return value = `${formatPrice(discount.discount_value)}đ`;
        default: break
    }
    return value
}
export const EX_DISCOUNT_TYPE = (discount: IDiscountPar) => {
    const discount_type = discount?.discount_type
    let text = "";
    // let TYPE = ""
    const value = EX_DISCOUNT_UNIT(discount)
    switch (discount_type) {
        case DISCOUNT_TYPE.FINAL_PRICE.key:
            return text = `${DISCOUNT_TYPE.FINAL_PRICE.text} ${formatPrice(discount?.discount_value)}đ/mỗi items`;
        case DISCOUNT_TYPE.SUB_TOTAL.key:
            return text = `Giảm ${value} trên tổng đơn ${discount.maximum_discount_value ?
                `(tối đa ${formatPrice(discount.maximum_discount_value)})` : ''
                }`;
        case DISCOUNT_TYPE.PRODUCT.key:
            return text = `Giảm ${value} trên sản phẩm, dịch vụ `;
        default:
            break
    }
    return text
}
export const ORDER_SHIP_STATUS: IORDER_SHIP_STATUS[] = [
    { id: 0, title: "Chưa xác nhận", process: 0 },
    { id: 1, title: "Đang xử lý", process: 33.33 },
    { id: 2, title: "Đang giao hàng", process: 66.66 },
    { id: 3, title: "Đã giao", process: 100 },
    { id: 4, title: "Đã hủy", process: 100 }
]