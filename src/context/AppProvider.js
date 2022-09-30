/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import dateNow from "../utils/dateExp";
import { useDispatch, useSelector } from 'react-redux';
import dayjs from "dayjs";
import { fetchAsyncUser } from '../redux/USER/userSlice';
import { fetchAsyncHome } from '../redux/home/homeSlice';
import { fetchAsyncNews, fetchAsyncVideos } from '../redux/blog/blogSlice';
import { fetchAsyncApps } from '../redux/appointment/appSlice';
import { fetchAsyncOrderServices } from '../redux/order/orderSlice';
import { getPosition } from "../api/authLocation";
import { fetchOrgsMapFilter } from "../redux/org/orgMapSlice";
import { useSwr } from "../utils/useSwr";
import { paramsProductsCate } from "../params-query";
import axios from "axios";
import useFetch from "../utils/useFetch";

export const AppContext = createContext();
export default function AppProvider({ children }) {
    const { t } = useTranslation();
    const [geo, setGeo] = useState();
    const keyMapBox = process.env.REACT_APP_MAPBOX_TOKEN
    const dispatch = useDispatch();
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
    const getLocationPlatFormBeauty = async () => {
        try {
            const res = await getPosition();
            const user_location = {
                lat: res.coords.latitude,
                long: res.coords.longitude
            }
            // const user_location = {
            //     lat: 10.8783504,
            //     long: 106.7669344
            // }
            sessionStorage.setItem('USER_LOCATION', JSON.stringify(user_location));
            const api_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${user_location.long},${user_location.lat}.json?access_token=${keyMapBox}&language=vi&country=vn`
            const resAddress = await axios.get(api_url);
            setGeo(resAddress?.features[0]);
            callDisAndOrgsByLocation();
        } catch (error) {
            callDisAndOrgsByLocation();
        }
    }
    useEffect(() => {
        getLocationPlatFormBeauty()
    }, [])
    //handle product cate, service cate
    const productCatePage1 = useSwr("/tags", true, { page: 1, ...paramsProductsCate }).responseArray;
    const productCatePage2 = useSwr("/tags", true, { page: 2, ...paramsProductsCate }).responseArray;
    const productCatePage3 = useSwr("/tags", true, { page: 3, ...paramsProductsCate }).responseArray;
    const productCate = productCatePage1.concat(productCatePage2).concat(productCatePage3)

    const serviceCate = useFetch("https://beautyx.vercel.app/v1/api/tags-all").response
    const specialItems = useFetch("https://beautyx.vercel.app/v1/special-items").response



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
        geo,
        productCate,
        serviceCate,
        specialItems
    };
    return <AppContext.Provider value={value} > {children} </AppContext.Provider>;
}