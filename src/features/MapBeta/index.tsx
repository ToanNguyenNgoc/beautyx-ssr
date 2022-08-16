/* eslint-disable react/style-prop-object */
import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css'


function MapBox() {
    const key = process.env.REACT_APP_MAPBOX_TOKEN
    const Map = ReactMapboxGl({
        accessToken:
            `${key}`
    });
    return (
        <div>
            {/* <div ref={mapContainer} className="map-container" /> */}
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                    height: '100vh',
                    width: '100vw'
                }}
            >
                <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                    <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                </Layer>
            </Map>
        </div>
    );
}

export default MapBox;