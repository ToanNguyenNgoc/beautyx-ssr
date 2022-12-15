import React, { useContext, useState } from 'react';
import HeadMobile from 'features/HeadMobile';
import { authentication, signInWithPhoneNumber, RecaptchaVerifier } from "../../firebase";
import * as Yup from 'yup';
import style from './otp.module.css'
import { useFormik } from 'formik';
import { Input, XButton } from 'components/Layout';
import { AppContext } from 'context/AppProvider';
import { useNoti } from "hooks"
import { PopupNotification } from 'components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'interface/IStore';
import { auth } from 'api/authApi'
import { putUser } from 'redux/user/userSlice';
import { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';

declare global {
    interface Window {
        recaptchaVerifier: any;
        confirmationResult: any;
        recaptchaWidgetId: any;
    }
}
window.confirmationResult = window.confirmationResult || {};

interface IData {
    telephone: string,
    code: string,
    verification_id: string
}

function OtpMbPage() {
    const [step, setStep] = useState(1)
    const [data, setData] = useState({
        telephone: '',
        code: '',
        verification_id: ''
    })

    return (
        <>
            <div className={style.body}>
                {step === 1 && <FormTelephone
                    data={data}
                    setData={setData}
                    step={step} setStep={setStep}
                />}
                {
                    step === 2 &&
                    <FormOtp
                        data={data} setData={setData}
                        step={step} setStep={setStep}
                    />
                }
            </div>
        </>
    );
}

export default OtpMbPage;

interface FormTelephoneProps {
    data: IData,
    setData: (data: IData) => void,
    step: number, setStep: (step: number) => void
}

const FormTelephone = (props: FormTelephoneProps) => {
    const { data, setData, setStep } = props
    const { t } = useContext(AppContext)
    const { noti, firstLoad, resultLoad, onCloseNoti } = useNoti()
    const generateRecaptcha = async () => {
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
                window.recaptchaVerifier.render();
            }
        } catch (err: any) {
            console.log(err)
        }
    }
    //handle form telephone
    const handleSubmitTelephone = async (values: any) => {
        firstLoad()
        let phoneNumberVN = "+84" + values.telephone.toString().slice(1);
        try {
            const res = await signInWithPhoneNumber(authentication, phoneNumberVN, window.recaptchaVerifier)
            setData({
                ...data,
                telephone: values.telephone,
                verification_id: res.verificationId
            })
            resultLoad('', false)
            setStep(2)
        } catch (error) {
            console.log(error);
            let errorCode = error.code;
            let messCode = error.message;
            if (
                errorCode === "auth/quota-exceeded" ||
                errorCode === "auth/too-many-requests"
            ) {
                resultLoad('Số điện thoại đã đạt giới hạn cho phép gửi mã xác thực (OTP) trong ngày')
            } else if (
                messCode ===
                "reCAPTCHA has already been rendered in this element"
            ) {
                resultLoad('Quá số lần nhận Otp tải lại trang để tiếp tục ...')
            }
            else {
                resultLoad('Quá số lần nhận Otp tải lại trang để tiếp tục ..')
            }
        }
    }
    const formik = useFormik({
        initialValues: {
            telephone: data.telephone
        },
        validationSchema: Yup.object({
            telephone: Yup.string()
                .required(t("form.please_enter_your_phone")),
        }),
        onSubmit: (values) => {
            generateRecaptcha()
            handleSubmitTelephone(values)
        }
    })
    return (
        <>
            <HeadMobile
                title='Cập nhật thông tin'
            />
            <div className={style.container}>
                <div id="recaptcha-container" ></div>
                <form
                    className={style.form_cnt}
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                >
                    <Input
                        onChange={formik.handleChange}
                        name="telephone"
                        value={formik.values.telephone}
                        placeholder={t("pm.phone_number")}
                    />
                    {
                        formik.errors.telephone && formik.touched.telephone &&
                        <span className="for-pass-cnt__phone-err">
                            {formik.errors.telephone}
                        </span>
                    }
                    <div className={style.form_btn}>
                        <XButton
                            className={style.btn_send_telephone}
                            title='Gửi mã xác nhận'
                            type="submit"
                            loading={noti.load}
                        />
                    </div>
                </form>
                <PopupNotification
                    open={noti.openAlert}
                    setOpen={onCloseNoti}
                    title='Thông báo'
                    content={noti.message}
                    children={
                        <XButton
                            title='Đã hiểu'
                            onClick={onCloseNoti}
                        />
                    }
                />
            </div>
        </>
    )
}

interface FormOtpProps {
    data: IData, setData: (data: IData) => void,
    step: number, setStep: (step: number) => void
}

const FormOtp = (props: FormOtpProps) => {
    const history = useHistory()
    const dispatch = useDispatch();
    const { data } = props;
    const { noti, firstLoad, resultLoad, onCloseNoti } = useNoti()
    const { USER } = useSelector((state: IStore) => state.USER)
    const handleSubmit = async (values: any) => {
        const params = {
            ...data,
            code: values.code
        }
        firstLoad()
        try {
            const res = await auth.putUserProfile(params)
            if (res) {
                dispatch(putUser({ ...USER, telephone: data.telephone }));
                resultLoad(
                    'Thay đổi thông tin thành công',
                    true,
                    <XButton
                        title='Trở lại giỏ hàng'
                        onClick={() => history.goBack()}
                    />
                )
            }
        } catch (error) {
            const err = error as AxiosError;
            switch (err.response?.status) {
                case 301:
                    return resultLoad('Số điện thoại đã tồn tại');
                case 502:
                    return resultLoad('Lỗi hệ thống gửi sms quý khách vui lòng thử lại sau!')
                default:
                    return resultLoad('Đã có lỗi xảy ra vui lòng thử lại sau!')
            }
        }

    }
    const formik = useFormik({
        initialValues: { code: '' },
        validationSchema: Yup.object({
            code: Yup.string()
                .required('Vui lòng nhập mã OTP'),
        }),
        onSubmit: (values) => {
            handleSubmit(values)
        }
    })
    return (
        <>
            <HeadMobile
                title='Nhập mã OTP'
                onBack={() => window.location.reload()}
            />
            <div className={style.container}>
                <div className={style.container_title}>
                    Mã OTP đã được gửi đến số điện thoại <h4>{data.telephone}</h4>
                </div>
                <form
                    className={style.form_cnt}
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                >
                    <Input
                        onChange={formik.handleChange}
                        name="code"
                        value={formik.values.code}
                        placeholder={'Nhập mã OTP'}
                    />
                    {
                        formik.errors.code && formik.touched.code &&
                        <span className="for-pass-cnt__phone-err">
                            {formik.errors.code}
                        </span>
                    }
                    <div className={style.form_btn}>
                        <XButton
                            className={style.btn_send_telephone}
                            title='Cập nhật'
                            type="submit"
                        />
                    </div>
                </form>
                <PopupNotification
                    title='Thông báo'
                    content={noti.message}
                    open={noti.openAlert}
                    setOpen={onCloseNoti}
                    children={noti.child}
                />
            </div>
        </>
    )
}