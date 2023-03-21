import React, { useState } from "react";
import style from "./chatleft.module.css";
import icon from "constants/icon";
import { useHistory, useLocation } from "react-router-dom";
import { useDeviceMobile } from "hooks";

export default function Chatleft(props: any) {
  const { data, ACC_SHOW } = props;
  const [active, setActive] = useState<boolean>(true);
  const IS_MB = useDeviceMobile();
  const history = useHistory();
  const location = useLocation();
  const onNavigate = (link: string) => {
    history.push(`/chat/${link}`);
  };
  return (
    <>
      <div
        style={
          IS_MB && ACC_SHOW === "right"
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
          {data.map((item: any) => (
            <li
              style={
                location.pathname === `/chat/${item.id}`
                  ? {
                    borderLeft: "4px solid var(--purple)",
                    backgroundColor: "#e3e0f1",
                    transition: "all 0.3s",
                  }
                  : {}
              }
              onClick={() => onNavigate(item.id)}
              key={item.id}
              className={style.chatItem}
            >
              <div className={style.itemTop}>
                <div className={style.itemTopLeft}>
                  <div
                    style={
                      location.pathname === `/chat/${item.id}`
                        ? { visibility: "hidden" }
                        : {}
                    }
                    className={style.itemDot}
                  ></div>
                  <div className={style.itemUser}>
                    <div className={style.itemAva}>
                      <img src="https://source.unsplash.com/random" alt="" />
                      <div className={style.itemActive}></div>
                    </div>
                    <div className={style.itemInfo}>
                      <div className={style.itemName}>{item.name}</div>
                      <div className={style.itemNameOrg}>@pmt</div>
                    </div>
                  </div>
                </div>
                <p className={style.chatTimeAgo}>5min ago</p>
              </div>
              <p className={style.itemBot}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Ratione, nostrum reiciendis! Modi nesciunt quidem neque, ea quia
                inventore! Soluta, in!
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
