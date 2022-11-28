import API_3RD from "api/3rd-api";
import Head from "features/Head";
import React, { useRef } from "react";
import { useDeviceMobile, useFetch } from "hooks";
import { ITrend } from "./trend.interface";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import style from "./trends.module.css";

function Trends() {
    const { response } = useFetch(
        true,
        `${API_3RD.API_NODE}/trends?include=services`
    );
    const IS_MB = useDeviceMobile();
    const trends: ITrend[] = response?.context?.data ?? [];
    return (
        <>
            <Head title="Xu hướng" />
            <Container>
                <div className={style.container_large}>
                    <ul className={style.trend_list}>
                        {
                            trends.map((item: ITrend, index: number) => (
                                <li key={index} className={style.trend_list_video_thumb}>
                                    <VideoItemThumb item={item} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Container>
        </>
    );
}

export default Trends;

const VideoItemThumb = ({ item }: { item: ITrend }) => {
    const refVideo = useRef<HTMLVideoElement>(null)
    const onTogglePlayVideo = (play: boolean) => {
        if (play) {
            refVideo.current?.play()
        } else {
            refVideo.current?.pause()
        }
    }
    return (
        <Link
            to={{ pathname: `/video/${item._id}` }}
            // onMouseEnter={() => onTogglePlayVideo(true)}
            // onMouseLeave={() => onTogglePlayVideo(false)}
        >
            <video
                ref={refVideo}
                className={style.trend_item_video_thumb}
                webkit-playsinline="webkit-playsinline"
                playsInline={true}
            >
                <source src={item.media_url} />
            </video>
        </Link>
    )
}
