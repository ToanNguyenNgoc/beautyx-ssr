import API_3RD from 'api/3rd-api';
import { BackButton, XButton } from 'components/Layout';
import { useFetch } from 'hooks';
import moment from 'moment';
import { ITrend } from 'pages/Trends/trend.interface';
import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { formatRouterLinkService } from 'utils/formatRouterLink/formatRouter';
import style from './trend-detail.module.css'

function TrendsDetail() {
    const params = useParams()
    const location = useLocation()
    console.log(location)
    const { response, isValidating } = useFetch(params.id, `${API_3RD.API_NODE}/trends/${params.id}?include=services`)
    const trend: ITrend = response?.context
    console.log(trend)
    return (
        trend ?
            <div className={style.container} >
                <div className={style.left}>
                    <div className={style.video_container}>
                        <video className={style.video_blur} src={trend.media_url}></video>
                        <div className={style.video_wrapper}>
                            <video
                                className={style.video}
                                loop
                                controls
                                webkit-playsinline="webkit-playsinline"
                                playsInline={true}
                            >
                                <source src={trend.media_url} />
                            </video>
                        </div>
                    </div>
                </div>
                <div className={style.right}>
                    <div className={style.right_top}>
                        <div className={style.right_top_org}>
                            <div className={style.org_detail}>
                                <div className={style.org_detail_img}>
                                    <img src={trend.organization_image} alt="" />
                                </div>
                                <div className={style.org_detail_right}>
                                    <p className={style.org_detail_name}>{trend.organization_name}</p>
                                    <p className={style.time_late}>
                                        {moment(trend.createdAt).locale("vi").fromNow()}
                                    </p>
                                </div>
                            </div>
                            <XButton
                                className={style.right_top_org_btn}
                                title='Đang theo dõi'
                            />
                        </div>
                        <div className={style.right_top_content}>
                            <p className={style.title}>{trend.title}</p>
                            <p className={style.content}>{trend.content}</p>
                        </div>
                        <div className={style.right_top_services}>
                            {
                                trend.services?.map(service => (
                                    <Link
                                        key={service.id}
                                        to={{
                                            pathname: formatRouterLinkService(
                                                service.id,
                                                trend.organization_id,
                                                service.service_name
                                            )
                                        }}
                                    >
                                        <span className={style.service_link_text}>
                                            #{service.service_name}
                                        </span>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            :
            <></>
    );
}

export default TrendsDetail;