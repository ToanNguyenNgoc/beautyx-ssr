import { IBranch, IOrganization } from 'interface';
import MapGL, { Marker } from 'react-map-gl';
import React from 'react';
import icon from 'constants/icon';

export function OrgMapQuick({ org }: { org: IOrganization }) {
    return (
        <MapGL
            // ref={mapRef}
            style={{
                width: "100%",
                height: "100%"
            }}
            initialViewState={{
                latitude: org.latitude,
                longitude: org.longitude,
                zoom: 15
            }}
            attributionControl={true}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v10"
        >
            <Marker
                latitude={org.latitude}
                longitude={org.longitude}
            >
                <img src={icon.pinMapRed} alt="" />
            </Marker>
            {
                org.branches?.map((item: IBranch) => (
                    <Marker
                        key={item.id}
                        latitude={item.latitude}
                        longitude={item.longitude}
                    >
                        <img src={icon.pinMapGreen} alt="" />
                    </Marker>
                ))
            }
        </MapGL>
    );
}