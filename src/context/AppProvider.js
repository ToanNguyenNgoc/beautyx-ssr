/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect,useMemo } from "react";
import { useTranslation } from "react-i18next";
import dateNow from "../utils/dateExp";
import { useDispatch, useSelector } from 'react-redux';
import dayjs from "dayjs";
import { fetchAsyncUser } from '../redux/USER/userSlice';
import { clearHomeDiscount, fetchAsyncHome, fetchAsyncDiscounts } from '../redux/home/homeSlice';
import { fetchAsyncNews, fetchAsyncVideos } from '../redux/blog/blogSlice';
import { fetchAsyncApps } from '../redux/appointment/appSlice';
import { fetchAsyncOrderServices } from '../redux/order/orderSlice';
// import { callApiFromTiki } from "../rootComponents/tiki/doPostMessageTiki";
// import { EXTRA_FLAT_FORM } from "../api/extraFlatForm";
// import { FLAT_FORM_TYPE } from "../rootComponents/flatForm";
// import useGetMessageTiki from "../rootComponents/useGetMessageTiki";
import { getPosition } from "../api/authLocation";
import { fetchOrgsMapFilter } from "../redux/org/orgMapSlice";
import { STATUS } from "../redux/status";
import axios from "axios";

export const AppContext = createContext();
export default function AppProvider({ children }) {
    const { t } = useTranslation();
    const [geo, setGeo] = useState();
    const keyMapBox = process.env.REACT_APP_MAPBOX_TOKEN
    const dispatch = useDispatch();
    const { DISCOUNTS } = useSelector((state) => state.HOME);
    const lg = localStorage.getItem("i18nextLng");
    const [language, setLanguage] = useState(
        (lg === "en-US" || lg === "en") ? "en" : "vn"
    );
    const [openModal, setOpenModal] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const [sign, setSign] = useState();
    const [tempCount, setTempleCount] = useState(0);
    const [dayObj, setDayObj] = useState(dayjs())
    if (localStorage.getItem("_WEB_US")) {
        const tokenDecoded = JSON.parse(`${localStorage.getItem("_WEB_US")}`);
        let exp = tokenDecoded?.token_expired_at;
        let expDate = exp.slice(0, 10).split("-").join("");
        let expTime = exp.slice(11, 19).split(":").join("");
        let dateExp = parseInt(`${expDate}${expTime}`);

        if (dateExp < dateNow) {
            localStorage.removeItem("_WEB_US");
            localStorage.removeItem("_WEB_TK");
        }
    }
    useEffect(() => {
        const callUserProfile = async () => {
            const res = await dispatch(fetchAsyncUser());
            if (res?.payload) {
                const time = dayjs().format("YYYY-MM");
                dispatch(fetchAsyncApps(time))
                dispatch(fetchAsyncOrderServices({ page: 1 }))
            }
        }
        callUserProfile()
    }, [sign, dispatch]);
    useEffect(() => {
        dispatch(fetchAsyncHome())
        // dispatch(fetchAsyncDiscounts({
        //     page: 1
        // }))
        dispatch(fetchAsyncNews());
        dispatch(fetchAsyncVideos());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //----------------------------------------------------------
    //get location plat form
    const { mountNth } = useSelector((state) => state.ORGS_MAP.orgsMap);
    const callDisAndOrgsByLocation = () => {
        if (mountNth !== 2) {
            dispatch(fetchOrgsMapFilter({
                page: 1,
                sort: "distance",
                path_url: "/ban-do",
                mountNth: 2
            }))
        }
    }
    useEffect(() => {
        dispatch(clearHomeDiscount())
        dispatch(fetchAsyncDiscounts({
            page: 1
        }))
    }, [geo]);
    const getLocationPlatFormBeauty = async () => {
        try {
            const res = await getPosition();
            const user_location = {
                lat: res.coords.latitude,
                long: res.coords.longitude
                // lat: 10.8660088,
                // long: 106.762131
            }
            sessionStorage.setItem('USER_LOCATION', JSON.stringify(user_location));
            const api_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${user_location.long},${user_location.lat}.json?access_token=${keyMapBox}&language=vi&country=vn`
            const resAddress = await axios.get(api_url);
            setGeo(resAddress?.features[0]);
            callDisAndOrgsByLocation();

        } catch (error) {
            callDisAndOrgsByLocation();
        }
    }
    // const getLocationPlatFormTiki = async() => {
    //     const api = "getLocation";
    //     const params = {
    //         api: api,
    //         params: {
    //             TYPE: 'CALL_API'
    //         }
    //     };
    //     await callApiFromTiki(api, params)
    // }
    // const response = useGetMessageTiki();
    // useEffect(() => {
    //     setTimeout(() => {
    //         const platform = EXTRA_FLAT_FORM();
    //         if (platform === FLAT_FORM_TYPE.TIKI) {
    //             getLocationPlatFormTiki()
    //             if (response && response.result?.res) {
    //                 const user_location = {
    //                     lat: response.result?.res.latitude,
    //                     long: response.result?.res.longitude
    //                 }
    //                 sessionStorage.setItem('USER_LOCATION', JSON.stringify(user_location))
    //                 callDisAndOrgsByLocation()
    //             } else {
    //                 callDisAndOrgsByLocation()
    //             }
    //         }
    //         if (platform === FLAT_FORM_TYPE.BEAUTYX) {
    //             getLocationPlatFormBeauty()
    //         }
    //     }, 1000)
    // }, [response]);
    useEffect(() => {
        getLocationPlatFormBeauty()
    }, [])


    const value = {
        t,
        language,
        openModal,
        setOpenModal,
        setLanguage,
        userInfo,
        setUserInfo,
        setSign,
        tempCount,
        setTempleCount,
        dayObj,
        setDayObj,
        geo
    };
    return <AppContext.Provider value={value} > {children} </AppContext.Provider>;
}