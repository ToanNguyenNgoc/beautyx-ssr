import Chatleft from "pages/Chat/components/ChatLeft";
import ChatRight from "pages/Chat/components/ChatRight";
import { useContext, useEffect, useState } from "react";
import style from "./chat.module.css";
import { useLocation } from "react-router-dom";
import { useDeviceMobile } from "hooks";
import { useSelector } from 'react-redux'
import * as io from 'socket.io-client'
import IStore from "interface/IStore";
import { AppContext } from "context/AppProvider";

const data = [
  {
    id: 1,
    name: "Long Đỗ",
  },
  {
    id: 2,
    name: "LeeSin",
  },
  {
    id: 3,
    name: "Yasuo",
  },
  {
    id: 4,
    name: "Zed",
  },
  {
    id: 5,
    name: "Master Yi",
  },
  {
    id: 6,
    name: "Arhi",
  },
  {
    id: 7,
    name: "Reven",
  },
];
// const socket = io.connect()
export default function Chat() {
  const { echo } = useContext(AppContext) as any
  useEffect(() => {
    echo?.private('chat')?.subscribed(() => console.log('OK in chat...'))
  },[echo])
  const { USER } = useSelector((state: IStore) => state.USER)
  const [value, setValue] = useState<string>("");
  const IS_MB = useDeviceMobile();
  let ACC_SHOW = "left";
  const location = useLocation();
  if (location.pathname !== "/chat") ACC_SHOW = "right";
  return (
    <>
      <div
        style={
          IS_MB && ACC_SHOW === "left"
            ? {
              height: "100vh",
            }
            : {}
        }
        className={style.pageChat}
      >
        <Chatleft ACC_SHOW={ACC_SHOW} data={data} />
        <ChatRight USER={USER} ACC_SHOW={ACC_SHOW} data={data} />
      </div>
    </>
  );
}
