import { vnPhoneCheck } from './validateForm';

export function checkPhoneValid(phone: string | number): Boolean {
    var result = vnPhoneCheck.test(phone.toString());
    return result
}