// {
//     requestId: "1651717449170170821",
//     result: {
//       orderId: "179193577568534531",
//       status: "fail",
//       res: {
//         error: "Error",
//         errorMessage: "Request makePayment failed with message: payment_failure: user cancel payment"
//       }
//     }
//   }
/**
 * @name makePayment
 * @description Post order id to tini app for makePayment().
 * @param {string} orderId 
 * 
 * @returns {string} hash
 */
export function doPostMakePaymentMessageTiki(params) {
    try {
        const requestId =
            new Date().getTime() +
            '' +
            Math.floor(Math.random() * 1000000);
        // eslint-disable-next-line no-undef
        my.postMessage({
            requestId: requestId,
            params: {
                api: 'makePayment',
                params: {
                    TYPE: params.TYPE,
                    response: params.params
                }
            },
            success: function () {
                // alert('alo');
            }
        });
    } catch (e) {
        // alert(e);
        console.log(e)
    }
}
/**
 * @name callApisFromTiki
 * @description Call api name from tini app.
 * @param {object}   {   api:[api_name],params:{} } 
 * 
 * @returns {string} response
 */
export async function callApiFromTiki(api, params) {
    const requestId =
        new Date().getTime() + '' + Math.floor(Math.random() * 1000000);
    // eslint-disable-next-line no-undef
    my?.postMessage({
        requestId: requestId,
        params: {
            api: api,
            params: {
                TYPE: 'CALL_API',
                response: params
            }
        },
        success: function (e) {
            // alert('alo');
            console.log(e)
        }
    });
}
export default doPostMakePaymentMessageTiki;