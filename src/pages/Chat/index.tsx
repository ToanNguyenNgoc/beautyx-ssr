import Chatleft from "pages/Chat/components/ChatLeft";
import ChatRight from "pages/Chat/components/ChatRight";
import { useState } from "react";
import style from "./chat.module.css";
import { useLocation } from "react-router-dom";
import { useDeviceMobile } from "hooks";

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
  const IS_MB = useDeviceMobile();
  let CHAT_SHOW = "left";
  const location = useLocation();
  if (location.pathname !== "/chat") CHAT_SHOW = "right";

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
        <Chatleft CHAT_SHOW={CHAT_SHOW} data={data} />
        <ChatRight CHAT_SHOW={CHAT_SHOW} data={data} />
      </div>
    </>
  );
}
