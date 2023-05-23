import API_ROUTE from "api/_api";
import { useSwr } from "hooks";
import { IDiscountPar, IOrgMobaGalleries, IOrganization, Product, Service } from "interface";
import { ReactNode, createContext } from "react";
import { useParams } from "react-router-dom";
import { useGalleriesQuery } from "redux-toolkit-query/hook-home";
import {
  useGetDiscountsOrgQuery,
  useGetServicesSpecialOrgQuery,
  useGetProductsSpecialOrgQuery
} from "redux-toolkit-query/hook-org";

export type OrgContextType = {
  subdomain: string,
  org: IOrganization,
  load: boolean,
  galleries: IOrgMobaGalleries[],
  loadGalleries: boolean,
  discounts: IDiscountPar[],
  servicesSpecial: Service[],
  productsSpecial: Product[]
}

export const OrgContext = createContext<OrgContextType | null>(null);
export function OrgProvider({ children }: { children: ReactNode }) {
  const params = useParams()
  const { subdomain } = params as { subdomain: string }
  const { response: resOrg, isValidating: loadOrg } = useSwr({
    API_URL: API_ROUTE.ORG(subdomain),
    enable: subdomain
  })
  const { data, isLoading: loadGalleries } = useGalleriesQuery(subdomain)
  const galleries: IOrgMobaGalleries[] = data ?? []
  const { data: discounts = [] } = useGetDiscountsOrgQuery(
    resOrg?.id, { skip: !resOrg ? true : false }
  )
  const { data: servicesSpecial = [] } = useGetServicesSpecialOrgQuery(subdomain, { skip: !resOrg ? true : false })
  const { data: productsSpecial = [] } = useGetProductsSpecialOrgQuery(subdomain, { skip: !resOrg ? true : false })
  let load = true
  if (!loadOrg && resOrg) load = false
  const org: IOrganization = resOrg
  const value = {
    subdomain,
    org,
    load,
    galleries,
    loadGalleries,
    discounts,
    servicesSpecial,
    productsSpecial
  }

  return <OrgContext.Provider value={value} > {children} </OrgContext.Provider>
}