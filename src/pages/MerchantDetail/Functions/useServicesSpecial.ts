import API_ROUTE from "api/_api";
import { IOrganization } from "interface";
import { paramsServices } from "params-query";
import { useSwr } from "utils";

export function useServicesSpecial(org: IOrganization) {
    const { responseArray, isValidating } = useSwr(
        API_ROUTE.ORG_SERVICES(org?.id),
        org?.id,
        {
            ...paramsServices,
            "limit": 12,
            "filter[special_price]": true,
            "filter[special]": true,
            "filter[special_ecommerce]": true
        }
    )
    const services_special = responseArray
    const loadServices = isValidating
    return { services_special, loadServices }
}