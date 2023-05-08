import ChatLeft from "pages/Chat/components/ChatLeft";
import ChatRight from "pages/Chat/components/ChatRight";
import { useContext, useEffect, useState } from "react";
import style from "./chat.module.css";
import { Route, Switch, useLocation } from "react-router-dom";
import { useDeviceMobile } from "hooks";
import { AppContext, AppContextType } from "context/AppProvider";
import { useSelector } from "react-redux";
import IStore from "interface/IStore";
import { _unique, _uniqueLast } from "utils";

export default function Chat() {
  const IS_MB = useDeviceMobile();
  const { USER } = useSelector((state: IStore) => state.USER)
  const { echo } = useContext(AppContext) as AppContextType
  let CHAT_SHOW = "left";
  const location = useLocation();
  const [userChat, setUserChat] = useState<any[]>([])
  if (location.pathname !== "/chat") CHAT_SHOW = "right";
  useEffect(() => {
    if (USER) {
      console.log('run')
      echo?.private('chat').subscribed(() => console.log('Test...'))
      // let chat: any = echo?.private('chat')
      //   .subscribed(() => {
      //     console.log('ok...')
      //     chat.whisper('connected', {
      //       user: {
      //         id: USER?.id,
      //         fullname: USER?.fullname,
      //         avatar: USER?.avatar
      //       }, socketId: echo?.socketId()
      //     })
      //     chat.listenForWhisper('typing', (u: any) => {
      //       console.log(u)
      //     })
      //   })
      //   .listen('UserOnline', (u: any) => {
      //     setUserChat((prev: any) => {
      //       if (prev.findIndex((i: any) => i.id === u.id)) {
      //         return _uniqueLast([...prev, { ...u, isOnline: true }])
      //       }
      //       return _uniqueLast(prev)
      //     })
      //   })
      //   .listen('UserOffline', (u: any) => {
      //     setUserChat((prev: any) => {
      //       const iIndex = prev.findIndex((item: any) => item.id === u.id)
      //       if (iIndex > 0) {
      //         prev[iIndex].isOnline = false
      //       }
      //       return _unique(prev)
      //     })
      //   })
    }
  }, [echo, USER])

  return (
    <>
      <div
        style={
          IS_MB && CHAT_SHOW === "left"
            ? {
              height: "100vh",
            }
            : {}
        }
        className={style.pageChat}
      >
        <ChatLeft CHAT_SHOW={CHAT_SHOW} userChat={userChat} />
        <Switch>
          <Route path="/chat/:org_id/:_id">
            <ChatRight CHAT_SHOW={CHAT_SHOW}/>
          </Route>
        </Switch>
      </div>
    </>
  );
}
