import { Dialog } from "@mui/material";
import React, { useContext } from "react";
import icon from "../../../constants/icon";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppContext } from "../../../context/AppProvider";
import API_3RD from "api/3rd-api";
import axios from "axios";
import { EXTRA_FLAT_FORM } from "api/extraFlatForm";
import { useNoti } from "interface/useNoti";
import { PopupNotification } from "components/Notification";
import { XButton } from "components/Layout";


export default function PopupDetailContact(props: any) {
    const { noti, onCloseNoti, firstLoad, resultLoad } = useNoti()
    const { setOpenPopupContact, openPopupContact, org } = props;
    const { t } = useContext(AppContext);
    const platForm = EXTRA_FLAT_FORM();

    const handlePostContact = async (values: any) => {
        const params = {
            fullname: values.name,
            contact: values.phone,
            feature: "635514e6c6ebc881432be4c4",
            level: "HAPPY",
            cate: "6355162dade82d79fae24073",
            body: values.business,
            image_url: org.image_url,
            platform: platForm,
            current_screen: window.location.href
        }
        firstLoad()
        try {
            await axios.post(`${API_3RD.API_NODE}/feedbacks`, params)
            resultLoad("Đã gửi liên hệ thành công !")
            handleClosePopupContact()
        } catch (error) {
            console.log(error)
            resultLoad("Có lỗi xảy ra, Vui lòng thử lại")
            handleClosePopupContact()
        }
    }

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
                .required(`${t("contact_form.vali_email")}`),
                // .matches(
                //     // eslint-disable-next-line no-useless-escape
                //     /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i,
                //     `${t("contact_form.vali_err_email")}`
                // ),
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
            console.log(values)
            handlePostContact(values)
        },
    });
    return (
        <>
            <PopupNotification
                open={noti.openAlert}
                setOpen={onCloseNoti}
                title="Thông báo"
                content={noti.message}
                autoClose={true}
            />
            <Dialog onClose={handleClosePopupContact} open={openPopupContact}>

                <form autoComplete="off" onSubmit={formikContact.handleSubmit} className="form-contact">
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
                        <XButton
                            style={{ borderRadius: "18px" }}
                            onClick={handleClosePopupContact}
                            title={`${t("contact_form.cancer")}`}
                            type="button"
                        />
                        <XButton
                            style={{ borderRadius: "18px" }}
                            title={`${t("contact_form.confirm")}`}
                            type="submit"
                            loading={noti.load}
                        />
                    </div>
                </form>
            </Dialog>
        </>
    );
}
