import { ICart, IDiscountPar } from "interface";
import IStore from "interface/IStore";
import { useSelector } from "react-redux";

export function useCartReducer() {
    const { cartList } = useSelector((state: IStore) => state.carts)
    const cart_confirm = cartList.filter((item: ICart) => item.isConfirm === true)
    const products = cart_confirm.filter((item: ICart) => item.is_type === 'PRODUCT');
    const services = cart_confirm.filter((item: ICart) => item.is_type === 'SERVICE');
    const combos = cart_confirm.filter((item: ICart) => item.is_type === 'COMBO');

    const outDiscounts: IDiscountPar[] | any[] = cart_confirm.map((i: ICart) => i.discount).filter(Boolean)

    const products_id = products.map((item: any) => {
        return { id: item.id, quantity: item.quantity }
    })
    const services_id = services.map((item: any) => {
        return { id: item.id, quantity: item.quantity }
    })
    const combos_id = combos.map((item: any) => {
        return { id: item.id, quantity: item.quantity }
    })
    return {
        products,
        services,
        combos,
        cart_confirm,
        services_id,
        products_id,
        combos_id,
        outDiscounts
    }
}