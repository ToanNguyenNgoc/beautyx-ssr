import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { onErrorImg } from 'utils';
import { ITrend, ITrendService } from './trend.interface';
import { formatRouterLinkOrg, formatRouterLinkService } from 'utils/formatRouterLink/formatRouter'
import { useElementOnScreen, useSwr } from 'hooks'
import style from './trends.module.css'
import formatPrice from 'utils/formatPrice';
import moment from 'moment';
import icon from 'constants/icon';
import API_ROUTE from 'api/_api';
import { IOrganization } from 'interface';

function VideoItem({ item }: { item: ITrend }) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const cntRef = useRef<HTMLDivElement>(null)
    const [playing, setPlaying] = useState(true);
    const options = {
        root: null,
        rootMargin: "3px",
        threshold: 0.3,
    }
    const isVisible = useElementOnScreen(options, cntRef)
    const { response } = useSwr(API_ROUTE.ORG(item.organization_id), (isVisible && item.organization_id))
    const org: IOrganization = response
    useEffect(() => {
        if (isVisible) {
            if (!playing) {
                videoRef?.current?.play();
                setPlaying(true);
            }
        } else {
            if (playing) {
                videoRef?.current?.pause();
                setPlaying(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);
    const displayTime = moment(item.createdAt).locale("vi").fromNow()
    return (
        <div ref={cntRef} className={style.video_item_cnt}>
            <div className={style.video_container}>
                <Link
                    to={{ pathname: formatRouterLinkOrg(item.organization_id) }}
                    className={style.video_head_org}
                >
                    <div className={style.video_head_org_avt}>
                        <img src={item.organization_image} onError={(e) => onErrorImg(e)} alt="" />
                    </div>
                    <div className={style.video_head_org_det}>
                        <p
                            className={style.org_name}>{item.organization_name}
                        </p>
                        <p className={style.org_time_up}>{displayTime}</p>
                    </div>
                </Link>
                <div className={style.video_body}>
                    <div className={style.video_body_left}>
                        <video className={style.video_blur} src={item.media_url}></video>
                        <div className={style.video_cnt}>
                            <video
                                ref={videoRef}
                                className={style.video_cnt_item}
                                loop
                                controls
                                webkit-playsinline="webkit-playsinline"
                                playsInline={true}
                            >
                                <source src={item.media_url} />
                            </video>
                        </div>
                    </div>
                    <div className={style.video_body_right}>
                        <ul className={style.service_list}>
                            {
                                item.services?.map((service: ITrendService) => (
                                    <li key={service.id} className={style.service_item_cnt}>
                                        <Link
                                            className={style.service_item}
                                            to={{
                                                pathname: formatRouterLinkService(
                                                    service.id,
                                                    item.organization_id,
                                                    service.service_name)
                                            }}
                                        >
                                            <div className={style.service_item_img}>
                                                <img
                                                    src={service.image_url ?? item.organization_image}
                                                    alt=""
                                                    onError={(e) => onErrorImg(e)}
                                                />
                                            </div>
                                            <div className={style.service_item_det}>
                                                <span className={style.service_name}>
                                                    {service.service_name}
                                                </span>
                                                <div className={style.service_price}>
                                                    {
                                                        service.special_price > 0 &&
                                                        <p>{formatPrice(service.special_price)}đ</p>
                                                    }
                                                    <p>{formatPrice(service.price)}đ</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className={style.video_bot}>
                    <div className={style.video_interactive_cnt}>
                        <div className={style.interactive_item}>
                            <img src={icon.favoriteStroke} alt="" />
                            <span className={style.interactive_item_count}>
                                {org?.favorites_count}
                            </span>
                        </div>
                        <div className={style.interactive_item}>
                            <img src={icon.comment} alt="" />
                            <span className={style.interactive_item_count}>
                                100
                            </span>
                        </div>
                    </div>
                    <div className={style.video_content}>
                        {item.content}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoItem;