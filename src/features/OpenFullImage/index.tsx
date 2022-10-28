import React from "react";
import { Dialog } from "@mui/material";
import { IComment } from "../../interface/comments";
import formatDate from "../../utils/formatDate";
import "./full-img.css";
import icon from "../../constants/icon";
import useFullScreen from "../../utils/useDeviceMobile";

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    comment?: IComment;
    image_url?: string;
}

function FullImage(props: IProps) {
    const { open, setOpen, comment } = props;
    const fullScreen = useFullScreen();
    let body;
    try {
        const cmt = JSON.parse(`${comment?.body}`);
        body = {
            text: cmt?.text,
            image_url: cmt?.image_url,
        };
    } catch (error) {
        body = {
            text: comment?.body,
            image_url: "",
        };
    }
    return (
        <Dialog
            open={open}
            fullScreen={fullScreen}
            onClose={() => setOpen(false)}
        >
            <div className="full-img-cnt">
                <div className="full-img-cnt__head">
                    <button onClick={() => setOpen(false)}>
                        <img src={icon.closeCircleWhite} alt="" />
                    </button>
                </div>
                {(body.image_url?.length > 0) && (
                    <img
                        className="full-img-cnt__img"
                        src={body.image_url}
                        alt=""
                    />
                )}
                {
                    comment?.media_url && comment?.media_url.length > 0 && (
                    <div
                        style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            className="full-img-cnt__img"
                            src={comment?.media_url[0]}
                            alt=""
                        />
                    </div>
                )}
                {comment && (
                    <div className="full-img-cnt__de">
                        <div className="flex-row full-img-cnt__de-info">
                            <div className="avatar">
                                <span>
                                    {comment?.user?.fullname?.slice(0, 1) ||
                                        "K"}
                                </span>
                            </div>
                            <span className="full-name">
                                {comment?.user?.fullname || "Khách"}
                            </span>
                            <span className="create">
                                {formatDate(comment?.created_at)}
                            </span>
                        </div>
                        <span className="full-img-cnt__de-text">
                            {body.text}
                        </span>
                    </div>
                )}
            </div>
        </Dialog>
    );
}

export default FullImage;
