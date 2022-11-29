/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@mui/material";
import React, { useEffect, useRef } from "react";
import HomeOrgDistance from "./HomeOrgDistance";
import HomeRecomment from "./HomeRecomment";
import { useSelector } from "react-redux";

// ==== api tracking ====
import tracking from "../../api/trackApi";
import { STATUS } from "../../redux/status";
import HomeWatched from "./HomeWatched";
// import ExtraFlatForm from "rootComponents/extraFlatForm";
import Head from "features/Head";
import { LoadHomeBanner } from "components/LoadingSketion/LoadHome";
import HomeDiscount from "features/HomeDiscounts";
import { Bottom, OpenApp, PlashScreen } from "components/Layout";
import { useDeviceMobile, useElementOnScreen } from "hooks";
import HomeBanner2 from "./HomeBanner2";
import HomeCate2 from "./HomeCate2";
import HomeTags2 from "./HomeTags2";
import "./home-se.css";
import HomeTopic from "./HomeTopic";
import HomeProducts from "./HomeProducts";
import HomeDownApp from "./HomeDownApp";
import HomeWhyNot from "./HomeWhyNot";
import HomeProvince2 from "./HomeProvince2";
import HomePartners from "./HomePartners";
import HomeCate from "./HomeCate";
export default function HomePage() {
    const IS_MB = useDeviceMobile();
    const banner_status = useSelector((state: any) => state.HOME.status);
    useEffect(() => {
        tracking.HOME_LOAD();
    }, []);
    const refBanner = useRef<HTMLDivElement>(null)
    const options = {
        root: null,
        rootMargin: "-10px",
        threshold: 0.3,
    }
    const isVisible = useElementOnScreen(options, refBanner)
    const header = document.getElementById("header");
    const onScrollHome = () => {
        if (header) {
            if (!isVisible) {
                header.style.backgroundColor = 'var(--purple)'
            } else {
                header.style.backgroundColor = 'transparent'
            }
        }
    }
    return (
        <div onScroll={onScrollHome} className="homepage">
            {/* <ExtraFlatForm /> */}
            <Head changeStyle={IS_MB} />
            <div className="home_container_par">
                <Container>
                    <HomeCate />
                    {
                        banner_status !== STATUS.SUCCESS ?
                            <>
                                {IS_MB ? <PlashScreen /> : <LoadHomeBanner />}
                            </>
                            :
                            <>
                                <HomeBanner2 refBanner={refBanner} />
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
                <HomeProvince2 />
                <HomePartners />
            </Container>
            <Bottom />
            <OpenApp type="none" />
        </div>
    );
}
