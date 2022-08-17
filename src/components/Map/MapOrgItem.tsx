import React from "react";
import { useDispatch } from "react-redux";
import icon from "../../constants/icon";
import { IOrganization } from "../../interface/organization";
import { onSetOrgCenter } from "../../redux/org/orgMapSlice";
import onErrorImg from "../../utils/errorImg";

interface IProps {
    item: IOrganization;
    onMarkerClick: (item: IOrganization) => void
}
export default function MapTagsOrgItem(props: IProps) {
    const { item, onMarkerClick } =
        props;
    const dispatch = useDispatch();

    const onHoveItem = () => {
        dispatch(onSetOrgCenter(item))
    };
    const gotoDetail = () => {
        onMarkerClick(item)
    };
    return (
        <div
            id={`${item.id}`}
            onMouseEnter={onHoveItem}
            onClick={() => gotoDetail()}
            className="dialog-map__item"
        >
            <div className="map-item__img">
                <img
                    onError={(e) => onErrorImg(e)}
                    src={item?.image_url ? item?.image_url : item?.image}
                    alt=""
                />
            </div>
            <div className="map-item__content">
                <div className="map-item__name">
                    <p>{item?.name}</p>
                </div>
                <div className="map-item__address">
                    <p>{item?.address ? item?.address : item?.full_address}</p>
                </div>
                <div className="map-item__evaluate">
                    <div className="evaluate-item">
                        <img src={icon.star} alt="" />
                        <p>5</p>
                    </div>
                    <div className="evaluate-item">
                        <img src={icon.cartCheckPurple} alt="" />
                        <p>10</p>
                    </div>
                    <div className="evaluate-item">
                        <img src={icon.heart} alt="" />
                        <p>
                            {item?.favorites?.length
                                ? item?.favorites?.length
                                : "0"}
                        </p>
                    </div>
                </div>
                {/* {item.distance && (
                    <div className="flex-row map-item__distance">
                        <img
                            className="map-item__distance-icon"
                            src={icon.pinMapRed}
                            alt=""
                        />
                        {formatDistance(item.distance)}
                    </div>
                )} */}
            </div>
        </div>
    );
}
