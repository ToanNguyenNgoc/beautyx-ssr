import React, { useContext, useState } from "react";
import icon from "../../../constants/icon";
import { Checkbox } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
// import Dialog from "@mui/material/Dialog";
// import ButtonCus from "../../../components/ButtonCus";
import { AppContext } from "../../../context/AppProvider";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { AxiosError } from "axios";
import PopupNoti from "./PopupNoti";
import authentication from "../../../api/authApi";
import { useDispatch } from "react-redux";
import { fetchAsyncUser } from "../../../redux/USER/userSlice";
import dayjs from "dayjs";
import { fetchAsyncApps } from "../../../redux/appointment/appSlice";
import { fetchAsyncOrderServices } from "../../../redux/order/orderSlice";

function SignIn(props: any) {
    const { t } = useContext(AppContext);
    const dispatch = useDispatch();
    const { setActiveTabSign } = props;
    const history = useHistory();
    const [typePass, setTypePass] = useState("password");
    const [loading, setLoading] = useState(false);
    const [errPass, setErrPass] = useState("");
    const [display_email, setDisplay_email] = useState("");
    const [popup, setPopup] = useState(false);
    const [remember, setRemember] = useState(true);
    //
    //handle submit login form
    async function submitLogin(values: any) {
        try {
            const response = await authentication.login(values);
            if (remember === true) {
                localStorage.setItem("_WEB_TK", response.data.context.token);
            } else {
                window.sessionStorage.setItem(
                    "_WEB_TK",
                    response.data.context.token
                );
            }
            const res = await dispatch(fetchAsyncUser());
            if (res?.payload) {
                dispatch(fetchAsyncApps(dayjs().format("YYYY-MM")))
                dispatch(fetchAsyncOrderServices({ page: 1 }))
            }
            setLoading(false);
            history.goBack()
        } catch (error) {
            setLoading(false);
            const err = error as AxiosError;
            switch (err.response?.status) {
                case 401:
                    return setErrPass(
                        "Mật khẩu chưa chính xác. Vui lòng thử lại !"
                    );
                case 404:
                    return setPopup(true);
                default:
                    break;
            }
        }
    }

    const handleLogin = (values: any) => {
        setLoading(true);
        setDisplay_email(values.email);
        submitLogin(values);
    };
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Vui lòng nhập email/số điện thoại"),
            password: Yup.string()
                .min(6, "Mật khẩu lớn hơn 8 ký tự")
                .required("Vui lòng nhập mật khẩu"),
            // .matches(
            //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            //   "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 số và 1 ký tự chữ 1 đặc biệt"
            // ),
        }),
        //SUBMIT LOGIN FORM
        onSubmit: (values) => {
            handleLogin(values);
        },
    });

    return (
        <div>
            <form
                onSubmit={formik.handleSubmit}
                autoComplete="off"
                className="flex-column sign-form"
            >
                <div style={{ width: "100%" }}>
                    <div className="sign-form__box">
                        <img
                            className="sign-form__box-icon"
                            src={icon.User}
                            alt=""
                        />
                        <input
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            type="text"
                            placeholder={t("Home.Sign_in_pl_user_name")}
                        />
                    </div>
                    {formik.errors.email && formik.touched.email && (
                        <p
                            style={{ margin: "8px 0 0 16px" }}
                            className="err-text"
                        >
                            {formik.errors.email}
                        </p>
                    )}
                </div>
                <div style={{ width: "100%" }}>
                    <div className="sign-form__box">
                        <img
                            className="sign-form__box-icon"
                            src={icon.Lock}
                            alt=""
                        />
                        <input
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            type={typePass}
                            placeholder={t("Home.Sign_in_pl_password")}
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
                        <p
                            style={{ margin: "8px 0 8px 16px" }}
                            className="err-text"
                        >
                            {formik.errors.password}
                        </p>
                    )}
                    <p style={{ margin: "0 0 0 16px" }} className="err-text">
                        {errPass}
                    </p>
                </div>
                <div className="signIn-checkbox sign-check">
                    <div className="signIn-checkbox__wrap">
                        <Checkbox
                            defaultChecked={true}
                            onChange={() => setRemember(!remember)}
                            sx={{
                                color: "#7161BA",
                                "&.Mui-checked": {
                                    color: "#7161BA",
                                },
                            }}
                        />
                        <span>{t("Home.Sign_remember")}</span>
                    </div>
                    <span onClick={() => history.replace("/doi-mat-khau")}>
                        {t("Home.Sign_forgot")} ?
                    </span>
                </div>
                <button
                    disabled={loading === true ? true : false}
                    type="submit"
                    className="sign-btn"
                    style={
                        loading === true
                            ? { position: "relative", opacity: "0.6" }
                            : {}
                    }
                >
                    {loading === true ? (
                        <div className="sign-loading">
                            <CircularProgress size="25px" color="inherit" />
                        </div>
                    ) : (
                        <></>
                    )}
                    {t("Home.Sign_in")}
                </button>
            </form>
            {/* <p className="sign-or">{t("Home.Sign_or")}</p>
      <div className="flex-row sign-other-social">
        <img src={icon.google} alt="" />
        <img src={icon.facebook} alt="" />
      </div> */}
            <p className="sign-other-setup">
                {t("Home.Sign_no_acc")}?
                <span onClick={() => setActiveTabSign(2)}>
                    {t("Home.Sign_up_now")}
                </span>
            </p>
            <PopupNoti
                setActiveTabSign={setActiveTabSign}
                popup={popup}
                setPopup={setPopup}
                isSignIn={true}
                title={`Emai "${display_email}" ${t("form.is_not_registered")}`}
            />
        </div>
    );
}

export default SignIn;
