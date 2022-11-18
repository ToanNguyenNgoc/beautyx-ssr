import { useGetParamUrl } from 'hooks';
import React from 'react';

function SerProCoDetail() {
    const paramsArr = useGetParamUrl();
    console.log(paramsArr)
    return (
        <div>
            SerProCoDetail
        </div>
    );
}

export default SerProCoDetail