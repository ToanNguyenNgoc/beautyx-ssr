import React, { useEffect, useState } from "react";
// import {
//     withGoogleMap,
//     withScriptjs,
//     GoogleMap,
//     Marker,
// } from "react-google-maps";
// import InfoWindow from "react-google-maps/lib/components/InfoWindow";
import { useDispatch } from "react-redux";
import {
    GoogleMap,
    LoadScript,
    Marker,
    StandaloneSearchBox,
} from "@react-google-maps/api";
import { AUTH_LOCATION } from "../../api/authLocation";
import icon from "../../constants/icon";
import { IOrganization } from "../../interface/organization";
import { fetchAsyncOrg } from "../../redux/org/orgSlice";
import useDeviceMobile from "../../utils/useDeviceMobile";

// const lib = ["places"];

const MapTagsGoogle = (props: any) => {
    const {
        zoom,
        location,
        org,
        onChangeCardMap,
        setLocal,
        onGotoSlickOrgItem,
        setOpenDetail,
        openDetail,
    } = props;
    const key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    const dispatch = useDispatch();
    const IS_MB = useDeviceMobile();
    // const defaultMapOptions = {
    //     fullscreenControl: true,
    //     zoomControl: true,
    //     streetViewControl: true,
    //     mapTypeControl: true,
    // };
    let USER_LAT: any = 0;
    let USER_LNG: any = 0;
    const LOCATION = AUTH_LOCATION();
    if (LOCATION) {
        USER_LAT = parseFloat(LOCATION.split(",")[0]);
        USER_LNG = parseFloat(LOCATION.split(",")[1]);
    }
    const onMarkerClick = (item: IOrganization, index: number) => {
        // document.getElementById(`${item.id}`)?.scrollIntoView()
        dispatch(fetchAsyncOrg(item.subdomain));

        if (onChangeCardMap) {
            onChangeCardMap(item);
        }
        if (setLocal) {
            setLocal({
                lat: item.latitude,
                long: item.longitude,
            });
        }
        if (IS_MB && onGotoSlickOrgItem) {
            onGotoSlickOrgItem(index);
        }
        setOpenDetail({
            ...openDetail,
            open: true,
            check: true,
        });
    };
    return (
        <LoadScript
            googleMapsApiKey={`${key}`}
            libraries={["places", "drawing"]}
        >
            <GoogleMap
                id="searchbox-example"
                mapContainerClassName="google-map-view"
                // mapContainerStyle={containerStyle}
                // defaultOptions={defaultMapOptions}
                zoom={zoom}
                center={{
                    lat: location.lat,
                    lng: location.long,
                }}
            >
                {/* <StandaloneSearchBox>
                    <input
                        type="text"
                        placeholder="Customized your placeholder"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `32px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                            position: "absolute",
                            left: "50%",
                            marginLeft: "-120px",
                        }}
                    />
                </StandaloneSearchBox> */}
                {LOCATION && (
                    <Marker
                        icon={{
                            url: icon.pinMapRed,
                        }}
                        position={{ lat: USER_LAT, lng: USER_LNG }}
                    >
                        {/* {
                            <InfoWindow>
                                <div className="tooltip tooltip-current">
                                    Vị trí của bạn
                                </div>
                            </InfoWindow>
                        } */}
                    </Marker>
                )}
                {org?.map((item: IOrganization, index: number) => (
                    <Marker
                        onClick={() => onMarkerClick(item, index)}
                        key={index}
                        icon={{
                            url:
                                item?.latitude === location.lat
                                    ? icon.pinMapGreen
                                    : icon.pinMap,
                        }}
                        position={{ lat: item?.latitude, lng: item?.longitude }}
                    >
                        {/* {
                            <InfoWindow>
                                <div className="tooltip">{item?.name}</div>
                            </InfoWindow>
                        } */}
                    </Marker>
                ))}
            </GoogleMap>
        </LoadScript>
    );
};
// export default withScriptjs(withGoogleMap(MapTagsGoogle));
export default MapTagsGoogle;
