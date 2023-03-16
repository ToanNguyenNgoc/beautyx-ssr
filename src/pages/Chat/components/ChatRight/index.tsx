import { useDeviceMobile } from "hooks";
import InputChat from "pages/Chat/components/ChatRight/InputChat";
import Typing from "pages/Chat/components/Typing";
import style from "./chatright.module.css";
import HeadChatRight from "pages/Chat/components/ChatRight/HeadChatRight";
export default function ChatRight(props: any) {
  const { data, ACC_SHOW } = props;
  const IS_MB = useDeviceMobile();

  return (
    <div
      style={
        IS_MB && ACC_SHOW === "right"
          ? {
              marginLeft: "0px",
            }
          : {}
      }
      className={style.chatRight}
    >
      {/* head */}
      <HeadChatRight />
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
      </ul>
      {/* close list chat */}

      {/* foot */}
      <InputChat />
      {/* close foot */}
    </div>
  );
}
