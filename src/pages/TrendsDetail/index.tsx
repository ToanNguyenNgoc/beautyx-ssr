import API_3RD from 'api/3rd-api';
import { XButton } from 'components/Layout';
import icon from 'constants/icon';
import { useFetch, useFetchInfinite } from 'hooks';
import { ITrend } from 'pages/Trends/trend.interface';
import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { formatRouterLinkOrg, formatRouterLinkService } from 'utils/formatRouterLink/formatRouter';
import style from './trend-detail.module.css'
import Skeleton from 'react-loading-skeleton';
import { ITrendComment, ITrendCommentChild } from './interface';
import { formatDateFromNow } from 'utils';

function TrendsDetail({ id, onClose }: { id?: string, onClose?: () => void }) {
    const params = useParams()
    const trend_id = id ?? params?.id
    const history = useHistory()
    const trend: ITrend = useFetch(
        trend_id,
        `${API_3RD.API_NODE}/trends/${trend_id}`,
        { 'include': 'services|tiktok' }
    ).response?.context

    const { resData, totalItem, isValidating } = useFetchInfinite(
        trend_id,
        `${API_3RD.API_NODE}/tiktok/getCommentsByUrl`,
        { 'filter[trend]': trend_id }
    )
    const comments = resData ?? []

    const onOrgDetail = () => history.push(formatRouterLinkOrg(trend?.organization_id))
    const onBack = () => {
        if (onClose) {
            onClose()
        } else {
            history.goBack()
        }
    }

    return (
        trend ?
            <div className={style.container} >
                <XButton
                    onClick={onBack}
                    className={style.back_btn}
                    icon={icon.backWhite}
                    iconSize={24}
                />
                <div className={style.left}>
                    <div className={style.video_container}>
                        <video className={style.video_blur} src={`${trend.media_url}#t=0.001`}></video>
                        <div className={style.video_wrapper}>
                            <video
                                className={style.video}
                                loop
                                controls
                                webkit-playsinline="webkit-playsinline"
                                playsInline={true}
                            >
                                <source type='video/mp4' src={`${trend.media_url}#t=0.001`} />
                            </video>
                        </div>
                    </div>
                </div>
                <div className={style.right}>
                    <div className={style.right_top}>
                        <div className={style.right_top_org}>
                            <div onClick={onOrgDetail} className={style.org_detail}>
                                <div className={style.org_detail_img}>
                                    <img src={trend.organization_image} alt="" />
                                </div>
                                <div className={style.org_detail_right}>
                                    <p className={style.org_detail_name}>{trend.organization_name}</p>
                                    <p className={style.time_late}>
                                        {formatDateFromNow(trend.createdAt)}
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
                                <span className={style.interactive_item_text}>{trend?.tiktok?.play_count}</span>
                            </div>
                            <div className={style.interactive_item}>
                                <XButton
                                    iconSize={16}
                                    className={style.interactive_icon_btn}
                                    icon={icon.heartBoldBlack}
                                />
                                <span className={style.interactive_item_text}>{trend?.tiktok?.digg_count}</span>
                            </div>
                            <div className={style.interactive_item}>
                                <XButton
                                    iconSize={16}
                                    className={style.interactive_icon_btn}
                                    icon={icon.commentBoldBlack}
                                />
                                <span className={style.interactive_item_text}>{trend?.tiktok?.comment_count}</span>
                            </div>
                            <div className={style.interactive_item}>
                                <XButton
                                    iconSize={16}
                                    className={style.interactive_icon_btn}
                                    icon={icon.shareBoldBlack}
                                />
                                <span className={style.interactive_item_text}>{trend?.tiktok?.share_count}</span>
                            </div>
                        </div>
                    </div>
                    {totalItem === 1 && isValidating && <LoadComment />}
                    {resData && <TrendsDetailComment comments={comments} />}
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
                        comments?.map((item: ITrendComment, index: number) => (
                            <li key={index} className={style.comment_list_item}>
                                <CommentItem comment={item} />
                            </li>
                        ))
                    }
                </ul>
            </div>
            {/* <div className={style.comment_input}>

            </div> */}
        </>
    )
}
const CommentItem = ({ comment }: { comment: ITrendComment }) => {
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
                        {/* <div className={style.comment_bot}>
                            <span className={style.comment_bot_create}>
                                {moment('2022-10-11 11:22:00').locale("vi").fromNow()}
                            </span>
                            <span className={style.comment_bot_reply}>Reply</span>
                        </div> */}
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
                                            {/* <div className={style.comment_bot}>
                                                <span className={style.comment_bot_create}>
                                                    {moment('2022-10-11 11:22:00').locale("vi").fromNow()}
                                                </span>
                                            </div> */}
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
const LoadComment = () => {
    return (
        <ul className={style.detail_comment_list}>
            {
                [1, 2, 3, 4].map(i => (
                    <li key={i} className={style.load_item}>
                        <div className={style.load_item_left}>
                            <Skeleton width={'100%'} height={'100%'} style={{ borderRadius: "100%" }} />
                        </div>
                        <div className={style.load_item_right}>
                            <Skeleton width={'100%'} height={'100%'} />
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}