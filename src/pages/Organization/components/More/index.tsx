/* eslint-disable eqeqeq */
import { Link, RouteComponentProps, Switch, useLocation } from 'react-router-dom'
import style from './more.module.css'
import { Container, Dialog, useMediaQuery } from '@mui/material'
import { useSwrInfinite } from 'hooks'
import API_ROUTE from 'api/_api'
import { useContext } from 'react'
import { AppContext, AppContextType, OrgContext, OrgContextType } from 'context'
import { Category, CategoryService, Product, Service } from 'interface'
import { SerProItem } from 'components/Layout'
import InfiniteScroll from 'react-infinite-scroll-component'
import { paramProductCatesOrg, paramServiceCatesOrg, paramsProductsOrg, paramsServicesOrg } from 'params-query'
import queryString from "query-string";
import { LoadGrid } from 'components/LoadingSketion'

export const More = () => {
  const path = ['dich-vu', 'san-pham', 'goi-dich-vu']
  const { t } = useContext(AppContext) as AppContextType
  const { subdomain } = useContext(OrgContext) as OrgContextType
  const location = useLocation()
  const pathArr = location.pathname.split('/')
  const currTab = pathArr[3]
  const open = pathArr.some(r => path.includes(r)) ? true : false
  const tabs = [
    {
      id: 1, title: t("Mer_de.services"), path: 'dich-vu'
    },
    {
      id: 2, title: t("Mer_de.products"), path: 'san-pham'
    },
    {
      id: 3, title: "Combo", path: 'goi-dich-vu'
    },
  ]
  return (
    open ?
      <Dialog
        open={open}
        fullScreen
      >
        <div className={style.container}>
          <div className={style.head}>
            <Container>
              <div className={style.tab_container}>
                {
                  tabs.map(tab => (
                    <Link
                      key={tab.id} className={tab.path === currTab ? style.tab_act : ''}
                      to={{ pathname: `/cua-hang/${subdomain}/${tab.path}` }}
                    >
                      {tab.title}
                    </Link>
                  ))
                }
              </div>
            </Container>
          </div>
          <Container>
            <ChildPage />
          </Container>
        </div>
      </Dialog>
      :
      <></>
  )
}

const ChildPage = () => {
  const RouterPage = (
    props: { pageComponent: JSX.Element } & RouteComponentProps
  ) => props.pageComponent;
  const routes = [
    {
      path: `/cua-hang/:id/dich-vu`,
      component: <ServicePage type='SERVICE' />
    },
    {
      path: `/cua-hang/:id/san-pham`,
      component: <ServicePage type='PRODUCT' />
    },
    {
      path: `/cua-hang/:id/goi-dich-vu`,
      component: <ServicePage type='COMBO' />
    },
  ]
  return (
    <Switch>
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

interface Page {
  type: 'SERVICE' | 'PRODUCT' | 'COMBO'
}
type CateType = CategoryService & Category

const ServicePage = ({ type }: Page) => {
  const location = useLocation()
  const mb = useMediaQuery('(max-width:767px)')
  const { subdomain, org } = useContext(OrgContext) as OrgContextType
  const queryParams = queryString.parse(location.search)
  //---
  let API = {
    url_cate: API_ROUTE.SERVICE_CATES_ORG(org.id),
    url: API_ROUTE.ORG_SERVICES(subdomain),
    params: {
      ...paramsServicesOrg,
      "filter[service_group_id]": queryParams.cate_id,
    },
    paramsCate: paramServiceCatesOrg
  } as any
  if (type == 'PRODUCT') {
    API = {
      url_cate: API_ROUTE.PRODUCT_CATES_ORG(org.id),
      url: API_ROUTE.ORG_PRODUCTS(org?.id),
      params: {
        ...paramsProductsOrg,
        "filter[product_category_id]": queryParams.cate_id,
      },
      paramsCate: paramProductCatesOrg
    }
  }
  //--
  const { resData: resCates } = useSwrInfinite({
    API_URL: API.url_cate,
    enable: org,
    params: API.paramsCate
  })
  const categories: CateType[] = [
    { id: 0, name: 'Tất cả', services_count: 1 },
    ...resCates?.filter((i: CateType) => (i.services_count > 0 || i.products_count > 0))
  ]

  //---
  const { resData, onLoadMore, totalItem } = useSwrInfinite({
    enable: true,
    API_URL: API.url,
    params: API.params
  })
  const cate_id = queryParams.cate_id ?? 0
  return (
    <div className={style.page_container}>
      <div className={style.left}>
        <ul className={style.cate_list}>
          {
            categories?.map(item => (
              <li key={item.id} className={style.cate_item}>
                <Link
                  to={{
                    pathname: location.pathname,
                    search: item.id === 0 ? '' : `cate_id=${item.id}`
                  }}
                  replace
                  className={cate_id == item.id ? `${style.cate_link} ${style.cate_link_act}` : style.cate_link}
                >
                  {item.name}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
      <div className={style.right}>
        <InfiniteScroll
          height={'calc(100dvh - 90px)'}
          dataLength={resData.length}
          hasMore={true}
          next={onLoadMore}
          loader={<></>}
        >
          <ul className={style.list}>
            {
              resData.map((item: Service & Product, index: number) => (
                <li
                  key={index} className={style.item}
                >
                  <SerProItem
                    changeStyle={mb}
                    type={type} item={item} org={org}
                  />
                </li>
              ))
            }
          </ul>
          {resData.length < totalItem && <LoadGrid grid={mb ? 1 : 5} item_count={10} />}
        </InfiniteScroll>
      </div>
    </div>
  )
}