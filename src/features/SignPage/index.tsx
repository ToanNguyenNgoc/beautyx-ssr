import React, { useContext, useState } from "react";
import SignIn from "./components/SignIn";
import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import SignUps from "./components/SignUps";
import { AppContext } from "context/AppProvider";
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";
import { BackButton } from "components/Layout";
import { FLAT_FORM_TYPE } from "rootComponents/flatForm";
import img from "constants/img";
import LoginFlatFormRequest from "rootComponents/loginFlatFormRequest/LoginFlatFormRequest";

function SignPage(props: any) {
  const { t } = useContext(AppContext);
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
  const chooseTab = (id: any) => {
    setActiveTabSign(id);
  };
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
      <BackButton />
      <div className="page-sign">
        {
          FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX ?
            <Container>
              <div className="flex-row-sp sign-content page-sign__cnt">
                <img
                  src={img.beautyx}
                  alt=""
                  className="sign-content__left-logo-mb"
                />
                <div
                  className="flex-column sign-content__left"
                  style={{ justifyContent: "center" }}
                >
                  <img style={{ width: "120px" }} className="sign-content__left-logo" src={img.beautyX} alt="" />
                  <img
                    className="sign-content__left-partner"
                    src={img.Partner}
                    alt=""
                  />
                </div>
                <div className="sign-content__right">
                  <div className="sign-content__right-tab">
                    {buttons.map((item) => (
                      <button
                        onClick={() => chooseTab(item.id)}
                        style={
                          item.id === activeTabSign
                            ? {
                              color: "var(--purple)",
                              borderBottom: "solid 1px var(--purple)",
                            }
                            : {}
                        }
                        key={item.id}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                  {switchTab()}
                </div>
              </div>
            </Container>
            :
            <Container>
              <LoginFlatFormRequest
                pathname={pathname}
              />
            </Container>
        }
      </div>
    </>
  );
}

export default SignPage;
