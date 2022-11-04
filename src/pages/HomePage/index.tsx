/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@mui/material";
import React, { useEffect } from "react";
import HomeBanner from "./HomeBanner";
import HomeOrgDistance from "./HomeOrgDistance";
import HomeHotDeal from "./HomeHotDeal";
import HomeCate from "./HomeCate";
import HomeRecomment from "./HomeRecomment";
import HomeTopService from "./HomeTopService";
import HomeTags from "./HomeTags";
import HomeProvince from "./HomeProvince";
import { useSelector } from "react-redux";

// ==== api tracking ====
import tracking from "../../api/trackApi";
import { STATUS } from "../../redux/status";
import HomeWatched from "./HomeWatched";
import ExtraFlatForm from "rootComponents/extraFlatForm";
import Head from "features/Head";
import { LoadHomeBanner } from "components/LoadingSketion/LoadHome";
import HomeDiscount from "features/HomeDiscounts";
import Footer from "features/Footer";
import Bottom from "featuresMobile/Bottom";
import { OpenApp } from 'components/Layout'
import { useDeviceMobile } from "utils";
export default function HomePage() {
    const IS_MB = useDeviceMobile()
    const banner_status = useSelector((state: any) => state.HOME.status);

    useEffect(() => {
        tracking.HOME_LOAD();
    }, [])



    return (
        <div className="homepage">
            <ExtraFlatForm />
            <Head changeStyle={false} />
            <Container>
                <HomeCate />
                {
                    banner_status !== STATUS.SUCCESS ?
                        <LoadHomeBanner />
                        :
                        <>
                            <HomeBanner />
                            <HomeTags />
                        </>
                }
            </Container>
            <HomeDiscount />
            <Container>
                <HomeOrgDistance />
                <HomeHotDeal />
                <HomeTopService />
                <HomeRecomment />
                <HomeWatched />
                <HomeProvince />
            </Container>
            <Footer />
            <Bottom />
            <OpenApp type="none" />
        </div>
    );
}
