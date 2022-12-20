import { IOrganization } from 'interface';
import React, { useRef } from 'react';
import {
    Marker,
    NavigationControl,
    GeolocateControl,
    GeolocateResultEvent,
} from "react-map-gl";
import MapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface BookingMapProps {
    org: IOrganization
}

function BookingMap(props: BookingMapProps) {
    const { org } = props
    const mapRef = useRef<any>(null)
    return (
        <MapGL
            // onMouseMove={onCenterChange}
            // onTouchMove={onCenterChange}
            style={{ width: "100%", height: "100vh" }}
            initialViewState={{
                latitude: org.latitude,
                longitude: org.longitude,
                zoom: 16,
            }}
            attributionControl={true}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v10"
            ref={mapRef}
        >

        </MapGL>
    );
}

export default BookingMap;