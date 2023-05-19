import { Container } from '@mui/material';
import style from './organization.module.css'
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDeviceMobile, useSwr } from 'hooks';
import API_ROUTE from 'api/_api';
import { IOrgMobaGalleries, IOrganization } from 'interface';
import { useGalleriesQuery } from 'redux-toolkit-query/hook-home';
import { Banner, Loading } from 'pages/Organization/components';
import { useContext } from 'react';
import { AppContext, AppContextType } from 'context/AppProvider';

function Organization() {
  const { t } = useContext(AppContext) as AppContextType
  const params = useParams()
  const location = useLocation()
  const IS_MB = useDeviceMobile()
  const { subdomain } = params as { subdomain: string }
  const { response: resOrg, error, isValidating: loadOrg } = useSwr(API_ROUTE.ORG(subdomain), subdomain)
  const { data, isLoading } = useGalleriesQuery(subdomain)
  const galleries: IOrgMobaGalleries[] = data ?? []
  const org: IOrganization = resOrg
  let tabs = [
    {
      open: org?.is_momo_ecommerce_enable,
      id: 1, title: "Deal Hot", path: 'deal-hot'
    },
    {
      open: org?.is_momo_ecommerce_enable,
      id: 2, title: t("Mer_de.services"), path: 'dich-vu'
    },
    {
      open: org?.is_momo_ecommerce_enable,
      id: 3, title: t("Mer_de.products"), path: 'san-pham'
    },
    {
      open: org?.is_momo_ecommerce_enable,
      id: 4, title: "Combo", path: 'combo'
    },
    {
      open: true,
      id: 5, title: IS_MB ? t("app.details") : t("pr.merchant_detail"), path: 'thong-tin'
    },
    {
      open: true,
      id: 7, title: t("Mer_de.galleries"), path: 'thu-vien'
    },
  ];
  const isActive = (path: string) => {
    const active = (`/cua-hang/${org.subdomain}/${path}` === location.pathname)
    return active
  }
  return (
    <div className={style.wrapper}>
      <Container>
        <div className={style.container}>
          {loadOrg && <Loading />}
          {
            org &&
            <>
              <Banner galleries={galleries} isLoading={isLoading} org={org} />
              <div className={style.tab_cnt}>
                {
                  tabs.filter(tab => tab.open === true).map(tab => (
                    <Link
                      style={isActive(tab.path) ? { color: "var(--purple)" } : {}}
                      key={tab.path}
                      to={{ pathname: `/cua-hang/${org.subdomain}/${tab.path}` }}
                      className={style.tab_item}
                      replace={true}
                    >
                      {tab.title}
                    </Link>
                  ))
                }
              </div>
            </>
          }
        </div>
      </Container>
    </div>
  );
}

export default Organization;