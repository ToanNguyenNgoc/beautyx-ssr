import React, { useEffect, useState, KeyboardEvent } from "react";
import Head from "../Head";
import { useLocation } from "react-router-dom";
import { IComment } from "../../interface/comments";
import commentsApi from "../../api/commentsApi";
import icon from "../../constants/icon";
import { Container } from "@mui/material";
import SignInUp from "../poupSignInUp";
import mediaApi from "../../api/mediaApi";
import { useSelector } from "react-redux";
import { XButton } from "components/Layout";

interface IData {
    comments: IComment[];
    page: number;
    totalItem: number;
    loadPage: boolean;
}
interface ICmtTemp {
    text: string;
    image_url: string;
}

function CommentsDetail() {
    const location: any = useLocation();
    const USER = useSelector((state: any) => state.USER);
    const profile = USER.USER;
    const search = location.search.slice(1, location.search.length);
    const params = {
        comment_type: search.split(",")[0],
        org_id: search.split(",")[1],
        id: search.split(",")[2],
    };
    const [data, setData] = useState<IData>({
        comments: [],
        page: 1,
        totalItem: 1,
        loadPage: false,
    });
    const [cmt, setCmt] = useState({
        text: "",
        image_url: "",
    });
    const [cmtTemp, setCmtTemp] = useState<ICmtTemp[]>([]);
    const [open, setOpen] = useState(false);
    const handleGetComments = async () => {
        try {
            const res = await commentsApi.getComments({
                type: params.comment_type,
                id: params.id,
                org_id: params.org_id,
                page: data.page,
            });
            setData({
                ...data,
                comments: [...data.comments, ...res.data.context.data],
                totalItem: res.data.context.total,
                loadPage: false,
            });
        } catch (error) {
            console.log(error);
            setData({ ...data, loadPage: false });
        }
    };
    useEffect(() => {
        handleGetComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.page]);
    //handle post image
    const handlePostImageMedia = async (form: any) => {
        let formData = new FormData();
        formData.append("file", form);
        try {
            const res = await mediaApi.postMedia(formData);
            setCmt({
                ...cmt,
                image_url: res.data.context.original_url,
            });
        } catch (error) {
            console.log(error);
        }
    };
    const onChangeMedia = (e: any) => {
        const media = e.target.files[0];
        handlePostImageMedia(media);
    };

    const handlePostComment = async () => {
        try {
            await commentsApi.postComment({
                type: params.comment_type,
                id: params.id,
                org_id: params.org_id,
                body: JSON.stringify(cmt),
            });
            setCmtTemp([...cmtTemp, cmt].reverse());
        } catch (error) {
            console.log(error);
        }
    };
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
            if (profile) {
                handlePostComment();
                setCmt({
                    text: "",
                    image_url: "",
                });
            } else {
                setOpen(true);
            }
        }
    };
    const onRemoveImageTemp = () => {
        setCmt({
            ...cmt,
            image_url: "",
        });
    };
    const onPage = () => {
        setData({
            ...data,
            page: data.page + 1,
            loadPage: true,
        });
    };
    return (
        <>
            <SignInUp
                openSignIn={open}
                setOpenSignIn={setOpen}
                activeTabSign={1}
            />
            <Head />
            <Container>
                <div className="merchantComment">
                    <div className="merchantComment-left">
                        <div className="merchantComment-left__vote">
                            <span className="vote-star">5.0</span>
                            <div className="all-star">
                                <img src={icon.star} alt="" />
                                <img src={icon.star} alt="" />
                                <img src={icon.star} alt="" />
                                <img src={icon.star} alt="" />
                                <img src={icon.star} alt="" />
                            </div>
                            <span className="evaluate">189 đánh giá</span>
                        </div>
                        <div className="merchantComment-left__evaluates">
                            <div className="merchantComment-left__item">
                                <span>Xuất sắc</span>
                                <div className="line"></div>
                                <div className="total">175</div>
                            </div>
                            <div className="merchantComment-left__item">
                                <span>Rất tốt</span>
                                <div className="line"></div>
                                <div className="total">11</div>
                            </div>
                            <div className="merchantComment-left__item">
                                <span>Trung bình</span>
                                <div className="line"></div>
                                <div className="total">1</div>
                            </div>
                            <div className="merchantComment-left__item">
                                <span>Tồi</span>
                                <div className="line"></div>
                                <div className="total">1</div>
                            </div>
                            <div className="merchantComment-left__item">
                                <span>Tồi tệ</span>
                                <div className="line"></div>
                                <div className="total">1</div>
                            </div>
                        </div>
                    </div>
                    <div className="merchantComment-right">
                        <div className="flex-row-sp sign-form__box">
                            <input
                                autoComplete="off"
                                value={cmt.text}
                                onChange={(e) =>
                                    setCmt({ ...cmt, text: e.target.value })
                                }
                                onKeyDown={handleKeyDown}
                                placeholder="Nhập bình luận ..."
                            />
                            <div
                                title="Thêm hình"
                                className="merchantComment-img"
                            >
                                <label htmlFor="file">
                                    <img src={icon.Camera_purple} alt="" />
                                </label>
                            </div>
                            <input
                                hidden
                                id="file"
                                type="file"
                                name="file"
                                accept="image/png, image/jpeg"
                                onChange={onChangeMedia}
                            />
                        </div>
                        {cmt.image_url?.length > 0 && (
                            <div className="input-image">
                                <img
                                    className="input-image__temp"
                                    src={cmt.image_url}
                                    alt=""
                                />
                                <button onClick={onRemoveImageTemp}>
                                    <img src={icon.closeCircle} alt="" />
                                </button>
                            </div>
                        )}
                        {data.comments.length < data.totalItem && (
                            <div className="comment-bot">
                                <XButton
                                    title="Xem thêm đánh giá"
                                    onClick={onPage}
                                    loading={data.loadPage}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
}

export default CommentsDetail;
