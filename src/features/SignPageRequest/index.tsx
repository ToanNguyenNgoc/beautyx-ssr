import { BackButton } from "components/Layout";
import React from "react";
import img from "../../constants/img";
import HomeSignIn from "./HomeSignIn";
import "./signPageRequest.css";

function SignPageRequest() {
  const useForSignRes = true;
  return (
    <div className="sign-page-request">
      <BackButton />
      <div className="flex-column sign-res">
        <img src={img.resultNull} alt="" />
        <span className="sign-res__title">Oops! Bạn chưa đăng nhập</span>
        <span className="sign-res__text">
          Xin lỗi, chúng tôi không thể hiển thị thông tin.
          <br />
          Vui lòng đăng nhập để tiếp tục nhé
        </span>
        <HomeSignIn useForSignRes={useForSignRes} />
      </div>
    </div>
  );
}

export default SignPageRequest;
