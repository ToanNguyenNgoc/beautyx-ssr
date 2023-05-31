import React, { useState, useCallback, useContext } from "react";
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
    onSetTagsFilter
} from "../../redux/org/orgMapSlice";
import { fetchAsyncOrg } from "../../redux/org/orgSlice";
import { Switch } from "@mui/material";
import { onSwitchValueCenter } from "../../redux/org/orgMapSlice";
import axios from "axios";
import IStore from "../../interface/IStore";
import { imgTag } from "../../constants/img";
import { AppContext } from "../../context/AppProvider";
import BeautyLoading from "../BeautyxLoading";
import { STATUS } from "../../redux/status";

const PlaceComponent = (props: any) => {
    const { mapRef, onFlyTo, setOpenDetail, openDetail, slideRef } = props;
    const { t } = useContext(AppContext) as any;
    const tags_data = [
        // { id: 9, title: t("home_2.places_near_you"), text: t("home_2.places_near_you"), img: icon.distance },
        { id: 4, title: "Spa", text: "Spa", img: imgTag.spa },
        { id: 3, title: "Salon", text: "Salon", img: '' },
        { id: 1, title: "Nail", text: "Nail", img: imgTag.nails },
        {
            id: 6,
            title: "clinic",
            text: "clinic",
            img: imgTag.clinic,
        },
        {
            id: 8,
            title: "Massage",
            text: "Massage",
            img: imgTag.massage,
        },
        {
            id: 5,
            title: "Thẩm mỹ viện",
            text: t("home_2.beauty_salon"),
            img: imgTag.skinCare,
        },
        {
            id: 2,
            title: "nha khoa",
            text: t("home_2.dentistry"),
            img: imgTag.nhaKhoa,
        },
        // { id: 7, title: 'Yoga', text: "Yoga", img: imgTag.yoga },
    ];
    const dispatch = useDispatch();
    const [orgs, setOrgs] = useState<IOrganization[]>([]);
    const { getValueCenter, tags, orgsMap } = useSelector((state: IStore) => state.ORGS_MAP)
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
                mountNth: 2,
                tags: tags.join("|")
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
        setCoorAddress(res?.data?.features)
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
                mountNth: 2,
                tags: tags.join("|")
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
    const onChangeSwitch = (e: any) => {
        dispatch(onSwitchValueCenter(e.target.checked))
    }
    const handleTagClick = async (tag: string) => {
        const lat = mapRef?.current?.getCenter()?.lat
        const lng = mapRef?.current?.getCenter()?.lng
        dispatch(onSetTagsFilter(tag))
        dispatch(onSetOrgsMapEmpty());
        const res = await dispatch(fetchOrgsMapFilter({
            page: 1,
            mountNth: 2,
            tags: tags.includes(tag) ? tags.filter(i => i !== tag).join("|") : [...tags, tag].join("|"),
            LatLng: `${lat},${lng}`
        }))
        if ((res.meta.requestStatus === "fulfilled")) {
            slideRef?.current?.slickGoTo(0);
        }
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
                            {
                                orgsMap.status === STATUS.LOADING ?
                                    <BeautyLoading />
                                    :
                                    <button onClick={() => setKeyword("")}>
                                        <img src={icon.closeBlack} alt="" />
                                    </button>
                            }
                        </div>
                    </div>
                    <div className="map-filter-cnt__drop">
                        <ul className="map-filter-list-org">
                            {keyword.length > 0 &&
                                coorAddress?.length > 0 &&
                                coorAddress?.map((i: any, index: number) => (
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
                <div className="flex-row-sp map-filter-cnt__right">
                    <div className="flex-row map-filter-cnt__right-switch">
                        <Switch
                            onChange={onChangeSwitch}
                            checked={getValueCenter}
                            size="small"
                        />
                        Cập nhật khi di chuyển bản đồ
                    </div>
                    <div className="map-filter-cnt__right-tag">
                        <ul className="flex-row map-filter-tags">
                            {
                                tags_data.map(tag => (
                                    <li
                                        onClick={() => handleTagClick(tag.title)}
                                        key={tag.id}
                                        className="map-filter-tags__item"
                                    >
                                        <div
                                            style={tags.includes(tag.title) ? {
                                                backgroundColor: "var(--purple)",
                                                color: "var(--bgWhite)"
                                            } : {}}
                                            className="map-filter-tags__item-cnt"
                                        >
                                            {tag.title}
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlaceComponent;
