import React, { useContext, useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FormControl, RadioGroup, FormControlLabel, Radio, Checkbox, CircularProgress } from '@mui/material'
import { AxiosError } from "axios";
import SignVeriOtp from './SignVeriOtp';
import { AppContext } from 'context/AppProvider';
import authentication from 'api/authApi';
import validateForm from 'utils/validateForm';
import icon from 'constants/icon';
import { XButton } from 'components/Layout'
import { PopupNotification } from 'components/Notification'
import { useHistory } from 'react-router-dom';

function SignUps(props: any) {
    const { t } = useContext(AppContext)
    const { setActiveTabSign } = props;
    const history = useHistory()
    const [loading, setLoading] = useState(false);
    const [noti, setNoti] = useState({
        content: "",
        open: false,
        children: <></>
    })
    const [openOtp, setOpenOtp] = useState(true);
    const [dataOtp, setDataOtp] = useState({
        telephone: '',
        verification_id: ''
    })
    const onBackSignIn = () => {
        setActiveTabSign(1)
        history.replace({ pathname: '/sign-in', search: '1' })
    }
    const handleAsyncForgotPass = async (val: any) => {
        const params = {
            telephone: val.telephone,
            new_password: val.password,
            code: val.code,
            verification_id: val.verification_id
        }
        try {
            await authentication.forgotPassword(params);
            setLoading(false);
            setNoti({
                content: "Đăng ký thành công",
                open: true,
                children: <XButton
                    title='Quay vè trang đăng nhập'
                    onClick={onBackSignIn}
                />
            })
        } catch (error) {
            console.log(error)
            setNoti({
                content: "Có lỗi xảy ra. Vui lòng thử lại!",
                open: true,
                children: <XButton
                    title='Quay vè trang đăng nhập'
                    onClick={onBackSignIn}
                />
            })
        }
    }
    async function handleSubmitForm(values: any) {
        const params = {
            fullname: values.name,
            email: values.email,
            telephone: dataOtp.telephone,
            code: values.code,
            verification_id: dataOtp.verification_id,
            password: values.password,
            platform: 'BEAUTYX'
        }
        try {
            await authentication.register(params);
            setLoading(false);
            setNoti({
                content: "Đăng ký thành công",
                open: true,
                children: <XButton
                    title='Quay vè trang đăng nhập'
                    onClick={onBackSignIn}
                />
            })
        } catch (error) {
            setLoading(false);
            const err = error as AxiosError;
            if (err.response?.status === 400) {
                handleAsyncForgotPass(params)
                // setErrAlready({
                //     errMail: err.response.data.context.email ? t("form.email_already") : ``,
                //     errPhone: err.response.data.context.telephone ? t("form.phone_already") : ``
                // })
            }
        }
    }


    const [typePass, setTypePass] = useState('password')
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            code: '',
            password: '',
            confirm_password: '',
            sex: '',
            agree: false
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Tên lớn hơn 2 ký tự")
                .required("Vui lòng nhập họ và tên")
                .matches(
                    validateForm.fullname,
                    "Tên không đúng định dạng"
                ),
            sex: Yup.string().required("Vui lòng chọn giới tính"),
            email: Yup.string()
                .required("Vui lòng nhập Email hoặc Số điện thoại")
                .matches(
                    // eslint-disable-next-line no-useless-escape
                    validateForm.email,
                    "Vui lòng nhập đúng định dạng Example@gmail.com"
                ),
            code: Yup.string()
                .required("Vui lòng nhập mã xác thực")
                .matches(/^[0-9]+$/, "Mã xác thực không hợp lệ")
                .min(6, 'Mã xác thực gồm 6 ký tự')
                .max(6, 'Mã xác thực gồm 6 ký tự'),
            password: Yup.string()
                .min(8, "Mật khẩu lớn hơn 8 ký tự")
                .max(32, "Mật khẩu tối đa 32 kí tự")
                .required("Vui lòng nhập mật khẩu"),
            confirm_password: Yup.string()
                .required("Vui lòng xác nhận lại mật khẩu")
                .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
            agree: Yup.boolean().oneOf(
                [true],
                "Vui lòng đọc và chấp nhận điều khoản"
            ),
        }),
        onSubmit: (values: any) => {
            setLoading(true)
            handleSubmitForm(values)
        }
    })
    return (
        <div>
            <SignVeriOtp
                open={openOtp}
                setOpen={setOpenOtp}
                dataOtp={dataOtp}
                setDataOtp={setDataOtp}
            />
            <form
                onSubmit={formik.handleSubmit}
                autoComplete='off'
                className="flex-column sign-form"
            >
                <div className="flex-column">
                    <div className="flex-row w-100">
                        <div className="sign-form__box ">
                            <img className="sign-form__box-icon" src={icon.User} alt="" />
                            <input
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                name="name"
                                type="text"
                                placeholder={t("pm.full_name")}
                            />
                        </div>

                        <FormControl component="fieldset">
                            <RadioGroup
                                row
                                aria-label="gender"
                                name="sex"
                                value={formik.values.sex}
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
                                    label={t("form.male")}
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
                                    label={t("form.female")}
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
                                    label={t("form.other")}
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="flex-row w-100">
                        {formik.errors.name && formik.touched.name && (
                            <p style={{ marginLeft: "20px" }} className="err-text">
                                {formik.errors.name}
                            </p>
                        )}
                        {formik.errors.sex && formik.touched.sex && (
                            <p style={{ marginLeft: "6px" }} className="err-text">
                                {formik.errors.sex}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex-column w-100">
                    <div className="sign-form__box  mb-16 ">
                        <img className="sign-form__box-icon" src={icon.Message} alt="" />
                        <input
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            name="email"
                            type="text"
                            placeholder="Email"
                        />
                    </div>
                    {formik.errors.email && formik.touched.email && (
                        <p className="err-text">{formik.errors.email}</p>
                    )}
                    {/* <p className="err-text">{errAlready.errMail}</p> */}
                </div>
                <div className="flex-column w-100">
                    <div
                        className='flex-row-sp sign-up-ip-otp'
                    >
                        <div className="sign-form__box mb-16 sign-form__box-otp">
                            <img className="sign-form__box-icon" src={icon.Lock} alt="" />
                            <input
                                className='sign-form__box-otp__ip'
                                value={formik.values.code}
                                onChange={formik.handleChange}
                                name="code"
                                type="text"
                                placeholder="Mã xác thực"
                            />
                        </div>
                        <div className='flex-row-sp sign-form__box-otp-right'>
                            <span
                                onClick={() => setOpenOtp(true)}
                                className='sign-form__box-otp__ch'
                            >
                                Đổi số điện thoại
                            </span>
                            {/* <span>
                                Hết hạn sau {sec}s
                            </span> */}
                        </div>
                    </div>
                    {formik.errors.code && formik.touched.code && (
                        <p className="err-text">{formik.errors.code}</p>
                    )}
                    {/* <p className="err-text">{errAlready.errPhone}</p> */}
                </div>
                <div className="flex-column w-100">
                    <div className="sign-form__box mb-16">
                        <img className="sign-form__box-icon" src={icon.Lock} alt="" />
                        <input
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            name="password"
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
                        <p className="err-text">{formik.errors.password}</p>
                    )}
                </div>
                <div className="flex-column w-100">
                    <div className="sign-form__box mb-16">
                        <img className="sign-form__box-icon" src={icon.Lock} alt="" />
                        <input
                            value={formik.values.confirm_password}
                            onChange={formik.handleChange}
                            name="confirm_password"
                            type={typePass}
                            placeholder={t("form.confirm_password")}
                        />
                        <img
                            onMouseEnter={() => setTypePass("text")}
                            onMouseLeave={() => setTypePass("password")}
                            className="sign-form__box-icon-show"
                            src={icon.eye}
                            alt=""
                        />
                    </div>
                    {formik.errors.confirm_password && formik.touched.confirm_password && (
                        <p className="err-text">{formik.errors.confirm_password}</p>
                    )}
                </div>
                <div className="flex-row w-100">
                    <Checkbox
                        value={formik.values.agree}
                        onChange={formik.handleChange}
                        name="agree"
                        //id="agree"
                        // defaultChecked
                        sx={{
                            color: "#7161BA",
                            "&.Mui-checked": {
                                color: "#7161BA",
                            },
                        }}
                    />
                    <p className="sign-other-setup">
                        {t("form.i_agree")}
                        <span>{t("form.myspa_s_terms")}</span>
                    </p>
                </div>
                {formik.errors.agree && formik.touched.agree && (
                    <p style={{ margin: "0px 0px 0px 38px" }} className="err-text">
                        {formik.errors.agree}
                    </p>
                )}
                <button
                    // disabled={agree === true ? false : true}
                    type="submit"
                    className="sign-btn mt-38"
                    style={
                        loading === true ? { position: "relative", opacity: "0.6" } : {}
                    }
                >
                    {loading === true ? (
                        <div className="sign-loading">
                            <CircularProgress size="25px" color="inherit" />
                        </div>
                    ) : (
                        ""
                    )}
                    {t("Home.Sign_up")}
                </button>
                {/* <p className="sign-or">{t("Home.Sign_or")}</p>
                <div className="flex-row sign-other-social">
                    <img src={icon.google} alt="" />
                    <img src={icon.facebook} alt="" />
                </div> */}
            </form>
            <PopupNotification
                title='Thông báo'
                open={noti.open}
                content={noti.content}
                children={noti.children}
                setOpen={() => setNoti({ ...noti, open: false })}
            />
        </div>
    );
}

export default SignUps;