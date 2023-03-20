import  { useEffect, useRef, useState } from "react";
import Picker, {EmojiStyle} from "emoji-picker-react";
import style from "./chatright.module.css";
import { XButton } from "components/Layout";
import { postMediaMulti, useDeviceMobile } from "hooks";
import icon from "constants/icon";
import Skeleton from "react-loading-skeleton";
interface media_ids {
  model_id: number;
  original_url: string;
}
interface InitChat {
  media_ids: media_ids[];
}
const initComment: InitChat = {
  media_ids: [],
};
export default function InputChat(props: any) {
  const { ACC_SHOW } = props;
  const IS_MB = useDeviceMobile();
  const [inputStr, setInputStr] = useState<any>("");
  const [showPicker, setShowPicker] = useState<any>(false);
  const [chat, setChat] = useState(initComment);
  const onEmojiClick = (event: any) => {
    setInputStr((prevInput: any) => prevInput + event.emoji);
    setShowPicker(false);
  };

  const textAreaRef: any = useRef(null);

  const resizeTextArea = () => {
    textAreaRef.current.style.height = "auto";
    if (inputStr.length > 0) {
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

  const handleOnchangeMedia = async (e: any) => {
    const tempMedia: any[] = [];
    for (var i = 0; i < e.target.files.length; i++) {
      const tempMediaItem = {
        original_url: "",
        model_id: i,
      };
      tempMedia.push(tempMediaItem);
    }
    setChat({
      ...chat,
      media_ids: tempMedia,
    });
    const { mediaList } = await postMediaMulti(e);
    setChat({
      ...chat,
      media_ids: [
        ...chat.media_ids.filter((i) => i.original_url !== ""),
        ...mediaList,
      ],
    });
  };
  const onRemoveImg = (model_id: number) => {
    setChat({
      ...chat,
      media_ids: chat.media_ids.filter((i) => i.model_id !== model_id),
    });
  };

  useEffect(resizeTextArea, [inputStr]);
  return (
    <>
      <div
        style={
          IS_MB && ACC_SHOW === "left"
            ? {
                transform: "translateX(100%)",
              }
            : {}
        }
        className={style.chatRightFoot}
      >
        <div className={style.inputChatWraper}>
          {/* upload img */}
          {chat?.media_ids.length > 0 ? (
            <ul className={style.listUploadImg}>
              {chat?.media_ids.map((item: media_ids) => (
                <li className={style.imgItem}>
                  {item.original_url === "" ? (
                    <Skeleton className={style.skelton} />
                  ) : (
                    <>
                      <img src={item?.original_url} alt="" />
                      <div
                        onClick={() => onRemoveImg(item.model_id)}
                        className={style.removeImg}
                      >
                        <img src={icon.xWhite} alt="" />
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}

          {/* close upload img */}

          <div className={style.inputChat}>
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
                  {/* <img src={icon.addImg} alt="" /> */}
                  <label className={style.body_media_btn} htmlFor="media">
                    <img src={icon.addImg} alt="" />
                  </label>
                  <input
                    onChange={handleOnchangeMedia}
                    id="media"
                    multiple
                    hidden
                    accept="image/png, image/jpeg, image/jpg"
                    type="file"
                  />
                </div>
                <XButton
                  iconSize={24}
                  icon={IS_MB ? icon.sendComment : ""}
                  title={IS_MB ? "" : "Send"}
                  className={style.footBtnsSend}
                />
                {showPicker && (
                  <div className={style.emojiPicker}>
                    <Picker
                    emojiStyle={EmojiStyle.APPLE}
                      // pickerStyle={{ width: "100%" }}
                      onEmojiClick={onEmojiClick}
                    />
                  </div>
                )}
              </div>
              <div className={style.btnIcon}>
                <img src={icon.imagePurple} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
