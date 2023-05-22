/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useContext, useEffect } from 'react'
import style from '../../organization.module.css'
import { AppContext, AppContextType } from 'context/AppProvider'
import { useHistory, useLocation } from 'react-router-dom'
import { OrgContext, OrgContextType } from 'context'

interface TabProps {
  refDealHot: RefObject<HTMLDivElement>
  refService: RefObject<HTMLDivElement>
  refProduct: RefObject<HTMLDivElement>
  refCombo: RefObject<HTMLDivElement>
  refDetail: RefObject<HTMLDivElement>
}

export const Tab = ({ refDealHot, refService, refProduct, refCombo, refDetail }: TabProps) => {
  const { t } = useContext(AppContext) as AppContextType
  const { org } = useContext(OrgContext) as OrgContextType
  const location = useLocation()
  const childPath = location.pathname.split('/')[3]
  const history = useHistory()
  const mrTop = 88
  let tabs = [
    {
      open: org?.is_momo_ecommerce_enable,
      id: 1, title: "Deal Hot", path: 'deal-hot',
      ref: refDealHot,
    },
    {
      open: org?.is_momo_ecommerce_enable,
      id: 2, title: t("Mer_de.services"), path: 'dich-vu',
      ref: refService,
    },
    {
      open: org?.is_momo_ecommerce_enable,
      id: 3, title: t("Mer_de.products"), path: 'san-pham',
      ref: refProduct
    },
    {
      open: org?.is_momo_ecommerce_enable,
      id: 4, title: "Combo", path: 'combo',
      ref: refCombo
    },
    {
      open: true,
      id: 5, title: t("pr.merchant_detail"), path: 'thong-tin',
      ref: refDetail
    },
  ]
  // useEffect(() => {
  //   if (
  //     childPath &&
  //     refDealHot.current &&
  //     refService.current &&
  //     refProduct.current &&
  //     refCombo.current &&
  //     refDetail.current
  //   ) {
  //     switch (childPath) {
  //       case 'deal-hot':
  //         window.scrollTo({ top: refDealHot.current?.offsetTop - mrTop, behavior: 'smooth' })
  //         break;
  //       case 'dich-vu':
  //         window.scrollTo({ top: refService.current?.offsetTop - mrTop, behavior: 'smooth' })
  //         break;
  //       case 'san-pham':
  //         window.scrollTo({ top: refProduct.current?.offsetTop - mrTop, behavior: 'smooth' })
  //         break;
  //       case 'combo':
  //         window.scrollTo({ top: refCombo.current?.offsetTop - mrTop, behavior: 'smooth' })
  //         break;
  //       case 'thong-tin':
  //         window.scrollTo({ top: refDetail.current?.offsetTop - mrTop, behavior: 'smooth' })
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }, [])
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
        if (scrollY < 500) {
          history.replace(`/cua-hang/${org.subdomain}`)
        } else if (dealHotOffset < scrollY && scrollY < serviceOffset) {
          history.replace(`/cua-hang/${org.subdomain}/deal-hot`)
        } else if (serviceOffset < scrollY && scrollY < productOffset) {
          history.replace(`/cua-hang/${org.subdomain}/dich-vu`)
        } else if (productOffset < scrollY && scrollY < comboOffset) {
          history.replace(`/cua-hang/${org.subdomain}/san-pham`)
        } else if (comboOffset < scrollY && scrollY < detailOffset) {
          history.replace(`/cua-hang/${org.subdomain}/combo`)
        } else if (detailOffset < scrollY) {
          history.replace(`/cua-hang/${org.subdomain}/thong-tin`)
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className={style.tab_wrapper}>
      <div className={style.tab_cnt}>
        {
          tabs.filter(tab => tab.open === true).map(tab => (
            <div
              style={tab.path === childPath ? { color: 'var(--purple)' } : {}}
              key={tab.path}
              className={style.tab_item}
              onClick={() => tab.ref.current && window.scrollTo({
                top: tab.ref?.current.offsetTop - mrTop,
                behavior: 'smooth'
              })}
            >
              {tab.title}
            </div>
          ))
        }
      </div>
    </div>
  )
}