import { AppContext, AppContextType } from "context/AppProvider";
import { useAuth } from "hooks";
import { useContext, useEffect } from "react";

function Messenger() {
  const { echo } = useContext(AppContext) as AppContextType
  const { USER } = useAuth()
  useEffect(() => {
    if (echo) {
      // let chat: any = echo?.private(`ci.chat.demo.GENERAL`)
      let chat: any = echo?.private(`chat`)
        .subscribed(() => {
          chat.whisper('connected', {
            user: {
              id: USER.id,
              fullname: USER.fullname,
              avatar: USER.avatar
            }, socketId: echo?.socketId()
          })
          chat.listenForWhisper('typing', (u: any) => {
            // console.log(u)
          })
        })
        .listen('UserOnline', (u: any) => {
          // console.log('on', u)
        })
        .listen('UserOffline', (u: any) => {
          // console.log('off', u)
        })
    }
  }, [echo, USER])
  return (
    <div>
      Messenger
    </div>
  );
}

export default Messenger;