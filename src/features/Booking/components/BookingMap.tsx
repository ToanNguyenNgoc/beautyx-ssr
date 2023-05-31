import { IBranch, IOrganization } from 'interface';
import React from 'react';
import {
    Marker,
    NavigationControl,
} from "react-map-gl";
import MapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { AUTH_LOCATION } from 'api/authLocation';
import icon from 'constants/icon';
import style from '../booking.module.css'
import img from 'constants/img';
import { formatDistance, onErrorImg } from 'utils';

interface BookingMapProps {
    org: IOrganization,
    onChooseBranch: (item: any) => void,
    mapRef: any
}

function BookingMap(props: BookingMapProps) {
    const { org, onChooseBranch, mapRef } = props
    const LOCATION = AUTH_LOCATION()
    const latUser = LOCATION && parseFloat(LOCATION?.split(",")[0])
    const lngUser = LOCATION && parseFloat(LOCATION?.split(",")[1])
    return (
        <MapGL
            style={{ width: "100%", height: "100%" }}
            initialViewState={{
                latitude: org.latitude,
                longitude: org.longitude,
                zoom: 12,
            }}
            attributionControl={true}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v10"
            ref={mapRef}
        >
            <NavigationControl
                position="top-right"
                showZoom={true}
                showCompass={true}
            />
            {
                (latUser && lngUser) &&
                <Marker latitude={latUser} longitude={lngUser} >
                    <img src={icon.pinMapRed} alt="" className={style.marker_icon} />
                </Marker>
            }
            <Marker latitude={org.latitude} longitude={org.longitude} >
                <div onClick={() => onChooseBranch(null)} className={style.org_maker}>
                    <div className={style.org_maker_head}>
                        <div className={style.org_maker_head_img}>
                            <img src={org?.image_url ?? img.imgDefault} onError={(e) => onErrorImg(e)} alt="" />
                        </div>
                        <div className={style.org_maker_head_de}>
                            <span className={style.org_maker_head_name}>{org.name}</span>
                            {
                                org.distance &&
                                <div className={style.org_maker_dis}>
                                    <span></span>
                                    <h4>{formatDistance(org.distance)}</h4>
                                </div>
                            }
                        </div>

                    </div>
                    <div className={style.org_maker_address}>{org?.address}</div>
                </div>
            </Marker>
            {
                org.branches?.map((item: IBranch, i: number) => (
                    <Marker key={i} latitude={item.latitude} longitude={item.longitude} >
                        <div onClick={() => onChooseBranch(item)} className={style.org_maker}>
                            <div className={style.org_maker_head}>
                                <div className={style.org_maker_head_img}>
                                    <img src={org?.image_url ?? img.imgDefault} onError={(e) => onErrorImg(e)} alt="" />
                                </div>
                                <div className={style.org_maker_head_de}>
                                    <span className={style.org_maker_head_name}>{item.name}</span>
                                    {
                                        item.distance &&
                                        <div className={style.org_maker_dis}>
                                            <span></span>
                                            <h4>{formatDistance(item.distance)}</h4>
                                        </div>
                                    }
                                </div>

                            </div>
                            <div className={style.org_maker_address}>{item?.address}</div>
                        </div>
                    </Marker>
                ))
            }

        </MapGL>
    );
}

export default BookingMap;