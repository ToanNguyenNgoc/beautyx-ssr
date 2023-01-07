import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import style from "./comment.module.css"
import IStore from 'interface/IStore';
import { IComment } from 'interface';
import { paramsComment } from 'params-query';
import { postMedia, useCheckUserBought, useNoti, useSwrInfinite } from 'hooks';
import { useHistory } from 'react-router-dom';
import commentsApi from 'api/commentsApi';
import { Input, XButton } from 'components/Layout';
import icon from 'constants/icon';
import CommentParItem from './CommentParItem';

export interface CommentProps {
    commentable_type: any
    commentable_id: number,
    org_id: number
}
export interface TempCmt {
    body: string,
    media_url: any[],
    media_ids: any[]
}
export const tempCmtInit: TempCmt = {
    body: "",
    media_url: [],
    media_ids: []
}

function Comment(props: CommentProps) {
    const { commentable_type, commentable_id, org_id } = props;
    const { USER } = useSelector((state: IStore) => state.USER);
    const { bought } = useCheckUserBought({ commentable_type, commentable_id, org_id })
    const { firstLoad, resultLoad, noti } = useNoti()
    const history = useHistory()
    const [tempCmt, setTempCmt] = useState<TempCmt>(tempCmtInit)
    const [cmtArr, setCmtArr] = useState<IComment[]>([])
    const cntRef = useRef(null)
    const params = {
        ...paramsComment,
        "filter[commentable_type]": commentable_type,
        "filter[commentable_id]": commentable_id,
        "filter[organization_id]": commentable_type !== "ORGANIZATION" ? org_id : ""
    }
    const { resData, totalItem, onLoadMore, isValidating } = useSwrInfinite(
        (commentable_id && org_id),
        "/comments",
        params
    )
    const onChangeInputCmt = (e: any) => {
        setTempCmt({ ...tempCmt, body: e.target.value })
    }
    const paramPost = {
        "body": `${tempCmt.body}${bought ? `‭` : ''}`,
        "commentable_id": commentable_id,
        "commentable_type": commentable_type,
        "organization_id": org_id,
        "media_ids": tempCmt.media_ids,
        "rate": 5,
    }
    const handlePostCmt = async () => {
        if (!USER) return history.push("/sign-in?1")
        if (USER && (paramPost.body.length > 0 || paramPost.media_ids.length > 0)) {
            firstLoad()
            try {
                const res = await commentsApi.postComment2(paramPost)
                const newCmt = {
                    ...await res.data.context,
                    children: [],
                    media_url: tempCmt.media_url
                }
                setCmtArr([newCmt, ...cmtArr])
                setTempCmt(tempCmtInit)
                resultLoad('')
            } catch (error) {
                console.log(error)
                resultLoad('Có lỗi xảy ra. Vui lòng thử lại!')
            }
        }
    }
    const onChangeMedia = async (e: any) => {
        const { model_id, original_url } = await postMedia(e)
        setTempCmt({
            ...tempCmt,
            media_url: [original_url, ...tempCmt.media_url],
            media_ids: [model_id, ...tempCmt.media_ids]
        })
    }
    const onRemoveImageTemple = (url: string) => {
        setTempCmt({
            ...tempCmt,
            media_url: tempCmt.media_url.filter(i => i !== url)
        })
    }

    const onViewMoreCmt = () => {
        onLoadMore()
    }
    return (
        <div ref={cntRef} className={style.container}>
            <h2 className={style.title}>
                Đánh giá ({totalItem})
            </h2>
            <div className={style.cmt_input_par_cnt}>
                <div className={style.input_par_wrapper}>
                    <div className={style.input_top}>
                        <div className={style.par_user_avt}>
                            <img
                                className={style.par_user_avt_icon}
                                src={USER?.avatar ?? icon.userCircle}
                                alt=""
                            />
                        </div>
                        <div className={style.input_par_in_cnt}>
                            <Input
                                placeholder='Viết đánh giá...'
                                value={tempCmt.body}
                                onChange={onChangeInputCmt}
                                onKeyDown={handlePostCmt}
                            />
                            <div className={style.input_par_button}>
                                <label className={style.btn_cmt_img} htmlFor="file_par">
                                    <img
                                        src={icon.addImg} alt=""
                                        width={20} height={20}
                                    />
                                </label>
                                <input onChange={onChangeMedia} type="file" id='file_par' hidden />
                                <XButton
                                    onClick={handlePostCmt}
                                    className={style.btn_cmt}
                                    icon={icon.sendComment}
                                    iconSize={20}
                                    loading={noti.load}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={style.input_img_temp}>
                        {
                            tempCmt.media_url.length > 0 &&
                            tempCmt.media_url.map((img_url: string) => (
                                <div key={img_url} className={style.input_img_temp_item}>
                                    <XButton
                                        className={style.remove_img_btn}
                                        icon={icon.closeCircle}
                                        iconSize={22}
                                        onClick={() => onRemoveImageTemple(img_url)}
                                    />
                                    <img
                                        src={img_url} alt=""
                                        width={"100%"} height={"100%"}
                                        style={{ borderRadius: "4px" }}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={style.body}>
                <ul className={style.cmt_list}>
                    {
                        cmtArr.concat(resData).map((item: IComment, index: number) => (
                            <li key={index} className={style.cmt_list_li}>
                                <CommentParItem
                                    comment={item}
                                    org_id={org_id}
                                    USER_PAR_NAME={item.user?.fullname}
                                    bought={bought}
                                />
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={style.cmt_view_more}>
                {
                    resData.length >= 10 && resData.length < totalItem &&
                    <XButton
                        title='Xem thêm đánh giá'
                        className={style.cmt_view_more_btn}
                        onClick={onViewMoreCmt}
                        loading={isValidating}
                    />
                }
            </div>
        </div>
    );
}

export default Comment;