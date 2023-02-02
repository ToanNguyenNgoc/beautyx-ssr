import { AppContext } from 'context/AppProvider';
import { useFormik } from 'formik';
import IStore from 'interface/IStore';
import { HeadTitle } from 'pages/Account';
import React, { useContext, useState } from 'react';
import * as Yup from 'yup'
import { useSelector } from 'react-redux';
import style from './change-pass.module.css'
import { Input, XButton } from 'components/Layout';
import { clst, formatTelephone } from 'utils';
import { useNoti } from 'hooks'
import { authentication, RecaptchaVerifier, signInWithPhoneNumber } from '../../../../firebase';
import { PopupNotification, PopupMessage } from 'components/Notification';
import { auth } from 'api/authApi'
import icon from 'constants/icon';
import { pick } from 'lodash';
import { AxiosError } from 'axios';

function ChangePassword() {
    const { t } = useContext(AppContext)
    const { USER } = useSelector((state: IStore) => state.USER)
    const [alert, setAlert] = useState({ open: false, content: '', load: false })
    const { noti, firstLoad, resultLoad, onCloseNoti } = useNoti()
    const [show, setShow] = useState({ pass: false, confirm: false })
    const formik = useFormik({
        initialValues: {
            telephone: USER?.telephone,
            new_password: '',
            confirm_password: '',
            code: '',
            verification_id: ''
        },
        validationSchema: Yup.object({
            code: Yup.string()
                .required(t("form.please_enter_your_verification_code"))
                .matches(/^[0-9]+$/, t("form.verification_invalid"))
                .min(6, t("form.verification_code_of_6_characters"))
                .max(6, t("form.verification_code_of_6_characters")),
            new_password: Yup.string()
                .min(8, t("form.password_min"))
                .max(32, t("form.password_max"))
                .required(t("Home.Sign_val_password")),
            confirm_password: Yup.string()
                .required(t("form.please_confirm_password"))
                .oneOf([Yup.ref("new_password"), null], t("form.password_confirm_invalid")),
        }),
        onSubmit: async (values) => {
            const params = pick(values, ['code', 'telephone', 'new_password', 'verification_id'])
            firstLoad()
            try {
                const res = await auth.forgotPassword(params)
                if (res) resultLoad('Thay đổi mật khẩu thành công!')
            } catch (error) {
                const err = error as AxiosError;
                switch (err?.response?.status) {
                    case 400:
                        resultLoad('The verification id field is required.')
                        break;
                    case 502:
                        resultLoad('Mã xác thực không chính xác.')
                        break;
                    default:
                        resultLoad('Có lỗi xảy ra. Vui lòng thử lại!')
                        break;
                }
            }
        }
    })
    // handle capcha && otp
    const generateRecaptcha = () => {
        try {
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    'recaptcha-container',
                    {
                        size: 'invisible',
                        callback: (value: any) => {
                            // handleSubmit(value, true)
                        },
                        'expired-callback': () => {
                            // Response expired. Ask user to solve reCAPTCHA again.
                            // ...
                        },
                    },
                    authentication
                )
            } else {
                window.recaptchaVerifier.render()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleSignWithPhone = async () => {
        const phoneNumber = formatTelephone(USER.telephone)
        setAlert({ ...alert, load: true })
        try {
            const result = await signInWithPhoneNumber(authentication, phoneNumber, window.recaptchaVerifier);
            formik.setFieldValue('verification_id', result.verificationId)
            setAlert({ open: true, content: `${t('form.verification_code_has_been_sent_to')} "${USER.telephone}"`, load: false })
        } catch (error) {
            console.log(error)
            let errorCode = error.code;
            let messCode = error.message;
            if (
                errorCode === "auth/quota-exceeded" ||
                errorCode === "auth/too-many-requests"
            ) {
                setAlert({ open: true, content: `Số điện thoại đã đạt giới hạn cho phép gửi mã xác thực (OTP) trong ngày`, load: false })
            } else if (
                messCode ===
                "reCAPTCHA has already been rendered in this element"
            ) {
                setAlert({ open: true, content: `Quá số lần nhận Otp tải lại trang để tiếp tục ...`, load: false })
            }
            else {
                setAlert({ open: true, content: `Quá số lần nhận Otp tải lại trang để tiếp tục ...`, load: false })
            }
        }
    }
    const onSubmitTelephone = () => {
        if (USER.telephone) {
            generateRecaptcha()
            handleSignWithPhone()
        }
    }
    //
    return (
        <>
            <HeadTitle title={t('acc.change_pass')} />
            <div className={style.container}>
                <form
                    className={style.form_container}
                    autoComplete='off'
                    onSubmit={formik.handleSubmit}
                >
                    <div className={style.form_row}>
                        <div className={style.form_row_label}>
                            {t('form.code')}
                        </div>
                        <div className={clst([style.form_row_input, style.form_row_otp])}>
                            <Input
                                classNamePar={style.form_row_input_otp}
                                name='code'
                                value={formik.values.code}
                                onChange={formik.handleChange}
                                placeholder={t('form.code')}
                            />
                            <XButton
                                title={t('form.get_code')}
                                type='button'
                                onClick={onSubmitTelephone}
                                loading={alert.load}
                            />
                        </div>
                        {
                            formik.errors.code && formik.touched.code &&
                            <p className={style.form_row_err}>
                                {formik.errors.code}
                            </p>
                        }
                    </div>
                    <div className={style.form_row}>
                        <div className={style.form_row_label}>
                           {t('Home.Sign_in_pl_password')}
                        </div>
                        <div className={style.form_row_input}>
                            <Input
                                name='new_password'
                                value={formik.values.new_password}
                                onChange={formik.handleChange}
                                placeholder={t('Home.Sign_in_pl_password')}
                                type={show.pass ? 'text' : 'password'}
                            />
                            <img
                                onClick={() => setShow({ ...show, pass: !show.pass })}
                                className={style.form_row_input_icon}
                                src={show.pass ? icon.eyeCrossPurple : icon.eye} alt=""
                            />
                        </div>
                        {
                            formik.errors.new_password && formik.touched.new_password &&
                            <p className={style.form_row_err}>
                                {formik.errors.new_password}
                            </p>
                        }
                    </div>
                    <div className={style.form_row}>
                        <div className={style.form_row_label}>
                            {t('form.confirm_password')}
                        </div>
                        <div className={style.form_row_input}>
                            <Input
                                name='confirm_password'
                                value={formik.values.confirm_password}
                                onChange={formik.handleChange}
                                placeholder={t('form.confirm_password')}
                                type={show.confirm ? 'text' : 'password'}
                            />
                            <img
                                onClick={() => setShow({ ...show, confirm: !show.confirm })}
                                className={style.form_row_input_icon}
                                src={show.confirm ? icon.eyeCrossPurple : icon.eye} alt=""
                            />
                        </div>
                        {
                            formik.errors.confirm_password && formik.touched.confirm_password &&
                            <p className={style.form_row_err}>
                                {formik.errors.confirm_password}
                            </p>
                        }
                    </div>
                    <div className={style.form_bot}>
                        <XButton
                            title={t('acc.save')}
                            type='submit'
                            loading={noti.load}
                        />
                    </div>
                </form>
            </div>
            <div id="recaptcha-container" ></div>
            <PopupMessage
                iconLabel={icon.Headphones_purple}
                iconSize={50}
                open={alert.open}
                onClose={() => setAlert({ ...alert, open: false })}
                content={alert.content}
                autoHide={true}
            />
            <PopupNotification
                open={noti.openAlert}
                title='Thông báo'
                content={noti.message}
                setOpen={() => onCloseNoti()}
            />
        </>
    );
}

export default ChangePassword;