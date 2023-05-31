/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@mui/material";
import React, { useContext } from "react";
import {
  Link,
  RouteComponentProps,
  Switch,
  useLocation,
  useParams,
  Redirect
} from "react-router-dom";
import HeadOrg from "./components/HeadOrg";
import OrgDetail from "./components/OrgDetail";
import { BackTopButton, OpenApp, Seo } from 'components/Layout'
import { useSwr, useDeviceMobile } from 'hooks'
import { IOrganization, IOrgMobaGalleries } from 'interface'
import { AppContext } from "context/AppProvider";
import LoadOrg from "components/LoadingSketion/LoadOrg";
import PageNotFound from "components/PageNotFound";
import HeadTitle from "features/HeadTitle";
import "./style.css";
import { usePostAnalytics } from "./Functions";
import {
  OrgProducts, OrgServices, OrgCombos,
  OrgInformation, OrgDealHot, OrgGalleries
} from "./components/OrgPages";
import { useGalleriesQuery } from "redux-toolkit-query/hook-home";
import API_ROUTE from "api/_api";


function MerchantDetail() {
  const { t } = useContext(AppContext) as any
  const IS_MB = useDeviceMobile()
  const location: any = useLocation()
  const params: any = useParams()
  const { subdomain } = params

  const { response, error, isValidating } = useSwr(API_ROUTE.ORG(subdomain), subdomain)

  const org: IOrganization = response
  const { data } = useGalleriesQuery(subdomain)
  const galleries: IOrgMobaGalleries[] = data ?? []

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
  usePostAnalytics(org)

  return (
    <div className="mb-cnt">
      {!org && isValidating && <LoadOrg />}
      {error && <PageNotFound />}
      {org && <Seo imageCover={org.image_url} title={org.name} content={org.description} />}
      <HeadTitle title={org?.name ? org.name : "Đang tải..."} />
      {IS_MB && org && <HeadOrg org={org} isShowSearch={true} />}
      {org && (
        <>
          <OrgDetail
            org={org}
            galleries={galleries}
          />
          <div className="org_tab_link_cnt">
            <Container>
              <div className="org_tab_list">
                {
                  tabs
                    .filter(tab => tab.open === true)
                    .map(tab => (
                      <Link
                        style={isActive(tab.path) ? {
                          color: "var(--purple)", borderBottom: "solid 1px var(--purple)"
                        } : {}}
                        key={tab.path}
                        to={{ pathname: `/cua-hang/${org.subdomain}/${tab.path}` }}
                        className="org_tab_link_item"
                        replace={true}
                      >
                        {tab.title}
                      </Link>
                    ))
                }
              </div>
            </Container>
          </div>
          <Container>
            <div className="org_tab_cnt">
              {org?.id && <ChildPage org={org} galleries={galleries} />}
            </div>
          </Container>
        </>
      )}
      {org && <OpenApp type="org" org_id={org.id} />}
      <BackTopButton/>
    </div>
  );
}

export default MerchantDetail;

interface ChildPageProps {
  org: IOrganization, galleries: IOrgMobaGalleries[]
}

const ChildPage = (props: ChildPageProps) => {
  const { org, galleries } = props;
  const RouterPage = (
    props: { pageComponent: JSX.Element } & RouteComponentProps
  ) => props.pageComponent;
  const routes = [
    {
      path: `/cua-hang/:id/deal-hot`,
      component: <OrgDealHot org={org} />
    },
    {
      path: `/cua-hang/:id/dich-vu`,
      component: <OrgServices org={org} />
    },
    {
      path: `/cua-hang/:id/san-pham`,
      component: <OrgProducts org={org} />
    },
    {
      path: `/cua-hang/:id/combo`,
      component: <OrgCombos org={org} />
    },
    {
      path: `/cua-hang/:id/thong-tin`,
      component: <OrgInformation org={org} />
    },
    {
      path: `/cua-hang/:id/thu-vien`,
      component: <OrgGalleries galleries={galleries} />
    },
  ]
  return (
    <Switch>
      <Redirect exact from="/cua-hang/:id"
        to={org.is_momo_ecommerce_enable ? `/cua-hang/:id/deal-hot` : `/cua-hang/:id/thong-tin`} />
      {routes.map((item, index) => (
        <RouterPage
          key={index}
          path={item.path}
          pageComponent={item.component}
        />
      ))}
    </Switch>
  )
}
