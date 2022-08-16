import React, { useState } from "react";
import { Alert, Dialog, Snackbar } from "@mui/material";
import onErrorImg from "../../../utils/errorImg";
import HeadMobile from "../../HeadMobile";
import icon from "../../../constants/icon";
import ButtonLoading from "../../../components/ButtonLoading";
import { postAsyncComment } from "../../../redux/org_services/serviceSlice";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../../redux/status";
import useFullScreen from "../../../utils/useDeviceMobile";
import { useHistory } from "react-router-dom";
import {
    clearPrevState,
    postAsyncMediaComment,
} from "../../../redux/commentSlice";
import { identity, pickBy } from "lodash";

function ServiceReview(props: any) {
    const { open, setOpen, service, org } = props;
    const IS_MB = useFullScreen();
    const dispatch = useDispatch();
    const history = useHistory();
    const { USER } = useSelector((state: any) => state.USER);
    const { status_cmt } = useSelector((state: any) => state.SERVICE.COMMENTS);
    const COMMENTS = useSelector((state: any) => state.COMMENT);
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
    const [comment, setComment] = useState({
        text: "",
        image_url: null,
        star: 0,
        used: true
    })
    const [alert, setAlert] = useState(false)
    const onRateStar = (id: number) => {
        setComment({
            ...comment,
            star: id,
        });
    };

    // handle OnchangeText
    const handleOnchangeText = (e: any) => {
        setComment({
            ...comment,
            text: e.target.value,
        });
    };

    // handle onchange post media
    const handleOnchangeMedia = (e: any) => {
        const media = e.target.files[0];
        if (comment.used === true && media) {
            handlePostMedia(media);
        } else {
            history.push("/sign-in?1");
        }
    };

    // handle post media
    const handlePostMedia = async (media: any) => {
        let formData = new FormData();
        formData.append("file", media);
        try {
            await dispatch(postAsyncMediaComment(media));
            setComment({
                ...comment,
                image_url: COMMENTS.image_url,
            });
        } catch (error) {
            console.log(error);
        }
    };

    // handle remove media
    const onRemoveImgTemp = () => {
        setComment({ ...comment, image_url: null });
        dispatch(clearPrevState());
    };

    // handle post comment
    const onSubmitComment = async () => {
        const valuesStr = {
            type: "SERVICE",
            id: service?.id,
            org_id: org?.id,
            body: JSON.stringify({
                ...comment,
                image_url: COMMENTS.image_url,
            }),
        };
        const values = pickBy(valuesStr, identity);
        if (USER && comment.text.length > 0) {
            const res = await dispatch(
                postAsyncComment({ values, user: USER.USER })
            );
            if (res?.meta?.requestStatus === "fulfilled") {
                setOpen(false);
                dispatch(clearPrevState());
                setComment({
                    ...comment,
                    text: "",
                    image_url: null,
                    star: 0,
                    used: true,
                });
            }
        }
    };

    let loading = false;
    if (status_cmt === STATUS.LOADING) {
        loading = true;
    }
    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                open={alert}
                autoHideDuration={4000}
                onClose={() => setAlert(false)}
            >
                <Alert onClose={() => setAlert(false)} severity="success" sx={{ width: '100%' }}>
                    Cảm ơn {USER?.fullname} đã đánh giá dịch vụ
                </Alert>
            </Snackbar>
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
                                                item.id <= comment.star
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
                                value={comment.text}
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
                        {COMMENTS && COMMENTS.image_url && (
                            <div
                                style={{ marginTop: "24px" }}
                                className="evaluate-input__upload"
                            >
                                <img
                                    src={COMMENTS.image_url}
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
                        <ButtonLoading
                            title="Gửi đánh giá"
                            loading={loading}
                            onClick={onSubmitComment}
                        />
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default ServiceReview;
