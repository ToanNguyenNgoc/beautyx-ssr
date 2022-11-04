import React, { useState } from "react";
import ButtonCus from "../../../../../components/ButtonCus";
import icon from "../../../../../constants/icon";
import Dialog from "@mui/material/Dialog";
import * as Yup from "yup";
import { useFormik } from "formik";
export default function ForgotPass(props: any) {
  const { openForgotPass, setOpenForgotPass } = props;
  const [typePass, setTypePass] = useState("password");

  // Close Popup Forgot
  const handleCloseForgotPass = () => {
    setOpenForgotPass(false);
  };

  // Validate Form Forgot Pass
  const formikForgotPass = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Vui lòng nhập email hoặc số điện thoại"),
    }),
    onSubmit: () => {
      // handle;
    },
  });
  return (
    <div>
      <Dialog
        open={openForgotPass}
        keepMounted
        onClose={handleCloseForgotPass}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="dialog-forgot__password">
          <h2>Quên mật khẩu?</h2>
          <p className="dialog-forgot__password-desc">
            Vui lòng cho chúng tôi biết thông tin đăng ký của bạn
          </p>
          <div className="sign-form__box">
            <img className="sign-form__box-icon" src={icon.Lock} alt="" />
            <input
              value={formikForgotPass.values.email}
              onChange={formikForgotPass.handleChange}
              name="email"
              id="email"
              type={typePass}
              placeholder="Email/Số điện thoại "
            />
            <img
              onMouseEnter={() => setTypePass("text")}
              onMouseLeave={() => setTypePass("password")}
              className="sign-form__box-icon-show"
              src={icon.eye}
              alt=""
            />
          </div>
          {formikForgotPass.errors.email && formikForgotPass.touched.email && (
            <p className="err-text">{formikForgotPass.errors.email}</p>
          )}
          <div className="dialog-forgot__password-btn">
            <ButtonCus
              onClick={handleCloseForgotPass}
              text="Hủy"
              backColor="var(--bg-color)"
              color="var(--purple)"
              fontSize="20px"
              lineHeight="24px"
              borderRadius="20px"
            />
            <ButtonCus
              onClick={formikForgotPass.handleSubmit}
              text="Tiếp tục"
              backColor="var(--purple)"
              color="var(--bg-color)"
              fontSize="20px"
              lineHeight="24px"
              borderRadius="20px"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
