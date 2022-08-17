/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AUTH_LOCATION } from "../../api/authLocation";
import icon from "../../constants/icon";
import MapTagsOrgItem from "./MapOrgItem";
// import { fetchAsyncOrgsByFilter } from "../../redux/filter/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Slider from "react-slick";
import MapTagsItemMB from "./MapItemMB";
import { IOrganization } from "../../interface/organization";
import MapOrgItemDetail from "./MapOrgItemDetail";
import {
    GoogleMap, Marker, useLoadScript, InfoWindow, DirectionsRenderer
} from "@react-google-maps/api";
import MapOrgFilter from "./MapOrgFilter";
import { fetchAsyncOrg } from "../../redux/org/orgSlice";
import useDeviceMobile from "../../utils/useDeviceMobile";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _, { debounce } from "lodash";
import { onSetOrgCenter } from "../../redux/org/orgMapSlice";
import { fetchOrgsMapFilter, onSetOrgsMapEmpty } from "../../redux/org/orgMapSlice";
import MapCurrentUser from './MapCurrentUser'
import IStore from "../../interface/IStore";


interface IProps {
    onChangeCardMap?: any;
    orgs: IOrganization[];
}
declare type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
const lib: Libraries = ["places"]


const MapContent = (props: IProps) => {
    const IS_MB = useDeviceMobile();
    const { orgs } = props;
    console.log(orgs)
    const key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    const { orgCenter, getValueCenter } = useSelector((state: IStore) => state.ORGS_MAP)
    const [zoom, setZoom] = useState<number>(16);
    const location = useLocation();
    const org: IOrganization = useSelector((state: any) => state.ORG.org);
    const dispatch = useDispatch();
    const [map, setMap] = useState<any>()
    const slideRef = useRef<any>();
    const LOCATION = AUTH_LOCATION();
    const [openDetail, setOpenDetail] = useState({
        open: false,
        check: false,
    });
    const [local, setLocal] = useState({
        lat: LOCATION ? parseFloat(LOCATION?.split(",")[0]) : orgs[0]?.latitude,
        long: LOCATION
            ? parseFloat(LOCATION?.split(",")[1])
            : orgs[0]?.longitude,
    });
    const refListOrg: any = useRef();
    const [openListOrg, setOpenListOrg] = useState(true);
    // const { page, totalItem } = useSelector((state: any) => state.FILTER.ORGS);
    const handleToggleListOrg = () => {
        refListOrg.current.classList.toggle("list-org__active");
        setOpenListOrg(!openListOrg);
        if ( !openListOrg && !openDetail.open && openDetail.check) 
        {
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
        if (!openListOrg && openDetail.open && openDetail.check) {
            setOpenDetail({
                ...openDetail,
                open: true,
            });
        }
    };
    const handleSetLocation = useCallback((cardMapItem: any) => {
        setLocal({
            lat: cardMapItem?.latitude,
            long: cardMapItem?.longitude,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        orgs[0] &&
            setLocal({
                lat: LOCATION
                    ? parseFloat(LOCATION?.split(",")[0])
                    : orgs[0]?.latitude,
                long: LOCATION
                    ? parseFloat(LOCATION?.split(",")[1])
                    : orgs[0]?.longitude,
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orgs[0]]);

    const onViewMoreOrgs = () => {
        if (
            location.pathname === "/ban-do" &&
            totalItem >= 15 &&
            orgs.length < totalItem
        ) {
            dispatch(
                fetchAsyncOrgsByFilter({
                    page: page + 1,
                    sort: "distance",
                    path_url: location.pathname,
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

    const onPanTo = (lat: number, lng: number) => {
        map?.panTo({ lat: lat, lng: lng })
    }
    const settings = {
        dots: false,
        infinite: false,
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
                mapRef?.current.setZoom(13)
            }
            onFlyTo(orgs[index]?.latitude, orgs[index]?.longitude)
            dispatch(onSetOrgCenter(orgs[index]))
        },
    };
    useEffect(() => {
        switch (orgs.length) {
            case 30: return setZoom(15);
            case 45: return setZoom(14);
            case 60: return setZoom(13);
            case 75: return setZoom(12);
            case 90: return setZoom(11);
            case 105: return setZoom(10)
        }
    }, [orgs.length])
    const { isLoaded } = useLoadScript({
        libraries: lib,
        googleMapsApiKey: `${key}`
    })
    const onMarkerClick = (item: IOrganization, index: number) => {
        dispatch(fetchAsyncOrg(item.subdomain));
        dispatch(onSetOrgCenter(item))
        setZoom(16)
        setLocal({
            lat: item.latitude,
            long: item.longitude,
        });
        if (IS_MB && onGotoSlickOrgItem) {
            onGotoSlickOrgItem(index);
        }
        setOpenDetail({
            ...openDetail,
            open: true,
            check: true,
        });
        onPanTo(item.latitude, item.longitude)
    };
    const debounceDropDown = useCallback(
        debounce((nextValue) => {
            setLocal(nextValue);
        }, 1000),
        []
    );
    const debounceGetOrgsMoveCenter = useCallback(
        debounce((LatLng) => {
            dispatch(onSetOrgsMapEmpty())
            dispatch(fetchOrgsMapFilter({
                page: 1,
                LatLng: LatLng
            }))
        }, 2000),
        []
    )
    const onCenterChanged = () => {
        debounceDropDown(map?.getCenter().toJSON())
        const latString = JSON.stringify(`${map?.getCenter().toJSON().lat}`)
        const lngString = JSON.stringify(`${map?.getCenter().toJSON().lng}`)
        const LatLng = `${latString},${lngString}`
        if (getValueCenter) {
            // debounceGetOrgsMoveCenter(LatLng)
        }
    }

    const [directionsResponse, setDirectionsResponse] = useState<any>()
    // const [step, setStep] = useState<any>()
    const handleDirection = async () => {
        if (orgCenter && LOCATION) {
            setOpenListOrg(false)
            const directionsService = new google.maps.DirectionsService()
            const results = await directionsService.route({
                // origin: originRef.current.value,
                origin: {
                    lat: parseFloat(LOCATION.split(",")[0]),
                    lng: parseFloat(LOCATION.split(",")[1])
                },
                // destination: orgCenter.full_address,
                destination: { lat: orgCenter.latitude, lng: orgCenter.longitude },
                // eslint-disable-next-line no-undef
                travelMode: google.maps.TravelMode.DRIVING,
            })
            setDirectionsResponse(results)
            // setStep(results?.routes[0]?.legs[0]?.steps)
        }
    }
    const handleBackCurrentUser = () => {
        if (LOCATION) {
            map?.panTo({
                lat: parseFloat(LOCATION.split(",")[0]),
                lng: parseFloat(LOCATION.split(",")[1])
            })
        }
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
                <ReactMapGL
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
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    ref={mapRef}
                // onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
                >
                    <NavigationControl
                        position="bottom-right"
                        showZoom={true}
                        showCompass={true}
                    />
                    {
                        LOCATION &&
                        <Marker
                            latitude={parseFloat(LOCATION?.split(",")[0])}
                            longitude={parseFloat(LOCATION?.split(",")[1])}
                        >
                            <img style={{ width: "42px" }} src={icon.pinMapRedGoogle} alt="" />
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
                                    <img src={item.image_url} alt="" className="map-marker-org__img" />
                                </div>
                            </Marker>
                        ))
                    }
                </ReactMapGL>
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
                    {/* org list  */}
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
                                    setZoom={setZoom}
                                    setOpenDetail={setOpenDetail}
                                    openDetail={setOpenDetail}
                                    map={map}
                                    setLocal={setLocal}
                                />
                            ))}
                        </InfiniteScroll>
                    </div>
                    {/* close org list */}

                    {/* org detail */}
                    {openDetail.open === true ? (
                        <MapOrgItemDetail
                            org={org}
                            setOpenDetail={setOpenDetail}
                            openDetail={openDetail}
                            handleDirection={handleDirection}
                        />
                    ) : null}
                    {/* btn toggle open close list map org */}
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
                    {/* close toggle open close list map org */}
                </div>
                {/* close org detail */}
            </div>
            {
                IS_MB &&
                <div className="map-list__mobile">
                    <Slider ref={slideRef} {...settings}>
                        {orgs.length > 0 && orgs.map((item: any, index: number) => (
                            <MapTagsItemMB
                                handleDirection={handleDirection}
                                key={index} item={item}
                            />
                        ))}
                    </Slider>
                </div>
            }
        </div>
    );
}
