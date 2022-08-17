import React, { useState, useCallback } from "react";
import orgApi from "../../api/organizationApi";
import { IOrganization } from "../../interface/organization";
import icon from "../../constants/icon";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _, { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchOrgsMapFilter,
    onSetOrgsMapEmpty,
    onSetOrgCenter,
} from "../../redux/org/orgMapSlice";
import { fetchAsyncOrg } from "../../redux/org/orgSlice";
import { Switch } from "@mui/material";
import { onSwitchValueCenter } from "../../redux/org/orgMapSlice";
import axios from "axios";
import IStore from "../../interface/IStore";

const PlaceComponent = (props: any) => {
    const { mapRef, onFlyTo, setOpenDetail, openDetail, slideRef } = props;
    const dispatch = useDispatch();
    const [orgs, setOrgs] = useState<IOrganization[]>([]);
    const { getValueCenter } = useSelector((state: IStore) => state.ORGS_MAP)
    const callOrgsByKeyword = async (keyword: string) => {
        try {
            const res = await orgApi.getAll({
                page: 1,
                limit: 5,
                keyword: keyword,
                sort: "distance"
            })
            setOrgs(res.data.context.data)
        } catch (error) {

        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceDropDown = useCallback(
        debounce((nextValue) => {
            callOrgsByKeyword(nextValue);
        }, 1000),
        []
    );
    const [coorAddress, setCoorAddress] = useState([]);
    const [keyword, setKeyword] = useState("");
    const keyMapBox = process.env.REACT_APP_MAPBOX_TOKEN
    const handleSelectAddressItem = (a: any) => {
        setKeyword(a.place_name);
        setCoorAddress([]);
        setOpenDetail({
            ...openDetail,
            open: false,
            check: false,
        });
        setOrgs([]);
        if (mapRef?.current.getZoom() < 15) {
            mapRef?.current.setZoom(13)
        }
        const geo = a.center.reverse().join(",");
        onFlyTo(a.center[0], a.center[1]);
        dispatch(onSetOrgsMapEmpty());
        dispatch(
            fetchOrgsMapFilter({
                page: 1,
                LatLng: geo,
            })
        );
        setTimeout(() => {
            slideRef?.current?.slickGoTo(0);
        }, 500)
    }
    const onInputChange = async (e: any) => {
        const keyword = e.target.value
        setKeyword(keyword)
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=${keyMapBox}&country=vn`;
        const res: any = await axios.get(url);
        setCoorAddress(res.features)
        debounceDropDown(keyword)
    }
    const onClickOrgItemClick = (org: IOrganization) => {
        onFlyTo(org.latitude, org.longitude);
        if (mapRef?.current.getZoom() < 15) {
            mapRef?.current.setZoom(13)
        }
        dispatch(onSetOrgsMapEmpty());
        dispatch(
            fetchOrgsMapFilter({
                page: 1,
                LatLng: `${org.latitude},${org.longitude}`,
            })
        );
        setOpenDetail({
            ...openDetail,
            open: true,
            check: true,
        });
        setOrgs([]);
        setCoorAddress([])
        dispatch(onSetOrgCenter(org));
        dispatch(fetchAsyncOrg(org.subdomain));
        setTimeout(() => {
            slideRef?.current?.slickGoTo(0);
        }, 500)
    }
    const onChangeSwitch = (e:any)=>{
        dispatch(onSwitchValueCenter(e.target.checked))
    }
    return (
        <>
            <div className=" map-filter-cnt">
                <div className="map-filter-cnt__left">
                    <div className="map-filter-cnt__input">
                        <input
                            type="text"
                            placeholder="Tìm kiếm trên bản đồ"
                            value={keyword}
                            onChange={onInputChange}
                        />
                        <div className="map-filter-cnt__input-btn">
                            <button onClick={() => setKeyword("")}>
                                <img src={icon.closeBlack} alt="" />
                            </button>
                        </div>
                    </div>
                    <div className="map-filter-cnt__drop">
                        <ul className="map-filter-list-org">
                            {keyword.length > 0 &&
                                coorAddress.length > 0 &&
                                coorAddress.map((i: any, index: number) => (
                                    <li
                                        onClick={() => handleSelectAddressItem(i)}
                                        className="map-list-org__item"
                                        key={index}
                                    >
                                        {i.place_name}
                                    </li>
                                ))}
                            {orgs.length > 0 &&
                                keyword.length > 0 &&
                                orgs.map((i: IOrganization, index: number) => (
                                    <li
                                        onClick={() => onClickOrgItemClick(i)}
                                        className="map-list-org__item"
                                        key={index}
                                    >
                                        {i.name}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
                {/* <div className="map-filter-cnt__right">
                    <div className="flex-row map-filter-cnt__right-switch">
                        <Switch 
                            onChange={onChangeSwitch}
                            checked={getValueCenter} 
                            size="small" 
                            />
                        Cập nhật khi di chuyển bản đồ
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default PlaceComponent;
