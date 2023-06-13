import { AppContext, AppContextType } from "context/AppProvider";
import { useAuth, useSwrInfinite } from "hooks";
import { ITopic } from "interface";
import { paramsTopic } from "params-query";
import { ReactNode, createContext, useContext, useEffect } from "react";

export type MessengerCtxType = {
  currTopic: (org_id: number) => ITopic | undefined,
}
export const MessengerContext = createContext<MessengerCtxType | null>(null);
export function MessengerProvider({ children }: { children: ReactNode }) {
  const { echo } = useContext(AppContext) as AppContextType
  const { USER } = useAuth()
  useEffect(() => {
    if (echo) {
      let chat: any = echo?.private(`chat`)
        .subscribed(() => {
          chat.whisper('connected', {
            user: {
              id: USER.id,
              fullname: USER.fullname,
              avatar: USER.avatar
            }, socketId: echo?.socketId()
          })
          chat.listenForWhisper('typing', (u: any) => { })
        })
        .listen('UserOnline', (u: any) => { })
        .listen('UserOffline', (u: any) => { })
    }
  }, [echo, USER])
  const { resData } = useSwrInfinite({
    API_URL: 'topics',
    params: paramsTopic,
    enable: USER,
    dedupingInterval: 0
  })
  const topics: ITopic[] = resData
  const currTopic = (org_id: number) => {
    return topics.find(i => i.organization_id === org_id)
  }

  const value = {
    currTopic,
  }
  return <MessengerContext.Provider value={value} > {children} </MessengerContext.Provider>
}