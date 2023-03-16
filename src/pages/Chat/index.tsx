import Chatleft from "pages/Chat/components/ChatLeft";
import ChatRight from "pages/Chat/components/ChatRight";
import { useState } from "react";
import style from "./chat.module.css";
import { useLocation } from "react-router-dom";

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
export default function Chat() {
  const [value, setValue] = useState<string>("");
  let ACC_SHOW = "left";
  const location = useLocation();
  if (location.pathname !== "/chat") ACC_SHOW = "right";
  return (
    <>
      <div className={style.pageChat}>
        <Chatleft ACC_SHOW={ACC_SHOW} data={data} />
        <ChatRight ACC_SHOW={ACC_SHOW} data={data} />
      </div>
    </>
  );
}
