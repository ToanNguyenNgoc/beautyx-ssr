import API_3RD from 'api/3rd-api';
import { useDeviceMobile, useFetch } from 'hooks';
import { ITrend } from 'pages/Trends/trend.interface';
import TrendDetailDia from 'pages/Trends/TrendDetailDia';
import  { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { formatRouterLinkOrg } from 'utils/formatRouterLink/formatRouter';
import style from './home-trends.module.css'
import { HomeTitle } from 'components/Layout';

function HomeTrends() {
    const { response } = useFetch(
        true,
        `${API_3RD.API_NODE}/trends`,
        { page: 1, limit: 6 }
    );
    const trends: ITrend[] = response?.context?.data ?? []
    return (
        <div className={style.container}>
            <HomeTitle
                url={`/xu-huong`}
                title={'Xu hướng làm đẹp'} seemore="Xem tất cả >"
            />
            <div className={style.trends_list_cnt}>
                <ul className={style.trends_list}>
                    {
                        trends.map((item: ITrend, index: number) => (
                            <li key={index} className={style.trends_list_item}>
                                <Video
                                    item={item}
                                />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default HomeTrends;

interface VideoProps {
    item: ITrend,
}

const Video = (props: VideoProps) => {
    const { item } = props;
    const IS_MB = useDeviceMobile()
    const [open, setOpen] = useState(false)
    const history = useHistory()
    const videoRef = useRef<HTMLVideoElement>(null)
    const onTogglePlayVideo = (play: boolean) => {
        if (play) return videoRef.current?.play()
        if (!play) return videoRef.current?.pause()
    }
    const onDetail = () => {
        if (IS_MB) return setOpen(true)
        history.push(`/video/${item._id}`)
    }
    return (
        <>
            <div
                onClick={onDetail}
                className={style.trend_item}
            >
                <video
                    onMouseEnter={() => onTogglePlayVideo(true)}
                    onMouseLeave={() => onTogglePlayVideo(false)}
                    ref={videoRef}
                    className={style.trends_list_item_video}
                    webkit-playsinline="webkit-playsinline"
                    playsInline={true}
                >
                    <source type="video/mp4" src={`${item.media_url}#t=0.001`} />
                </video>
                <div
                    onClick={(e) => {
                        history.push(formatRouterLinkOrg(item.organization_id))
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    className={style.trend_item_info}
                >
                    <img src={item.organization_image} className={style.trend_item_org_img} alt="" />
                    <span className={style.trend_item_title}>
                        {item.title}
                    </span>
                </div>
            </div>
            <TrendDetailDia
                open={open}
                setOpen={setOpen}
                _id={item._id}
            />
        </>
    )
}