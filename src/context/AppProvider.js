/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { fetchAsyncUser } from 'redux/user/userSlice';
import { fetchAsyncHome } from 'redux/home/homeSlice';
import { getPosition } from "api/authLocation";
import axios from "axios";
import API_3RD from "api/3rd-api";
import { useFetch, useAppointment, useOrderService, useProductCate } from "hooks"

export const AppContext = createContext();
export default function AppProvider({ children }) {
    const { t } = useTranslation();
    const [geo, setGeo] = useState();
    const dispatch = useDispatch();
    const lg = localStorage.getItem("i18nextLng");
    const token = localStorage.getItem('_WEB_TK') ?? sessionStorage.getItem('_WEB_TK')
    const [language, setLanguage] = useState(
        (lg === "en-US" || lg === "en") ? "en" : "vn"
    );

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
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (token) { dispatch(fetchAsyncUser()) }
        getLocationPlatFormBeauty()
        dispatch(fetchAsyncHome())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const productCate = useProductCate()
    const serviceCate = useFetch(true, "https://beautyx.vercel.app/v1/tags-all").response
    //get services, appointment user
    const { appointment, appointment_today } = useAppointment()
    const { orderService, order_app } = useOrderService()

    const value = {
        t,
        language,
        setLanguage,
        geo,
        productCate,
        serviceCate,
        appointment,
        appointment_today,
        orderService,
        order_app
    };
    return <AppContext.Provider value={value} > {children} </AppContext.Provider>;
}