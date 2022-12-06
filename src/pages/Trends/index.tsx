/* eslint-disable react-hooks/exhaustive-deps */
import API_3RD from "api/3rd-api";
import Head from "features/Head";
import React, { useEffect, useRef, useState } from "react";
import { useDeviceMobile, useElementOnScreen, useFetch } from "hooks";
import { ITrend } from "./trend.interface";
import { Container } from "@mui/system";
import style from "./trends.module.css";
import moment from "moment";
import icon from "constants/icon";
import { useHistory } from "react-router-dom";
import { XButton } from "components/Layout";
import { formatRouterLinkOrg } from "utils/formatRouterLink/formatRouter";

function Trends() {
    const { response } = useFetch(
        true,
        `${API_3RD.API_NODE}/trends`,
        { 'include': 'services|tiktok' }
    );

    const trends: ITrend[] = response?.context?.data ?? [];
    const [playVideo, setPlayVideo] = useState(0)
    return (
        <>
            <Head title="Xu hướng" />
            <Container>
                <div className={style.container_large}>
                    <ul className={style.trend_list}>
                        {
                            trends.map((item: ITrend, index: number) => (
                                <li key={index} className={style.trend_list_video_thumb}>
                                    <VideoItemThumb
                                        item={item}
                                        playVideo={playVideo}
                                        setPlayVideo={setPlayVideo}
                                        index={index}
                                    />
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

interface VideoItemThumbProps {
    item: ITrend, playVideo: number,
    setPlayVideo: (playVideo: number) => void,
    index: number
}

const VideoItemThumb = (props: VideoItemThumbProps) => {
    const { item, index, playVideo, setPlayVideo } = props;
    const history = useHistory()
    const IS_MB = useDeviceMobile()
    const onDetail = () => {
        history.push(`/video/${item._id}`)
    }
    const onToggleVideo = () => {
        if (IS_MB && index === playVideo) return setPlayVideo(-1)
        setPlayVideo(index)
    }

    const videoRef = useRef<HTMLVideoElement>(null)
    const itemRef = useRef<HTMLDivElement>(null)
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
    };
    const isVisible = useElementOnScreen(options, itemRef);
    useEffect(() => {
        if (isVisible) {
            setPlayVideo(index)
        }
    }, [isVisible])
    useEffect(() => {
        if (playVideo === index) {
            videoRef.current?.play()
        } else {
            videoRef.current?.pause()
        }
    }, [playVideo]);
    const onOrgDetail = () => {
        history.push(formatRouterLinkOrg(item.organization_id))
    }
    return (
        <div
            // to={{ pathname: `/video/${item._id}` }}
            onMouseEnter={!IS_MB ? () => onToggleVideo() : () => { }}
            onClick={!IS_MB ? () => onDetail() : () => { }}
            className={style.video_item_cnt}
        >
            <div
                ref={itemRef} className={style.trend_item_center}
            >
                {
                    playVideo !== index &&
                    <XButton
                        icon={icon.playCircle}
                        iconSize={42}
                    />
                }
            </div>
            <div
                onClick={onOrgDetail}
                className={style.trend_item_head}
            >
                <div className={style.trend_item_head_org}>
                    <img src={item.organization_image} alt="" />
                </div>
                <div className={style.trend_item_head_name}>
                    <p className={style.org_name}>{item.organization_name}</p>
                    <p className={style.create_at}>{moment(item.createdAt).fromNow()}</p>
                </div>
            </div>
            <video
                onClick={IS_MB ? () => onToggleVideo() : () => { }}
                ref={videoRef}
                className={style.trend_item_video_thumb}
                webkit-playsinline="webkit-playsinline"
                playsInline={true}
            >
                <source type="video/mp4" src={`${item.media_url}#t=0.001`} />
            </video>
            <div className={style.trend_item_bot}>
                <div onClick={onDetail} className={style.trend_item_bot_ex}>
                    <div className={style.item_ex}>
                        <img className={style.item_ex_icon} src={icon.heartBoldBlack} alt="" />
                        <span className={style.item_ex_text}>{item.tiktok?.digg_count}</span>
                    </div>
                    <div className={style.item_ex}>
                        <img className={style.item_ex_icon} src={icon.commentBoldBlack} alt="" />
                        <span className={style.item_ex_text}>{item.tiktok?.comment_count}</span>
                    </div>
                    <div className={style.item_ex}>
                        <img className={style.item_ex_icon} src={icon.shareBoldBlack} alt="" />
                        <span className={style.item_ex_text}>{item.tiktok?.share_count}</span>
                    </div>
                </div>
                <p className={style.trend_item_desc}>
                    {item.content}
                </p>
                <div className={style.trend_item_bot_org}>
                    <div className={style.trend_item_bot_org_img}>
                        <img src={item.organization_image} alt="" />
                    </div>
                    <span className={style.trend_item_bot_org_name}>{item.organization_name}</span>
                </div>
            </div>
        </div>
    )
}
