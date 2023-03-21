import Chatleft from "pages/Chat/components/ChatLeft";
import ChatRight from "pages/Chat/components/ChatRight";
import { useState } from "react";
import style from "./chat.module.css";
import { useLocation } from "react-router-dom";
import { useDeviceMobile } from "hooks";
import { useSelector } from 'react-redux'
import * as io from 'socket.io-client'
import IStore from "interface/IStore";

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
const socket = io.connect('http://localhost:3004')
export default function Chat() {
  const {USER} = useSelector((state:IStore) => state.USER)
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
        <Chatleft socket={socket} ACC_SHOW={ACC_SHOW} data={data} />
        <ChatRight USER={USER} socket={socket} ACC_SHOW={ACC_SHOW} data={data} />
      </div>
    </>
  );
}
