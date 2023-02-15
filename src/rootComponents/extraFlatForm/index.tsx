import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginSocial from 'rootComponents/loginSocial';
import { extraParamsUrl } from '../../utils/extraParamsUrl';
import { FLAT_FORM_TYPE } from '../flatForm';
import LoginFlatForm from '../loginFlatForm/LoginFlatForm';


function ExtraFlatForm() {
    const location = useLocation();
    const params = extraParamsUrl();
    const flatForm = location.pathname.split('/')[1];
    // console.log(flatForm)
    const FLAT_FORM = sessionStorage.getItem('FLAT_FORM');
    if (!FLAT_FORM) {
        switch (flatForm) {
            case "home":
                sessionStorage.setItem('FLAT_FORM', 'BEAUTYX');
                break;
            case FLAT_FORM_TYPE.MOMO:
                sessionStorage.setItem('FLAT_FORM', FLAT_FORM_TYPE.MOMO);
                break
            case FLAT_FORM_TYPE.TIKI:
                sessionStorage.setItem('FLAT_FORM', FLAT_FORM_TYPE.TIKI);
                break
            case FLAT_FORM_TYPE.MB:
                sessionStorage.setItem('FLAT_FORM', FLAT_FORM_TYPE.MB);
                break
            case FLAT_FORM_TYPE.ZALO:
                sessionStorage.setItem('FLAT_FORM', FLAT_FORM_TYPE.ZALO);
                break
            default:
                sessionStorage.setItem('FLAT_FORM', 'BEAUTYX');
        }
    }
    return (
        <>
            <LoginFlatForm
                flatForm={flatForm}
                params={params}
            />
            {flatForm === 'auth' && <LoginSocial params={params} />}
        </>
    );
}

export default ExtraFlatForm;