import { useRouter } from 'next/router';
import React from 'react';
import useStorage from '../../context/hooks/useStorage';
import { FLAT_FORM_TYPE } from '../flatForm';


function ExtraFlatForm() {
    const router = useRouter();
    const asPath = router.asPath;
    const flatForm = asPath.split("?")[0].slice(1, asPath.split("?")[0].length);
    //?email=toan@myspa.vn&telephone=0392645745&name=Nguyễn Ngọc Toàn&avatar=&authCode=ZVq7VgWLum0PJnDB_IoYH5TQDvk-9Kf7xqlhrwUXRvg.DFhW9eR9MBHs4ph0E7fF--DilhrB_MOGjexM0XccP00&customerId=9252438"
    //?email=toan@myspa.vn&telephone=0392645745&name=m&momo=true

    const params = router.query;
    const { getItem, setItem } = useStorage();
    const FLAT_FORM = getItem('FLAT_FORM', 'session')
    let paramsString = '';
    if (params) {
        paramsString = JSON.stringify(paramsString)
    }
    if (!FLAT_FORM) {
        switch (flatForm) {
            case "":
                setItem('FLAT_FORM', FLAT_FORM_TYPE.BEAUTYX, 'session')
                break;
            case FLAT_FORM_TYPE.MOMO:
                setItem('FLAT_FORM', FLAT_FORM_TYPE.MOMO, 'session')
                break
            case FLAT_FORM_TYPE.TIKI:
                setItem('FLAT_FORM', FLAT_FORM_TYPE.TIKI, 'session')
                break
            case FLAT_FORM_TYPE.MB:
                setItem('FLAT_FORM', FLAT_FORM_TYPE.MB, 'session')
                setItem('_loginToken', paramsString, 'session')
                break
            default:
                setItem('FLAT_FORM', FLAT_FORM_TYPE.BEAUTYX, 'session')
        }
    }

    return (
        <></>
    );
}

export default ExtraFlatForm;