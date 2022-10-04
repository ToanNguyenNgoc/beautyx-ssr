import { IITEMS_DISCOUNT } from "../../interface/discount";

export const cartReducer = (carts: any[]) => {
    const products = carts.filter((item: any) => item.is_type === 1);
    const services = carts.filter((item: any) => item.is_type === 2);
    const combos = carts.filter((item: any) => item.is_type === 3);
    const cart_confirm = carts
    return { products, services, combos, cart_confirm }
}
export const discountReducerItem = (items: IITEMS_DISCOUNT[]) => {
    const productsInDis = items.filter((i: IITEMS_DISCOUNT) => i.productable_type === "App\\Models\\CI\\Product")
    const servicesInDis = items.filter((i: IITEMS_DISCOUNT) => i.productable_type === "App\\Models\\CI\\Service")
    return { productsInDis, servicesInDis }
}