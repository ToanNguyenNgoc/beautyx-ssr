/* eslint-disable react-hooks/exhaustive-deps */
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

import { useEffect, useState } from 'react';

/**
 * @name receiveMessage
 * @description get response message from tini app.
 * @returns {object} message
 */
function useGetMessageTiki() {
    const [response, setResponse] = useState<any>();
    const callbacks: any = {};
    useEffect(() => {
        let mount = true
        if (mount) {
            window.addEventListener('message', (e) => {
                const { requestId, result } = e.data;
                if (requestId === undefined) {
                    return setResponse(null);
                }
                delete callbacks[requestId];
                setResponse({
                    requestId: requestId,
                    result: result
                });
            })
        }
        return () => { mount = false }
    }, [])
    return response;
}

export default useGetMessageTiki;