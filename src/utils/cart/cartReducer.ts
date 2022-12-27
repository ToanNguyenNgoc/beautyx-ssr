import { IITEMS_DISCOUNT } from "interface/discount";
export const discountReducerItem = (items: IITEMS_DISCOUNT[]) => {
    const productsInDis = items?.filter((i: IITEMS_DISCOUNT) => i.productable_type === "App\\Models\\CI\\Product")
    const servicesInDis = items?.filter((i: IITEMS_DISCOUNT) => i.productable_type === "App\\Models\\CI\\Service")
    return { productsInDis, servicesInDis }
}