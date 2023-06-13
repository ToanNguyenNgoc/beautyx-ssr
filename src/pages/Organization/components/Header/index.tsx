/* eslint-disable react-hooks/exhaustive-deps */
import { SerProItem, XButton } from 'components/Layout'
import style from './header.module.css'
import icon from 'constants/icon'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import IStore from 'interface/IStore'
import { getTotal } from 'redux/cart'
import { Dialog } from '@mui/material'
import { AppContext, AppContextType, OrgContext, OrgContextType } from 'context'
import { debounce } from 'lodash'
import { useSwrInfinite } from 'hooks'
import API_ROUTE from 'api/_api'
import { paramsProductsOrg, paramsServicesOrg } from 'params-query'
import { Service } from 'interface'

export const Header = () => {
  const refHeader = useRef<HTMLDivElement>(null)
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const { USER } = useSelector((state: IStore) => state.USER)
  const { cartList, cartQuantity } = useSelector((state: any) => state.carts);
  useEffect(() => {
    dispatch(getTotal(USER?.id));
  }, [dispatch, cartList, USER]);
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (refHeader.current) {
      refHeader.current.style.backgroundColor = `rgb(250 250 250 / ${scrolled}%)`
    }
  })
  return (
    <div ref={refHeader} className={style.container} >
      <div className={style.left}>
        <XButton
          className={style.btn}
          icon={icon.chevronLeft}
          iconSize={20}
          onClick={() => history.goBack()}
        />
      </div>
      <div className={style.right}>
        <XButton
          className={style.btn}
          icon={icon.searchPurple}
          iconSize={20}
          onClick={() => setOpen(true)}
        />
        <XButton
          className={`${style.btn} ${style.btn_cart}`}
          icon={icon.cartPurpleBold}
          iconSize={20}
        >
          <span className={style.cart_quantity}>
            {cartQuantity > 10 ? '9+' : cartQuantity}
          </span>
        </XButton>
      </div>
      <Dialog open={open} fullScreen >
        {open && <Search close={() => setOpen(false)} />}
      </Dialog>
    </div>
  )
}
const Search = ({ close }: { close: () => void }) => {
  const { t } = useContext(AppContext) as AppContextType
  const { org } = useContext(OrgContext) as OrgContextType
  const [keyword, setKeyword] = useState({ v: '', k: '' })
  const onSetDebounce = useCallback(debounce((text) => setKeyword({ v: text, k: text }), 800), [])
  const onChange = (txt: string) => {
    setKeyword({ ...keyword, v: txt });
    onSetDebounce(txt)
  }
  const { resData: services, isValidating: loadSer } = useSwrInfinite({
    API_URL: API_ROUTE.ORG_SERVICES(org.id),
    enable: (keyword.k.length > 0 && org),
    params: { ...paramsServicesOrg, "filter[keyword]": keyword.k, "limit": 6 }
  })
  const { resData: products, isValidating: loadPro } = useSwrInfinite({
    API_URL: API_ROUTE.ORG_PRODUCTS(org.id),
    enable: (keyword.k.length > 0 && org),
    params: { ...paramsProductsOrg, "filter[keyword]": keyword.k, "limit": 6 }
  })
  return (
    <div className={style.search_cnt}>
      <div className={style.search_cnt_head}>
        <XButton
          className={style.btn}
          icon={icon.chevronLeft}
          iconSize={20}
          onClick={close}
        />
        <input
          className={style.search_input}
          placeholder='Tìm kiếm trong cửa hàng...'
          autoFocus
          value={keyword.v}
          onChange={(e) => onChange(e.target.value)}
        />
        <XButton
          onClick={() => setKeyword({ v: '', k: '' })}
          className={style.load_btn}
          icon={(loadPro || loadSer || keyword.k.length === 0) ? '' : icon.closeBlack}
          iconSize={20}
          loading={loadPro || loadSer}
        />
      </div>
      <div className={style.search_result}>
        {
          services.length > 0 &&
          <div className={style.section}>
            <div className={style.title}>
              {t('Mer_de.services')}
            </div>
            <ul className={style.result_list}>
              {
                services.map((item: Service) => (
                  <li key={item.id} className={style.result}>
                    <SerProItem item={item} type='SERVICE' changeStyle org={org} />
                  </li>
                ))
              }
            </ul>
          </div>
        }
        {
          products.length > 0 &&
          <div className={style.section}>
            <div className={style.title}>
              {t('Mer_de.products')}
            </div>
            <ul className={style.result_list}>
              {
                products.map((item: Service) => (
                  <li key={item.id} className={style.result}>
                    <SerProItem item={item} type='PRODUCT' changeStyle org={org} />
                  </li>
                ))
              }
            </ul>
          </div>
        }
      </div>
    </div>
  )
}