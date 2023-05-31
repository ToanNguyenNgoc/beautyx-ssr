import { useEffect, useState } from 'react';

/**
 * @name receiveMessage
 * @description get response message from MB Payment Hub.
 * @returns {object} message
 */
function useGetMessage() {
    const [response, setResponse] = useState<any>();
    const callbacks: any = {};
    useEffect(() => {
        window.addEventListener('message', (e) => {
            setResponse(e);
        })
    }, [])
    return response;
}

export default useGetMessage;