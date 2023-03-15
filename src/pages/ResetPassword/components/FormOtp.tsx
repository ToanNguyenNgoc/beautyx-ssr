import { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { AxiosError } from "axios";
import { AppContext } from 'context/AppProvider';
import authentication from 'api/authApi';
import icon from 'constants/icon';
import { useNoti } from 'hooks';
import { PopupNotification } from 'components/Notification';
import { XButton } from 'components/Layout';
import { useHistory } from 'react-router-dom';
import { omit } from "lodash";
import { ParamsForgotSms } from "interface";

function FormOtp(props: any) {
    const { t } = useContext(AppContext) as any;
    const {
        data,
        setStep
    } = props;
    const history = useHistory();
    const { noti, firstLoad, resultLoad, onCloseNoti } = useNoti();
    const [sec, setSec] = useState(60);
    const [versionOtp, setVersionOtp] = useState<"v1" | "v2">("v1")
    useEffect(() => {
        const timeSec = setInterval(() => {
            if (sec > 0) {
                setSec(prevState => prevState - 1)
            }
        }, 1000)
        return () => clearInterval(timeSec)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sec])

    const handleOnResetPassword = async (params: any) => {
        firstLoad()
        try {
            if (versionOtp === "v1") {
                await authentication.forgotPassword(params)
            }
            if (versionOtp === "v2") {
                await authentication.forgotVoiceSms(omit(params, ["verification_id"]) as ParamsForgotSms)
            }
            resultLoad(
                t("form.change_password_successfully"),
                <XButton
                    title='Trở về đăng nhập'
                    onClick={() => history.replace({
                        pathname: "/sign-in",
                        search: "1",
                    })}
                />
            )
        } catch (error) {
            const err = error as AxiosError;
            switch (err.response?.status) {
                case 400:
                    return resultLoad('Mã xác thực không chính xác')
                case 501:
                    return resultLoad('Mã xác thực không chính xác')
                default:
                    resultLoad('Có lỗi xảu ra')
                    break
            }
        }
    }
    const formikTelephone = useFormik({
        initialValues: {
            otp: "",
            new_password: "",
            confirm_password: "",
        },
        validationSchema: Yup.object({
            otp: Yup.string()
                .required(t("form.please_enter_your_verification_code"))
                .matches(/^[0-9]+$/, t("form.verification_invalid"))
                .min(4, t("form.verification_code_of_6_characters"))
                .max(6, t("form.verification_code_of_6_characters")),
            new_password: Yup.string()
                .min(8, t("form.password_min"))
                .max(32, t("form.password_max"))
                .required(t("Home.Sign_val_password")),
            confirm_password: Yup.string()
                .required(t("form.please_confirm_password"))
                .oneOf([Yup.ref("new_password"), null], t("form.password_confirm_invalid")),
        }),
        onSubmit: (values) => {
            const params = {
                telephone: `${data.telephone}`,
                code: `${values.otp}`,
                new_password: values.new_password,
                verification_id: data.verification_id
            }
            handleOnResetPassword(params)
        },
    });
    const onReSendOtp = async () => {
        await authentication.forgotVoiceSms({
            telephone: data.telephone
        })
        setVersionOtp("v2")
        setSec(60)
    }

    return (
        <>
            <PopupNotification
                open={noti.openAlert}
                setOpen={onCloseNoti}
                title="Thông báo"
                content={noti.message}
                children={noti.element}
            />
            <div id="recaptcha-container" ></div>
            <div className="flex-row-sp for-pass-cnt__phone-head">
                <button
                    onClick={() => setStep(1)}
                >
                    <img src={icon.chevronLeft} alt="" />
                </button>
                <span>{t("form.reset_password")}</span>
                <div></div>
            </div>
            <div className="flex-column for-pass-cnt__phone-noti">
                <span>{t("form.send_your_code_text")}</span>
                <span>{data.telephone}</span>
                <form
                    autoComplete='off'
                    className="flex-column for-pass-phone"
                    onSubmit={formikTelephone.handleSubmit}
                >
                    <input
                        name="otp"
                        value={formikTelephone.values.otp}
                        onChange={formikTelephone.handleChange}
                        type="number" pattern="[0-9]*" inputMode="numeric"
                        style={{ textAlign: 'center' }}
                        className="for-pass-cnt__phone-ip"
                        placeholder={t("form.verification_code")}
                    />
                    {
                        formikTelephone.errors.otp && formikTelephone.touched.otp &&
                        <span className="for-pass-cnt__phone-err">
                            {formikTelephone.errors.otp}
                        </span>
                    }
                    <input
                        name="new_password"
                        value={formikTelephone.values.new_password}
                        onChange={formikTelephone.handleChange}
                        type="text"
                        style={{ textAlign: 'center' }}
                        className="for-pass-cnt__phone-ip"
                        placeholder={t("Home.Sign_in_pl_password")}
                    />
                    {
                        formikTelephone.errors.new_password && formikTelephone.touched.new_password &&
                        <span className="for-pass-cnt__phone-err">
                            {formikTelephone.errors.new_password}
                        </span>
                    }
                    <input
                        name="confirm_password"
                        value={formikTelephone.values.confirm_password}
                        onChange={formikTelephone.handleChange}
                        type="text"
                        style={{ textAlign: 'center' }}
                        className="for-pass-cnt__phone-ip"
                        placeholder={t("form.confirm_password")}
                    />
                    {
                        formikTelephone.errors.confirm_password && formikTelephone.touched.confirm_password &&
                        <span className="for-pass-cnt__phone-err">
                            {formikTelephone.errors.confirm_password}
                        </span>
                    }
                    <div className="for-pass-cnt__time">
                        {
                            sec > 0 ?
                                <>{t("form.please_wait")} <span>{sec}</span> {t("form.to_get_the_verification_code_back")}</>
                                :
                                <span onClick={onReSendOtp} >{t("form.resend_code")}</span>
                        }
                    </div>
                    <XButton
                        title={t("form.continue")}
                        className='for-pass-cnt__btn'
                        type='submit'
                        loading={noti.load}
                    />
                </form>
            </div>
        </>
    );
}

export default FormOtp;