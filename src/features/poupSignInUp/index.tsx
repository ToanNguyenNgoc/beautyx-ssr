import React, { useContext } from "react";
import "./popupSignInUp.css";
import img from "../../constants/img";
import icon from "../../constants/icon";
import { Dialog } from "@mui/material";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { useDeviceMobile } from "utils";
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";
import { AppContext } from "context/AppProvider";
import LoginFlatFormRequest from "rootComponents/loginFlatFormRequest/LoginFlatFormRequest";
import { BackButton } from "components/Layout";
import { FLAT_FORM_TYPE } from "rootComponents/flatForm";



function SignInUp(props: any) {
  const {
    openSignIn,
    setOpenSignIn,
    activeTabSign,
    setActiveTabSign,
    useForSignRes,
  } = props;
  const fullScreen = useDeviceMobile();
  const FLAT_FORM = EXTRA_FLAT_FORM();
  const { t } = useContext(AppContext);
  const buttons = [
    { id: 1, title: t("Home.Sign_in") },
    { id: 2, title: t("Home.Sign_up") },
  ];
  const handleClose = () => {
    setOpenSignIn(false);
  };
  const chooseTab = (id: any) => {
    setActiveTabSign(id);
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={openSignIn}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <BackButton
        setOpenFilter={setOpenSignIn}
      />
      {
        FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX ?
          <div className="flex-row-sp sign-content">
            <div
              className="flex-column sign-content__left"
              style={{ justifyContent: "center" }}
            >
              <img className="sign-content__left-logo" src={icon.Logo} alt="" />
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
              <SignIn
                useForSignRes={useForSignRes}
                setOpenSignIn={setOpenSignIn}
                activeTabSign={activeTabSign}
                setActiveTabSign={setActiveTabSign}
                t={t}
              />
              <SignUp activeTabSign={activeTabSign} setOpenSignIn={setOpenSignIn} />
            </div>
          </div>
          :
          <div
            style={{
              height: "100%",
              backgroundColor: "var(--bgWhite)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <LoginFlatFormRequest
              setClose={setOpenSignIn}
            />
          </div>
      }
    </Dialog>
  );
}

export default SignInUp;
