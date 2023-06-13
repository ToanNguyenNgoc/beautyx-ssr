import { useAuth, useSwrInfinite } from "hooks";
import { ITopic } from "interface";
import { paramsTopic } from "params-query";
import { useState } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import { Loader, Right } from "./components"
import style from "./message.module.css"
import icon from "constants/icon";
import InfiniteScroll from "react-infinite-scroll-component";
import { formatDateFromNow, onErrorAvatar, unique } from "utils";
import AuthRoute from "route/AuthRoute";

function Messenger() {
  const { USER } = useAuth()
  const [query,] = useState(paramsTopic)
  const location = useLocation()
  const topic_id = location.pathname.split("/")[2]
  const { resData, onLoadMore, totalItem } = useSwrInfinite({
    API_URL: "topics",
    enable: USER,
    params: query,
    dedupingInterval: 0
  })
  const more = () => { if (resData.length < totalItem) { onLoadMore() } }
  return (
    <div className={style.container}>
      <div className={topic_id ? `${style.left} ${style.left_ch}` : style.left}>
        <div className={style.left_head}>
          <div className={style.left_head_top}>
            <span className={style.left_head_txt}>Chat</span>
            <div className={style.left_head_ctl}></div>
          </div>
          <div className={style.left_head_bot}>
            <img src={icon.searchGray} alt="" />
            <input type="text" placeholder="Tìm kiếm trong tin nhắn..." />
          </div>
        </div>
        <div className={style.left_body}>
          <InfiniteScroll
            hasMore={true}
            height={`calc(100vh - 172px)`}
            dataLength={resData.length}
            loader={resData.length < totalItem && <Loader />}
            next={more}
          >
            <ul className={style.topic_list}>
              {
                resData.map((item: ITopic) => (
                  <li key={item._id} className={style.topic_cnt}>
                    <Topic item={item} />
                  </li>
                ))
              }
            </ul>
          </InfiniteScroll>
        </div>
      </div>
      <Switch>
        <AuthRoute>
          <Route path="/messages/:_id">
            <div
              style={{ backgroundColor: 'var(--white)' }}
              className={topic_id ? `${style.right} ${style.right_ch}` : style.right}
            >
              <Right />
            </div>
          </Route>
        </AuthRoute>
      </Switch>
    </div>
  );
}

export default Messenger;

const Topic = ({ item }: { item: ITopic }) => {
  const location = useLocation()
  let name = item.name
  if (item.name?.trim().length === 0 || !item.name) {
    name = unique(item.topic_user?.map(i => i.user?.fullname).filter(Boolean)).join(", ")
  }
  const topic_id = location.pathname.split("/")[2]
  return (
    <Link
      style={item._id === topic_id ? { backgroundColor: 'var(--bg-color)' } : {}}
      to={{ pathname: `/messages/${item._id}`, state: item }}
      className={style.topic}
    >
      <div className={style.topic_left}>
        <div className={style.topic_left_img}>
          <img src={item.topic_user[0]?.user?.avatar || ''} onError={onErrorAvatar} alt="" />
          <span className={style.topic_left_online}></span>
        </div>
      </div>
      <div className={style.topic_right}>
        <span className={style.topic_name}>
          {name}
        </span>
        <div className={style.topic_message}>
          <span>{item.messages[0]?.msg}</span>
          <span>{formatDateFromNow(item.updated_at)}</span>
        </div>
      </div>
    </Link>
  )
}