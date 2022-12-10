/* eslint-disable react-hooks/exhaustive-deps */
import API_3RD from "api/3rd-api";
import React, { useRef, useState } from "react";
import { useDeviceMobile, useElementOnScreen, useFetch } from "hooks";
import { ITrend } from "./trend.interface";
import { Container } from "@mui/system";
import style from "./trends.module.css";
import moment from "moment";
import icon from "constants/icon";
import { useHistory } from "react-router-dom";
import { formatRouterLinkOrg } from "utils/formatRouterLink/formatRouter";
import TrendDetailDia from "./TrendDetailDia";
import ReactPlayer from "react-player/lazy";

function Trends() {
    const { response } = useFetch(
        true,
        `${API_3RD.API_NODE}/trends`,
        { 'include': 'services|tiktok' }
    );

    const trends: ITrend[] = response?.context?.data ?? [];
    return (
        <>
            <Container>
                <div className={style.container_large}>
                    <ul className={style.trend_list}>
                        {
                            trends.map((item: ITrend, index: number) => (
                                <li key={index} className={style.trend_list_video_thumb}>
                                    <VideoItemThumb
                                        item={item}
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
    item: ITrend
}

const VideoItemThumb = (props: VideoItemThumbProps) => {
    const { item } = props;
    const history = useHistory()
    const videoRef = useRef<HTMLVideoElement>(null)
    const itemRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)
    const IS_MB = useDeviceMobile()
    const onDetail = () => {
        if (IS_MB) {
            videoRef.current?.pause()
            setOpen(true)
        } else {
            history.push(`/video/${item._id}`)
        }
    }

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
    };
    const isVisible = useElementOnScreen(options, itemRef);
    const onOrgDetail = () => {
        history.push(formatRouterLinkOrg(item.organization_id))
    }
    return (
        <>
            <div
                onClick={!IS_MB ? () => onDetail() : () => { }}
                className={style.video_item_cnt}
            >
                <div ref={itemRef} className={style.trend_item_center} >
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
                <div className={style.trend_item_body}>
                    <ReactPlayer
                        className={style.trend_item_video_thumb}
                        url={`${item.media_url}#t=0.001`}
                        width={'100%'}
                        height={'100%'}
                        playing={isVisible}
                        muted={true}
                        playsinline={true}
                        controls
                    />
                </div>
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
            <TrendDetailDia
                open={open} setOpen={setOpen} _id={item._id}
            />
        </>
    )
}
