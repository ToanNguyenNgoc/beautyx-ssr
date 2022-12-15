import icon from "constants/icon";
import img from "constants/img";
import { IOrganization } from "interface";
import React, { useState } from "react";
import { onErrorImg } from "utils";
import MapOrgItemDetailMb from "./MapOrgItemDetailMb";

interface IProps {
    item: IOrganization,
    handleDirection?: () => void
}

export default function MapTagsItemMB(props: IProps) {
    const { item, handleDirection } = props;
    const [open, setOpen] = useState(false);
    const gotoDetail = () => {
        setOpen(true)
    };
    return (
        <>
            <MapOrgItemDetailMb
                open={open}
                setOpen={setOpen}
                org={item}
                handleDirection={handleDirection}
            />
            <div onClick={gotoDetail} className="map-item__wrap">
                <div className="map-item__mobile">
                    <div className="item-img">
                        <img
                            onError={(e) => onErrorImg(e)}
                            src={item?.image_url ? item?.image_url : img.beautyX}
                            alt=""
                        />
                    </div>
                    <div className="item-content">
                        <div className="item-content__name">
                            <p>{item?.name}</p>
                        </div>
                        <div className="item-content__address">
                            <p>{item?.full_address}</p>
                        </div>
                        <div className="item-content__evaluate">
                            <div className="evaluate-item">
                                <div className="evaluate-item__img">
                                    <img src={icon.star} alt="" />
                                </div>
                                <p>5</p>
                            </div>
                            <div className="evaluate-item">
                                <div className="evaluate-item__img">
                                    <img src={icon.heart} alt="" />
                                </div>
                                <p>
                                    {item?.favorites?.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
