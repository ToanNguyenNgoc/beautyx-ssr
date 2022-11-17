import { useRef, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";

import icon from "../../../constants/icon";
import onErrorImg from "../../../utils/errorImg";
// interface
import { IOrganization } from '../../../interface/organization';
import { IComment } from '../../../interface/comments';
import { Service } from '../../../interface/service';
import { useElementOnScreen } from "hooks";
// end
export default function Video(props: any) {
    const videoRef = useRef<any>();
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
    };
    const isVisable = useElementOnScreen(options, videoRef);
    // ---- interface ----
    interface IReact {
        favoriteCount: number;
        isFavorite: Boolean;
    }
    interface Comments {
        comments?: IComment[] | null;
        totalItem?: number
    }
    interface IData {
        org?: IOrganization | null;
        ser?: Service[] | null;
        cmt?: Comments | undefined | null
    }
    // ---- video ----

    const { org, sers, cmt, video, videoCur, setVideoCur, initialIndex, index } = props;
    const vd_url = video?.excerpt?.rendered?.slice(
        10,
        video?.excerpt?.rendered?.length - 12
    );
    // ---- org - service - comments ---- 
    const [data, setData] = useState<IData | undefined>({
        org: org,
        ser: sers,
        cmt: cmt
    });
    const [reaction, setReaction] = useState<IReact>({
        favoriteCount: org.favorites_count,
        isFavorite: org.is_favorite
    })
    const [comment, setComment] = useState<any>({
        text: '',
        url: video.link,
        image_url: '',
        used: true,
        star: 5,
    });
    // ---- end ---- 
    useEffect(() => {
        if (videoRef && videoRef.current && videoRef.current.id === ("reel_" + initialIndex)) {
            videoRef.current.scrollIntoView()
        }
    }, [initialIndex])
    useEffect(() => {
        if (isVisable) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisable]);
    return (
        <div className="trend-item-ctn" >
            <div className="video-control__info">
                <div className="left">
                    <div className="video-control__info-label">
                        <img
                            // onClick={onOrgDetail}
                            src={org?.image_url}
                            alt=""
                            className="org_avt org_avt-spin"
                            onError={(e) => onErrorImg(e)}
                        />
                        <span
                            // onClick={onOrgDetail}
                            className="org__name"
                        >
                            @
                            {org?.name?.split(" ").length > 46
                                ? org?.name.slice(0, 50) + "..."
                                : org?.name}
                        </span>
                    </div>
                    <span
                        className="ser__name"
                        dangerouslySetInnerHTML={{
                            __html: video.title.rendered,
                        }}
                    >
                        {/* {video?.title?.rendered?.split(' ').length>6?video?.title?.rendered.slice(0, 50)+'...':video?.title?.rendered} */}
                    </span>
                </div>
                <div className="flex-column-sp right">
                    <div className="right-item">
                        <img
                            // onClick={onFavorite}
                            className="right-item__img"
                            src={
                                reaction.isFavorite === true
                                    ? icon.heart
                                    : icon.unHeart
                            }
                            alt=""
                        // src={icon.unHeart}
                        />
                        <span className="right-item__count">
                            {reaction.favoriteCount}
                        </span>
                    </div>
                    <div className="right-item">
                        <div className="comment">
                            <svg
                                aria-label="Comment"
                                color="white"
                                fill="white"
                                height="24"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24"
                            >
                                <path
                                    d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                ></path>
                            </svg>
                        </div>
                        <span className="right-item__count">
                            {data?.cmt?.totalItem}
                        </span>
                    </div>
                    {/* <div className="right-item">
                        <div className="share">
                            <svg
                                aria-label="Share Post"
                                color="white"
                                fill="white"
                                height="24"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24"
                            >
                                <line
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    x1="22"
                                    x2="9.218"
                                    y1="3"
                                    y2="10.083"
                                ></line>
                                <polygon
                                    fill="none"
                                    points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                                    stroke="currentColor"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                ></polygon>
                            </svg>
                        </div>
                        <span className="right-item__count">
                            123
                        </span>
                    </div> */}
                </div>
            </div>
            <video
                ref={videoRef}
                id={"reel_" + index}
                className="video-item__pc"
                webkit-playsinline="webkit-playsinline"
                playsInline={true}
                style={{ width: "100%", height: "100%" }}
                loop
            >
                <source src={vd_url} type="video/mp4" />
            </video>
            <div className="reel-item-body">
                <div>
                    <div>
                        <img src="" alt="" />
                    </div>
                    <div>
                        <Avatar
                            alt={"alo"}
                            src={data?.org?.image_url}
                            sx={{ width: 32, height: 32 }}
                        />
                        <div className="video-item-header_name">
                            <span>alo</span>
                            <span className="video-item-header_time">
                                Đã đămg 5 giờ trước
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="video-item_react-ctn">
                        <div className="react-btn">
                            <div className="like">
                                <img
                                    className="icon"
                                    src={icon.unHeartWhite}
                                    alt=""
                                />
                                <span>100</span>
                            </div>
                            <div className="comment">
                                <img
                                    className="icon"
                                    src={icon.comment}
                                    alt=""
                                />
                                <span>alo</span>
                            </div>
                            <div className="share_link">
                                <img className="icon" src={icon.share} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="video-item_comments"></div>
                </div>
            </div>
        </div>
    );
}
