import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress, Container } from '@mui/material';
import ExtraFlatForm from "../../../rootComponents/extraFlatForm";
import { EXTRA_FLAT_FORM } from "../../../api/extraFlatForm";
import onErrorImg from "../../../utils/errorImg";
import { IServicePromo } from "../../../interface/servicePromo";
import ServicePromoItem from "../../ViewItemCommon/ServicePromoItem";
import icon from "../../../constants/icon";
import './homeBannerSearchResult.css'
import Footer from "../../Footer";
import Bottom from "../../../featuresMobile/Bottom";
import Head from "../../Head";
import useFullScreen from "../../../utils/useDeviceMobile";
import HeadMobile from '../../HeadMobile/index';


export default function HomeBannerResult() {
  const location: any = useLocation();
  const IS_MB = useFullScreen();
  const dataBanner = location.state;
  const apiBanner = location.state.url;
  const history = useHistory();
  const FLAT_FORM = EXTRA_FLAT_FORM();
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
      .then((response) => {
        const res = response;
        setData({
          ...data,
          services: [...data.services, ...res.data.hits],
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
  // console.log(data, apiBanner);

  return (
    <>
      <ExtraFlatForm />
      {IS_MB ? <HeadMobile title={dataBanner.name} /> : <Head IN_HOME={false} />}
      <Container>
        <div className="landing-page">
          {/* <button
          onClick={() => history.goBack()}
          className="landing-page__back-btn"
        >
          <img src={icon.backWhite} alt="" />
        </button> */}
          <div
            className="landing-page__hero-banner"
          >
            <img src={dataBanner.imageURL} onError={(e) => onErrorImg(e)} alt="" />
          </div>
          <Container className="landing-page__body">
            {/* <div className="landing-page__body__title">
            {dataBanner.name}
          </div> */}
            {
              data.loading
                ?
                'loading'
                :
                <ul className="landing-page__body__list-items">
                  {data.services.map((item: IServicePromo, index: number) => (
                    <li className="home-recomment__item" key={index}>
                      <ServicePromoItem service={item} />
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