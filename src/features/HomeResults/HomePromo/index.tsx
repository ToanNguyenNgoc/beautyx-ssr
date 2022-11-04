/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Container } from "@mui/material";
import "../home-result.css";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { SerProItem, BackTopButton } from "components/Layout";
import { AppContext } from "context/AppProvider";
import { useDeviceMobile } from "utils";
import { extraParamsUrl } from "utils/extraParamsUrl";
import { STATUS } from "redux/status";
import { fetchAsyncServicesPromo } from "redux/home/homePageSlice";
import { IServicePromo } from "interface/servicePromo";
import { blockService } from "utils/blockCardItem";
import HeadMobile from "features/HeadMobile";
import Head from "features/Head";
import HeadTitle from "features/HeadTitle";
import HomeTitleSection from "pages/HomePage/HomeTitleSection/index";
import { LoadingServices } from "components/LoadingSketion";
import LoadingMore from "components/LoadingMore";
import Footer from "features/Footer";

function HomePromo(props: any) {
    const { t } = useContext(AppContext);
    const IS_MB = useDeviceMobile();
    const { SERVICES_PROMO } = useSelector((state: any) => state.HOME_PAGE);
    const dispatch = useDispatch();
    const { services, status, page, totalItem } = SERVICES_PROMO
    const params: any = extraParamsUrl();

    const callServicesPromo = () => {
        if (status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncServicesPromo({
                page: 1,
                sort: params?.sort
            }))
        }
    }

    useEffect(() => {
        callServicesPromo()
    }, [])

    const onViewMore = () => {
        if (services.length >= 15 && services.length < totalItem) {
            dispatch(fetchAsyncServicesPromo({
                page: page + 1,
                sort: params?.sort
            }))
        }
    }
    const servicesList = services.map((i: IServicePromo) => {
        return {
            ...i,
            is_block: blockService(i.price, i.special_price)
        }
    })

    return (
        <>
            {
                IS_MB ?
                    <HeadMobile
                        title="TOP Deal khủng"
                        prevUrl="/homepage"
                    />
                    :
                    <Head />
            }
            <HeadTitle title={`${t("home_2.hot_beauty_deal")}`} />
            <Container>
                {
                    !IS_MB &&
                    <div className="home-result-ser-cnt">
                        <HomeTitleSection
                            title={`${t("home_2.hot_beauty_deal")}`}
                        />
                    </div>
                }
                <div className="home-promo-ser home-promo-ser__mb">
                    {(status !== STATUS.SUCCESS && page === 1) && <LoadingServices />}
                    <InfiniteScroll
                        next={onViewMore}
                        hasMore={true}
                        loader={<></>}
                        dataLength={services.length}
                    >
                        <ul className="ser-list ser-list__mb home-result__cus">
                            {servicesList
                                .filter((i: any) => i.is_block === false)
                                .map(
                                    (item: IServicePromo, index: number) => (
                                        <li
                                            key={index}
                                            className="ser-list-item__mb ser-item__cus"
                                        >
                                            <SerProItem changeStyle={IS_MB} item={item} type="SERVICE" />
                                        </li>
                                    )
                                )}
                        </ul>
                    </InfiniteScroll>
                </div>
                {services.length === totalItem ? <></> : <LoadingMore />}
                <div style={{ marginBottom: "24px" }}>
                </div>
            </Container>
            <BackTopButton />
            <Footer />
        </>
    );
}

export default HomePromo;

