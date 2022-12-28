import { IOrganization } from "interface";
import { useGetDiscountsOrgQuery } from "redux-toolkit-query/hook-org";

export function useDiscountsOrg(org: IOrganization) {
    const { data, isLoading } = useGetDiscountsOrgQuery(org.id)
    const loadDiscounts = isLoading
    const discounts = data ?? []
    return { loadDiscounts, discounts }
}