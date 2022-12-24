/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@mui/material";
import React, { useEffect } from "react";
import HomeOrgDistance from "./HomeOrgDistance";
import { useSelector } from "react-redux";
import tracking from "../../api/trackApi";
import { STATUS } from "../../redux/status";
import { LoadHomeBanner } from "components/LoadingSketion/LoadHome";
import HomeDiscount from "pages/HomeDiscounts";
import { OpenApp, PlashScreen } from "components/Layout";
import { useDeviceMobile } from "hooks";
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
import HomeRecommend from "./HomeRecommend";


export default function HomePage() {
    const IS_MB = useDeviceMobile();
    const banner_status = useSelector((state: any) => state.HOME.status);
    useEffect(() => {
        tracking.HOME_LOAD();
    }, []);
   
    
    return (
        <>
            <div className="homepage">
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
                                    <HomeBanner2/>
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
                    <HomeRecommend />
                    <HomeProvince2 />
                    <HomePartners />
                </Container>
                <OpenApp type="none" />
            </div>
        </>
    );
}
