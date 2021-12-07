import React, { useState } from "react";
import icon from "../../../constants/icon";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import { useFormik } from "formik";
import * as Yup from "yup";


function SignUp(props: any) {
  const { activeTabSign } = props;
  const [typePass, setTypePass] = useState("password");
  const formik = useFormik({
    initialValues: {
      Name: "",
      Sex: "",
      dateOfBirth: "",
      EmailPhone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      Name: Yup.string()
        .min(2, "Tên lớn hơn 2 ký tự")
        .required("Vui lòng nhập họ và tên")
        .matches(
          /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
          "Tên không đúng định dạng"
        ),
      Sex: Yup.string().required("Vui lòng chọn giới tính"),
      dateOfBirth: Yup.string()
        .required("Vui lòng nhập ngày tháng năm sinh")
        .matches(
          // eslint-disable-next-line no-useless-escape
          /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
          "Vui lòng nhập đúng định dạng dd/mm/yyyy"
        ),
      EmailPhone: Yup.string()
        .required("Vui lòng nhập Email hoặc Số điện thoại")
        .matches(
          // eslint-disable-next-line no-useless-escape
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i,
          "Vui lòng nhập đúng định dạng Example@gmail.com"
        ),
      password: Yup.string()
        .min(8, "Mật khẩu lớn hơn 8 ký tự")
        .max(32, "Mật khẩu tối đa 32 kí tự")
        .required("Vui lòng nhập mật khẩu")
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 số và 1 ký tự chữ 1 đặc biệt"
        ),
      confirmPassword: Yup.string()
        .required("Vui lòng xác nhận lại mật khẩu")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
    }),
    onSubmit: (values:any) => {
      
    },
  });
  return (
    <div
      style={activeTabSign === 2 ? { display: "block" } : { display: "none" }}
    >
      <form
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        className="flex-column sign-form"
      >
        <div className="flex-column">
          <div className="flex-row w-100" style={{ width: "100%" }}>
            <div className="sign-form__box ">
              <img className="sign-form__box-icon" src={icon.User} alt="" />
              <input
                value={formik.values.Name}
                onChange={formik.handleChange}
                name="Name"
                type="text"
                placeholder="Họ và tên"
              />
            </div>

            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="gender"
                name="Sex"
                value={formik.values.Sex}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="male"
                  control={
                    <Radio
                      sx={{
                        color: "#7161BA",
                        "&.Mui-checked": {
                          color: "#7161BA",
                        },
                      }}
                    />
                  }
                  label="Nam"
                />
                <FormControlLabel
                  value="female"
                  control={
                    <Radio
                      sx={{
                        color: "#7161BA",
                        "&.Mui-checked": {
                          color: "#7161BA",
                        },
                      }}
                    />
                  }
                  label="Nữ"
                />
                <FormControlLabel
                  value="other"
                  control={
                    <Radio
                      sx={{
                        color: "#7161BA",
                        "&.Mui-checked": {
                          color: "#7161BA",
                        },
                      }}
                    />
                  }
                  label="Khác"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div
            style={{ width: "100%", padding: "0 0 8px 0" }}
            className="flex-row w-100"
          >
            {formik.errors.Name && formik.touched.Name && (
              <p className="err-text">{formik.errors.Name}</p>
            )}
            {formik.errors.Sex && formik.touched.Sex && (
              <p className="err-text">{formik.errors.Sex}</p>
            )}
          </div>
        </div>

        <div
          className="flex-column w-100"
          style={{ width: "100%", padding: "8px 0" }}
        >
          <div className="sign-form__box ">
            <img className="sign-form__box-icon" src={icon.Calendar} alt="" />
            <input
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              name="dateOfBirth"
              id="dateOfBirth"
              type="text"
              placeholder="Ngày/tháng/năm sinh"
            />
          </div>
          {formik.errors.dateOfBirth && formik.touched.dateOfBirth && (
            <p className="err-text">{formik.errors.dateOfBirth}</p>
          )}
        </div>

        <div
          className="flex-column w-100"
          style={{ width: "100%", padding: "8px 0" }}
        >
          <div className="sign-form__box  mb-16 ">
            <img className="sign-form__box-icon" src={icon.Message} alt="" />
            <input
              value={formik.values.EmailPhone}
              onChange={formik.handleChange}
              name="EmailPhone"
              id="EmailPhone"
              type="text"
              placeholder="Email/Số điện thoại"
            />
          </div>
          {formik.errors.EmailPhone && formik.touched.EmailPhone && (
            <p className="err-text">{formik.errors.EmailPhone}</p>
          )}
        </div>

        <div
          className="flex-column w-100"
          style={{ width: "100%", padding: "8px 0" }}
        >
          <div className="sign-form__box mb-16">
            <img className="sign-form__box-icon" src={icon.Lock} alt="" />
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              id="password"
              type={typePass}
              placeholder="Mật khẩu"
            />
            <img
              onMouseEnter={() => setTypePass("text")}
              onMouseLeave={() => setTypePass("password")}
              className="sign-form__box-icon-show"
              src={icon.eye}
              alt=""
            />
          </div>
          {formik.errors.password && formik.touched.password && (
            <p className="err-text">{formik.errors.password}</p>
          )}
        </div>

        <div
          className="flex-column w-100"
          style={{ width: "100%", padding: "8px 0" }}
        >
          <div className="sign-form__box mb-16">
            <img className="sign-form__box-icon" src={icon.Lock} alt="" />
            <input
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              name="confirmPassword"
              id="confirmPassword"
              type={typePass}
              placeholder="Nhập lại mật khẩu"
            />
            <img
              onMouseEnter={() => setTypePass("text")}
              onMouseLeave={() => setTypePass("password")}
              className="sign-form__box-icon-show"
              src={icon.eye}
              alt=""
            />
          </div>
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <p className="err-text">{formik.errors.confirmPassword}</p>
          )}
        </div>
        <div className="flex-row w-100">
          <Checkbox
            defaultChecked
            sx={{
              color: "#7161BA",
              "&.Mui-checked": {
                color: "#7161BA",
              },
            }}
          />
          <p className="sign-other-setup">
            Tôi đã đọc và đồng ý với
            <span>Điều khoản & Điều kiện của Myspa</span>
          </p>
        </div>

        <button
          type="submit"
          // onClick={(e: any) => handleRegis(e)}
          className="sign-btn mt-38"
        >
          Đăng ký
        </button>

        <p className="sign-or">Hoặc đăng kí với</p>
        <div className="flex-row sign-other-social">
          <img src={icon.google} alt="" />
          <img src={icon.facebook} alt="" />
        </div>
      </form>
    </div>
  );
}

export default SignUp;