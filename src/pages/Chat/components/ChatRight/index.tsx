import { useDeviceMobile, useElementOnScreen } from "hooks";
import InputChat from "pages/Chat/components/ChatRight/InputChat";
import Typing from "pages/Chat/components/Typing";
import style from "./chatright.module.css";
import HeadChatRight from "pages/Chat/components/ChatRight/HeadChatRight";
import { XButton } from "components/Layout";
import icon from "constants/icon";
import { useEffect, useRef, useState } from "react";
export default function ChatRight(props: any) {
  const { data, CHAT_SHOW } = props;
  const IS_MB = useDeviceMobile();
  const refListChat = useRef<any>(null);
  const messagesEndRef = useRef<any>(null);
  const bottomRef = useRef<any>(null);
  const [showButton, setShowButton] = useState(true);

  // useEffect(() => {
  //   let scrollTopValue = refListChat?.current.crollTop;
  //   console.log(scrollTopValue);
  //   function handleScroll() {
  //     if (refListChat?.current.scrollHeight > scrollTopValue) {
  //       setShowButton(true);
  //     } else {
  //       setShowButton(false);
  //     }
  //   }
  //   refListChat.current.addEventListener("scroll", handleScroll());
  //   return () =>
  //     refListChat.current.removeEventListener("scroll", handleScroll());
  // }, []);

  const scrollToBottom = () => {
    // messagesEndRef.current?.scrollIntoView({
    //   behavior: "smooth",
    // });
  };

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
      {/* head */}
      <HeadChatRight CHAT_SHOW={CHAT_SHOW} />
      {/* close head */}

      {/* list chat */}
      <ul className={style.chatListMessage}>
        {data.map((item: any) => (
          <li key={item.id} className={style.chatListItem}>
            <div className={style.itemAva}>
              <img src="https://source.unsplash.com/random" alt="" />
              <div className={style.itemActive}></div>
            </div>
            <div className={style.itemInfo}>
              <div className={style.itemName}>
                <p>Lorem input</p>
                <p>15:00</p>
              </div>
              <p className={style.itemMessager}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio, dolores! Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Distinctio, dolores!
              </p>
            </div>
          </li>
        ))}

        <li
          style={{
            flexDirection: "row-reverse",
            marginLeft: "auto",
          }}
          className={style.chatListItem}
        >
          <div style={{ display: "none" }} className={style.itemAva}>
            <img src="" alt="" />
            <div className={style.itemActive}></div>
          </div>
          <div className={style.itemInfo}>
            <div className={style.itemName}>
              <p>You</p>
              <p>15:00</p>
            </div>
            <p
              style={{
                borderRadius: "8px 0px 8px 8px",
                backgroundColor: "var(--purple)",
                color: "#fff",
              }}
              className={style.itemMessager}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio, dolores! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Distinctio, dolores!
            </p>
          </div>
        </li>

        <Typing />
        <div ref={messagesEndRef} />
      </ul>
      {/* close list chat */}

      {showButton === true ? (
        <XButton
          className={style.btnScrollBot}
          onClick={scrollToBottom}
          icon={icon.ArrowDownWhite}
        />
      ) : (
        <></>
      )}

      {/* foot */}
      <InputChat CHAT_SHOW={CHAT_SHOW} />
      {/* close foot */}
    </div>
  );
}
