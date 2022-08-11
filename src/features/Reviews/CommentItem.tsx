import React, { useContext, useState } from "react";
import Rating from "@mui/material/Rating";
import icon from "../../constants/icon";
import { IComment } from "../../interface/comments";
import FullImage from "../OpenFullImage";
import { AppContext } from "../../context/AppProvider";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { postAsyncReplyOrgComments } from "../../redux/org/orgCommentsSlice";
import { useHistory } from "react-router-dom";
import { postAsyncReplyServiceComments } from "../../redux/org_services/serviceSlice";
import { postAsyncReplyProductComments } from "../../redux/org_products/productSlice";
import mediaApi from "../../api/mediaApi";
import moment from "moment";
import "moment/locale/vi";
import { postAsyncReplyComboComments } from "../../redux/org_combos/comboSlice";

interface IProps {
    comment: IComment;
    user: any;
    org_id: number;
    parent_type: string;
}

export default function CommentItem(props: IProps) {
    const { comment, org_id, parent_type } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const [commentRep, setCommentRep] = useState({
        text: '',
        img_url: "",
        media_id: null
    })
    const [open, setOpen] = useState(false);
    const { USER } = useSelector((state: any) => state.USER);
    const { t } = useContext(AppContext);
    let body;
    try {
        const cmt = JSON.parse(`${comment.body}`);
        body = {
            text: cmt?.text,
            image_url: cmt?.image_url,
            star: cmt?.star,
            used: cmt?.used,
        };
    } catch (error) {
        body = {
            text: comment.body,
        };
    }
    const onChangeReply = (e: any) => {
        setCommentRep({
            ...commentRep,
            text: e.target.value
        })
    };
    const handlePostReplyComment = () => {
        if (USER) {
            if (commentRep.text.length > 0) {
                const values = {
                    type: "REPLY_COMMENT",
                    id: comment.id,
                    org_id: org_id,
                    media_ids: [commentRep.media_id].filter(Boolean),
                    body: commentRep.text,
                };
                setCommentRep({
                    text: '',
                    img_url: "",
                    media_id: null
                })
                switch (parent_type) {
                    case "ORGANIZATION":
                        return dispatch(
                            postAsyncReplyOrgComments({
                                values: values,
                                user: USER,
                            })
                        );
                    case "SERVICE":
                        return dispatch(
                            postAsyncReplyServiceComments({
                                values: values,
                                user: USER,
                            })
                        );
                    case "PRODUCT":
                        return dispatch(
                            postAsyncReplyProductComments({
                                values: values,
                                user: USER,
                            })
                        );
                    case "TREATMENT_COMBO":
                        // console.log(values);
                        return dispatch(
                            postAsyncReplyComboComments({
                                values: values,
                                user: USER,
                            })
                        );
                }
            }
        } else {
            history.push("/sign-in?1");
        }
    };
    const handleKeyDown = (event: any) => {
        if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
            handlePostReplyComment();
        }
    };
    const onChangeMediaReply = (e: any) => {
        const media = e.target.files[0];
        handlePostMedia(media);
    };
    const handlePostMedia = async (media: any) => {
        let formData = new FormData();
        formData.append("file", media);
        try {
            const res = await mediaApi.postMedia(formData);
            setCommentRep({
                ...commentRep,
                img_url: res?.data.context.original_url,
                media_id: res?.data.context.model_id
            })
        } catch (error) {
            console.log("error", error);
        }
    };
    const onRemoveImgTemp = () => {
        setCommentRep({
            ...commentRep,
            img_url: "",
        })
    };
    const displayTime = moment(comment.created_at).locale("vi").fromNow();
    // console.log(commentRep);
    // console.log(props)
    return (
        <>
            <div className="evaluate-comment__top">
                <div className="evaluate-comment__user">
                    <div className="comment-user__ava">
                        <img
                            src={
                                comment.user?.avatar
                                    ? comment.user?.avatar
                                    : icon.userNotSign
                            }
                            alt=""
                        />
                    </div>
                    <div className="comment-user__info">
                        <span className="comment-user__info">
                            {comment.user?.fullname}
                        </span>
                        <div className="commnet-user__rating">
                            <Rating
                                readOnly
                                name="simple-controlled"
                                value={body.star}
                            // onChange={(event, newValue) => {
                            //     setValue(newValue);
                            // }}
                            />
                        </div>
                    </div>
                </div>
                {body.used && (
                    <div className="flex-row evaluate-comment__tick">
                        <span>{t("detail_item.used")}</span>
                        <img src={icon.checkFlowGreen} alt="" />
                    </div>
                )}
            </div>

            <div className="evaluate-comment__body">
                {/* <span>Phân loại: Name of Service/Product</span> */}
                <span>{body.text}</span>
                {body.image_url ? (
                    <>
                        <div className="comment-img">
                            <img
                                onClick={() => setOpen(true)}
                                src={body.image_url}
                                onError={(e)=>{
                                    e.currentTarget.style.display = 'none';
                                    if(e.currentTarget?.parentElement){e.currentTarget.parentElement.style.display= 'none'}
                                }}
                                alt=""
                            />
                        </div>
                    </>
                ) : null}
            </div>
            <div>
                <Accordion>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <div className="evaluate-comment__bot">
                            <div className="evaluate-comment__bot-title">
                                <span>{displayTime}</span>
                                <span>
                                    {/* {comment.children.length > 0 && `${comment.children.length}  `} */}
                                    Trả lời
                                </span>
                                {/* <span>{displayTime}</span> */}
                            </div>
                            {/* {
                                comment.children?.length > 0 &&
                                <div className="evaluate-comment__bot-thumb">
                                    <img src={comment.children[0]?.user?.avatar} alt="" className="avatar" />
                                    
                                </div>
                            } */}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="evaluate-comment__child">
                            <ul className="evaluate-comment__child-list">
                                {comment?.children && (comment.children.length > 0 && comment.children.map(
                                    (item: any, index: number) => (
                                        <li
                                            key={index}
                                            className="evaluate-comment__child-item"
                                        >
                                            <div className="flex-row evaluate-comment__child-info">
                                                <img
                                                    src={item.user?.avatar}
                                                    alt=""
                                                />
                                                <span className="name">
                                                    {item.user?.fullname}
                                                </span>
                                            </div>
                                            <span className="text">
                                                {item.body}
                                            </span>

                                            <ul className="comment-img__list">
                                                {item?.media &&
                                                    item?.media.map(
                                                        (
                                                            e: any,
                                                            index: number
                                                        ) => (
                                                            <li
                                                                key={index}
                                                                className="comment-img__item"
                                                            >
                                                                <img
                                                                    onClick={() =>
                                                                        setOpen(
                                                                            true
                                                                        )
                                                                    }
                                                                    src={
                                                                        e?.original_url
                                                                    }
                                                                    alt=""
                                                                />
                                                            </li>
                                                        )
                                                    )}
                                            </ul>

                                            <span className="time-ago">
                                                {moment(item.created_at)
                                                    .locale("vi")
                                                    .fromNow()}
                                            </span>
                                        </li>
                                    )
                                ))}
                                {/* <div className="evaluate-comment__child-img">
                                    <button className="btn-close">
                                        <img src={icon.closeCircle} alt="" />
                                    </button>
                                </div> */}

                                <div className="">
                                    <div className="flex-row-sp evaluate-comment__child-reply">
                                        <img
                                            src={
                                                USER?.avatar || icon.userNotSign
                                            }
                                            alt=""
                                            className="avatar-reply"
                                        />
                                        <input
                                            value={commentRep.text}
                                            onKeyDown={handleKeyDown}
                                            onChange={onChangeReply}
                                            type="text"
                                            placeholder={`Trả lời ${comment?.user?.fullname}...`}
                                        />
                                        {/* <label
                                            className="btn-media"
                                            htmlFor="file-reply"
                                        >
                                            <img src={icon.addImg} alt="" />
                                        </label> */}
                                        <input
                                            hidden
                                            id="file-reply"
                                            type="file"
                                            name="file"
                                            accept="image/png, image/jpeg"
                                            onChange={onChangeMediaReply}
                                        />
                                        <button
                                            onClick={handlePostReplyComment}
                                        >
                                            <img
                                                src={icon.sendComment}
                                                alt=""
                                            />
                                        </button>
                                    </div>

                                    {/* {commentRep.img_url.length > 0 && (
                                        <div
                                            style={{ marginTop: "24px" }}
                                            className="evaluate-input__upload"
                                        >
                                            <img
                                                src={commentRep.img_url}
                                                className="evaluate-upload__img"
                                                alt=""
                                            />
                                            <button
                                                className="btn-close"
                                                onClick={onRemoveImgTemp}
                                            >
                                                <img
                                                    src={icon.closeCircle}
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                    )} */}
                                </div>
                            </ul>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <FullImage open={open} setOpen={setOpen} comment={comment} />
        </>
    );
}
