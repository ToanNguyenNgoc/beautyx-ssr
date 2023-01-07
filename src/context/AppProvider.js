/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { fetchAsyncUser } from 'redux/user/userSlice';
import { fetchAsyncHome } from 'redux/home/homeSlice';
import { getPosition } from "api/authLocation";
import { useAppointment, useOrderService } from "hooks"

export const AppContext = createContext();
export default function AppProvider({ children }) {
    const { t } = useTranslation();
    // const [geo, setGeo] = useState();
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
    const serviceCate = []
    //get services, appointment user
    const { appointment, appointment_today } = useAppointment()
    const { orderService, order_app } = useOrderService()

    const value = {
        t,
        language,
        setLanguage,
        // geo,
        serviceCate,
        appointment,
        appointment_today,
        orderService,
        order_app
    };
    return <AppContext.Provider value={value} > {children} </AppContext.Provider>;
}