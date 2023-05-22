import API_ROUTE from "api/_api"
import { OrgContext, OrgContextType } from "context"
import { useSwrInfinite } from "hooks"
import { paramsServicesOrg, paramsProductsOrg } from "params-query"
import { useContext, useRef } from "react"
import style from './ser-sec.module.css'
import { Service } from "interface"
import { SerProItem } from "components/Layout"

export const ServiceSection = ({ type }: { type: 'SERVICE' | 'PRODUCT' }) => {
  const { subdomain, org } = useContext(OrgContext) as OrgContextType
  const refSection = useRef<HTMLDivElement>(null)
  const { resData: resServices } = useSwrInfinite(true, API_ROUTE.ORG_SERVICES(subdomain), {
    ...paramsServicesOrg,
    'limit':10,
    // 'filter[is_featured]': true
  })
  const { resData: resProducts } = useSwrInfinite(true, API_ROUTE.ORG_PRODUCTS(subdomain), {
    ...paramsProductsOrg,
    'limit':10,
    // 'filter[is_featured]': true
  })
  let data = resServices
  if (type === 'PRODUCT') data = resProducts
  return (
    <div className={style.container} ref={refSection} >
      <ul className={style.list_item}>
        {
          data.map((item: Service) => (
            <li key={item.id} className={style.item}>
              <SerProItem
                org={org}
                item={item}
                type={type}
              />
            </li>
          ))
        }
      </ul>
    </div>
  )
}