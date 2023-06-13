/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useHistory } from "react-router-dom"
import { IMessage, ITopic } from "interface"
import style from "./right.module.css"
import { XButton } from "components/Layout"
import icon from "constants/icon"
import { formatDateFromNow, linkify, onErrorAvatar, unique, uniqueArr } from "utils"
import { useAuth, useElementOnScreen, useSwr, useSwrInfinite } from "hooks"
import InfiniteScroll from "react-infinite-scroll-component"
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState, KeyboardEvent } from "react"
import { AppContext, AppContextType } from "context"
import API_ROUTE from "api/_api"
import { CACHE_TIME } from "common"
import moment from "moment"
import { chatApi } from "api"
import { CircularProgress } from "@mui/material"


export const Right = () => {
  const { echo } = useContext(AppContext) as AppContextType
  const { USER: user } = useAuth()
  const location = useLocation()
  const history = useHistory()
  const topic_id = location.pathname.split("/")[2]
  const topic: ITopic | undefined = location.state
  const botRef = useRef<HTMLDivElement>(null)
  const onScrollBottom = () => {
    if (botRef.current) {
      botRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }
  const { response: org } = useSwr({
    API_URL: API_ROUTE.ORG(topic?.organization_id ?? 0),
    enable: topic?.organization_id,
    dedupingInterval: CACHE_TIME
  })
  const users_name = unique(topic?.topic_user?.map(i => i.user?.fullname) ?? [])
  let name = topic?.name
  if (topic?.name?.trim().length === 0 || !topic?.name) {
    name = users_name.join(", ")
  }
  const { resData, onLoadMore, totalItem } = useSwrInfinite({
    API_URL: "messages",
    enable: user && topic_id,
    keyPage: 'p',
    params: {
      l: 25,
      sort: "-created_at",
      topic_id
    },
    dedupingInterval: 0
  })
  const more = () => resData.length < totalItem && onLoadMore()
  const isInScreen = useElementOnScreen({ rootMargin: '100px', threshold: 0.3 }, botRef)
  const [msges, setMsges] = useState<IMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  //[] handle messages
  useEffect(() => {
    if (echo && user && topic && org) {
      let chat: any = echo.join(`ci.chat.${org.subdomain}.${topic_id}`)
        .subscribed(() => {
          chat.whisper('connected', {
            user: {
              id: user.id,
              fullname: user.fullname,
              avatar: user.avatar,
              current_platform: 'MANAGER_WEB'
            }, socketId: echo?.socketId()
          })
          chat.listenForWhisper('typing', (u: any) => {
            setIsTyping(u?.user?.isTyping)
         })
        })
        .listen('MessagePosted', (u: IMessage) => {
          if (user.id !== u.user_id) {
            onScrollBottom()
            setMsges(prev => {
              if (prev.indexOf(u) === -1) {
                return [u, ...prev]
              }
              return prev
            })
          }
        })
    }
    return () => {
      setMsges([])
    }
  }, [echo, topic_id, org])

  return (
    <div className={style.container} >
      <div className={style.head}>
        <div className={style.head_left}>
          <XButton
            onClick={() => history.goBack()}
            className={style.head_left_back}
            icon={icon.chevronRightBlack}
          />
          <div className={style.topic}>
            <div className={style.topic_img}>
              <img src="" alt="" />
            </div>
            <div className={style.topic_name}>{name}</div>
          </div>
        </div>
      </div>
      <div
        id="scrollableDiv"
        className={style.messages}
      >
        <div ref={botRef} className={style.bottom}></div>
        <InfiniteScroll
          dataLength={resData.length}
          next={more}
          style={{ display: 'flex', flexDirection: 'column-reverse' }}
          inverse={true} //
          hasMore={true}
          loader={
            resData.length < totalItem &&
            <Loader />
          }
          scrollableTarget="scrollableDiv"
        >
          {isTyping && <Typing />}
          {uniqueArr(msges).concat(resData).map((item: IMessage, index) => (
            <div key={index} className={style.message}>
              <Message item={item} change={item.user_id === user.id} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
      <InputChat
        setMsges={setMsges}
        topic_id={topic_id}
        onScrollBottom={onScrollBottom}
        isInScreen={isInScreen}
        org={org}
      />
    </div>
  )
}
const Message = ({ item, change = false }: { item: IMessage, change?: boolean }) => {
  return (
    <div className={style.message_cnt}>
      <div className={style.message_head} style={change ? { flexDirection: "row-reverse" } : {}}>
        {
          !change &&
          <>
            <div className={style.avatar}>
              <img src={item.user?.avatar || ''} onError={onErrorAvatar} alt="" />
            </div>
            <span className={style.user_name}>{item.user?.fullname}</span>
          </>
        }
        <span className={style.create}>
          {formatDateFromNow(item.created_at)}
        </span>
      </div>
      <div style={change ? { flexDirection: "row-reverse" } : {}} className={style.message_body}>
        <div
          style={change ? {
            backgroundColor: "#f1faff",
            borderRadius: "8px 0px 8px 8px"
          } : {}}
          className={style.message_body_cnt}
          dangerouslySetInnerHTML={{ __html: linkify(item.msg) }}
        />
      </div>
    </div>
  )
}
interface InputProps {
  setMsges: Dispatch<SetStateAction<IMessage[]>>;
  topic_id: string;
  onScrollBottom: () => void;
  isInScreen?: boolean;
  org: any
}
const initMsg = {
  _id: "",
  msg: '',
  user_id: 0,
  topic_id: ``,
  reply_id: null,
  updated_at: '',
  created_at: '',
}
const InputChat = ({ setMsges, topic_id, onScrollBottom, isInScreen, org }: InputProps) => {
  const { USER: user } = useAuth()
  const [msg, setMsg] = useState<IMessage>(initMsg)
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { echo } = useContext(AppContext) as AppContextType
  const onEmitTyping = (isTyping: boolean) => {
    let chat: any = echo?.join(`ci.chat.${org.subdomain}.${topic_id}`)
    chat?.whisper('typing', {
      user: {
        id: user.id,
        fullname: user.fullname,
        avatar: user.avatar,
        isTyping: isTyping
      }, socketId: echo?.socketId()
    })
  }
  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      if (msg.msg.length > 0) {
        textAreaRef.current.style.height =
          textAreaRef.current.scrollHeight + "px";
      }
    }
  };
  useEffect(resizeTextArea, [msg]);
  const onSubmit = async () => {
    if (msg.msg.trim().length > 0) {
      setMsges(prev => [{
        ...msg,
        _id: `${moment().format("YYYYMMDDHHmmss")}${moment().milliseconds()}`,
        user_id: user?.id,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss")
      }, ...prev])
      setMsg(initMsg)
      await chatApi.postMessage({ msg: msg.msg, topic_id })
      textAreaRef.current?.blur()
      onScrollBottom()
    }
  }
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code === "Enter") {
      event.preventDefault();
      onSubmit()
    }
  }
  return (
    <div className={style.input_cnt}>
      <XButton
        icon={icon.chevronRightBlack}
        className={!isInScreen ? `${style.scroll_btn} ${style.scroll_btn_act}` : style.scroll_btn}
        onClick={onScrollBottom}
      />
      <div className={style.ip_ctl}>
        <XButton
          className={style.ip_ctl_btn}
          iconSize={24}
          icon={icon.plus}
        />
        <XButton
          className={style.ip_ctl_btn}
          iconSize={16}
          icon={icon.imageWhite}
        />
      </div>
      <div className={style.text_area_cnt}>
        <textarea
          ref={textAreaRef}
          onChange={(e) => setMsg({ ...msg, msg: e.target.value })}
          value={msg.msg}
          placeholder="Aa"
          rows={1}
          className={style.text_area}
          onKeyDown={handleKeyDown}
          onFocus={() => onEmitTyping(true)}
          onBlur={() => onEmitTyping(false)}
        />
        <XButton
          className={style.btn_send}
          icon={msg.msg.length > 0 ? icon.sendWhite : icon.thumbUpWhite}
          iconSize={16}
          onClick={onSubmit}
        />
      </div>
    </div>
  )
}
export const Loader = () => {
  return <div className={style.load}>Đang tải...<CircularProgress size={14} /></div>
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
  )
}