import style from "./chatleft.module.css";
import icon from "constants/icon";
import { useHistory, useLocation } from "react-router-dom";
import { useDeviceMobile, useSwrInfinite } from "hooks";
import { useSelector } from "react-redux";
import IStore from "interface/IStore";
import { ITopic } from "interface";
import { useGetOrgDetailQuery } from "redux-toolkit-query/hook-org";
import { formatDateFromNow } from "utils";

export default function ChatLeft(props: any) {
  const { CHAT_SHOW } = props;
  const { USER } = useSelector((state: IStore) => state.USER)
  const IS_MB = useDeviceMobile();

  const { resData } = useSwrInfinite<ITopic>(
    USER,
    '/topics',
    { "sort": "-updated_at" }
  )
  return (
    <>
      <div
        style={
          IS_MB && CHAT_SHOW === "right"
            ? {
              marginLeft: "-100vw",
            }
            : {}
        }
        className={style.chatLeft}
      >
        <div className={style.leftHead}>
          <div className={style.leftHeadInfo}>
            <div className={style.leftHeadTitle}>
              <p className={style.headText}>Messages</p>
              <p className={style.headTotal}>40</p>
            </div>
            <div className={style.headBtnGroup}>
              <img src={icon.plusPurple} alt="" />
            </div>
          </div>
          <div className={style.chatSearch}>
            <img src={icon.searchGray} alt="" />
            <input type="text" placeholder="Search" />
          </div>
        </div>

        <ul className={style.chatLeftList}>
          {resData.map(item => (
            <TopicItem key={item._id} topic={item} />
          ))}
        </ul>
      </div>
    </>
  );
}
const TopicItem = ({ topic }: { topic: ITopic }) => {
  const history = useHistory();
  const location = useLocation();
  const onNavigate = () => {
    history.push(`/chat/${topic.organization_id}/${topic._id}`);
  };
  const { data } = useGetOrgDetailQuery(topic.organization_id)
  return (
    <li
      style={
        location.pathname === `/chat/${topic.organization_id}/${topic._id}`
          ? {
            borderLeft: "4px solid var(--purple)",
            backgroundColor: "#e3e0f1",
            transition: "all 0.3s",
          }
          : {}
      }
      onClick={onNavigate}
      className={style.chatItem}
    >
      <div className={style.itemTop}>
        <div className={style.itemTopLeft}>
          <div
            style={
              location.pathname === `/chat/${topic.organization_id}/${topic._id}`
                ? { visibility: "hidden" }
                : {}
            }
            className={style.itemDot}
          ></div>
          <div className={style.itemUser}>
            <div className={style.itemAva}>
              <img src={data?.image_url} alt="" />
              <div className={style.itemActive}></div>
            </div>
            <div className={style.itemInfo}>
              <div className={style.itemName}>{data?.name}</div>
              <div className={style.itemNameOrg}>@{data?.subdomain}</div>
            </div>
          </div>
        </div>
        <p className={style.chatTimeAgo}>
          {formatDateFromNow(topic.created_at)}
        </p>
      </div>
      {
        topic.messages.length > 0 &&
        <p className={style.itemBot}>
          {topic.messages[0]?.msg}
        </p>
      }
    </li>
  )
}
