import React, { useEffect, useState } from "react";
// css && library 
import { Drawer } from "@mui/material";
import AlertSnack from "../../components/AlertSnack";
import "../ResetPassword/style.css";
import "./style.css";
// end 
// interface
import {IDataOtp,IPropOtp} from './_model'
// end
import { auth, firebase } from "../../firebase";
import FormTelephone from "../ResetPassword/components/FormTelephone";

declare global {
    interface Window {
        recaptchaVerifier: any;
        confirmationResult: any;
        recaptchaWidgetId: any;
    }
}
window.confirmationResult = window.confirmationResult || {};

function RenderRecatpcha(props: IPropOtp) {
    const { open, setOpen, dataOtp, setDataOtp, handleSubmit, setOpenDialog }:IPropOtp = props;
    // const [openDialog, setOpenDialog] = useState(false);
    const snackStatus = {
        SUCCESS: 'SUCCESS',
        FAIL: 'FAIL',
        WARNING: 'WARNING'
    }
    const [notiWarning,setNotiWarning] = useState({
        title: "",
        open: false,
        status: ""
    });
    const generateRecaptcha = (props:string|number) => {
        try {
            // console.log(window.recaptchaVerifier);
            let phoneNumberVN = "+84" + props.toString().slice(1);
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier( "recaptcha-container",
                    {
                        size: "invisible",
                        callback: (values: any) => {
                            // handleSubmit(values);
                            // console.log(values)
                            
                            // setDataOtp({
                            //     ...dataOtp,
                            //     verification_id:values,
                            //     telephone:props
                            // })
                        },
                    }
                );
            } else {
                window.recaptchaVerifier.render();
            }
        } catch (err: any) {
            console.log(err);
        }
    };
    const verifyWithPhone = (values:string|number) => {
        // console.log(window.recaptchaVerifier)
        let phoneNumberVN = "+84" + values.toString().slice(1);
        auth.signInWithPhoneNumber(
            phoneNumberVN,
            window.recaptchaVerifier
        )
            .then((confirmationResult: any) => {
                console.log(confirmationResult)
                setDataOtp({
                    ...dataOtp,
                    telephone:values,
                    verification_id:confirmationResult.verification_id
                });
                setOpenDialog(true);
                    
                window.confirmationResult = confirmationResult;
                // setLoading(false);
            })
            .catch((error) => {
                // setLoading(false);
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
                    // setOpenDialogReloadPage(true);
                    setNotiWarning({
                        ...notiWarning,
                        open: true,
                        title: "Vui lòng bấm nút tải lại trang để tiếp tục ...",
                        status: snackStatus.FAIL
                    })
                }
            });
    }
    const handleTelephone = (props:number) => {
        console.log(props)
       
        generateRecaptcha(props);
        verifyWithPhone(props)
       
    }
    const handleClose = () => {
        return setOpen(false)
    }
    const handleConfirm = (code:string) => {
        handleSubmit(code)
    }
    useEffect(() => {
        if(dataOtp.verification_id){
            handleClose()
            // setOpenDialog(true);
            
        }
    }, [dataOtp.verification_id])
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
            onClose={() => setNotiWarning({
                ...notiWarning, open: false
            })}
        />
        </>
    );
}
export function FieldOtps (props:any){
    const {open,setOpen,dataOtp,setDataOtp,handleSubmit}:IPropOtp = props
    const handleTelephone = (props:any) => {
        setDataOtp({
            ...dataOtp,
            code: props
        })
        handleSubmit({
            ...dataOtp,
            code: props
        });
        setOpen(false);
    }
    return(
        <Drawer
            open={open}
            onClose={()=>setOpen(false)}
            anchor="bottom"
        >
            <div className="form-otp__cnt">
                <FormTelephone
                    title="Nhập mã OTP"
                    handlePostTelephone={handleTelephone}
                    isDialog={true}
                />
            </div>

        </Drawer>
    )
}

export default RenderRecatpcha;
