import React, { useState } from "react";
import { Alert, Dialog, Snackbar } from "@mui/material";
import "./style.css";
import { useSelector } from "react-redux";
import { pick } from "lodash";
import { onErrorImg } from "utils";
import icon from "constants/icon";
import HeadMobile from "features/HeadMobile";
import { XButton } from "components/Layout";
import { postMedia, useDeviceMobile } from "hooks";
import commentsApi from "api/commentsApi";
import { useNoti } from "interface/useNoti";

interface InitComment {
    body: string,
    image_url: any,
    media_ids: number[],
    rate: number,
}

const initComment: InitComment = {
    body: "",
    image_url: null,
    media_ids: [],
    rate: 0,
}

function ServiceReview(props: any) {
    const { open, setOpen, service, org } = props;
    const IS_MB = useDeviceMobile();
    const { USER } = useSelector((state: any) => state.USER);
    const rateStars = [
        { id: 1, icon: icon.star, iconActive: icon.starLine, title: "Rất tệ" },
        { id: 2, icon: icon.star, iconActive: icon.starLine, title: "Tệ" },
        {
            id: 3,
            icon: icon.star,
            iconActive: icon.starLine,
            title: "Bình thường",
        },
        { id: 4, icon: icon.star, iconActive: icon.starLine, title: "Tốt" },
        { id: 5, icon: icon.star, iconActive: icon.starLine, title: "Rất tốt" },
    ];
    const { firstLoad, resultLoad, noti, onCloseNoti } = useNoti()
    const [comment, setComment] = useState(initComment)
    const onRateStar = (id: number) => {
        setComment({
            ...comment,
            rate: id,
        });
    };

    // handle OnchangeText
    const handleOnchangeText = (e: any) => {
        setComment({
            ...comment,
            body: e.target.value,
        });
    };

    // handle onchange post media
    const handleOnchangeMedia = async (e: any) => {
        const { original_url, model_id } = await postMedia(e)
        setComment({ ...comment, image_url: original_url, media_ids: [model_id].filter(Boolean) })
    };
    // handle remove media
    const onRemoveImgTemp = () => {
        setComment({ ...comment, image_url: null, media_ids: [] });
    };

    // handle post comment
    const onSubmitComment = async () => {
        firstLoad()
        try {
            await commentsApi.postComment2({
                ...pick(comment, 'media_ids', 'rate'),
                "body": `${comment.body} ‭`,
                "commentable_id": service.id,
                "commentable_type": 'SERVICE',
                "organization_id": org.id,
            })
            resultLoad(`Cảm ơn ${USER?.fullname} đã đánh giá dịch vụ`)
            setComment(initComment)
        } catch (error) {
            console.log(error)
            resultLoad('Có lỗi xảy ra. Vui lòng thử lại')
        }
    };
    return (
        <>
            <Dialog
                fullScreen={IS_MB}
                open={open}
                onClose={() => setOpen(false)}
            >
                {IS_MB && open && (
                    <HeadMobile
                        onBack={() => setOpen(false)}
                        title="Đánh giá"
                    />
                )}
                <div className="review-service">
                    <div className="review-service-head">
                        <div className="review-service__title">
                            Đánh giá dịch vụ
                        </div>
                        <div className="flex-row-sp review-service__item">
                            <img
                                src={
                                    service?.image
                                        ? service?.image_url
                                        : org?.image_url
                                }
                                alt=""
                                className="left"
                                onError={(e) => onErrorImg(e)}
                            />
                            <div className="right">
                                <div>
                                    <span className="service-name">
                                        {service?.service_name}
                                    </span>
                                    <span className="service-desc">
                                        {service?.description}
                                    </span>
                                </div>
                                <div className="flex-row right_org">
                                    <img
                                        src={org?.image_url}
                                        alt=""
                                        className="right_org_img"
                                        onError={(e) => onErrorImg(e)}
                                    />
                                    <span className="right_org_name">
                                        {org?.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="review-service__star">
                            <span className="title">
                                Bạn cảm thấy dịch vụ thế nào ?
                            </span>
                            <ul className="star-list">
                                {rateStars.map((item) => (
                                    <li
                                        onClick={() =>
                                            onRateStar(item.id)
                                        }
                                        className="flex-column"
                                        key={item.id}
                                    >
                                        <img
                                            src={
                                                item.id <= comment.rate
                                                    ? item.icon
                                                    : item.iconActive
                                            }
                                            alt=""
                                            className="start-icon"
                                        />
                                        <span className="star-feed">
                                            {item.title}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="review-service__text">
                            <textarea
                                placeholder="Vui lòng để lại đánh giá của bạn ..."
                                value={comment.body}
                                onChange={(e) => handleOnchangeText(e)}
                                rows={4}
                                className="review-service__ip"
                            />
                            <div className="review-service__upload">
                                <div
                                    style={{ width: "20px" }}
                                    className="upload-img"
                                >
                                    <label htmlFor="file">
                                        <img src={icon.addImg} alt="" />
                                    </label>
                                    <input
                                        hidden
                                        id="file"
                                        type="file"
                                        name="file"
                                        accept="image/png, image/jpeg, video/mp4"
                                        onChange={(e) => handleOnchangeMedia(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        {comment.image_url && (
                            <div
                                style={{ marginTop: "24px" }}
                                className="evaluate-input__upload"
                            >
                                <img
                                    src={comment.image_url}
                                    className="evaluate-upload__img"
                                    alt=""
                                />
                                <button
                                    className="btn-close"
                                    onClick={onRemoveImgTemp}
                                >
                                    <img src={icon.closeCircle} alt="" />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="review-service__btn">
                        <XButton
                            title="Gửi đánh giá"
                            loading={noti.load}
                            onClick={onSubmitComment}
                        />
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    open={noti.openAlert}
                    autoHideDuration={4000}
                    onClose={onCloseNoti}
                >
                    <Alert onClose={onCloseNoti} severity="success" sx={{ width: '100%' }}>
                        Cảm ơn {USER?.fullname} đã đánh giá dịch vụ
                    </Alert>
                </Snackbar>
            </Dialog>
        </>
    );
}

export default ServiceReview;
