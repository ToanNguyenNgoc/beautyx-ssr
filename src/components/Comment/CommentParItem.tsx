import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import commentsApi from 'api/commentsApi';
import { FullImage, Input, XButton } from 'components/Layout';
import icon from 'constants/icon';
import { useDeviceMobile, useNoti } from 'hooks';
import { IComment, ICommentChild } from 'interface';
import IStore from 'interface/IStore';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { formatDateFromNow } from 'utils';
import { TempCmt, tempCmtInit } from '.';
import style from './comment.module.css'


interface CommentParItemProps {
    comment: IComment,
    org_id: number,
    USER_PAR_NAME: string,
    bought: boolean
}

function CommentParItem(props: CommentParItemProps) {
    const { comment, org_id, USER_PAR_NAME, bought } = props;
    const history = useHistory()
    const [openImg, setOpenImg] = useState(false)
    const IS_MB = useDeviceMobile();
    const { USER } = useSelector((state: IStore) => state.USER)
    const { firstLoad, resultLoad, noti } = useNoti()
    let media_url: any[] = comment?.media_url ?? []
    //handle reply comment
    const [tempCmt, setTempCmt] = useState<TempCmt>(tempCmtInit)
    const [cmtArr, setCmtArr] = useState<ICommentChild[]>([])
    const replyCount = comment.children?.length + cmtArr.length
    const paramPost = {
        "body": `${tempCmt.body}${bought ? `‭` : ''}`,
        "commentable_id": comment.id,
        "commentable_type": "REPLY_COMMENT",
        "organization_id": org_id,
        // "media_ids": tempCmt.media_ids,
        "rate": 5,
    }
    const onChangeInputCmt = (e: any) => setTempCmt({ ...tempCmt, body: e.target.value })
    const handlePostCmtReply = async () => {
        if (!USER) history.push("/sign-in?1")
        if (USER && paramPost.body.length > 0) {
            firstLoad()
            try {
                const res = await commentsApi.postComment2(paramPost);
                const newCmt = {
                    ...await res.data.context
                }
                setCmtArr([...cmtArr, newCmt])
                setTempCmt(tempCmtInit)
                resultLoad('')
            } catch (error) {
                console.log(error)
                resultLoad('Có lỗi xảy ra. Vui lòng thử lại!')
            }
        }

    }
    const starElement = []
    const rate: number = comment.rate ?? 0
    for (var i = 0; i < rate; i++) {
        starElement.push(<img key={i} src={icon.star} width={14} height={14} alt="" />)
    }
    return (
        <div className={style.cmt_item_par_cnt}>
            <div className={style.cmt_item_par_user}>
                <div className={style.par_user_avt}>
                    <img className={style.par_user_avt_icon} src={comment.user?.avatar ?? icon.userCircle} alt="" />
                </div>
                <div className={style.par_user_name}>
                    {comment.user?.fullname}
                </div>
            </div>
            <div className={style.cmt_item_par_body}>
                <div className={style.par_body_top}>
                    <div className={style.par_body_top_star}>
                        {starElement}
                    </div>
                </div>
                {
                    comment.body?.includes('‭') &&
                    <div className={style.par_body_check}>
                        <img
                            src={icon.checkFlowGreen} alt=""
                            width={14} height={14}
                        />
                        <span className={style.par_body_check_text}>
                            Đã mua hàng
                        </span>
                    </div>
                }
                <div className={style.cmt_text}>
                    {comment?.body}
                </div>
                {
                    media_url?.length > 0 &&
                    <>
                        <div onClick={() => setOpenImg(true)} className={style.media_url_list}>
                            {
                                media_url.map((url: string, index: number) => (
                                    <div key={index} className={style.media_url_list_item}>
                                        <img src={url} alt="" />
                                    </div>
                                ))
                            }
                        </div>
                        <FullImage
                            content={
                                <div className={style.img_content} >
                                    <div className={style.cmt_item_par_user}>
                                        <div className={style.par_user_avt}>
                                            <img className={style.par_user_avt_icon} src={comment.user?.avatar ?? icon.userCircle} alt="" />
                                        </div>
                                        <div className={style.par_user_name}>
                                            {comment.user?.fullname}
                                        </div>
                                    </div>
                                    <div className={style.cmt_item_par_body}>
                                        <div className={style.cmt_text}>
                                            {comment?.body}
                                        </div>
                                    </div>
                                </div>
                            }
                            open={openImg} setOpen={setOpenImg} src={media_url}
                        />
                    </>
                }
                <span className={style.cmt_time_late}>
                    {formatDateFromNow(comment.created_at)}
                </span>
                <div className={style.cmt_reply_cnt}>
                    <Accordion
                        style={{ width: "100%" }}
                    >
                        <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <span
                                className={style.cmt_reply_open}
                            // onClick={() => setTempCmt({ ...tempCmt, body: `@${USER_PAR_NAME}` })}
                            >
                                {replyCount > 0 && replyCount}  Phản hồi
                            </span>
                        </AccordionSummary>
                        <AccordionDetails
                            style={{ padding: IS_MB ? "0px" : "4px 16px" }}
                        >
                            {
                                comment.children.concat(cmtArr).map((child: ICommentChild, i: number) => (
                                    <div key={i} className={style.cmt_reply_cnt}>
                                        <div className={style.cmt_reply_user}>
                                            <div className={style.par_user_avt}>
                                                <img
                                                    src={child.user?.avatar ?? icon?.userCircle}
                                                    alt="" className={style.par_user_avt_icon}
                                                />
                                            </div>
                                        </div>
                                        <div className={style.cmt_reply_text}>
                                            <span className={style.par_user_name}>
                                                {child.user?.fullname}
                                            </span>
                                            <span className={style.cmt_text}>
                                                {
                                                    child?.body?.includes('‭') &&
                                                    <div className={style.par_body_check}>
                                                        <img
                                                            src={icon.checkFlowGreen} alt=""
                                                            width={14} height={14}
                                                        />
                                                        <span className={style.par_body_check_text}>
                                                            Đã mua hàng
                                                        </span>
                                                    </div>
                                                }
                                                {child.body}
                                                <p className={style.cmt_time_late}>
                                                    {formatDateFromNow(child?.created_at || '')}
                                                </p>
                                            </span>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className={style.reply_cmt_input_cnt}>
                                <div className={style.input_top}>
                                    <div className={style.par_user_avt}>
                                        {
                                            <img
                                                className={style.par_user_avt_icon}
                                                src={USER?.avatar ?? icon.userCircle} alt=""
                                            />
                                        }
                                    </div>
                                    <div className={style.input_par_in_cnt}>
                                        <Input
                                            placeholder={`Phản hồi ${USER_PAR_NAME}...`}
                                            value={tempCmt.body}
                                            onChange={onChangeInputCmt}
                                            onKeyDown={handlePostCmtReply}
                                        />
                                        <div className={style.input_par_button}>
                                            <XButton
                                                onClick={handlePostCmtReply}
                                                className={style.btn_cmt}
                                                icon={icon.sendComment}
                                                iconSize={20}
                                                loading={noti.load}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
export default CommentParItem