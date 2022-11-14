import API_3RD from "api/3rd-api";
import Head from "features/Head";
import HeadMobile from "features/HeadMobile";
import React from "react";
import { useDeviceMobile, useFetch } from "utils";
import { ITrend } from "./trend.interface";
import style from "./trends.module.css";
import VideoItem from "./VideoItem";

function Trends() {
    const { response } = useFetch(
        true,
        `${API_3RD.API_NODE}/trends?include=services`
    );
    const IS_MB = useDeviceMobile();
    const trends: ITrend[] = response?.context?.data ?? [];
    return (
        <>
            {IS_MB ? <HeadMobile title="Trending" /> : <Head />}
            <div className={style.container}>
                {trends.map((item: ITrend) => (
                    <VideoItem key={item._id} item={item} />
                ))}
            </div>
        </>
    );
}

export default Trends;
