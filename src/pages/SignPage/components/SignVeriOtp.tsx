import React, { useState } from "react";
import { Dialog } from "@mui/material";
import "../../ResetPassword/style.css";
import { formatTelephone } from "../../ResetPassword";
import { authentication, RecaptchaVerifier, signInWithPhoneNumber } from "../../../firebase";
import FormTelephone from "../../ResetPassword/components/FormTelephone";

function SignVeriOtp(props: any) {
    const { open, setOpen, setDataOtp, prevUrl,setActiveTabSign } = props;
    const [load, setLoad] = useState(false);
    const generateRecaptcha = () => {
        try {
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
        } catch (err: any) {
            console.log(err)
        }
    }
    const handlePostTelephone = (telephone: string) => {
        const phoneNumber: any = formatTelephone(telephone);
        if (phoneNumber === "") return;
        generateRecaptcha()
        setLoad(true)
        signInWithPhoneNumber(authentication, phoneNumber, window.recaptchaVerifier)
            .then((result) => {
                setDataOtp({
                    telephone: telephone,
                    verification_id: result?.verificationId,
                });
                setOpen(false);
                setLoad(false)
            })
            .catch((err) => {
                console.log(err);
                setLoad(false)
            });
    };
    return (
        <Dialog open={open} fullScreen>
            <div className="for-pass-cnt">
                <div className="for-pass-cnt__phone">
                    <div id="recaptcha-container"></div>
                    <FormTelephone
                        setActiveTabSign={setActiveTabSign}
                        prevUrl={prevUrl}
                        title="Đăng ký"
                        load={load}
                        handlePostTelephone={handlePostTelephone}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default SignVeriOtp;
