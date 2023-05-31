import { Dialog } from "@mui/material";
import icon from "constants/icon";
import { IOrganization } from "interface";
import { useRef } from "react";
import MapGL, { Marker } from 'react-map-gl';
import Slider from "react-slick";
import "./map.css"

interface OrgMapFullProps {
    open: boolean, setOpen: (open: boolean) => void, org: IOrganization
}

export function OrgItemMap(props: OrgMapFullProps) {
    const { open, setOpen, org } = props;
    const slideRef = useRef<any>();
    const orgArr = [org]
    const branches: any[] = org.branches ?? []
    const newArr = orgArr.concat(branches)

    const mapRef = useRef<any>()
    const onCartItemClick = (item: any) => {
        mapRef.current.flyTo({
            center: [item.longitude, item.latitude],
        });
    }
    const settings = {
        dots: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerPadding: "30px",
        className: "center",
        centerMode: true,
        afterChange: function (index: any) {
            const lat = newArr[index]?.latitude;
            const lng = newArr[index]?.longitude
            mapRef.current.flyTo({
                center: [lng, lat],
            });
        },
    };
    return (
        <Dialog
            open={open}
            fullScreen
        >
            <div className="map_org_cnt">
                <button onClick={() => setOpen(false)} className="map_org_close">
                    <img src={icon.closeCircle} alt="" />
                </button>
                <MapGL
                    ref={mapRef}
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
                        <div className="org_map_marker_item">
                            <img src={icon.pinMapRed} alt="" />
                            <span>{org.name}</span>
                        </div>
                    </Marker>
                    {
                        org.branches.length > 0 &&
                        org.branches.map((item, index: number) => (
                            <Marker
                                key={index}
                                latitude={item.latitude ?? 0}
                                longitude={item.longitude ?? 0}
                            >
                                <div className="org_map_marker_item">
                                    <img src={icon.pinMapGreen} alt="" />
                                    <span>{item.name}</span>
                                </div>
                            </Marker>
                        ))
                    }
                </MapGL>
                <div className="map_org_list_wrapper">
                    <ul className="map_org_list">
                        <li className="map_org_list_item">
                            <CardMapItem
                                item={org}
                            />
                        </li>
                        {
                            org.branches.length > 0 &&
                            org.branches?.map((item, index: number) => (
                                <li key={index} className="map_org_list_item">
                                    <CardMapItem
                                        onClick={onCartItemClick}
                                        item={item}
                                        image_url={item.image ? item.image_url : org.image_url}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="map_org_list_wrapper_mb">
                    <Slider ref={slideRef} {...settings}>
                        {
                            newArr.map((item: any, index: number) => (
                                <div key={index} className="org_list_item_cnt">
                                    <CardMapItem
                                        onClick={onCartItemClick}
                                        item={item}
                                        image_url={item.image ? item.image_url : org.image_url}
                                    />
                                </div>
                            ))
                        }
                    </Slider>
                </div>
            </div>
        </Dialog>
    )
}
const CardMapItem = (props: any) => {
    const { item, image_url, onClick } = props
    const onClickOItem = () => onClick && onClick(item)
    return (
        <div
            onClick={onClickOItem}
            className="map_card_item"
        >
            <img src={image_url ?? item.image_url} alt="" className='map_card_item_img' />
            <div className="map_card_item_detail">
                <span className="name">{item.name}</span>
                <span className="address">
                    {item.full_address}
                </span>
            </div>
        </div>
    )
}