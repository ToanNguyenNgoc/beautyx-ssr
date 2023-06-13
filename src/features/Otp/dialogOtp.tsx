import React, { useEffect, useState } from "react";
// css && library 
import { Drawer } from "@mui/material";
import "../../pages/ResetPassword/style.css";
import "./style.css";
// end 
// interface
import { IDataOtp, IPropOtp } from './_model'
// end
import { authentication, signInWithPhoneNumber, RecaptchaVerifier } from "../../firebase";
import FormTelephone from "../../pages/ResetPassword/components/FormTelephone";
import { AlertSnack } from "components/Layout";

declare global {
    interface Window {
        recaptchaVerifier: any;
        confirmationResult: any;
        recaptchaWidgetId: any;
    }
}
window.confirmationResult = window.confirmationResult || {};

function RenderRecatpcha(props: IPropOtp) {
    const { open, setOpen, dataOtp, setDataOtp, handleSubmit }: IPropOtp = props;
    // const [openDialog, setOpenDialog] = useState(false);
    const snackStatus = {
        SUCCESS: 'SUCCESS',
        FAIL: 'FAIL',
        WARNING: 'WARNING'
    }
    const [notiWarning, setNotiWarning] = useState({
        title: "",
        open: false,
        status: ""
    });
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
    const verifyWithPhone = (values: string | number) => {
        let phoneNumberVN = "+84" + values.toString().slice(1);
        signInWithPhoneNumber(
            authentication,
            phoneNumberVN,
            window.recaptchaVerifier
        )
            .then((confirmationResult: any) => {
                setDataOtp({
                    ...dataOtp,
                    open: true,
                    telephone: values,
                    verification_id: confirmationResult.verificationId
                });
                setOpen(false);
                window.recaptchaVerifier.reset()
            })
            .catch((error) => {
                console.log(error);
                let errorCode = error.code;
                let messCode = error.message;
                if (
                    errorCode === "auth/quota-exceeded" ||
                    errorCode === "auth/too-many-requests"
                ) {
                    setNotiWarning({
                        ...notiWarning,
                        open: true,
                        title: "Số điện thoại đã đạt giới hạn cho phép gửi mã xác thực (OTP) trong ngày",
                        status: snackStatus.WARNING
                    })
                } else if (
                    messCode ===
                    "reCAPTCHA has already been rendered in this element"
                ) {
                    setNotiWarning({
                        ...notiWarning,
                        open: true,
                        title: "Quá số lần nhận Otp tải lại trang để tiếp tục ...",
                        status: snackStatus.FAIL
                    })
                }
                else {
                    setNotiWarning({
                        ...notiWarning,
                        open: true,
                        title: "Quá số lần nhận Otp tải lại trang để tiếp tục ..",
                        status: snackStatus.FAIL
                    })
                }
                // window.location.reload();
            });
    }
    const handleTelephone = async (props: number) => {
        generateRecaptcha();
        verifyWithPhone(props)
    }
    const handleClose = () => {
        return setOpen(false)
    }
    return (
        <>
            <Drawer
                open={open}
                onClose={handleClose}
                anchor="bottom"
            >
                <div className="form-otp__cnt">
                    <FormTelephone
                        title="Nhập số điện thoại để nhận mã OTP"
                        handlePostTelephone={handleTelephone}
                        isDialog={true}
                    />
                </div>
            </Drawer>
            <AlertSnack
                open={notiWarning.open}
                title={notiWarning.title}
                status={notiWarning.status}
                onClose={() => {
                    setNotiWarning({
                        ...notiWarning, open: false
                    })
                }}
            />
        </>
    );
}
export function FieldOtps(props: any) {
    const { open, dataOtp, setDataOtp, handleSubmit }: IPropOtp = props
    const handleTelephone = (props: any) => {
        handleSubmit({
            ...dataOtp,
            code: props
        });
        setDataOtp({
            ...dataOtp,
            code: props
            // open: false
        })
    }
    const handleClose = () => {
        setDataOtp({
            ...dataOtp,
            open: false
        })
        window.location.reload();
        window.recaptchaVerifier.clear();
    }
    return (
        <Drawer
            open={open}
            onClose={handleClose}
            anchor="bottom"
        >
            <div className="form-otp__cnt">
                <FormTelephone
                    title="Nhập mã OTP"
                    handlePostTelephone={handleTelephone}
                    isDialog={true}
                    load={false}
                />
            </div>
        </Drawer>
    )
}

export default RenderRecatpcha;
