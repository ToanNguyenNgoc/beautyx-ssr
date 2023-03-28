import { useDeviceMobile } from "hooks";
import InputChat from "pages/Chat/components/ChatRight/InputChat";
import Typing from "pages/Chat/components/Typing";
import style from "./chatright.module.css";
import HeadChatRight from "pages/Chat/components/ChatRight/HeadChatRight";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import IStore from "interface/IStore";
import { linkify } from "utils";


export default function ChatRight(props: any) {
  const { data, CHAT_SHOW } = props;
  const { USER } = useSelector((state: IStore) => state.USER)
  const IS_MB = useDeviceMobile();
  const refListChat = useRef<any>(null);
  const messagesEndRef = useRef<any>(null);

  const [message, setMessage] = useState<any>([])

  return (
    <div
      style={
        IS_MB && CHAT_SHOW === "right"
          ? {
            marginLeft: "0px",
            padding: "0 16px 124px 16px",
          }
          : {}
      }
      ref={refListChat}
      className={style.chatRight}
    >
      <HeadChatRight CHAT_SHOW={CHAT_SHOW} />
      <ul className={style.chatListMessage}>
        {message?.map((item: any, index: number) => (
          <li
            style={item?.user_id === USER?.id ? {
              flexDirection: "row-reverse",
              marginLeft: "auto",
            } : {}}
            key={index}
            className={style.chatListItem}
          >
            <div className={style.itemAva}>
              <img src="https://source.unsplash.com/random" alt="" />
              <div className={style.itemActive}></div>
            </div>
            <div className={style.itemInfo}>
              <div className={style.itemName}>
                {item.user_id !== USER.id && <p>{item.fullname}</p>}
                <p>15:00</p>
              </div>
              <p
                style={item.user_id === USER.id ? {
                  borderRadius: "8px 0px 8px 8px",
                  backgroundColor: "var(--purple)",
                  color: "#fff",
                } : {}}
                className={style.itemMessager}
                dangerouslySetInnerHTML={{ __html: linkify(item.body) }}
              />
            </div>
          </li>
        ))}
        <Typing />
        <div ref={messagesEndRef} />
      </ul>
      {
        ((IS_MB && CHAT_SHOW === 'right')||!IS_MB) &&
        <InputChat setMessage={setMessage} CHAT_SHOW={CHAT_SHOW} />
      }
    </div>
  );
}

