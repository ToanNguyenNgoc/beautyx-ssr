import { useContext } from 'react'
import style from './deal.module.css'
import { OrgContext, OrgContextType } from 'context'
import { IITEMS_DISCOUNT, Product, Service } from 'interface'
import DiscountItem from 'pages/HomePage/HomeDiscounts/DiscountItem'
import { SerProItem } from 'components/Layout'
import { Container, useMediaQuery } from '@mui/material'

export const Deal = () => {
  const mb = useMediaQuery('(max-width:767px)')
  const {
    org,
    discounts,
    productsSpecial,
    servicesSpecial
  } = useContext(OrgContext) as OrgContextType
  return (
    <div className={style.container}>
      <Container>
        <div className={style.section_item_discount}>
          <ul className={style.discount_list}>
            {discounts.map((discount: any, index: number) => (
              <li key={index} className={style.discount_item}>
                {discount.items.map(
                  (item: IITEMS_DISCOUNT, i: number) => (
                    <DiscountItem
                      key={i}
                      discountItem={item}
                      discountPar={discount}
                    />
                  )
                )}
              </li>
            ))}
          </ul>
        </div>
        {
          servicesSpecial.length > 0 &&
          <div className={style.section_item}>
            <div className={style.section_item_title}>
              Dịch vụ giảm giá
            </div>
            <ul className={style.special_list}>
              {
                servicesSpecial.map((item: Service) => (
                  <li key={item.id} className={style.special_list_item}>
                    <SerProItem
                      org={org}
                      item={item}
                      type="SERVICE"
                      changeStyle={mb}
                    />
                  </li>
                ))
              }
            </ul>
          </div>
        }
        {
          productsSpecial.length > 0 &&
          <div className={style.section_item}>
            <div className={style.section_item_title}>
              Sản phẩm giảm giá
            </div>
            <ul className={style.special_list}>
              {
                productsSpecial.map((item: Product) => (
                  <li key={item.id} className={style.special_list_item}>
                    <SerProItem
                      org={org}
                      item={item}
                      type='PRODUCT'
                      changeStyle={mb}
                    />
                  </li>
                ))
              }
            </ul>
          </div>
        }
      </Container>
    </div>
  )
}