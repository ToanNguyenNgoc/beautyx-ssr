import { AppContext } from 'context/AppProvider';
import dayjs from 'dayjs';
import React, { useContext, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { extraParamsUrl } from '../../utils/extraParamsUrl';
import { FLAT_FORM_TYPE } from '../flatForm';
import LoginFlatForm from '../loginFlatForm/LoginFlatForm';


function ExtraFlatForm() {
    const history = useHistory()
    const { currentPay, setCurrentPay } = useContext(AppContext)
    //?email=toan@myspa.vn&telephone=0392645745&name=Nguyễn Ngọc Toàn&avatar=&authCode=ZVq7VgWLum0PJnDB_IoYH5TQDvk-9Kf7xqlhrwUXRvg.DFhW9eR9MBHs4ph0E7fF--DilhrB_MOGjexM0XccP00&customerId=9252438"
    //?email=toan@myspa.vn&telephone=0392645745&name=m&momo=true
    const location = useLocation();
    const params = extraParamsUrl();

    const flatForm = location.pathname.split('/')[1];
    // console.log('location',location);
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
                // sessionStorage.setItem('FLAT_FORM', 'BEAUTYX');
                sessionStorage.setItem('FLAT_FORM', FLAT_FORM_TYPE.MB);
                // sessionStorage.setItem('_loginToken', params?.loginToken+'');
                break
            case FLAT_FORM_TYPE.ZALO:
                sessionStorage.setItem('FLAT_FORM', FLAT_FORM_TYPE.ZALO);
                break
            default:
                sessionStorage.setItem('FLAT_FORM', 'BEAUTYX');
        }
    }
    // //[MOMO]: redirect to payment result:
    const now = dayjs().format('HHmmss')
    useEffect(() => {
        if (currentPay && currentPay?.confirm === true) {
            const state_payment = { ...currentPay, FINAL_AMOUNT: currentPay?.payment_gateway?.amount };
            const create = dayjs(currentPay.created_at).format('HHmmss')
            if (parseInt(now) - parseInt(create) < 400) {
                history.push({
                    pathname: `/trang-thai-don-hang/`,
                    search: currentPay?.payment_gateway?.transaction_uuid,
                    state: { state_payment },
                });
                setCurrentPay({ ...currentPay, confirm: false })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPay])


    return (
        <LoginFlatForm
            flatForm={flatForm}
            params={params}
        />
    );
}

export default ExtraFlatForm;