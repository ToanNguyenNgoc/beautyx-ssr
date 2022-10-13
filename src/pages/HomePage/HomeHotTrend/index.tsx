import Trends from "features/Trends";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../../redux/status";
import { fetchAsyncVideos } from "../../../redux/video/videosSlice";

export default function HomeHotTrend() {
    const dispatch = useDispatch();
    const videos = useSelector((state: any) => state.VID).LISTVIDs;

    useEffect(() => {
        if (videos.status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncVideos());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <div>{<Trends videos={videos.data} />}</div>;
}
