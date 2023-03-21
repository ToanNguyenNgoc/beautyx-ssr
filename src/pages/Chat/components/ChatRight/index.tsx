import InputChat from "pages/Chat/components/ChatRight/InputChat";
import Typing from "pages/Chat/components/Typing";
import style from "./chatright.module.css";
import HeadChatRight from "pages/Chat/components/ChatRight/HeadChatRight";
import { useState, useEffect } from 'react'
import { useDeviceMobile } from "hooks";


export default function ChatRight(props: any) {
  const { data, ACC_SHOW, socket, USER } = props;
  const IS_MB = useDeviceMobile();

  const [message, setMessage] = useState<any>([])
  useEffect(() => {
    socket.on('get_message', (data: any) => setMessage(data))
  }, [socket])

  return (
    <div
      style={
        IS_MB && ACC_SHOW === "right"
          ? {
            marginLeft: "0px",
            padding: "0 16px 200px 16px",
          }
          : {}
      }
      className={style.chatRight}
    >
      {/* head */}
      <HeadChatRight ACC_SHOW={ACC_SHOW} />
      {/* close head */}

      {/* list chat */}
      <ul className={style.chatListMessage}>
        {message?.map((item: any, index: number) => (
          <li
            style={item?.id === USER?.id ? {
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
                {item.id !== USER.id && <p>{item.fullname}</p>}
                <p>15:00</p>
              </div>
              <p
                style={item.id === USER.id ? {
                  borderRadius: "8px 0px 8px 8px",
                  backgroundColor: "var(--purple)",
                  color: "#fff",
                } : {}}
                className={style.itemMessager}
              >
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio, dolores! Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Distinctio, dolores! */}
                {item?.body}
              </p>
            </div>
          </li>
        ))}

        {/* <li
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
        </li> */}

        <Typing />
      </ul>
      {/* close list chat */}

      {/* foot */}
      <InputChat socket={socket} ACC_SHOW={ACC_SHOW} />
      {/* close foot */}
    </div>
  );
}

