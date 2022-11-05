import React, { useContext, useState } from "react";
import { Checkbox } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { Input, XButton } from 'components/Layout'
import style from '../sign-page.module.css'
import { AppContext } from "context/AppProvider";
import authentication from "api/authApi";
import { fetchAsyncUser } from "redux/USER/userSlice";
import { fetchAsyncApps } from "redux/appointment/appSlice";
import { fetchAsyncOrderServices } from "redux/order/orderSlice";
import { PopupNotification } from 'components/Notification'
import icon from "constants/icon";

function SignIn(props: any) {
    const { t } = useContext(AppContext);
    const dispatch = useDispatch();
    const { setActiveTabSign } = props;
    const history = useHistory();
    const [typePass, setTypePass] = useState<"text" | "password">("password");
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
                className={style.form_container}
            >
                <div className={style.input_wrapper} >
                    <Input
                        className={style.input}
                        icon={icon.User}
                        type="text"
                        placeholder={t("Home.Sign_in_pl_user_name")}
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <p
                            className={style.input_wrapper_error}
                        >
                            {formik.errors.email}
                        </p>
                    )}
                </div>
                <div className={style.input_wrapper} >
                    <Input
                        className={style.input}
                        icon={icon.Lock}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        type={typePass}
                        placeholder={t("Home.Sign_in_pl_password")}
                    />
                    <img
                        onMouseEnter={() => setTypePass("text")}
                        onMouseLeave={() => setTypePass("password")}
                        className={style.input_wrapper_icon_show}
                        src={icon.eye}
                        alt=""
                    />
                    {formik.errors.password && formik.touched.password && (
                        <p
                            className={style.input_wrapper_error}
                        >
                            {formik.errors.password}
                        </p>
                    )}
                    <p style={{ marginTop: "16px" }} className={style.input_wrapper_error}>
                        {errPass}
                    </p>
                </div>
                <div className={style.sign_check}>
                    <div className={style.sign_check_left}>
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
                    <span className={style.sign_check_forgot} onClick={() => history.replace("/doi-mat-khau")}>
                        {t("Home.Sign_forgot")} ?
                    </span>
                </div>
                <div className={style.form_submit_btn}>
                    <XButton
                        title={t("Home.Sign_in")}
                        type="submit"
                        loading={loading}
                    />
                </div>
            </form>
            <p className={style.sign_other_setup}>
                {t("Home.Sign_no_acc")}?
                <span onClick={() => setActiveTabSign(2)}>
                    {t("Home.Sign_up_now")}
                </span>
            </p>
            <PopupNotification
                open={popup}
                setOpen={setPopup}
                title="Thông báo"
                content={`Emai "${display_email}" ${t("form.is_not_registered")}`}
                children={
                    <XButton
                        title={`${t('Home.Sign_up')} ${t('form.now')}`}
                        onClick={() => history.replace({ pathname: '/sign-up', search: '2' })}
                    />
                }
            />
        </div>
    );
}

export default SignIn;