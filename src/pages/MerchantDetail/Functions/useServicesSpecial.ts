import { IOrganization } from "interface";
import { useGetServicesSpecialOrgQuery } from "redux-toolkit-query/hook-org";

export function useServicesSpecial(org: IOrganization) {
    const { data, isLoading } = useGetServicesSpecialOrgQuery(org.id)
    const services_special = data ?? []
    const loadServices = isLoading
    return { services_special, loadServices }
}