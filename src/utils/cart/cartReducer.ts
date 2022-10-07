import { IITEMS_DISCOUNT } from "../../interface/discount";

export const cartReducer = (carts: any[]) => {
    const products = carts.filter((item: any) => item.is_type === 1);
    const services = carts.filter((item: any) => item.is_type === 2);
    const combos = carts.filter((item: any) => item.is_type === 3);

    const products_id = products.map((item:any) => {
        return {id: item.id, quantity: item.quantity}
    })
    const services_id = services.map((item:any) => {
        return {id: item.id, quantity: item.quantity}
    })
    const combos_id = combos.map((item:any) => {
        return {id: item.id, quantity: item.quantity}
    })
    const cart_confirm = carts
    return { products, services, combos, cart_confirm, services_id, products_id, combos_id }
}
export const discountReducerItem = (items: IITEMS_DISCOUNT[]) => {
    const productsInDis = items.filter((i: IITEMS_DISCOUNT) => i.productable_type === "App\\Models\\CI\\Product")
    const servicesInDis = items.filter((i: IITEMS_DISCOUNT) => i.productable_type === "App\\Models\\CI\\Service")
    return { productsInDis, servicesInDis }
}