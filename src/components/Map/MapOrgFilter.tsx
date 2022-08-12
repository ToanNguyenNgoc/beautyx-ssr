import React, { useState, useCallback } from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import orgApi from "../../api/organizationApi";
import { IOrganization } from "../../interface/organization";
import icon from "../../constants/icon";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _, { debounce } from "lodash";
import { useDispatch } from "react-redux";
import {
    fetchOrgsMapFilter,
    onSetOrgsMapEmpty,
    onSetOrgCenter,
} from "../../redux/org/orgMapSlice";
import { fetchAsyncOrg } from "../../redux/org/orgSlice";
import { Switch } from "@mui/material";

const PlaceComponent = (props: any) => {
    const { map, setZoom, setOpenDetail, openDetail } = props;
    const dispatch = useDispatch();
    const [orgs, setOrgs] = useState<IOrganization[]>([]);

    const callOrgsByKeyword = async (keyword: string) => {
        try {
            const res = await orgApi.getAll({
                page: 1,
                limit: 5,
                keyword: keyword,
                sort: "distance",
            });
            setOrgs(res.data.context.data);
        } catch (error) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceDropDown = useCallback(
        debounce((nextValue) => {
            callOrgsByKeyword(nextValue);
        }, 1000),
        []
    );
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();
    // console.log(data)
    const handleSelect = (description: any) => {
        setValue(description.description, false);
        setOpenDetail({
            ...openDetail,
            open: false,
            check: false,
        });
        setOrgs([]);
        setZoom(14);
        clearSuggestions();
        getGeocode({ address: description.description }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            const geo = `${lat},${lng}`;
            map?.panTo({ lat: lat, lng: lng });
            dispatch(onSetOrgsMapEmpty());
            dispatch(
                fetchOrgsMapFilter({
                    page: 1,
                    LatLng: geo,
                })
            );
        });
    };
    const onInputChange = (e: any) => {
        setValue(e.target.value);
        debounceDropDown(e.target.value);
    };
    const onClickOrgItemClick = (org: IOrganization) => {
        setZoom(16);
        setOpenDetail({
            open: true,
            check: true,
        });
        dispatch(fetchAsyncOrg(org.subdomain));
        setValue(org.name, false);
        map?.panTo({ lat: org.latitude, lng: org.longitude });
        setOrgs([]);
        dispatch(onSetOrgCenter(org));
        clearSuggestions();
    };
    return (
        <>
            <div className=" map-filter-cnt">
                <div className="map-filter-cnt__left">
                    <div className="map-filter-cnt__input">
                        <input
                            type="text"
                            placeholder="Tìm kiếm trên bản đồ"
                            value={value}
                            onChange={onInputChange}
                            disabled={!ready}
                        />
                        <div className="map-filter-cnt__input-btn">
                            <button onClick={() => setValue("")}>
                                <img src={icon.closeBlack} alt="" />
                            </button>
                        </div>
                    </div>
                    <div className="map-filter-cnt__drop">
                        <ul className="map-filter-list-org">
                            {status === "OK" &&
                                data.map((suggestion) => {
                                    const {
                                        place_id,
                                        structured_formatting: {
                                            main_text,
                                            secondary_text,
                                        },
                                    } = suggestion;
                                    return (
                                        <li
                                            className="map-list-org__item"
                                            key={place_id}
                                            onClick={() =>
                                                handleSelect(suggestion)
                                            }
                                        >
                                            <strong>{main_text}</strong>{" "}
                                            <small>{secondary_text}</small>
                                        </li>
                                    );
                                })}
                            {orgs.length > 0 &&
                                value.length > 0 &&
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
                <div className="map-filter-cnt__right">
                    <div className="flex-row map-filter-cnt__right-switch">
                        <Switch defaultChecked size="small" />
                        Cập nhật khi di chuyển bản đồ
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlaceComponent;
