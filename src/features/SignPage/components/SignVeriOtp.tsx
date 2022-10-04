import React from "react";
import { Dialog } from "@mui/material";
import "../../ResetPassword/style.css";
import { formatTelephone } from "../../ResetPassword";
import { authentication, RecaptchaVerifier, signInWithPhoneNumber } from "../../../firebase";
import FormTelephone from "../../ResetPassword/components/FormTelephone";

function SignVeriOtp(props: any) {
    const { open, setOpen, setDataOtp } = props;
    const generateRecaptcha = () => {
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
                window.recaptchaVerifier.render()
            }
        } catch (err: any) {
            console.log(err)
        }
    }
    const handlePostTelephone = (telephone: string) => {
        const phoneNumber: any = formatTelephone(telephone);
        if (phoneNumber === "") return;
        generateRecaptcha()
        signInWithPhoneNumber(authentication, phoneNumber, window.recaptchaVerifier)
            .then((result) => {
                console.log(result);
                setDataOtp({
                    telephone: telephone,
                    verification_id: result?.verificationId,
                });
                setOpen(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <Dialog open={open} fullScreen>
            <div className="for-pass-cnt">
                <div className="for-pass-cnt__phone">
                    <div id="recaptcha-container"></div>
                    <FormTelephone
                        title="Đăng ký"
                        handlePostTelephone={handlePostTelephone}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default SignVeriOtp;
