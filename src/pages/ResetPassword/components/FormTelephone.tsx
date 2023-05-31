import React, { useContext } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom'
import { AppContext } from 'context/AppProvider';
import icon from 'constants/icon';


function FormTelephone(props: any) {
    const { t } = useContext(AppContext) as any;
    const { handlePostTelephone, title, load, isDialog, setActiveTabSign, prevUrl } = props;
    const history = useHistory();
    const formikTelephone = useFormik({
        initialValues: {
            telephone: "",
        },
        validationSchema: Yup.object({
            telephone: Yup.string()
                .required(t("form.please_enter_your_phone")),
        }),
        onSubmit: (values) => {
            values = {
                ...values,
                telephone: values.telephone.cleanString()
            };
            handlePostTelephone(values.telephone, true)
        },
    });
    const onBack = () => {
        if (setActiveTabSign) return setActiveTabSign(1)
        if(prevUrl) return history.replace(prevUrl)
        history.goBack()
    }
    return (
        <>
            <div id="recaptcha-container" ></div>
            <div className="flex-row-sp for-pass-cnt__phone-head">
                {
                    !isDialog
                    &&
                    <button
                        onClick={onBack}
                    >
                        <img src={icon.chevronLeft} alt="" />
                    </button>
                }
                <span>{title ? title : t("form.reset_password")}</span>
                <div></div>
            </div>
            <form
                autoComplete='off'
                className="flex-column for-pass-phone"
                onSubmit={formikTelephone.handleSubmit}
            >
                <input
                    name="telephone"
                    value={formikTelephone.values.telephone}
                    onChange={formikTelephone.handleChange}
                    type="text"
                    className="for-pass-cnt__phone-ip"
                    placeholder={t("pm.phone_number")}
                    autoFocus
                />
                {
                    formikTelephone.errors.telephone && formikTelephone.touched.telephone &&
                    <span className="for-pass-cnt__phone-err">
                        {formikTelephone.errors.telephone}
                    </span>
                }
                <button
                    className='for-pass-cnt__btn'
                    type='submit'
                >
                    {load ? t("form.sending") : t("form.continue")}
                </button>
            </form>
        </>
    );
}

export default FormTelephone;