/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@mui/material';
import { Banner, Deal, Loading, More, ServiceSection, Tab } from './components';
import { useContext, useRef } from 'react';
import { OrgContext, OrgContextType } from 'context';
import style from './organization.module.css'

function Home() {
  const { load } = useContext(OrgContext) as OrgContextType
  return (
    <div className={style.wrapper}>
      {/* <Container> */}
        <div className={style.container}>
          {
            load ?
             <Container> <Loading /></Container>
              :
              <>
               <Container> <Banner /></Container>
                <Body />
                <More/>
              </>
          }
        </div>
      {/* </Container> */}
    </div>
  );
}
export default Home;
const Body = () => {
  const { org } = useContext(OrgContext) as OrgContextType
  const refDealHot = useRef<HTMLDivElement>(null)
  const refService = useRef<HTMLDivElement>(null)
  const refProduct = useRef<HTMLDivElement>(null)
  const refCombo = useRef<HTMLDivElement>(null)
  const refDetail = useRef<HTMLDivElement>(null)
  return (
    <>
      <Tab
        refDealHot={refDealHot} refService={refService} refProduct={refProduct}
        refCombo={refCombo} refDetail={refDetail}
      />
      <div className={style.body}>
        {
          org.is_momo_ecommerce_enable &&
          <>
            <div ref={refDealHot} className={style.body_section}>
              <Deal />
            </div>
            <div ref={refService} className={style.body_section}>
              <ServiceSection type='SERVICE' />
            </div>
            <div ref={refProduct} className={style.body_section}>
              <ServiceSection type='PRODUCT' />
            </div>
            <div ref={refCombo} className={style.body_section}>
            <ServiceSection type='COMBO' />
            </div>
          </>
        }
        <div ref={refDetail} className={style.body_section}>
          doanh nghiệp
        </div>
      </div>
    </>
  )
}