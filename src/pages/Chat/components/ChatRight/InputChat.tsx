import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import style from "./chatright.module.css";
import { XButton } from "components/Layout";
import { useDeviceMobile } from "hooks";
import icon from "constants/icon";

export default function InputChat() {
  const IS_MB = useDeviceMobile();
  const [inputStr, setInputStr] = useState<any>("");
  const [showPicker, setShowPicker] = useState<any>(false);

  const onEmojiClick = (event: any) => {
    setInputStr((prevInput: any) => prevInput + event.emoji);
    setShowPicker(false);
  };

  const textAreaRef: any = useRef(null);

  const resizeTextArea = () => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };

  useEffect(resizeTextArea, [inputStr]);
  return (
    <>
      <div className={style.chatRightFoot}>
        <div className={style.footerWrapper}>
          <textarea
            maxLength={1500}
            ref={textAreaRef}
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
            rows={IS_MB ? 1 : 3}
            placeholder="Send a message"
          />
          <div className={style.footBtns}>
            <div className={style.btnsWrap}>
              <div
                style={IS_MB ? { display: "none" } : {}}
                className={style.btnIcon}
              >
                <img
                  className="emoji-icon"
                  alt=""
                  src={icon.smilePurple}
                  onClick={() => setShowPicker((val: any) => !val)}
                />
                {showPicker && (
                  <div className={style.emojiPicker}>
                    <Picker
                      // pickerStyle={{ width: "100%" }}
                      onEmojiClick={onEmojiClick}
                    />
                  </div>
                )}
              </div>
              <div className={style.btnIcon}>
                <img src={icon.imagePurple} alt="" />
              </div>
              <XButton title="Send" className={style.footBtnsSend} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
