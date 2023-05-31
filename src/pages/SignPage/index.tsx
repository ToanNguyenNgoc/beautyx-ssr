import React, { useContext, useState } from "react";
import SignIn from "./components/SignIn";
import { Container } from "@mui/material";
import {  useLocation } from "react-router-dom";
import SignUps from "./components/SignUps";
import { AppContext } from "context/AppProvider";
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";
import { BackButton } from "components/Layout";
import { FLAT_FORM_TYPE } from "rootComponents/flatForm";
import { XButton } from 'components/Layout'
import img from "constants/img";
import LoginFlatFormRequest from "rootComponents/loginFlatFormRequest/LoginFlatFormRequest";
import style from './sign-page.module.css'

function SignPage() {
  const { t } = useContext(AppContext) as any;
  const FLAT_FORM = EXTRA_FLAT_FORM();
  const location: any = useLocation();
  const pathname = location?.state?.from?.pathname;
  const [activeTabSign, setActiveTabSign] = useState(
    location.search
      ? parseInt(location.search.slice(1, location.search.length))
      : 1
  );
  const buttons = [
    { id: 1, title: t("Home.Sign_in") },
    { id: 2, title: t("Home.Sign_up") },
  ];
  const switchTab = () => {
    switch (activeTabSign) {
      case 1:
        return <SignIn
          activeTabSign={activeTabSign}
          setActiveTabSign={setActiveTabSign}
          t={t}
        />
      case 2:
        return <SignUps
          activeTabSign={activeTabSign}
          setActiveTabSign={setActiveTabSign}
        />
    }
  }
  return (
    <>
      <div className="page-sign">
        {
          FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX ?
            <Container>
              <div className={style.container}>
                <img
                  src={img.beautyx}
                  alt=""
                  className={style.left_cnt_icon_mb}
                />
                <div
                  className={style.left_cnt}
                >
                  <img className={style.left_cnt_img} src={img.beautyX} alt="" />
                  <img
                    className={style.left_cnt_img_partner}
                    src={img.Partner}
                    alt=""
                  />
                </div>
                <div className={style.right_cnt}>
                  <div className={style.right_cnt_tab_btn}>
                    {buttons.map((item) => (
                      <XButton
                        key={item.id}
                        className={item.id === activeTabSign ? style.btn_active : ""}
                        title={item.title}
                        onClick={() => setActiveTabSign(item.id)}
                      />
                    ))}
                  </div>
                  {switchTab()}
                </div>
              </div>
            </Container>
            :
            <>
              <BackButton />
              <Container>
                <LoginFlatFormRequest
                  pathname={pathname}
                />
              </Container>
            </>
        }
      </div>
    </>
  );
}

export default SignPage;
