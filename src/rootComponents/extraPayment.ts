import { FLAT_FORM_TYPE } from './flatForm';
import { EXTRA_FLAT_FORM } from '../api/extraFlatForm';

export const EXTRA_PAYMENT = (res: any) => {
    const PLAT_FORM = EXTRA_FLAT_FORM();
    let EX_PAYMENT
    switch (PLAT_FORM) {
        case FLAT_FORM_TYPE.BEAUTYX:
            EX_PAYMENT = {
                deepLink: res?.payment_gateway?.extra_data?.deeplink,
                qrCode: res?.payment_gateway?.extra_data?.payUrl,
                EXTRA_PAYMENT_ID: null
            }
            break;
        case FLAT_FORM_TYPE.MOMO:
            EX_PAYMENT = {
                deepLink: res?.payment_gateway?.extra_data?.deeplink,
                qrCode: res?.payment_gateway?.extra_data?.payUrl,
                EXTRA_PAYMENT_ID: null
            }
            break;
        case FLAT_FORM_TYPE.TIKI:
            EX_PAYMENT = {
                deepLink: null,
                qrCode: null,
                EXTRA_PAYMENT_ID: res?.payment_gateway?.extra_data?.id
            }
            break;
        case FLAT_FORM_TYPE.MB:
            EX_PAYMENT = {
                deepLink: null,
                qrCode: null,
                EXTRA_PAYMENT_DATA: res?.payment_gateway?.extra_data
            }
            break;
        default:
            break
    }
    return EX_PAYMENT
}