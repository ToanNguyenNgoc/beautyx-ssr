import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dialog from "@mui/material/Dialog";
import ButtonCus from "../../../../../components/ButtonCus";
import icon from "../../../../../constants/icon";
export default function DialogNewPass(props: any) {
  const { setOpenNewPass, openNewPass } = props;
  // Close Popup New Pass
  const handleCloseNewPass = () => {
    setOpenNewPass(false);
  };
  const [typePass, setTypePass] = React.useState("password");

  // Validate Form
  const formikNewpass = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Mật khẩu lớn hơn 8 ký tự")
        .max(32, "Mật khẩu tối đa 32 kí tự")
        .required("Vui lòng nhập mật khẩu mới")
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 số và 1 ký tự chữ 1 đặc biệt"
        ),
      confirmPassword: Yup.string()
        .required("Vui lòng xác nhận lại mật khẩu mới")
        .oneOf([Yup.ref("password"), null], "Mật khẩu mới không khớp"),
    }),
    onSubmit: (values) => {
      handleCloseNewPass();
    },
  });
  return (
    <div>
      <Dialog
        open={openNewPass}
        keepMounted
        onClose={handleCloseNewPass}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="dialog-forgot__password">
          <h2>Đặt lại mật khẩu mới</h2>
          <p className="dialog-forgot__password-desc">
            Lưu ý mật khẩu mới không được trùng với các mật khẩu được dùng trước
            đó
          </p>
          <div className="sign-form__box" style={{ margin: "8px 0" }}>
            <img className="sign-form__box-icon " src={icon.Lock} alt="" />
            <input
              autoComplete="off"
              value={formikNewpass.values.password}
              onChange={formikNewpass.handleChange}
              name="password"
              id="password"
              type={typePass}
              placeholder="Mật khẩu mới"
            />
            <img
              onMouseEnter={() => setTypePass("text")}
              onMouseLeave={() => setTypePass("password")}
              className="sign-form__box-icon-show"
              src={icon.eye}
              alt=""
            />
          </div>
          {formikNewpass.errors.password && formikNewpass.touched.password && (
            <p className="err-text w-cus">{formikNewpass.errors.password}</p>
          )}
          <div className="sign-form__box" style={{ margin: "16px 0 8px 0" }}>
            <img className="sign-form__box-icon" src={icon.Lock} alt="" />
            <input
              autoComplete="off"
              value={formikNewpass.values.confirmPassword}
              onChange={formikNewpass.handleChange}
              name="confirmPassword"
              id="confirmPassword"
              type={typePass}
              placeholder="Nhận lại mật khẩu mới"
            />
            <img
              onMouseEnter={() => setTypePass("text")}
              onMouseLeave={() => setTypePass("password")}
              className="sign-form__box-icon-show"
              src={icon.eye}
              alt=""
            />
          </div>
          {formikNewpass.errors.confirmPassword &&
            formikNewpass.touched.confirmPassword && (
              <p className="err-text">{formikNewpass.errors.confirmPassword}</p>
            )}

          <div className="dialog-forgot__password-btn">
            <ButtonCus
              onClick={handleCloseNewPass}
              text="Hủy"
              backColor="var(--bg-color)"
              color="var(--purple)"
              fontSize="20px"
              lineHeight="24px"
              borderRadius="20px"
            />
            <ButtonCus
              onClick={formikNewpass.handleSubmit}
              text="Xác nhận"
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
