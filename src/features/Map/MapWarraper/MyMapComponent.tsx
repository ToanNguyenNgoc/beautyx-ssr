/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react';
import icon from '../../../constants/icon';

function MyMapComponent(props: any) {
    const { map, setMap, center, zoom } = props;
    const mapRef = useRef<any>();
    useEffect(() => {
        const newMap = new window.google.maps.Map(mapRef.current, {
            disableDefaultUI: true
        })
        var image = {
            url: icon.pinMap,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };
        var marker = new google.maps.Marker({
            position: center,
            optimized: true ,
            icon: image
        });
        newMap.setCenter(center)
        newMap.setZoom(zoom)
        setMap(newMap)
        marker.setMap(newMap)
    }, []);
    return (
        <div
            style={{
                width: "100%",
                height: "100%"
            }}
            ref={mapRef}
            id="map"
        />
    );
}

export default MyMapComponent;