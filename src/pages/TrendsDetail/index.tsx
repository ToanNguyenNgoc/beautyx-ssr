import API_3RD from 'api/3rd-api';
import { XButton } from 'components/Layout';
import icon from 'constants/icon';
import { useFetch } from 'hooks';
import IStore from 'interface/IStore';
import moment from 'moment';
import { ITrend } from 'pages/Trends/trend.interface';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchAsyncVideoByUrl, ITrendCommentChild } from 'redux/trend_detail';
import { formatRouterLinkService } from 'utils/formatRouterLink/formatRouter';
import { ITrendComment } from 'redux/trend_detail'
import style from './trend-detail.module.css'

function TrendsDetail() {
    const params = useParams()
    const { response } = useFetch(
        params.id,
        `${API_3RD.API_NODE}/trends/${params.id}?include=services`
    )
    const trend: ITrend = response?.context

    // const videoTiktok = useFetch(
    //     trend?.trend_url,
    //     API_TIKTOK.getVideoByUrl,
    //     {'video_url':trend?.trend_url}
    // ).response
    // console.log(videoTiktok)
    const { _id, video, comments } = useSelector((state: IStore) => state.TREND_DETAIL)
    const dispatch = useDispatch()
    const getVideoByUrl = async () => {
        dispatch(fetchAsyncVideoByUrl({
            video_url: trend?.trend_url,
            _id: params.id
        }))
    }
    useEffect(() => {
        if (trend?.trend_url && _id !== params.id) {
            getVideoByUrl()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trend?.trend_url])

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
                        <div className={style.interactive}>
                            <div className={style.interactive_item}>
                                <XButton
                                    iconSize={16}
                                    className={style.interactive_icon_btn}
                                    icon={icon.eyeBoldBlack}
                                />
                                <span className={style.interactive_item_text}>{video.view_count}</span>
                            </div>
                            <div className={style.interactive_item}>
                                <XButton
                                    iconSize={16}
                                    className={style.interactive_icon_btn}
                                    icon={icon.heartBoldBlack}
                                />
                                <span className={style.interactive_item_text}>{video.favorite_count}</span>
                            </div>
                            <div className={style.interactive_item}>
                                <XButton
                                    iconSize={16}
                                    className={style.interactive_icon_btn}
                                    icon={icon.commentBoldBlack}
                                />
                                <span className={style.interactive_item_text}>{video.comment_count}</span>
                            </div>
                            <div className={style.interactive_item}>
                                <XButton
                                    iconSize={16}
                                    className={style.interactive_icon_btn}
                                    icon={icon.shareBoldBlack}
                                />
                                <span className={style.interactive_item_text}>{video.share_count}</span>
                            </div>
                        </div>
                    </div>
                    <TrendsDetailComment comments={comments} />
                </div>
            </div>
            :
            <></>
    );
}

export default TrendsDetail;

interface TrendsDetailCommentProps {
    comments: ITrendComment[]
}

const TrendsDetailComment = (props: TrendsDetailCommentProps) => {
    const { comments } = props
    return (
        <>
            <div
                className={style.comment_container}
            >
                <ul className={style.comment_list}>
                    {
                        comments.map((item: ITrendComment, index: number) => (
                            <li key={index} className={style.comment_list_item}>
                                <CommentItem comment={item} />
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={style.comment_input}>

            </div>
        </>
    )
}
const CommentItem = ({ comment }: { comment: ITrendComment }) => {
    const { USER } = useSelector((state: IStore) => state.USER)
    console.log(USER)
    return (
        <div className={style.comment_item_cnt}>
            <div className={style.comment_item_par}>
                <div className={style.comment_user_avatar}>
                    <img src={comment.user?.avatar ?? icon.userCircle} alt="" />
                </div>
                <div className={style.comment_item_par_right}>
                    <div className={style.comment_item_box}>
                        <p className={style.comment_text}>
                            <span className={style.comment_user_name} >{comment.user?.fullname}</span>
                            {comment.body}
                        </p>
                        <div className={style.comment_bot}>
                            <span className={style.comment_bot_create}>
                                {moment('2022-10-11 11:22:00').locale("vi").fromNow()}
                            </span>
                            <span className={style.comment_bot_reply}>Reply</span>
                        </div>
                    </div>
                    <ul className={style.comment_item_child}>
                        {
                            comment.children?.map((child: ITrendCommentChild, i: number) => (
                                <li key={i} className={style.comment_item_child_item}>
                                    <div className={style.comment_user_avatar}>
                                        <img src={child.user?.avatar ?? icon.userCircle} alt="" />
                                    </div>
                                    <div className={style.comment_item_par_right}>
                                        <div
                                            style={{ backgroundColor: "#EAE9F5" }}
                                            className={style.comment_item_box}
                                        >
                                            <p className={style.comment_text}>
                                                <span className={style.comment_user_name} >{child.user?.fullname}</span>
                                                {child.body}
                                            </p>
                                            <div className={style.comment_bot}>
                                                <span className={style.comment_bot_create}>
                                                    {moment('2022-10-11 11:22:00').locale("vi").fromNow()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}