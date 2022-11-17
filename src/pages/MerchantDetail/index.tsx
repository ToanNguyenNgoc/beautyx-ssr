/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@mui/material";
import React, { useContext, useEffect } from "react";
import {
  Link,
  RouteComponentProps,
  Switch,
  useLocation,
  useParams,
  Redirect
} from "react-router-dom";
import "../../assets/styles/main.css";
import HeadOrg from "./components/HeadOrg";
import OrgDetail from "./components/OrgDetail";
import { OpenApp } from 'components/Layout'
import { useSwr, useDeviceMobile } from 'hooks'
import { IOrganization, IOrgMobaGalleries } from 'interface'
import { AppContext } from "context/AppProvider";
import LoadOrg from "components/LoadingSketion/LoadOrg";
import PageNotFound from "components/PageNotFound";
import HeadTitle from "features/HeadTitle";
import Head from "features/Head";

import "./style.css";
import { usePostAnalytics } from "./Functions";
import Footer from "features/Footer";
import {
  OrgProducts, OrgServices, OrgCombos,
  OrgInformation, OrgDealHot, OrgReviews, OrgGalleries
} from "./components/OrgPages";
import API_ROUTE from "api/_api";
import { useDispatch } from "react-redux";
import { onSetOrgDetail } from "redux/org/orgSlice";


function MerchantDetail() {
  const { t } = useContext(AppContext)
  const IS_MB = useDeviceMobile()
  const location: any = useLocation()
  const params: any = useParams()
  const dispatch = useDispatch()
  const { subdomain } = params

  const { response, error, isValidating } = useSwr(`/organizations/${subdomain}`, subdomain)
  const { responseArray } = useSwr(
    API_ROUTE.GALLERIES_ORG_ID(subdomain),
    subdomain,
    { "include": "images|videos" }
  )
  const galleries: IOrgMobaGalleries[] = responseArray ?? []

  const org: IOrganization = response

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
      id: 6, title: `${t("Mer_de.feedback")}`, path: 'phan-hoi'
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
  useEffect(() => {
    dispatch(onSetOrgDetail(org))
  }, [org])


  return (
    <div className="mb-cnt">
      {!org && isValidating && <LoadOrg />}
      {error && <PageNotFound />}
      <HeadTitle title={org?.name ? org.name : "Đang tải..."} />
      {IS_MB && org ? <HeadOrg org={org} isShowSearch={true} /> : <Head />}
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
              <ChildPage org={org} galleries={galleries} />
            </div>
          </Container>
        </>
      )}
      <Footer />
      {org && <OpenApp type="org" org_id={org.id} />}
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
      path: `/cua-hang/:id/phan-hoi`,
      component: <OrgReviews org={org} />
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
