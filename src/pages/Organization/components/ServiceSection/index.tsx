import API_ROUTE from "api/_api"
import { OrgContext, OrgContextType } from "context"
import { useSwrInfinite } from "hooks"
import { paramsServicesOrg, paramsProductsOrg } from "params-query"
import { useContext, useRef } from "react"
import style from './ser-sec.module.css'
import { Service } from "interface"
import { SerProItem, XButton } from "components/Layout"
import { Link, useHistory, useLocation } from "react-router-dom"
import { scrollTop } from "utils"

export const ServiceSection = ({ type }: { type: 'SERVICE' | 'PRODUCT' | 'COMBO' }) => {
  const location = useLocation()
  const history = useHistory()
  const { subdomain, org } = useContext(OrgContext) as OrgContextType
  const refSection = useRef<HTMLDivElement>(null)
  const { resData: resServices } = useSwrInfinite({
    enable: true,
    API_URL: API_ROUTE.ORG_SERVICES(subdomain),
    params: {
      ...paramsServicesOrg,
      'limit': 20,
      // 'filter[is_featured]': true
    }
  })
  const { resData: resProducts } = useSwrInfinite({
    enable: true,
    API_URL: API_ROUTE.ORG_PRODUCTS(subdomain),
    params: {
      ...paramsProductsOrg,
      'limit': 20,
      // 'filter[is_featured]': true
    }
  })
  let data = resServices
  if (type === 'PRODUCT') data = resProducts

  const generatePath = () => {
    let path = 'dich-vu'
    switch (type) {
      case 'PRODUCT':
        return path = 'san-pham'
      case 'COMBO':
        return path = 'goi-dich-vu'
      default:
        return path
    }
  }

  return (
    <div className={style.container} ref={refSection} >
      <ul className={style.list_item}>
        {
          data.slice(0,18).map((item: Service) => (
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
      <div className={style.bottom}>
        <Link
          onClick={()=> scrollTop()}
          to={{ pathname: `${location.pathname}/${generatePath()}` }}
        >
          Xem them
        </Link>
      </div>
    </div>
  )
}