import { IITEMS_DISCOUNT } from "interface/discount";
export const discountReducerItem = (items: IITEMS_DISCOUNT[]) => {
    const productsInDis = items?.filter((i: IITEMS_DISCOUNT) => i.productable_type === "App\\Models\\CI\\Product")
    const servicesInDis = items?.filter((i: IITEMS_DISCOUNT) => i.productable_type === "App\\Models\\CI\\Service")

    const productsName = productsInDis?.map((i: IITEMS_DISCOUNT) => i.productable?.product_name).filter(Boolean)
    const servicesName = servicesInDis?.map((i: IITEMS_DISCOUNT) => i.productable?.service_name).filter(Boolean)

    const names = productsName?.concat(servicesName)

    return { productsInDis, servicesInDis, productsName, servicesName, names }
}