// import { useMemo } from 'react';
// import useGetMessage from './useListenResponseMessage';
// const x = {
//     "id":1588,
//     "status":"PENDING",
//     "amount":2000,
//     "amount_paid":0,
//     "description":"Baby skin Hydroimpact",
//     "transaction_uuid":"RwPBn1",
    // res={
    //     "id":"AW11274ZVKDD",
    //     "amount":2000,
    //     "description":"Baby skin Hydroimpact",
    //     "successMessage":null,
    //     "merchant":{
    //         "code":"PHZMSP",
    //         "name":"Công ty cổ phần MySpa"
    //     },
    //     "type":{
    //         "name":"Thanh toán dịch vụ đặt lịch",
    //         "code":"MSPSPA",
    //         "allowCard":true
    //     },
    //     "cif":"100008",
    //     "extra":{
    //         "organization_id":1,
    //         "organization_name":"MYSPA Dev 2021",
    //         "branch_id":0,
    //         "branch_name":null,
    //         "uuid":"RwPBn1"
    //     }
    // },
//     "payment_method_id":12,
//     "paymentable_type":"App\\Models\\Order",
//     "paymentable_id":1701,
//     "created_at":"2022-07-19 15:27:52",
//     "updated_at":"2022-07-19 15:27:52",
//     "deleted_at":null
//     }

interface IResMerchant{
    code: string
    name: string
}
interface IResType{
    code: string
    name: string
    allowCard: boolean
}
interface IResExtra{
    organization_id: number | string
    organization_name: string
    branch_id: string | number
    branch_name?: string | null
    uuid: string
}
interface IPaymentProps{
    id: string
    amount: number
    description: string
    successMessage?: string
    merchant: IResMerchant
    type: IResType
    cif: string
    extra: IResExtra
}
/**
 * @name makePayment
 * @description Post order id to MB Payment Hub .
 * @param {string} orderId 
 * 
 * @returns {string} hash
 */
export function doPostMakePaymentMessageMB(res:IPaymentProps) {
    try {
        // alert(JSON.stringify(res))
        const $:any = window
        $['ReactNativeWebView'].postMessage(JSON.stringify({
            type: 'PAYMENT_HUB_TRANSACTION',
            data: {
                merchant: res.merchant,
                type: res.type,
                id: res.id,
                amount: res.amount,
                description: res.description,
                successMessage: res.successMessage
            },
        }))
    } catch (e) {
        // alert(e);
    }
}
/**
 * @name exitMbMiniApp
 * @description Exit webview .
 */
export function exitMbMiniApp (){
    try{
        const $:any = window
        $["ReactNativeWebView"].postMessage(JSON.stringify({
            type: "GO_BACK",
        }));
    }
    catch(e){
        // alert(e)
    }
}
/**
 * @name openUrlInMbMiniApp
 * @param {string=} name - url title.
 * @param {string=} url - link website you want to open.
 * @description create new webview over current webview .
 */
 export function openUrlIn_Mb (name:string,url:string){
    try{
        const $:any = window
        $["ReactNativeWebView"].postMessage(JSON.stringify({
            type: "OPEN_NEW_WEBVIEW",
            name: name,
            link: url,
        }));
    }
    catch(e){
        // alert(e)
    }
}
export default doPostMakePaymentMessageMB;