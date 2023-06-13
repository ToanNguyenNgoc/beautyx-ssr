import { Dialog } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authentication from "../../../../api/authApi";
import mediaApi from "../../../../api/mediaApi";
import icon from "../../../../constants/icon";
import { putUser, updateAsyncUser } from "../../../../redux/profile/userSlice";
import * as Yup from "yup";
import "./dialogChangeInfo.css";
import { AppContext } from "../../../../context/AppProvider";
import { checkPhoneValid } from "../../../../utils/phoneUpdate";
import RenderRecatpcha, { FieldOtps } from "../../../../features/Otp/dialogOtp";
import { IDataOtp } from "../../../../features/Otp/_model";
import { FLAT_FORM_TYPE } from "../../../../rootComponents/flatForm";
import { AlertSnack } from "components/Layout";
import validateForm from "utils/validateForm";
export default function DialogChangeInfo(props: any) {
    const { open, setOpen } = props;
    const { t } = useContext(AppContext) as any;
    const { USER } = useSelector((state: any) => state.USER);
    const FLAT_FORM = sessionStorage.getItem('FLAT_FORM');
    const dispatch = useDispatch();
    const [openNoti, setOpenNoti] = useState({
        content: "",
        open: false,
        children: <></>
    });
    const [openAlertSnack, setOpenAlertSnack] = useState({
        title: "",
        open: false,
    });
    // chose file
    const onFileChange = (e: any) => {
        const form = e.target.files[0];
        handlePostMedia(form);
    };
    // upload image
    const handlePostMedia = async (form: any) => {
        let formData = new FormData();
        formData.append("file", form);
        try {
            const res = await mediaApi.postMedia(formData);
            const action = putUser({
                ...USER,
                avatar: res.data.context.original_url,
            });
            dispatch(action);
            const model_id = await res.data.context.model_id;
            const params = {
                media_id: model_id,
            };
            await authentication.putUserProfile(params);
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    };
    // form
    const formik = useFormik({
        initialValues: {
            fullname: USER?.fullname,
            email: USER?.email ?? ''
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required(t("form.please_enter_full_name")),
            email: Yup.string()
                .required("Vui lòng nhập Email hoặc Số điện thoại")
                .matches(
                    // eslint-disable-next-line no-useless-escape
                    validateForm.email,
                    "Vui lòng nhập đúng định dạng name@Example.com"
                ),
        }),
        onSubmit: async (values) => {
            const params = {
                fullname: values.fullname,
                email: values.email !== USER?.email ? values.email : ''
            };
            const res = await dispatch(updateAsyncUser(params));
            if (res?.payload?.status === 302) {
                return setOpenAlertSnack({
                    title: `"${values.email}" đã được sử dụng ! Vui lòng thử Email khác`,
                    open: true
                })
            }
            setOpen(false);
        },
    });
    //* [ OTP  update telephone number ]
    const [otp, setOtp] = useState(false);
    // const [otpCode, setOtpCode] = useState(false);
    const [dataOtp, setDataOtp] = useState({
        open: false,
        telephone: '',
        code: '',
        verification_id: ''
    });
    const handleOtp = () => {
        setOpen(false);
        setOtp(true);
        setOpenNoti({ ...openNoti, open: false })
    }
    //* [END]  OTP  update telephone number
    const handleUpdatePhone = async (props: IDataOtp) => {
        try {
            const paramsOb = {
                "telephone": props.telephone,
                "code": props.code,
                "verification_id": props.verification_id
            }
            const res = await authentication.putUserProfile(paramsOb);
            dispatch(putUser({ ...USER, }));
            if (res) {
                setDataOtp({
                    ...dataOtp,
                    open: false
                })
                alert('cập nhập thành công');
                window.location.reload();
            }
        } catch (err) {
            console.log('err.code', err.response);
            switch (err.response.status) {
                case 400:
                    setOpenAlertSnack({
                        ...openAlertSnack,
                        open: true,
                        // title: JSON.stringify(err),
                        title: 'Số điện thoại đã được sử dụng quý khách vui lòng thử số khác!'
                    });
                    break;
                case 501:
                    setOpenAlertSnack({
                        ...openAlertSnack,
                        open: true,
                        // title: JSON.stringify(err),
                        title: 'Số điện thoại đã được sử dụng quý khách vui lòng thử số khác!'
                    });
                    break;
                case 502:
                    setOpenAlertSnack({
                        ...openAlertSnack,
                        open: true,
                        // title: JSON.stringify(err),
                        title: 'Lỗi hệ thống gửi sms quý khách vui lòng thử lại sau!'
                    });
                    break;
                default:
                    setOpenAlertSnack({
                        ...openAlertSnack,
                        open: true,
                        // title: JSON.stringify(err),
                        title: 'Đã có lỗi xảy ra vui lòng thử lại sau!'
                    });
                    break;
            }
        }
    }

    return (
        <>
            <AlertSnack
                title={openAlertSnack.title}
                open={openAlertSnack.open}
                status="FAIL"
                onClose={() =>
                    setOpenAlertSnack({
                        ...openAlertSnack,
                        open: false,
                    })
                }
            />
            <Dialog open={open} onClose={() => setOpen(false)}>
                <form
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                    className="edit-user"
                >
                    <div className="edit-user__img">
                        <img src={USER?.avatar} alt="" />
                        <button
                            type="button"
                        >
                            <label htmlFor="file_mb" className="img-overlay">
                                <img src={icon.cameraAcc} alt="" />
                            </label>
                        </button>
                        <input
                            hidden
                            id="file_mb"
                            type="file"
                            name="file_mb"
                            accept="image/jpeg"
                            onChange={onFileChange}
                        />
                    </div>
                    <div className="edit-user__info">
                        <div>
                            <input
                                autoFocus
                                value={formik.values?.fullname}
                                onChange={formik.handleChange}
                                type="text"
                                placeholder={t("form.please_enter_full_name")}
                                name="fullname"
                            />
                            {formik.errors.fullname && formik.touched.fullname && (
                                <p
                                    style={{ fontSize: "10px" }}
                                    className="err-text"
                                >
                                    Vui lòng nhập Họ và tên
                                </p>
                            )}
                        </div>
                        <div className="edit-user__email">
                            <img src={icon.emailPurple} alt="" />
                            <input
                                className="edit-user__email_inp"
                                value={formik.values?.email}
                                onChange={formik.handleChange}
                                type="text"
                                placeholder="Email"
                                name="email"
                            />
                        </div>
                        <div className="edit-user__phone">
                            <img src={icon.phonePurple} alt="" />
                            <span>
                                {
                                    USER?.telephone
                                }
                                {" "}
                                {FLAT_FORM === FLAT_FORM_TYPE.MB && (!checkPhoneValid(USER?.telephone) && <div onClick={() => handleOtp()}>!__UPDATE_NOW__</div>)}
                            </span>
                        </div>
                    </div>
                    <div className="edit-user__option">
                        <button type="submit">{t("acc.save")} &#10003;</button>
                        <button type="button" onClick={() => setOpen(false)}>
                            {t("Home.cancel")} &#x2715;
                        </button>
                    </div>
                </form>
            </Dialog>
            {
                otp && <RenderRecatpcha
                    setOpen={setOtp}
                    open={otp}
                    dataOtp={dataOtp}
                    setDataOtp={setDataOtp}
                    handleSubmit={handleUpdatePhone}
                />
            }
            {
                dataOtp.verification_id && <FieldOtps
                    open={dataOtp.open}
                    setOpen={setDataOtp}
                    dataOtp={dataOtp}
                    setDataOtp={setDataOtp}
                    handleSubmit={handleUpdatePhone}
                />
            }
        </>
    );
}
