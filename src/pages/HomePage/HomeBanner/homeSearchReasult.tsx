import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Container } from '@mui/material';
import ExtraFlatForm from "../../../rootComponents/extraFlatForm";
import onErrorImg from "../../../utils/errorImg";
import { IServicePromo } from "../../../interface/servicePromo";
import './homeBannerSearchResult.css'
import Bottom from "../../../featuresMobile/Bottom";
import { useDeviceMobile } from "utils";
import HeadMobile from "features/HeadMobile";
import Head from "features/Head";
import Footer from "features/Footer";
import { SerProItem } from "components/Layout";


export default function HomeBannerResult() {
  const location: any = useLocation();
  const IS_MB = useDeviceMobile();
  const dataBanner = location.state;
  const apiBanner = location.state.url
  const [data, setData] = useState<any>({
    services: [],
    orgs: [],
    loading: true,
    page: 1,
    totalItem: 1
  })

  useEffect(() => {
    axios
      .get(apiBanner)
      .then((response: any) => {
        const res = response;
        setData({
          ...data,
          services: [...data.services, ...res.hits],
          loading: false,
          totalItem: data.total
        })
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.page])
  const onViewMore = () => {
    if (data.services.length < data.totalItem && data.services.length >= 15) {
      setData({
        ...data,
        page: data.page + 1
      })
    }
  }

  return (
    <>
      <ExtraFlatForm />
      {IS_MB ? <HeadMobile title={dataBanner.name} /> : <Head IN_HOME={false} />}
      <Container>
        <div className="landing-page">
          <div
            className="landing-page__hero-banner"
          >
            <img src={dataBanner.imageURL} onError={(e) => onErrorImg(e)} alt="" />
          </div>
          <Container className="landing-page__body">
            {
              data.loading
                ?
                'loading'
                :
                <ul className="landing-page__body__list-items">
                  {data.services.map((item: IServicePromo, index: number) => (
                    <li className="home-recomment__item" key={index}>
                      <SerProItem item={item} type="SERVICE" />
                    </li>
                  ))}
                </ul>
            }
          </Container>
        </div>
      </Container>
      <Footer />
      <Bottom />
    </>
  )
}