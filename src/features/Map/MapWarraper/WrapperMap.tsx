import React, { useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import MyMapComponent from './MyMapComponent';
import MapGL from 'react-map-gl';
import { IOrganization } from '../../../interface/organization';

interface IWrapperMapProps {
    org: IOrganization
}

function WrapperMap(props: IWrapperMapProps) {
    const {org} = props;
    console.log(org)
    return (
        <MapGL
            style={{
                width: "100%",
                height: "100%"
            }}
            initialViewState={{
                latitude: org.latitude,
                longitude: org.longitude,
                zoom: 8
            }}
            attributionControl={true}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v10"
        >

        </MapGL>
        // <Wrapper
        //     apiKey={key}
        // >
        //     <MyMapComponent
        //         map={map}
        //         setMap={setMap}
        //         center={center}
        //         zoom={zoom}
        //     />
        // </Wrapper>
        // <></>
    );
}

export default WrapperMap;