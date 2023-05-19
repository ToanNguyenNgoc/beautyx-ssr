import { Container } from '@mui/material';
import style from './organization.module.css'
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDeviceMobile, useSwr } from 'hooks';
import API_ROUTE from 'api/_api';
import { IOrgMobaGalleries, IOrganization } from 'interface';
import { useGalleriesQuery } from 'redux-toolkit-query/hook-home';
import { Banner, Loading } from 'pages/Organization/components';
import { useContext, useEffect, useRef, useState } from 'react';
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
    // {
    //   open: true,
    //   id: 7, title: t("Mer_de.galleries"), path: 'thu-vien'
    // },
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
              <div className={style.tab_wrapper}>
                <div className={style.tab_cnt}>
                  {
                    tabs.filter(tab => tab.open === true).map(tab => (
                      <div
                        onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}
                        // style={isActive(tab.path) ? { color: "var(--purple)" } : {}}
                        key={tab.path}
                        // to={{ pathname: `/cua-hang/${org.subdomain}/${tab.path}` }}
                        className={style.tab_item}
                      // replace={true}
                      >
                        {tab.title}
                      </div>
                    ))
                  }
                </div>
              </div>
              <Body />
            </>
          }
        </div>
      </Container>
    </div>
  );
}
export default Organization;
const Body = () => {
  const [tab, setTab] = useState(1)
  const refDealHot = useRef<HTMLDivElement>(null)
  const refService = useRef<HTMLDivElement>(null)
  const refProduct = useRef<HTMLDivElement>(null)
  const refCombo = useRef<HTMLDivElement>(null)
  const refDetail = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleScroll = () => {
      if (
        refDealHot.current &&
        refService.current &&
        refProduct.current &&
        refCombo.current &&
        refDetail.current
      ) {
        const scrollY = window.scrollY + 90;
        const dealHotOffset = refDealHot.current.offsetTop;
        const serviceOffset = refService.current.offsetTop;
        const productOffset = refProduct.current.offsetTop;
        const comboOffset = refCombo.current.offsetTop;
        const detailOffset = refDetail.current.offsetTop;
        if (dealHotOffset < scrollY && scrollY < serviceOffset) {
          setTab(1);
        } else if (serviceOffset < scrollY && scrollY < productOffset) {
          setTab(2);
        } else if (productOffset < scrollY && scrollY < comboOffset) {
          setTab(3);
        } else if (comboOffset < scrollY && scrollY < detailOffset) {
          setTab(4);
        } else if (detailOffset < scrollY) {
          setTab(5);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  console.log(tab)
  return (
    <div className={style.body}>
      <div ref={refDealHot} className={style.body_section}>
        deal hot
      </div>
      <div ref={refService} className={style.body_section}>
        dịch vụ
      </div>
      <div ref={refProduct} className={style.body_section}>
        sản phẩm
      </div>
      <div ref={refCombo} className={style.body_section}>
        combo
      </div>
      <div ref={refDetail} className={style.body_section}>
        doanh nghiệp
      </div>
    </div>
  )
}