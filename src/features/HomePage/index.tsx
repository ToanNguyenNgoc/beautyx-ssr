/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@mui/material";
import React, { useEffect } from "react";
import Bottom from "../../featuresMobile/Bottom";
import ExtraFlatForm from "../../rootComponents/extraFlatForm";
import useFullScreen from "../../utils/useDeviceMobile";
import Footer from "../Footer";
import Head from "../Head";
import HeadHomeMobile from "../HeadMobile/HeadHomeMobile";
import HomeDiscount from "../HomeDiscounts";
import HomeBanner from "./HomeBanner";
import HomeFavorite from "./HomeFavorite";
import HomeHotDeal from "./HomeHotDeal";
import HomeCate from "./HomeCate";
// import HomeHotTrend from "./HomeHotTrend";
import HomeRecomment from "./HomeRecomment";
import HomeTopService from "./HomeTopService";
import HomeTags from "./HomeTags";
import HomeProvince from "./HomeProvince";
// import FooterCate from "../FooterCates";
import { useDispatch, useSelector } from "react-redux";
import { onResetFilter } from "../../redux/filter/filterSlice";
import { LoadHomeBanner } from "../../components/LoadingSketion/LoadHome";
// import Header from "../../components/Header";

// ==== api tracking ====
import tracking from "../../api/trackApi";
import { STATUS } from "../../redux/status";
// end
import {analytics} from "../../firebase";
// import HomeTagsProducts from "./Components/HomeTagsList/HomeTagsProducts";
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
            {IS_MB ? <HeadHomeMobile /> : <Head IN_HOME={true} />}
            {/* <HomeTagsProducts /> */}
            <Container>
                <HomeCate/>
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
                {/* {IS_MB && <HomeHotTrend />} */}
                <HomeFavorite />
                <HomeProvince />
            </Container>
            {/* <FooterCate/> */}
            <Footer />
            <Bottom />
        </div>
    );
}
