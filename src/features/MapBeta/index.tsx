/* eslint-disable react/style-prop-object */
import React, {useRef} from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css'
import axios from 'axios';
import icon from '../../constants/icon';


function MapBox() {
    const key = process.env.REACT_APP_MAPBOX_TOKEN
    // const Map = ReactMapboxGl({
    //     accessToken:
    //         `${key}`
    // });
    const mapRef = useRef<any>();
    console.log(mapRef)
    const onChange = async (e: any) => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=${key}&country=vn`;
        const res = await axios.get(url);
    }
    // const {map} = useMap();
    const move = () =>{
        // console.log(mapRef?.current)
        // mapRef?.current?.panTo([106.6518027,10.8009959])
        mapRef?.current?.flyTo({center: [106.6518027,10.8009959]});
        // console.log(mapRef?.current)
    }
    return (
        <div>
            <input type="text" onChange={onChange} />
            <button
                onClick={move}
            >
                xxx
            </button>
            <ReactMapGL
                // zoom={10}
                style={{
                    width: "100vw",
                    height: "100vh"
                }}
                initialViewState={{
                    latitude: 10.800590217284448,
                    longitude: 106.68205401591362,
                    zoom: 15
                }}
                attributionControl={true}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                ref={mapRef}
            // onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
            >
                <NavigationControl
                    position='bottom-right'
                    showCompass={true}
                    showZoom={true}
                />
                <Marker
                    latitude={10.7993308}
                    longitude={106.6853966}
                >
                    <img src={icon.pinMapRed} alt="" />
                </Marker>

            </ReactMapGL>
        </div>
    );
}

export default MapBox;