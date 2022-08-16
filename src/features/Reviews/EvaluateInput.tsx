import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import icon from "../../constants/icon";
import BeautyLoading from "../../components/BeautyxLoading";
import {
    postAsyncMediaComment,
    clearPrevState,
    onSetComment,
} from "../../redux/commentSlice";
import { STATUS } from "../../redux/status";
import { AppContext } from "../../context/AppProvider";
import IStore from "../../interface/IStore";

interface IProps {
    handleOnchange?: any;
    handleKeyDown: any;
    user: any;
    handlePostComment: any;
    InputRef?: any;
    changeStyle?: any;
}

function EvaluateInput(props: IProps) {
    const {
        handleOnchange,
        handleKeyDown,
        user,
        handlePostComment,
        changeStyle,
    } = props;
    const { t } = useContext(AppContext);
    const dispatch = useDispatch();
    const { comment, status } = useSelector((state: IStore) => state.COMMENT_MEDIA);
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
        } catch (error) {
            console.log(error);
        }
    };

    const onRemoveImgTemp = () => {
        dispatch(onSetComment({
            image_url:"",
            media_ids:[]
        }));
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
                        // multiple
                        onChange={handleOnchange}
                        onKeyDown={handleKeyDown}
                        placeholder={`${t("detail_item.write_a_comment")} ...`}
                        type="text"
                        name={comment.body}
                        id="comment"
                        value={comment.body}
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
            {comment.image_url?.length > 0 && status === STATUS.SUCCESS && (
                <div className="evaluate-input__upload">
                    <img
                        src={comment.image_url}
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
