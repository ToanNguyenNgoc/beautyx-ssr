import { Cart } from "../interface/cart";

export function REDUCER_CART(data_cart: any) {
    const products = data_cart.products.map((item: Cart) => ({ id: item.id, quantity: item.quantity }))
    const services = data_cart.services.map((item: Cart) => ({ id: item.id, quantity: item.quantity }))
    const combos = data_cart.combos.map((item: Cart) => ({ id: item.id, quantity: item.quantity }))
    return {
        products, services, combos
    }
}
export default REDUCER_CART;