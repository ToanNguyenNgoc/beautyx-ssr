import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import mediaApi from "../../api/mediaApi";
import icon from "../../constants/icon";
import BeautyLoading from "../../components/BeautyxLoading";
import {
    postAsyncMediaComment,
    clearPrevState,
} from "../../redux/commentSlice";
import { STATUS } from "../../redux/status";
import { AppContext } from "../../context/AppProvider";
interface IProps {
    handleOnchange?: any;
    comment: any;
    setComment: (comment: any) => void;
    handleKeyDown: any;
    user: any;
    handlePostComment: any;
    InputRef?: any;
    changeStyle?: any;
}

function EvaluateInput(props: IProps) {
    const {
        handleOnchange,
        comment,
        handleKeyDown,
        user,
        handlePostComment,
        setComment,
        changeStyle,
    } = props;
    const { t } = useContext(AppContext);
    const dispatch = useDispatch();
    const { image_url, status } = useSelector((state: any) => state.COMMENT);
    const history = useHistory();
    //handle post media
    const onChangeMedia = (e: any) => {
        const media = e.target.files[0];
        if (user && media) {
            handlePostMedia(media);
        } else if (!user) {
            history.push("/sign-in?1");
        }
    };
    const handlePostMedia = async (media: any) => {
        let formData = new FormData();
        formData.append("file", media);
        try {
            await dispatch(postAsyncMediaComment(media));
            setComment({
                ...comment,
                image_url: image_url,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const onRemoveImgTemp = () => {
        setComment({ ...comment, image_url: null });
        dispatch(clearPrevState());
    };
    return (
        <>
            <div
                className={
                    changeStyle
                        ? "evaluate-input evaluate-input__change"
                        : "evaluate-input"
                }
            >
                <div className="evaluate-input__ava">
                    <img
                        src={user?.avatar ? user.avatar : icon.userNotSign}
                        alt=""
                    />
                </div>
                <div className="evaluate-input__wrap">
                    <input
                        onChange={handleOnchange}
                        onKeyDown={handleKeyDown}
                        placeholder={`${t("detail_item.write_a_comment")} ...`}
                        type="text"
                        name={comment.text}
                        id="comment"
                        value={comment.text}
                    />
                    <div className="input-btn">
                        <div
                            style={{ width: "20px", marginLeft: "6px" }}
                            className="in-cmt"
                        >
                            <label htmlFor="file">
                                <img src={icon.addImg} alt="" />
                            </label>
                            <input
                                hidden
                                id="file"
                                type="file"
                                name="file"
                                accept="image/png, image/jpeg"
                                onChange={onChangeMedia}
                            />
                        </div>
                        <img
                            onClick={() => {
                                handlePostComment();
                            }}
                            style={{ width: "20px" }}
                            src={icon.sendComment}
                            alt=""
                        />
                    </div>
                </div>
            </div>
            {image_url && status === STATUS.SUCCESS && (
                <div className="evaluate-input__upload">
                    <img
                        src={image_url}
                        className="evaluate-upload__img"
                        alt=""
                    />
                    <button className="btn-close" onClick={onRemoveImgTemp}>
                        <img src={icon.closeCircle} alt="" />
                    </button>
                </div>
            )}
            {status === STATUS.LOADING && <BeautyLoading />}
        </>
    );
}
export default React.memo(EvaluateInput);
