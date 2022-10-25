import API_ROUTE from "api/_api";
import { IOrganization } from "interface";
import { paramDiscounts } from "params-query";
import { useSwr } from "utils";

export function useDiscountsOrg(org: IOrganization) {
    const { responseArray, isValidating } = useSwr(
        API_ROUTE.DISCOUNTS,
        org?.id,
        { ...paramDiscounts, "filter[organization_id]": org?.id }
    )
    const loadDiscounts = isValidating
    const discounts = responseArray ?? []
    return { loadDiscounts, discounts }
}