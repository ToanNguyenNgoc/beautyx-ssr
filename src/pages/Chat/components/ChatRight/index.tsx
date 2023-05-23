import { useDeviceMobile, useSwrInfinite } from "hooks";
import InputChat from "pages/Chat/components/ChatRight/InputChat";
import style from "./chatright.module.css";
import HeadChatRight from "pages/Chat/components/ChatRight/HeadChatRight";
import { useSelector } from "react-redux";
import IStore from "interface/IStore";
import { formatDateFromNow, linkify } from "utils";
import { useParams } from "react-router-dom";
import { IMessage } from "interface";
import { } from 'swr'

export default function ChatRight(props: any) {
  const { CHAT_SHOW } = props;
  const params = useParams()
  const { USER } = useSelector((state: IStore) => state.USER)
  const IS_MB = useDeviceMobile();
  const { resData, mutate, originData } = useSwrInfinite({
    enable:params._id,
    API_URL:`/messages`,
    params: { 'topic_id': params._id, 'sort': 'created_at' },
    dedupingInterval:0
  })
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
      className={style.chatRight}
    >
      <HeadChatRight CHAT_SHOW={CHAT_SHOW} />
      <ul className={style.chatListMessage}>
        {resData?.map(item => (
          <li
            style={item?.user_id === USER?.id ? {
              flexDirection: "row-reverse",
              marginLeft: "auto",
            } : {}}
            key={item._id}
            className={style.chatListItem}
          >
            {
              item?.user_id !== USER?.id &&
              <div className={style.itemAva}>
                <img src="https://source.unsplash.com/random" alt="" />
                <div className={style.itemActive}></div>
              </div>
            }
            <div className={style.itemInfo}>
              <div className={style.itemName}>
                {/* {item.user_id !== USER.id && <p>{item.fullname}</p>} */}
                <p>{formatDateFromNow(item.created_at)}</p>
              </div>
              <p
                style={item.user_id === USER?.id ? {
                  borderRadius: "8px 0px 8px 8px",
                  backgroundColor: "var(--purple)",
                  color: "#fff",
                } : {}}
                className={style.itemMessager}
                dangerouslySetInnerHTML={{ __html: linkify(item.msg) }}
              />
            </div>
          </li>
        ))}
        <Typing />
      </ul>
      {
        ((IS_MB && CHAT_SHOW === 'right') || !IS_MB) &&
        <InputChat topic_id={params._id as string} mutate={mutate} />
      }
    </div>
  );
}
const Typing = () => {
  return (
    <div className={style.chatBubble}>
      <div className={style.typing}>
        <div className={style.dot} />
        <div className={style.dot} />
        <div className={style.dot} />
      </div>
    </div>
  );
}

