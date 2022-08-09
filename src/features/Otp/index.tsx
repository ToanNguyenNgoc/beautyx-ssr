import React, { useEffect, useState } from 'react';
import { auth, firebase } from '../../firebase';
import authentication from '../../api/authApi';
import { vnPhoneCheck } from '../../utils/validateForm';

function Otp(props: any) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState('')
    const [values, setValues] = useState({
        telephone: '',
        code: '',
        verification_id: ''
    })
    const sign = () => {
        console.log(values.telephone);
        if (values.telephone === "") return;

        let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible'
        });

        auth.signInWithPhoneNumber(values.telephone, verify).then((result) => {
            console.log(result)
            setValues({
                ...values,
                verification_id: result?.verificationId
            })
        })
            .catch((err) => {
                console.log(err)
            });
    }
    const handleForgotPass = async () => {
        try {
            // await authentication.forgotPassword(values);
            console.log(values);
        } catch (error) {
            console.log(error)
        }
    }
    const onSubmit = () => {
        handleForgotPass()
    }
    console.log(values.telephone);

    return (
        <div>
            <div id="recaptcha-container"></div>
            <span>-------</span>
            <input type="text" onChange={(e) => setValues({...values,telephone:e.target.value.replaceAll(" ",'').replace(/0/i,'+84')})} />
            <button onClick={sign} >send otp</button>
            <br />
            <span>--------------</span>
            <br/>
            <span>-------</span>
            <br />
            <span>--------------</span>
            <br/>
            <span>-------</span>
            <input type="text" onChange={(e) => setValues({ ...values, code: e.target.value })} placeholder='Otp' />
            <button
                onClick={onSubmit}
            >
                submit
            </button>
        </div>
    );
}

export default Otp;