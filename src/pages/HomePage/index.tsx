/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@mui/material";
import { useEffect } from "react";
import HomeOrgDistance from "./HomeOrgDistance";
import { useSelector } from "react-redux";
import tracking from "api/trackApi";
import { STATUS } from "redux/status";
import { LoadHomeBanner } from "components/LoadingSketion/LoadHome";
import HomeDiscount from "pages/HomePage/HomeDiscounts";
import { OpenApp, PlashScreen } from "components/Layout";
import { useDeviceMobile } from "hooks";
import HomeBanner2 from "./HomeBanner2";
import HomeCate2 from "./HomeCate2";
import HomeTags2 from "./HomeTags2";
import HomeTopic from "./HomeTopic";
import HomeProducts from "./HomeProducts";
import HomeDownApp from "./HomeDownApp";
import HomeWhyNot from "./HomeWhyNot";
import HomePartners from "./HomePartners";
import HomeCate from "./HomeCate";
// import HomeRecommend from "./HomeRecommend";
import HomeProvince from "./HomeProvince";
import style from "./home.module.css";
import HomeCurrentLocation from "./HomeCurrentLocation";
// import HomeTrends from "./HomeTrends";


export default function HomePage() {
    const IS_MB = useDeviceMobile();
    const [banner_status] = useSelector((state: any) => [state.HOME.status, state.USER]);
    useEffect(() => {
        tracking.HOME_LOAD();
    }, []);
    return (
        <>
            <div className={style.container}>
                <div className="home_container_par">
                    <Container>
                        <div className={style.home_cate_head}>
                            <HomeCate />
                            {!IS_MB && <HomeCurrentLocation />}
                        </div>
                        {banner_status !== STATUS.SUCCESS ? (
                            <>{IS_MB ? <PlashScreen /> : <LoadHomeBanner />}</>
                        ) : (
                            <>
                                <HomeBanner2 />
                                {IS_MB ? <HomeCate2 /> : <HomeTags2 />}
                            </>
                        )}
                    </Container>
                </div>
                <HomeDiscount />
                <Container>
                    <HomeOrgDistance />
                    <HomeTopic />
                    <HomeProducts />
                    <HomeDownApp />
                    <HomeWhyNot />
                    {/* {USER.USER && <HomeRecommend />} */}
                    <HomeProvince />
                    {/* {IS_MB ? <></> : <HomeTrends />} */}
                    <HomePartners />
                </Container>
                <OpenApp type="none" />
            </div>
        </>
    );
}
