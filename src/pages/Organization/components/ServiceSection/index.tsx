import API_ROUTE from "api/_api"
import { AppContext, AppContextType, OrgContext, OrgContextType } from "context"
import { useSwrInfinite } from "hooks"
import { paramsServicesOrg, paramsProductsOrg } from "params-query"
import { useContext } from "react"
import style from './ser-sec.module.css'
import { Service } from "interface"
import { SerProItem } from "components/Layout"
import { Link, useLocation } from "react-router-dom"
import { scrollTop } from "utils"
import { Container, useMediaQuery } from "@mui/material"
import icon from "constants/icon"

export const ServiceSection = ({ type }: { type: 'SERVICE' | 'PRODUCT' | 'COMBO' }) => {
  const { t } = useContext(AppContext) as AppContextType
  const mb = useMediaQuery('(max-width:767px)')
  const location = useLocation()
  const { subdomain, org } = useContext(OrgContext) as OrgContextType
  const { resData: resServices } = useSwrInfinite({
    enable: true,
    API_URL: API_ROUTE.ORG_SERVICES(subdomain),
    params: {
      ...paramsServicesOrg,
      'limit': mb ? 8 : 15,
      // 'filter[is_featured]': true
    }
  })
  const { resData: resProducts } = useSwrInfinite({
    enable: true,
    API_URL: API_ROUTE.ORG_PRODUCTS(subdomain),
    params: {
      ...paramsProductsOrg,
      'limit': mb ? 8 : 15,
      // 'filter[is_featured]': true
    }
  })
  const { resData: resCombos } = useSwrInfinite({
    API_URL: API_ROUTE.ORG_COMBOS(org?.id),
    enable: org,
    params: {
      "filter[is_momo_ecommerce_enable]": true,
    }
  })
  let data = resServices
  if (type === 'PRODUCT') data = resProducts
  if (type === 'COMBO') data = resCombos

  const generatePath = () => {
    let sectionTitle = {
      path: 'dich-vu',
      title: t('Mer_de.services')
    }
    switch (type) {
      case 'PRODUCT':
        return sectionTitle = { path: 'san-pham', title: t('Mer_de.products') }
      case 'COMBO':
        return sectionTitle = { path: 'goi-dich-vu', title: t('Mer_de.combo') }
      default:
        return sectionTitle
    }
  }

  return (
    <Container>
      {
        data.length > 0 &&
        <div className={style.container}>
          <div className={style.title}>
            {generatePath().title}
          </div>
          <ul className={style.list_item}>
            {
              data.slice(0, 12).map((item: Service) => (
                <li key={item.id} className={style.item}>
                  <SerProItem
                    org={org}
                    item={item}
                    type={type}
                    changeStyle={mb}
                  />
                </li>
              ))
            }
          </ul>
          {
            data.length >= (mb ? 8 : 12) &&
            <div className={style.bottom}>
              <Link
                onClick={() => scrollTop()}
                to={{ pathname: `${location.pathname}/${generatePath().path}` }}
              >
                {t('Mer_de.view_more')}
                <img src={icon.ArrowDownWhite} alt="" />
              </Link>
            </div>
          }
        </div>
      }
    </Container>
  )
}