import bgNotiBtxPoint from "assets/image/bgNotiBtxPoint.png";

import { Dialog } from "@mui/material";
import style from "./notification.module.css";
import icon from "constants/icon";
import img from "constants/img";
import React from "react";
import { XButton } from "components/Layout";

interface PopupBtxRewardProps {
    setOpen?: (open: boolean) => void;
    open: boolean;
    fullScreen?: boolean;
}
export default function PopupBtxReward(props: PopupBtxRewardProps) {
    const { setOpen, open = true, fullScreen } = props;
    const onClose = () => {
        if (setOpen) setOpen(false);
    };
    return (
        <Dialog
            PaperProps={{
                style: {
                    backgroundColor: "transparent",
                    overflowY: "unset",
                    borderRadius: "16px",
                },
            }}
            open={open}
            onClose={onClose}
        >
            <div
                style={{ backgroundImage: `url(${img.bgNotiBtxPoint})` }}
                className={style.popup_btx_reward}
            >
                <img
                    className={style.icon_btx_reward}
                    src={icon.coins}
                    alt=""
                />
                <h2 className={style.title_btx_reward}>
                    Chúc mừng bạn nhận được
                </h2>
                <p className={style.point_btx_reward}>500 BTX</p>
                <span className={style.note_btx_reward}>
                    (Từ đơn hàng trị nám chuyên sâu)
                </span>
                <span className={style.desc_btx_reward}>
                    BTX Coins dùng để sử dụng đổi các phần quà giá trị
                </span>
                <XButton
                    onClick={onClose}
                    title="Đóng"
                    className={style.btn_btx_reward}
                />
            </div>
        </Dialog>
    );
}
