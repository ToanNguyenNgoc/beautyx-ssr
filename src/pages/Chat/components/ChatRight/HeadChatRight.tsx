import React from "react";
import style from "./chatright.module.css";
import { useHistory } from "react-router-dom";
import icon from "constants/icon";
import { XButton } from "components/Layout";
import { useDeviceMobile } from "hooks";
export default function HeadChatRight(props: any) {
  const history = useHistory();
  const { CHAT_SHOW } = props;
  const IS_MB = useDeviceMobile();
  return (
    <>
      <div
        style={
          IS_MB && CHAT_SHOW === "left"
            ? {
                transform: "translateX(100%)",
              }
            : {}
        }
        className={style.chatRightHead}
      >
        <div className={style.rightHeadUser}>
          <div onClick={() => history.goBack()} className={style.rightHeadBack}>
            <img src={icon.chevronLeft} alt="" />
          </div>
          <div className={style.rightUserAva}>
            <img src="https://source.unsplash.com/random" alt="" />
          </div>
          <div className={style.rightUserContent}>
            <div className={style.rightUserName}>
              <p className={style.rightNameText}>User Name</p>
              <div className={style.userStatus}>
                <span></span>
                <span>Online</span>
              </div>
            </div>
            <p className={style.rightUserOrg}>@pmt</p>
          </div>
        </div>
        <div className={style.rightHeadBtns}>
          {/* <XButton
            icon={icon.phone}
            className={style.rightHeadBtn}
            title="Call"
          />
          <XButton className={style.rightHeadBtn} title="Archive" /> */}
          <XButton className={style.rightHeadBtn} title="View Organization" />
        </div>
      </div>
    </>
  );
}
