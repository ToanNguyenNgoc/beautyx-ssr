import { Dialog } from "@mui/material";
import React, { useContext } from "react";
import ButtonCus from "../../../components/ButtonCus";
import icon from "../../../constants/icon";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppContext } from "../../../context/AppProvider";
export default function PopupDetailContact(props: any) {
    const { setOpenPopupContact, openPopupContact } = props;
    const { t } = useContext(AppContext);

    function handleClosePopupContact() {
        setOpenPopupContact(false);
    }
    const formikContact = useFormik({
        initialValues: {
            name: "",
            gmail: "",
            phone: "",
            address: "",
            business: "",
        },
        validationSchema: Yup.object({
            address: Yup.string().required(`${t("contact_form.vali_address")}`),
            business: Yup.string().required(
                `${t("contact_form.vali_business")}`
            ),
            name: Yup.string()
                .min(2, `${t("contact_form.vali_name_min")}`)
                .max(32, `${t("contact_form.vali_name_max")}`)
                .required(`${t("contact_form.vali_name")}`)
                .matches(
                    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
                    `${t("contact_form.vali_err_name")}`
                ),
            gmail: Yup.string()
                .required(`${t("contact_form.vali_email")}`)
                .matches(
                    // eslint-disable-next-line no-useless-escape
                    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i,
                    `${t("contact_form.vali_err_email")}`
                ),
            phone: Yup.string()
                .min(10, `${t("contact_form.vali_phone_min")}`)
                .max(11, `${t("contact_form.vali_phone_max")}`)
                .required(`${t("contact_form.vali_phone")}`)
                .matches(
                    /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                    `${t("contact_form.vali_err_phone")}`
                ),
        }),
        onSubmit: (values: any) => {
            console.log(values);
            // handleCloseContact();
        },
    });
    return (
        <Dialog onClose={handleClosePopupContact} open={openPopupContact}>
            <div className="form-contact">
                <h2 className="form-contact__title">
                    {`${t("contact_form.contact_title")}`}
                </h2>
                <span className="form-contact__desc">
                    {`${t("contact_form.contact_desc")}`}
                </span>

                <div className="wrap-btn">
                    <div className="sign-form__box">
                        <img
                            className="sign-form__box-icon "
                            src={icon.User}
                            alt=""
                        />
                        <input
                            autoComplete="off"
                            value={formikContact.values.name}
                            onChange={formikContact.handleChange}
                            name="name"
                            id="name"
                            placeholder={`${t("contact_form.name")}`}
                        />
                    </div>
                    {formikContact.errors.name &&
                        formikContact.touched.name && (
                            <p className="err-text">
                                {formikContact.errors.name}
                            </p>
                        )}

                    <div className="sign-form__box">
                        <img
                            className="sign-form__box-icon "
                            src={icon.Message}
                            alt=""
                        />
                        <input
                            autoComplete="off"
                            value={formikContact.values.gmail}
                            onChange={formikContact.handleChange}
                            name="gmail"
                            id="gmail"
                            placeholder="Email"
                        />
                    </div>
                    {formikContact.errors.gmail &&
                        formikContact.touched.gmail && (
                            <p className="err-text">
                                {formikContact.errors.gmail}
                            </p>
                        )}

                    <div className="sign-form__box">
                        <img
                            className="sign-form__box-icon "
                            src={icon.Phone}
                            alt=""
                        />
                        <input
                            autoComplete="off"
                            value={formikContact.values.phone}
                            onChange={formikContact.handleChange}
                            name="phone"
                            id="phone"
                            placeholder={`${t("contact_form.phone")}`}
                        />
                    </div>
                    {formikContact.errors.phone &&
                        formikContact.touched.phone && (
                            <p className="err-text">
                                {formikContact.errors.phone}
                            </p>
                        )}

                    <div className="sign-form__box">
                        <img
                            className="sign-form__box-icon "
                            src={icon.DeskAlt}
                            alt=""
                        />
                        <input
                            autoComplete="off"
                            value={formikContact.values.business}
                            onChange={formikContact.handleChange}
                            name="business"
                            id="business"
                            placeholder={`${t("contact_form.business_type")}`}
                        />
                    </div>
                    {formikContact.errors.business &&
                        formikContact.touched.business && (
                            <p className="err-text">
                                {formikContact.errors.business}
                            </p>
                        )}

                    <div className="sign-form__box">
                        <img
                            className="sign-form__box-icon "
                            src={icon.Location}
                            alt=""
                        />
                        <input
                            autoComplete="off"
                            value={formikContact.values.address}
                            onChange={formikContact.handleChange}
                            name="address"
                            id="address"
                            placeholder={`${t("contact_form.address")}`}
                        />
                    </div>
                    {formikContact.errors.address &&
                        formikContact.touched.address && (
                            <p className="err-text">
                                {formikContact.errors.address}
                            </p>
                        )}
                </div>

                <div className="dialog-forgot__password-btn">
                    <ButtonCus
                        onClick={handleClosePopupContact}
                        text={`${t("contact_form.cancer")}`}
                        backColor="var(--bg-color)"
                        color="var(--purple)"
                        fontSize="20px"
                        lineHeight="24px"
                        borderRadius="20px"
                    />
                    <ButtonCus
                        onClick={formikContact.handleSubmit}
                        text={`${t("contact_form.confirm")}`}
                        backColor="var(--purple)"
                        color="var(--bg-color)"
                        fontSize="20px"
                        lineHeight="24px"
                        borderRadius="20px"
                    />
                </div>
            </div>
        </Dialog>
    );
}
