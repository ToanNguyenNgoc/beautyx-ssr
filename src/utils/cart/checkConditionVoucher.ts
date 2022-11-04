import { IOrganization } from "interface/organization";
import { IDiscountPar, IITEMS_DISCOUNT } from "../../interface/discount";
import { discountReducerItem } from "./cartReducer";
import dayjs from "dayjs";

const date = new Date();

// const dayNow = dayjs().format("YYYY-MM-YY HH:MM:ss");
const day = `0${date.getDate()}`.slice(-2)
const month = `0${date.getMonth() + 1}`.slice(-2)
const year = date.getFullYear()

const dayNow = `${year}-${month}-${day} ${dayjs().format('HH:MM:ss')}`

function unique(arr: any) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

const IsEqualArr = (arr1: any[], arr2: any[]) => {
    let is_Equal = false
    arr1.length === arr2.length && arr1.sort().every((value, index) => {
        let IS_Equal = false
        if (value === arr2.sort()[index]) {
            IS_Equal = true
        }
        return is_Equal = IS_Equal
    });
    return is_Equal
}
export const IS_VOUCHER = (discounts: IDiscountPar[]) => {
    const vouchers: IDiscountPar[] = discounts.filter((i: IDiscountPar) => (
        i.discount_type === "SUB_TOTAL" ||
        ((i.discount_type === "PRODUCT" || i.discount_type === "FINAL_PRICE") && i.items_count === 0)
    ));
    return vouchers
}

export const EX_CHECK_DATE = (voucher: IDiscountPar) => {
    let dateCondition = false;
    // const dayNow = '2022-10-31 01:01:01'
    if (!voucher.valid_from && !voucher.valid_util) {
        dateCondition = true
    } else if (voucher.valid_from && dayNow > voucher.valid_from && !voucher.valid_util) {
        dateCondition = true
    } else if (voucher.valid_from < dayNow && voucher.valid_util > dayNow) {
        dateCondition = true
    }
    // console.log(voucher.valid_from, dayNow, voucher.valid_util)
    return dateCondition
}
export const EX_CHECK_VALID_TIME = (voucher: IDiscountPar) => {
    let timeCondition = false;
    const hourNow = `0${date.getHours()}`.slice(-2);
    const minuteNow = `00${date.getMinutes() + 1}`.slice(-2)
    const timeNowNum = parseInt(`${hourNow}${minuteNow}`);

    const timeFrom = voucher.valid_time?.split("-")[0];
    const timeHourFrom = `0${timeFrom?.split(":")[0]}`.slice(-2)
    const timeMinuteFrom = `0${timeFrom?.split(":")[1]}`.slice(-2)
    const timeFromNum = parseInt(`${timeHourFrom}${timeMinuteFrom}`);

    const timeTo = voucher.valid_time?.split("-")[1];
    const timeHourTo = `0${timeTo?.split(":")[0]}`.slice(-2)
    const timeMinuteTo = `0${timeTo?.split(":")[1]}`.slice(-2)
    const timeToNum = parseInt(`${timeHourTo}${timeMinuteTo}`);

    if (!voucher.valid_time) {
        timeCondition = true
    } else if (voucher.valid_time && timeFromNum < timeNowNum && timeNowNum < timeToNum) {
        timeCondition = true
    }

    const displayFrom = voucher.valid_time ? `${timeHourFrom}h${timeMinuteFrom}` : null
    const displayTo = voucher.valid_time ? `${timeHourTo}h${timeMinuteTo}` : null
    return { timeCondition, displayFrom, displayTo }
}
export const EX_CHECK_SUB_TOTAL = (
    totalAmount: number, voucher: IDiscountPar
) => {
    let subTotalCondition = false;
    if (!voucher.minimum_order_value || totalAmount >= voucher.minimum_order_value) {
        subTotalCondition = true
    }
    return subTotalCondition
}
export const EX_CHECK_INCLUDE_ITEMS = (
    voucher: IDiscountPar, products_id: number[], services_id: number[]
) => {
    let itemCondition = false;
    const { productsInDis, servicesInDis } = discountReducerItem(voucher.items);
    const productsInDis_id = productsInDis.map((i: IITEMS_DISCOUNT) => i.productable_id);
    const servicesInDis_id = servicesInDis.map((i: IITEMS_DISCOUNT) => i.productable_id);
    const newProductArr = productsInDis_id.concat(products_id);
    const uniProductArr = unique(newProductArr)
    const newServiceArr = servicesInDis_id.concat(services_id);
    const uniServiceArr = unique(newServiceArr);
    const checkProductCartInDiscount = () => {


        let productCartInDis = false;
        if (products_id.length === 0) {
            return productCartInDis = false
        }
        if (
            IsEqualArr(uniProductArr, productsInDis_id) || IsEqualArr(uniProductArr, products_id)
        ) {
            return productCartInDis = true
        }
        return productCartInDis
    }
    const checkServiceCartInDiscount = () => {
        let serviceCartInDis = false;
        if (services_id.length === 0) {
            return serviceCartInDis = false
        }
        if (IsEqualArr(servicesInDis_id, uniServiceArr) || IsEqualArr(services_id, uniServiceArr)) {
            return serviceCartInDis = true
        }
        return serviceCartInDis
    }
    const productCartInDis = checkProductCartInDiscount()
    const serviceCartInDis = checkServiceCartInDiscount()
    if (voucher.items.length === 0) {
        return itemCondition = true
    }
    if (productCartInDis || serviceCartInDis) {
        return itemCondition = true
    }
    return itemCondition
}
export const EX_CHECK_INCLUDE_ORG = (discount: IDiscountPar, org_id: number) => {
    let orgCondition = false;
    const orgs_id_discount = discount.organizations.map((org: IOrganization) => org.id)
    if (discount.organizations.length === 0) orgCondition = true
    if (orgs_id_discount.includes(org_id)) orgCondition = true
    return orgCondition
}