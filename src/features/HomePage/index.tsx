/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@mui/material";
import React, { useEffect } from "react";
import Bottom from "../../featuresMobile/Bottom";
import ExtraFlatForm from "../../rootComponents/extraFlatForm";
import useFullScreen from "../../utils/useDeviceMobile";
import Footer from "../Footer";
import Head from "../Head";
import HomeDiscount from "../HomeDiscounts";
import HomeBanner from "./HomeBanner";
import HomeFavorite from "./HomeFavorite";
import HomeHotDeal from "./HomeHotDeal";
import HomeCate from "./HomeCate";
import HomeRecomment from "./HomeRecomment";
import HomeTopService from "./HomeTopService";
import HomeTags from "./HomeTags";
import HomeProvince from "./HomeProvince";
import { useDispatch, useSelector } from "react-redux";
import { onResetFilter } from "../../redux/filter/filterSlice";
import { LoadHomeBanner } from "../../components/LoadingSketion/LoadHome";

// ==== api tracking ====
import tracking from "../../api/trackApi";
import { STATUS } from "../../redux/status";
import HomeWatched from "./HomeWatched";
export default function HomePage() {
    const IS_MB = useFullScreen();
    const dispatch = useDispatch();
    const banner_status = useSelector((state: any) => state.HOME.status);

    useEffect(() => {
        tracking.HOME_LOAD();
        dispatch(onResetFilter());
    }, [])



    return (
        <div className="homepage">
            <ExtraFlatForm />
            <Head IN_HOME={true} />
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
                <HomeHotDeal />
                <HomeTopService />
                <HomeRecomment />
                <HomeFavorite />
                <HomeWatched />
                <HomeProvince />
            </Container>
            <Footer />
            <Bottom />
        </div>
    );
}
