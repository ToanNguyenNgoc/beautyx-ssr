import React from "react";
import style from "./chat.module.css";
import icon from "constants/icon";
import { Container } from "@mui/system";
import { XButton } from "components/Layout";
const data = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
];
export default function Chat() {
  return (
    <>
      <div className={style.pageChat}>
        <div className={style.chatLeft}>
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
            <li
              style={{
                borderLeft: "4px solid var(--purple)",
                backgroundColor: "#e3e0f1",
              }}
              className={style.chatItem}
            >
              <div className={style.itemTop}>
                <div className={style.itemTopLeft}>
                  <div className={style.itemDot}></div>
                  <div className={style.itemUser}>
                    <div className={style.itemAva}>
                      <img src="" alt="" />
                      <div className={style.itemActive}></div>
                    </div>
                    <div className={style.itemInfo}>
                      <div className={style.itemName}>Lorem input</div>
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
            {data.map((item) => (
              <li key={item.id} className={style.chatItem}>
                <div className={style.itemTop}>
                  <div className={style.itemTopLeft}>
                    <div className={style.itemDot}></div>
                    <div className={style.itemUser}>
                      <div className={style.itemAva}>
                        <img src="" alt="" />
                        <div className={style.itemActive}></div>
                      </div>
                      <div className={style.itemInfo}>
                        <div className={style.itemName}>Lorem input</div>
                        <div className={style.itemNameOrg}>@pmt</div>
                      </div>
                    </div>
                  </div>
                  <p className={style.chatTimeAgo}>5min ago</p>
                </div>
                <p className={style.itemBot}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Ratione, nostrum reiciendis! Modi nesciunt quidem neque, ea
                  quia inventore! Soluta, in!
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className={style.chatRight}>
          <div className={style.chatRightHead}>
            <div className={style.rightHeadUser}>
              <div className={style.rightUserAva}>
                <img src="" alt="" />
              </div>
              <div className={style.rightUserContent}>
                <div className={style.rightUserName}>
                  <p>User Name</p>
                  <div className={style.userStatus}>
                    <span></span>
                    <span>Online</span>
                  </div>
                </div>
                <p>@pmt</p>
              </div>
            </div>
            <div className={style.rightHeadBtns}>
              <XButton
                icon={icon.phone}
                className={style.rightHeadBtn}
                title="Call"
              />
              <XButton className={style.rightHeadBtn} title="Archive" />
              <XButton
                className={style.rightHeadBtn}
                title="View Organization"
              />
            </div>
          </div>
          <ul className={style.chatListMessage}>
            {data.map((item: any) => (
              <li key={item.id} className={style.chatListItem}>
                <div className={style.itemAva}>
                  <img src="" alt="" />
                  <div className={style.itemActive}></div>
                </div>
                <div className={style.itemInfo}>
                  <div className={style.itemName}>
                    <p>Lorem input</p>
                    <p>15:00</p>
                  </div>
                  <p className={style.itemMessager}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Distinctio, dolores! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Distinctio, dolores!
                  </p>
                </div>
              </li>
            ))}

            <li
              style={{
                flexDirection: "row-reverse",
                marginLeft: "auto",
              }}
              className={style.chatListItem}
            >
              <div style={{ display: "none" }} className={style.itemAva}>
                <img src="" alt="" />
                <div className={style.itemActive}></div>
              </div>
              <div className={style.itemInfo}>
                <div className={style.itemName}>
                  <p>You</p>
                  <p>15:00</p>
                </div>
                <p
                  style={{
                    borderRadius: "16px 0px 16px 16px",
                    backgroundColor: "var(--purple)",
                    color: "#fff",
                  }}
                  className={style.itemMessager}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Distinctio, dolores! Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Distinctio, dolores!
                </p>
              </div>
            </li>
          </ul>

          <div className={style.chatRightFoot}>
            <div className={style.footerWrapper}>
              <textarea rows={4} placeholder="Send a message" />
              <div className={style.footBtns}>
                <div className={style.btnsWrap}>
                  <div className={style.btnIcon}>
                    <img src={icon.smilePurple} alt="" />
                  </div>
                  <div className={style.btnIcon}>
                    <img src={icon.imagePurple} alt="" />
                  </div>
                  <XButton title="Send" className={style.footBtnsSend} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
