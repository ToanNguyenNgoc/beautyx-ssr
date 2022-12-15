/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import dateNow from "../utils/dateExp";
import { useDispatch } from 'react-redux';
import { fetchAsyncUser } from 'redux/user/userSlice';
import { fetchAsyncHome } from 'redux/home/homeSlice';
import { getPosition } from "api/authLocation";
import { paramsProductsCate } from "params-query";
import axios from "axios";
import API_3RD from "api/3rd-api";
import { useSwr, useFetch, useAppointment, useOrderService } from "hooks"

export const AppContext = createContext();
export default function AppProvider({ children }) {
    const { t } = useTranslation();
    const [geo, setGeo] = useState();
    const dispatch = useDispatch();
    const lg = localStorage.getItem("i18nextLng");
    const [language, setLanguage] = useState(
        (lg === "en-US" || lg === "en") ? "en" : "vn"
    );
    const [sign, setSign] = useState();

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
            await dispatch(fetchAsyncUser());
        }
        callUserProfile()
    }, [sign, dispatch]);
    useEffect(() => {
        dispatch(fetchAsyncHome())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //----------------------------------------------------------
    //get location plat form
    // const { mountNth } = useSelector((state) => state.ORGS_MAP.orgsMap);
    // const callDisAndOrgsByLocation = () => {
    //     if (mountNth !== 2) {
    //         dispatch(fetchOrgsMapFilter({
    //             page: 1,
    //             sort: "distance",
    //             path_url: "/ban-do",
    //             mountNth: 2
    //         }))
    //     }

    // }
    const getLocationPlatFormBeauty = async () => {
        try {
            const res = await getPosition();
            const user_location = {
                lat: res.coords.latitude,
                long: res.coords.longitude
            }
            sessionStorage.setItem('USER_LOCATION', JSON.stringify(user_location));
            const api_url = API_3RD.API_MAP_BOX(user_location.lat, user_location.long)
            const resAddress = await axios.get(api_url);
            setGeo(resAddress?.features[0]);
            // callDisAndOrgsByLocation();
        } catch (error) {
            // callDisAndOrgsByLocation();
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

    const serviceCate = useFetch(true, "https://beautyx.vercel.app/v1/tags-all").response
    //get services, appointment user
    const { appointment } = useAppointment()
    const { orderService } = useOrderService()

    const value = {
        t,
        language,
        setLanguage,
        setSign,
        geo,
        productCate,
        serviceCate,
        appointment,
        orderService,
    };
    return <AppContext.Provider value={value} > {children} </AppContext.Provider>;
}