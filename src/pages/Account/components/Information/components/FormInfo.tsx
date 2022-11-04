import React, { useContext } from "react";
import { useFormik } from "formik";
import { AppContext } from "context/AppProvider";
import { useDispatch, useSelector } from "react-redux";
import { updateAsyncUser } from "redux/USER/userSlice";
import { XButton } from "components/Layout";

function FormInfo() {
    const { t } = useContext(AppContext);
    const dispatch = useDispatch();
    const { USER, loading } = useSelector((state: any) => state.USER);
    const formik = useFormik({
        initialValues: {
            fullname: USER?.fullname,
            email: USER?.email,
            phone: USER?.telephone,
        },
        onSubmit: async (values) => {
            const params = {
                fullname: values.fullname,
            };
            await dispatch(updateAsyncUser(params));
        },
    });
    return (
        <form
            className="info_section__form"
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            style={{ paddingBottom: "24px" }}
        >
            <div className="title_section text-color-purple">
                <h1 className="title">{t("acc.my_profiles")}</h1>
                <span className="subtitle">{t("acc.update_acc")}</span>
            </div>
            <div className="form-account">
                <div className="form-account__wraper">
                    <div style={{ width: "100%" }}>
                        <div className="form-account__label">
                            <span>{t("pm.full_name")}</span>
                        </div>
                        <div className="form-account__wrapinput">
                            <input
                                className="form-account__input"
                                value={formik.values?.fullname}
                                onChange={formik.handleChange}
                                placeholder={t("pm.full_name")}
                                type="text"
                                name="fullname"
                            />
                        </div>
                        {/* {formik.errors.name && formik.touched.name && (
                            <p className="err-text">{formik.errors.name}</p>
                        )} */}
                    </div>
                </div>
                <div className="form-account__wraper">
                    {/* email */}
                    <div
                        className="email-account"
                        style={{ padding: "0 0 8px 0" }}
                    >
                        <div className="form-account__label">
                            <span>Email</span>
                        </div>
                        <div className="form-account__wrapinput">
                            <input
                                disabled
                                className="form-account__input"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder="Email"
                                type="text"
                                name="email"
                            />
                        </div>
                        {/* {formik.errors.gmail && formik.touched.gmail && (
              <p className="err-text">{formik.errors.gmail}</p>
            )} */}
                    </div>
                    {/* phone */}
                    <div
                        className="phone-account"
                        style={{ padding: "0 0 8px 0" }}
                    >
                        <div className="form-account__label">
                            <span>{t("pm.phone_number")}</span>
                        </div>
                        <div className="form-account__wrapinput">
                            <input
                                disabled
                                className="form-account__input"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                placeholder={t("pm.phone_number")}
                                type="text"
                                name="phone"
                            />
                        </div>
                        {/* {formik.errors.phone && formik.touched.phone && (
              <p className="err-text">{formik.errors.phone}</p>
            )} */}
                    </div>
                </div>
            </div>
            <XButton
                loading={loading}
                title={t("acc.save")}
                type="submit"
            />
        </form>
    );
}

export default FormInfo;
