/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AUTH_LOCATION } from "../../api/authLocation";
import icon from "../../constants/icon";
import MapTagsOrgItem from "./MapOrgItem";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Slider from "react-slick";
import MapTagsItemMB from "./MapItemMB";
import { IOrganization } from "../../interface/organization";
import MapOrgItemDetail from "./MapOrgItemDetail";
import MapOrgFilter from "./MapOrgFilter";
import { fetchAsyncOrg } from "../../redux/org/orgSlice";
import useDeviceMobile from "../../utils/useDeviceMobile";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _, { debounce } from "lodash";
import { onSetOrgCenter, onSetOrgsMapEmpty } from "../../redux/org/orgMapSlice";
import { fetchOrgsMapFilter } from "../../redux/org/orgMapSlice";
import MapCurrentUser from './MapCurrentUser'
import IStore from "../../interface/IStore";
import { Marker, NavigationControl, GeolocateControl, GeolocateResultEvent } from 'react-map-gl';
import MapGL from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import onErrorImg from "../../utils/errorImg";
// import MapDirection from './MapDirection';



interface IProps {
    orgs: IOrganization[];
}

const MapContent = (props: IProps) => {
    const IS_MB = useDeviceMobile();
    const { orgs } = props;
    const mapRef = useRef<any>();
    const { orgCenter, getValueCenter, tags } = useSelector((state: IStore) => state.ORGS_MAP)
    const location = useLocation();
    const LOCATION = AUTH_LOCATION();
    const org: IOrganization = useSelector((state: any) => state.ORG.org);
    const dispatch = useDispatch();
    const slideRef = useRef<any>();
    const [openDetail, setOpenDetail] = useState({
        open: false,
        check: false,
    });
    const [local,] = useState({
        lat: LOCATION ? parseFloat(LOCATION?.split(",")[0]) : orgs[0]?.latitude,
        long: LOCATION ? parseFloat(LOCATION?.split(",")[1]) : orgs[0]?.longitude,
    });

    const refListOrg: any = useRef();
    const [openListOrg, setOpenListOrg] = useState(true);
    const handleToggleListOrg = () => {
        refListOrg.current.classList.toggle("list-org__active");
        setOpenListOrg(!openListOrg);
        if (
            openListOrg === false &&
            openDetail.open === false &&
            openDetail.check === true
        ) {
            setOpenDetail({
                ...openDetail,
                open: true,
            });
        } else {
            setOpenDetail({
                ...openDetail,
                open: false,
            });
        }
        if (
            openListOrg === false &&
            openDetail.open === true &&
            openDetail.check === true
        ) {
            setOpenDetail({
                ...openDetail,
                open: true,
            });
        }
    };

    const { totalItem, page } = useSelector((state: any) => state.ORGS_MAP.orgsMap)
    const onViewMoreOrgs = () => {
        if (
            location.pathname === "/ban-do" &&
            totalItem >= 15 &&
            orgs.length < totalItem
        ) {
            dispatch(
                fetchOrgsMapFilter({
                    page: page + 1,
                    sort: "distance",
                    path_url: location.pathname,
                    mountNth: 2,
                    tags: tags.join("|")
                })
            );
        }
    };
    const onPanTo = (lat: number, lng: number) => {
        mapRef?.current?.panTo([lng, lat])
    }
    const onFlyTo = (lat: number, lng: number) => {
        mapRef?.current?.flyTo({
            center: [lng, lat]
        })
    }
    const onGotoSlickOrgItem = (index: number) => {
        slideRef?.current?.slickGoTo(index);
    };
    const settings = {
        dots: false,
        // infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerPadding: "30px",
        className: "center",
        centerMode: true,
        afterChange: function (index: any) {
            if (index === orgs.length - 3) {
                onViewMoreOrgs()
            }
            if (mapRef?.current.getZoom() < 15) {
                mapRef?.current.setZoom(15)
            }
            onFlyTo(orgs[index]?.latitude, orgs[index]?.longitude)
        },
    };
    // useEffect(() => {
    //     if (!getValueCenter) {
    //         switch (orgs.length) {
    //             case 30: return mapRef?.current?.setZoom(15);
    //             case 45: return mapRef?.current?.setZoom(14);
    //             case 60: return mapRef?.current?.setZoom(13);
    //             case 75: return mapRef?.current?.setZoom(12);
    //             case 90: return mapRef?.current?.setZoom(11);
    //             case 105: return mapRef?.current?.setZoom(10)
    //         }
    //     }
    // }, [orgs.length, getValueCenter])
    const onMarkerClick = (item: IOrganization, index?: number) => {
        if (mapRef?.current.getZoom() < 15) {
            mapRef?.current.setZoom(15)
        }
        dispatch(fetchAsyncOrg(item.subdomain));
        dispatch(onSetOrgCenter(item))
        if (IS_MB && index && onGotoSlickOrgItem) {
            onGotoSlickOrgItem(index);
        }
        setOpenDetail({
            ...openDetail,
            open: true,
            check: true,
        });
        onPanTo(item.latitude, item.longitude)
    };

    const handleBackCurrentUser = () => {
        if (LOCATION) {
            dispatch(onSetOrgsMapEmpty());
            dispatch(fetchOrgsMapFilter({
                page: 1,
                sort: "distance",
                mountNth: 2
            }))
            onFlyTo(parseFloat(LOCATION?.split(",")[0]), parseFloat(LOCATION?.split(",")[1]))
        }
    }

    const debounceOrgsMove = useCallback(
        debounce((latLng: string, orgsLength: number, tags: string[]) => {
            if (orgsLength === 105) {
                dispatch(onSetOrgsMapEmpty())
            }
            // dispatch(onSetOrgsMapEmpty())
            dispatch(
                fetchOrgsMapFilter({
                    page: 1,
                    LatLng: latLng,
                    mountNth: 2,
                    tags: tags.join("|")
                })
            );
        }, 500),
        []
    );
    const onCenterChange = () => {
        const lat = mapRef?.current?.getCenter()?.lat
        const lng = mapRef?.current?.getCenter()?.lng
        if (getValueCenter) {
            debounceOrgsMove(`${lat},${lng}`, orgs.length, tags)
        }
    }
    const currentUser = (e: GeolocateResultEvent) => {
        handleBackCurrentUser()
    }


    return (
        <div className="map-content">
            {/* map */}
            <MapOrgFilter
                slideRef={slideRef}
                mapRef={mapRef}
                onFlyTo={onFlyTo}
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
            />
            <MapCurrentUser
                handleBackCurrentUser={handleBackCurrentUser}
            />
            {
                <MapGL
                    // onViewportChange={onCenterChange}
                    onMouseMove={onCenterChange}
                    onTouchMove={onCenterChange}
                    style={{
                        width: "100vw",
                        height: "100vh"
                    }}
                    initialViewState={{
                        latitude: local.lat,
                        longitude: local.long,
                        zoom: 16
                    }}
                    attributionControl={true}
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/mapbox/streets-v10"
                    ref={mapRef}
                // onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
                >

                    <NavigationControl
                        position="bottom-right"
                        showZoom={true}
                        showCompass={true}
                    />
                    <GeolocateControl
                        position="bottom-right"
                        onGeolocate={currentUser}
                    />
                    {
                        LOCATION &&
                        <Marker
                            latitude={parseFloat(LOCATION?.split(",")[0])}
                            longitude={parseFloat(LOCATION?.split(",")[1])}
                        >
                            <img
                                onError={(e) => onErrorImg(e)}
                                style={{ width: "42px" }} src={icon.pinMapRedGoogle} alt=""
                            />
                        </Marker>
                    }
                    {
                        orgs.map((item: IOrganization, index: number) => (
                            <Marker
                                onClick={() => onMarkerClick(item, index)}
                                key={index}
                                latitude={item.latitude}
                                longitude={item.longitude}
                            >
                                <div
                                    style={
                                        item.id === orgCenter?.id ? { transform: "scale(1.2)" } : {}
                                    }
                                    className="map-marker-org"
                                >
                                    <img
                                        src={item.image_url}
                                        alt=""
                                        className="map-marker-org__img"
                                        onError={(e) => onErrorImg(e)}
                                    />
                                </div>
                            </Marker>
                        ))
                    }
                </MapGL>
            }
            <div
                className={
                    openListOrg === true
                        ? "dialog-map__wrapper list-org__active "
                        : "dialog-map__wrapper"
                }
                ref={refListOrg}
            >
                <div className="dialog-wrap__list">
                    <div id="scrollableDiv" className="dialog-map__list">
                        <InfiniteScroll
                            hasMore={true}
                            loader={<></>}
                            next={onViewMoreOrgs}
                            dataLength={orgs.length}
                            scrollableTarget="scrollableDiv"
                        >
                            {orgs?.map((item: any, index: number) => (
                                <MapTagsOrgItem
                                    onMarkerClick={onMarkerClick}
                                    key={index}
                                    item={item}
                                />
                            ))}
                        </InfiniteScroll>
                    </div>
                    {openDetail.open === true ? (
                        <MapOrgItemDetail
                            org={org}
                            setOpenDetail={setOpenDetail}
                            openDetail={openDetail}
                        // handleDirection={handleDirection}
                        />
                    ) : null}
                    <div
                        onClick={() => {
                            handleToggleListOrg();
                        }}
                        className="open-list__org close"
                    >
                        <img
                            src={
                                openListOrg === true
                                    ? icon.arrownLeftWhite
                                    : icon.arrownRightWhite
                            }
                            alt=""
                        />
                    </div>
                </div>
            </div>
            {
                IS_MB &&
                <div className="map-list__mobile">
                    <Slider ref={slideRef} {...settings}>
                        {orgs.length > 0 && orgs.map((item: any, index: number) => (
                            <MapTagsItemMB
                                key={index} item={item}
                            />
                        ))}
                    </Slider>
                </div>
            }
        </div>
    );
}
export default MapContent
