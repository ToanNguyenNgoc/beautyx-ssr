import React, { useContext, useState } from "react";
import { partnerStyle } from "../style";
import ButtonCus from "../../../components/ButtonCus";
import Checkbox from "@mui/material/Checkbox";
import icon from "../../../constants/icon";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppContext } from "../../../context/AppProvider";
import axios from "axios";
import {
    GoogleReCaptchaProvider,
    GoogleReCaptcha,
} from "react-google-recaptcha-v3";
// import registerSeller from "../../../api/registerSeller";
import { useNoti } from "hooks";
import { PopupNotification } from "components/Notification";


export default function FormPartner() {
    const { t } = useContext(AppContext);
    const parner = partnerStyle();
    const { noti, firstLoad, resultLoad, onCloseNoti } = useNoti()
    const params = new URLSearchParams();
    const [captcha, setCaptcha] = useState("");
    const verifyRecaptchaCallback = React.useCallback((token: any) => {
        setCaptcha(token);
    }, []);
    const handleContact = async (values: any) => {
        // setPopup(true);
        // const params = {
        //     "reg_phone": values.Phone,
        //     "reg_email": values.Email,
        //     "reg_name": values.Name,
        //     "reg_business_name": values.Enterprise,
        //     "reg_business_add": values.Address,
        //     "reg_captcha": captcha,
        //     "reg_action": "submit",
        //     "reg_type": "ĐĂNG+KÝ+LIÊN+KẾT+VÍ+MOMO"
        // }
        // await registerSeller.post(params)
        params.append("reg_phone", `${values.Phone}`);
        params.append("reg_email", `${values.Email}`);
        params.append("reg_name", `${values.Name}`);
        params.append("reg_business_name", `${values.Enterprise}`);
        params.append("reg_business_add", `${values.Address}`);
        params.append("reg_captcha", `${captcha}`);
        params.append("reg_action", "submit");
        params.append("reg_type", "ĐĂNG+KÝ+LIÊN+KẾT+VÍ+MOMO")
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        firstLoad()
        axios
            .post(
                `https://myspa.vn/Frontend/register_momo `,
                params,
                config
            )
            .then(function (response: any) {
                console.log("response :>> ", JSON.stringify(response));
                resultLoad('Đăng ký thành công')
            })
            .catch(function (err: any) {
                console.log(`err`, err);
                resultLoad('Có lỗi xảy ra. Vui lòng thử lại!')
                throw new Error("Token error");
            });
    };
    const formikPartner = useFormik({
        initialValues: {
            Name: "",
            Phone: "",
            Email: "",
            Enterprise: "",
            Address: "",
            Quantity: "",
            agree: false,
        },
        validationSchema: Yup.object({
            Name: Yup.string()
                .min(2, "Tên lớn hơn 2 ký tự")
                .max(32, "Tên nhỏ hơn 32 ký tự")
                .required(t("form.please_enter_full_name"))
                .matches(
                    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
                    "Tên không đúng định dạng"
                ),
            Phone: Yup.string()
                .min(10, "Số điện thoại phải lớn hơn 10 chữ số")
                .max(11, "Số điện thoại phải nhỏ hơn 11 chữ số")
                .required(t("form.please_enter_your_phone"))
                .matches(
                    /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                    "Số điện thoại không đúng định dạng"
                ),
            Email: Yup.string()
                .required("Vui lòng nhập Email")
                .matches(
                    // eslint-disable-next-line no-useless-escape
                    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i,
                    "Email không đúng định dạng Example@gmail.com"
                ),
            Enterprise: Yup.string()
                .required(t("form.please_enter_email"))
                .matches(
                    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9\s\W|_]+$/,
                    ""
                ),
            Address: Yup.string()
                .required(t("form.please_enter_your_address"))
                .matches(
                    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9\s\W|_]+$/,
                    ""
                ),
            Quantity: Yup.string()
                .required(t("form.please_enter_quantity"))
                .matches(/^[0-9]+$/, "Vui lòng nhập số"),
            agree: Yup.boolean().oneOf(
                [true],
                "Vui lòng đọc và đồng ý với điều khoản"
            ),
        }),
        onSubmit: (values) => {
            const params = {
                ...values,
                captcha: captcha,
            };
            handleContact(params);
            console.log("params", params);
        },
    });

    return (
        <div className={parner.partnerRegis}>
            <h2 className={parner.partnerRegisTitle}>
                {t("partner.become_a_myspa")}
            </h2>
            <GoogleReCaptchaProvider reCaptchaKey="6Lf1oP8fAAAAAPPkdjSTEcyQFetr56gmpNwOMj59">
                <form
                    onSubmit={formikPartner.handleSubmit}
                    className={parner.form}
                >
                    <div style={{ width: "100%", padding: "0 0 8px 0" }}>
                        <div className={parner.wrapInput}>
                            <img
                                className={parner.inputImgName}
                                src={icon.User}
                                alt=""
                            />
                            <input
                                className={parner.inputName}
                                value={formikPartner.values.Name}
                                onChange={formikPartner.handleChange}
                                placeholder={t("pm.full_name")}
                                type="text"
                                name="Name"
                                id="Name"
                            />
                        </div>
                    </div>
                    {formikPartner.errors.Name &&
                        formikPartner.touched.Name && (
                            <p className={parner.errtext}>
                                {formikPartner.errors.Name}
                            </p>
                        )}
                    <div style={{ width: "100%", padding: "8px 0" }}>
                        <div className={parner.wrapInput}>
                            <img
                                className={parner.inputImgName}
                                src={icon.Phone}
                                alt=""
                            />
                            <input
                                className={parner.inputName}
                                value={formikPartner.values.Phone}
                                onChange={formikPartner.handleChange}
                                placeholder={t("pm.phone_number")}
                                type="text"
                                name="Phone"
                                id="Phone"
                            />
                        </div>
                    </div>
                    {formikPartner.errors.Phone &&
                        formikPartner.touched.Phone && (
                            <p className={parner.errtext}>
                                {formikPartner.errors.Phone}
                            </p>
                        )}
                    <div style={{ width: "100%", padding: "8px 0" }}>
                        <div className={parner.wrapInput}>
                            <img
                                className={parner.inputImgName}
                                src={icon.Message}
                                alt=""
                            />
                            <input
                                className={parner.inputName}
                                value={formikPartner.values.Email}
                                onChange={formikPartner.handleChange}
                                placeholder="Email"
                                type="text"
                                name="Email"
                                id="Email"
                            />
                        </div>
                    </div>
                    {formikPartner.errors.Email &&
                        formikPartner.touched.Email && (
                            <p className={parner.errtext}>
                                {formikPartner.errors.Email}
                            </p>
                        )}
                    <div style={{ width: "100%", padding: "8px 0" }}>
                        <div className={parner.wrapInput}>
                            <img
                                className={parner.inputImgName}
                                src={icon.Buildings}
                                alt=""
                            />
                            <input
                                className={parner.inputName}
                                value={formikPartner.values.Enterprise}
                                onChange={formikPartner.handleChange}
                                placeholder={t("partner.company_name")}
                                type="text"
                                name="Enterprise"
                                id="Enterprise"
                            />
                        </div>
                    </div>
                    {formikPartner.errors.Enterprise &&
                        formikPartner.touched.Enterprise && (
                            <p className={parner.errtext}>
                                {formikPartner.errors.Enterprise}
                            </p>
                        )}
                    <div style={{ width: "100%", padding: "8px 0" }}>
                        <div className={parner.wrapInput}>
                            <img
                                className={parner.inputImgName}
                                src={icon.Location}
                                alt=""
                            />
                            <input
                                className={parner.inputName}
                                value={formikPartner.values.Address}
                                onChange={formikPartner.handleChange}
                                placeholder={t("Mer_de.address")}
                                type="text"
                                name="Address"
                                id="Address"
                            />
                        </div>
                    </div>
                    {formikPartner.errors.Address &&
                        formikPartner.touched.Address && (
                            <p className={parner.errtext}>
                                {formikPartner.errors.Address}
                            </p>
                        )}
                    <div style={{ width: "100%", padding: "8px 0" }}>
                        <div className={parner.wrapInput}>
                            <img
                                className={parner.inputImgName}
                                src={icon.Storefront}
                                alt=""
                            />
                            <input
                                className={parner.inputName}
                                value={formikPartner.values.Quantity}
                                onChange={formikPartner.handleChange}
                                placeholder={t("partner.branch_quantity")}
                                type="text"
                                name="Quantity"
                                id="Quantity"
                            />
                        </div>
                    </div>
                    {formikPartner.errors.Quantity &&
                        formikPartner.touched.Quantity && (
                            <p className={parner.errtext}>
                                {formikPartner.errors.Quantity}
                            </p>
                        )}
                    <div className={parner.checkbox}>
                        <Checkbox
                            onChange={formikPartner.handleChange}
                            value={formikPartner.values.agree}
                            name="agree"
                            id="agree"
                            sx={{
                                color: "#7161BA",
                                "&.Mui-checked": {
                                    color: "#7161BA",
                                },
                            }}
                        />

                        <div className={parner.checkboxText}>
                            <p>
                                {t("partner.read")}
                                <a href={" "}> {t("form.myspa_s_terms")}</a>
                            </p>
                        </div>
                    </div>
                    {formikPartner.errors.agree &&
                        formikPartner.touched.agree && (
                            <p className={parner.errtext}>
                                {formikPartner.errors.agree}
                            </p>
                        )}
                    <GoogleReCaptcha onVerify={verifyRecaptchaCallback} />
                    <div className={parner.btnWrap}>
                        <ButtonCus
                            text={t("Home.Sign_up_now")}
                            fontSize="14px"
                            lineHeight="20px"
                            color="#ffffff"
                            border="solid 1px var(--purple)"
                            borderRadius="26px"
                            backColor="var(--purple"
                            onClick={formikPartner.handleSubmit}
                        />
                    </div>
                </form>
            </GoogleReCaptchaProvider>
            <PopupNotification
                open={noti.openAlert}
                setOpen={onCloseNoti}
                title="Thông báo"
                content={noti.message}
            />
        </div>
    );
}
