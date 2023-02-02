import { useEffect, useState } from 'react'

export function useCountDown(seconds: number) {
    const [sec, setSec] = useState(seconds);
    useEffect(() => {
        const timeSec = setInterval(() => {
            if (sec > 0) {
                setSec(prevState => prevState - 1)
            } else {
                setSec(seconds)
            }
        }, 1000)
        return () => clearInterval(timeSec)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sec])
    return sec;
}
export default useCountDown