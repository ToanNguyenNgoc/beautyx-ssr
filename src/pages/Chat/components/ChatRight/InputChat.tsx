import { ChangeEvent, useEffect, useRef, useState } from "react";
// import Picker, { EmojiStyle } from "emoji-picker-react";
import style from "./chatright.module.css";
import { XButton } from "components/Layout";
import { postMediaMulti, useDeviceMobile } from "hooks";
import icon from "constants/icon";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import IStore from "interface/IStore";
import { checkHTML } from "utils";
import { MutatorCallback } from "swr/dist/types";
import { chatApi } from "api";


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

interface InputChatProps {
  mutate: (
    data?: any[] |
      Promise<any[]> |
      MutatorCallback<any[]> |
      undefined,
    shouldRevalidate?: boolean | undefined
  ) => Promise<any[] | undefined>,
  topic_id: string
}

export default function InputChat(props: InputChatProps) {
  const { mutate, topic_id } = props;
  const IS_MB = useDeviceMobile();
  const [inputStr, setInputStr] = useState<any>("");
  const [chat, setChat] = useState(initComment);
  const emojiRefCnt = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // const onEmojiClick = (event: any) => {
  //   setInputStr((prevInput: any) => prevInput + event.emoji);
  // };
  window.addEventListener(
    'click',
    () => emojiRefCnt.current?.classList.remove(style.emojiPicker_active)
  )

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      if (inputStr.length > 0) {
        textAreaRef.current.style.height =
          textAreaRef.current.scrollHeight + "px";
      }
    }
  };
  const { USER } = useSelector((state: IStore) => state.USER)
  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputStr(e.target.value)

  }

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
      onSendMessage()
    }
  }
  const onSendMessage = async () => {
    if (!checkHTML(inputStr)) {
      try {
        const res = await chatApi.postMessage({ msg: inputStr, topic_id: topic_id })
        console.log(res)
        mutate()
        setInputStr('')
      } catch (error) { }
    }
  }

  return (
    <>
      <div
        className={style.chatRightFoot}
      >
        <div className={style.inputChatWraper}>
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


          <div className={style.inputChat}>
            <textarea
              maxLength={1500}
              ref={textAreaRef}
              value={inputStr}
              onChange={onInputChange}
              rows={IS_MB ? 1 : 3}
              placeholder="Send a message"
              onKeyDown={handleKeyDown}
            />
            <div className={style.footBtns}>
              <div className={style.btnsWrap}>
                {/* {
                  !IS_MB &&
                  <div
                    className={style.btnIcon}
                  >
                    <img
                      className="emoji-icon"
                      alt=""
                      src={icon.smilePurple}
                      onClick={(e) => {
                        e.stopPropagation();
                        emojiRefCnt.current?.classList.toggle(style.emojiPicker_active)
                      }}
                    />
                    <div
                      onClick={(e) => e.stopPropagation()}
                      ref={emojiRefCnt}
                      className={style.emojiPicker}
                    >
                      <Picker
                        emojiStyle={EmojiStyle.APPLE}
                        onEmojiClick={onEmojiClick}
                      />
                    </div>
                  </div>
                } */}
                <div className={style.btnIcon}>
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
                  onClick={onSendMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
