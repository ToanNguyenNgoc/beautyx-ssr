import API_ROUTE from "api/_api";
import { IOrganization } from "interface";
import { paramsProducts } from "params-query";
import { useSwr } from "hooks";

export function useProductsSpecial(org: IOrganization) {
    const { responseArray, isValidating } = useSwr(
        API_ROUTE.ORG_PRODUCTS(org?.id),
        org?.id,
        {
            ...paramsProducts,
            "limit": 12,
            "filter[special_price]": true,
            "filter[special]": true,
            "filter[special_ecommerce]": true
        }
    )
    const products_special = responseArray
    const loadProducts = isValidating
    return { products_special, loadProducts }
}