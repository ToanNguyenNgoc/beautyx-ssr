import React, { useState } from 'react';
import { Container } from '@mui/material';
import './style.css';
import FormTelephone from './components/FormTelephone';
import FormOtp from './components/FormOtp';
import { authentication, RecaptchaVerifier, signInWithPhoneNumber } from '../../firebase';
import FormHead from './components/FormHead';
import Footer from '../Footer';

declare global {
    interface Window {
        recaptchaVerifier: any
        confirmationResult: any
        recaptchaWidgetId: any
    }
}

export const formatTelephone = (telephone: string) => {
    // const phone = `${telephone}`.slice(-9);
    console.log('phone',"+84" + telephone.toString().slice(1));
    return "+84" + telephone.toString().slice(1);
    // return `+84${phone}`
}
function ResetPassword() {
    const [values, setValues] = useState({
        telephone: '',
        new_password: '',
        code: '',
        verification_id: ''
    })
    const [step, setStep] = useState(1)
    const [load, setLoad] = useState(false);
    //send otp
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
    const handleSignWithPhone = async (phoneNumber: any, isRecaptcha: any, telephone: string) => {
        try {
            const result = await signInWithPhoneNumber(authentication, phoneNumber, window.recaptchaVerifier);
            setValues({
                ...values,
                telephone: telephone,
                verification_id: result?.verificationId
            })
            setStep(2)
            console.log(result?.verificationId)
            setLoad(false)
        } catch (error) {
            console.log(error)
            setLoad(false)
        }
    }
    const handlePostTelephone = (telephone: string, isRecaptcha: boolean) => {
        setLoad(true)
        const phoneNumber = formatTelephone(telephone)
        if (phoneNumber === "") return;
        isRecaptcha === true && generateRecaptcha()
        handleSignWithPhone(phoneNumber, isRecaptcha, telephone);
    }
    const onSwitchStep = () => {
        switch (step) {
            case 1:
                return <FormTelephone
                    setValues={setValues}
                    setStep={setStep}
                    load={load}
                    handlePostTelephone={handlePostTelephone}
                />;
            case 2:
                return <FormOtp
                    data={values}
                    setStep={setStep}
                    handlePostTelephone={handlePostTelephone}
                />
            default:
                break;
        }
    }


    return (
        <>
            <div id="recaptcha-container"></div>
            <FormHead />
            <Container>
                <div
                    className='for-pass-cnt'
                >
                    <div className="for-pass-cnt__phone">
                        {onSwitchStep()}
                    </div>
                </div>
            </Container>
            <div className="for-footer">
                <Footer />
            </div>
        </>
    );
}

export default ResetPassword;