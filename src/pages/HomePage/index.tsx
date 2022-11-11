/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@mui/material";
import React, { useEffect } from "react";
import HomeOrgDistance from "./HomeOrgDistance";
import HomeRecomment from "./HomeRecomment";
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
import { Bottom, OpenApp } from 'components/Layout'
import { useDeviceMobile } from "utils";
import HomeBanner2 from "./HomeBanner2";
import HomeCate2 from "./HomeCate2";
import HomeTags2 from "./HomeTags2";
import './home-se.css'
import HomeTopic from "./HomeTopic";
import HomeProducts from "./HomeProducts";
import HomeDownApp from "./HomeDownApp";
import HomeWhyNot from "./HomeWhyNot";
export default function HomePage() {
    const IS_MB = useDeviceMobile()
    const banner_status = useSelector((state: any) => state.HOME.status);

    useEffect(() => {
        tracking.HOME_LOAD();
    }, [])



    return (
        <div className="homepage">
            <ExtraFlatForm />
            <Head changeStyle={IS_MB} />
            <div className="home_container_par">
                <Container>
                    {!IS_MB && <HomeCate2 />}
                    {
                        banner_status !== STATUS.SUCCESS ?
                            <LoadHomeBanner />
                            :
                            <>
                                <HomeBanner2 />
                                {IS_MB ? <HomeCate2 /> : <HomeTags2 />}
                            </>
                    }
                </Container>
            </div>
            <HomeDiscount />
            <Container>
                <HomeOrgDistance />
                <HomeTopic />
                <HomeProducts />
                <HomeDownApp />
                <HomeWhyNot />
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
