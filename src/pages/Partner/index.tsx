import { Container } from "@mui/material";
import { Input, XButton } from "components/Layout";
import icon from "constants/icon";
import img from "constants/img";
import { AppContext } from "context/AppProvider";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import { GoogleReCaptcha, GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import style from './partner.module.css'
import axios from "axios";
import API_3RD from "api/3rd-api";
import { useDeviceMobile, useNoti } from "hooks";
import { PopupNotification } from "components/Notification";
import { ABOUT_PARTNER_LINK } from "constants/index";
import HeadMobile from "features/HeadMobile";

interface ValuesProp {
    full_name: string,
    business_name: string,
    address: string,
    telephone: "" | number,
    email: string
}

export default function Partner() {
    const { t } = useContext(AppContext) as any
    const partnerListLabel = [
        t("partner.sell_products"),
        t("partner.customers"),
        t("partner.regional"),
        t("partner.support"),
        t("partner.simplify"),
        t("partner.a_place"),
        t("partner.create"),
        t("partner.create_a_beauty")
    ]
    const [captcha, setCaptcha] = useState("")
    const IS_MB = useDeviceMobile()
    const verifyRecaptchaCallback = React.useCallback((token: any) => {
        setCaptcha(token);
    }, []);
    const { firstLoad, resultLoad, noti, onCloseNoti } = useNoti()
    const params = new URLSearchParams()
    const handleSubmitForm = async (values: ValuesProp) => {
        params.append("reg_phone", `0${values.telephone.toString().slice(-9)}`);
        params.append("reg_email", `${values.email}`);
        params.append("reg_name", `${values.full_name}`);
        params.append("reg_business_name", `${values.business_name}`);
        params.append("reg_business_add", `${values.address}`);
        params.append("reg_captcha", `${captcha}`);
        params.append("reg_action", "submit");
        params.append("reg_type", "ĐĂNG+KÝ+LIÊN+KẾT+VÍ+MOMO")
        firstLoad()
        try {
            await axios.post(
                API_3RD.API_PARTNER,
                params,
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            resultLoad('Đăng ký thành công ! Nhân viên sẽ liên hệ với bạn sớm nhất.')
        } catch (error) {
            console.log(error)
            resultLoad('Có lỗi xảy ra. Vui lòng thử lại!')
        }
    }

    const formik = useFormik({
        initialValues: {
            full_name: '',
            business_name: "",
            address: '',
            telephone: '',
            email: ''
        },
        validationSchema: Yup.object({
            telephone: Yup.number().required(t("form.please_enter_your_phone"))
        }),
        onSubmit: (values: ValuesProp) => {
            handleSubmitForm(values)
        }
    })
    return (
        <>
            {IS_MB && <HeadMobile title={t('Header.1')} />}
            <Container>
                <div className={style.container}>
                    <div className={style.left}>
                        <h1 className={style.partner_title}>
                            Booking Platform BeautyX {t("partner.online_business")}
                        </h1>
                        <div className={style.partner_img}>
                            <img src={img.Partner} alt="" />
                        </div>
                        <div className={style.partner_desc}>
                            <p style={{ whiteSpace: "pre-line" }}>{t("partner.intro")}</p>
                        </div>
                        <div className={style.partner_list}>
                            <ul className={style.partner_list_item}>
                                {
                                    partnerListLabel.map((label, index: number) => (
                                        <li key={index} className={style.label_item}>📌{" "}{label}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className={style.right}>
                        <div className={style.form_title}>
                            {t("partner.become_a_myspa")}
                        </div>
                        <GoogleReCaptchaProvider
                            reCaptchaKey="6Lf1oP8fAAAAAPPkdjSTEcyQFetr56gmpNwOMj59"
                        >
                            <form className={style.form} onSubmit={formik.handleSubmit} autoComplete="off" >
                                <div className={style.form_bottom}>
                                    <div className={style.form_row}>
                                        <Input
                                            value={formik.values.full_name}
                                            id='full_name'
                                            name="full_name"
                                            placeholder={t("pm.full_name")}
                                            onChange={formik.handleChange}
                                            icon={icon.User}
                                        />
                                    </div>
                                    <div className={style.form_row}>
                                        <Input
                                            value={formik.values.business_name}
                                            id='business_name'
                                            name="business_name"
                                            placeholder={t("partner.company_name")}
                                            onChange={formik.handleChange}
                                            icon={icon.Buildings}
                                        />
                                    </div>
                                    <div className={style.form_row}>
                                        <Input
                                            value={formik.values.address}
                                            id='address'
                                            name="address"
                                            placeholder={t("Mer_de.address")}
                                            onChange={formik.handleChange}
                                            icon={icon.Location}
                                        />
                                    </div>
                                    <div className={style.form_row}>
                                        <Input
                                            value={formik.values.telephone}
                                            id='telephone'
                                            name="telephone"
                                            type="number"
                                            placeholder={t("pm.phone_number")}
                                            onChange={formik.handleChange}
                                            icon={icon.Phone}
                                        />
                                        {formik.errors.telephone && formik.touched.telephone && (
                                            <span className={style.input_wrapper_error}>
                                                {formik.errors.telephone}
                                            </span>
                                        )}
                                    </div>
                                    <div className={style.form_row}>
                                        <Input
                                            value={formik.values.email}
                                            id='email'
                                            name="email"
                                            placeholder={'Email'}
                                            onChange={formik.handleChange}
                                            icon={icon.Message}
                                        />
                                    </div>
                                    <GoogleReCaptcha onVerify={verifyRecaptchaCallback} />
                                    <div className={style.form_bottom}>
                                        <XButton
                                            type='submit'
                                            title={t("Home.Sign_up_now")}
                                            className={style.form_submit_btn}
                                            loading={noti.load}
                                        />
                                        <p
                                            onClick={() => window.open(ABOUT_PARTNER_LINK, '_blank', 'noopener,noreferrer')}
                                            className={style.view_more}
                                        >
                                            Tìm hiểu thêm
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </GoogleReCaptchaProvider>
                    </div>
                </div>
                <PopupNotification
                    title="Thông báo"
                    content={noti.message}
                    open={noti.openAlert}
                    setOpen={onCloseNoti}
                />
            </Container>
        </>
    );
}
