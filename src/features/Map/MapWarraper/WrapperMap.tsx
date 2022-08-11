import React, { useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import MyMapComponent from './MyMapComponent';


function WrapperMap(props:any) {
    const key = `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
    const [map, setMap] = useState<any>();
    const center = {
        lat: props.lat||10.800590217284448,
        lng: props.long||106.68205401591362
    }
    const zoom = 20;
    return (
        <Wrapper
            apiKey={key}
        >
            <MyMapComponent
                map={map}
                setMap={setMap}
                center={center}
                zoom={zoom}
            />
        </Wrapper>
    );
}

export default WrapperMap;