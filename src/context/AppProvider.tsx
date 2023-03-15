/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { fetchAsyncUser } from 'redux/user/userSlice';
import { fetchAsyncHome } from 'redux/home/homeSlice';
import { AUTH_LOCATION, getPosition } from "api/authLocation";
import { useAppointment, useOrderService } from "hooks";

export const AppContext = createContext({});
export default function AppProvider({ children }:{children:any}) {
    const { t } = useTranslation();
    let lat; let long
    const location = AUTH_LOCATION()
    if (location) {
        lat = location.split(',')[0]
        long = location.split(',')[1]
    }
    const [geo, setGeo] = useState<any>({ lat: lat, long: long });
    const dispatch = useDispatch();
    const lg = localStorage.getItem("i18nextLng");
    const token = localStorage.getItem('_WEB_TK') ?? sessionStorage.getItem('_WEB_TK')
    const [language, setLanguage] = useState(
        (lg === "en-US" || lg === "en") ? "en" : "vn"
    );

    const getLocationPlatFormBeauty = async () => {
        try {
            const res:any = await getPosition();
            const user_location = {
                lat: res.coords.latitude,
                long: res.coords.longitude
            }
            setGeo(user_location)
            sessionStorage.setItem('USER_LOCATION', JSON.stringify(user_location));
        } catch (error) {
            console.log(error)
            setGeo(null)
        }
    }
    useEffect(() => {
        if (token) { dispatch(fetchAsyncUser()) }
        getLocationPlatFormBeauty()
        dispatch(fetchAsyncHome())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const serviceCate:any[] = []
    //get services, appointment user
    const { appointment, appointment_today } = useAppointment()
    const { orderService, order_app } = useOrderService()
    const value = {
        t,
        language,
        setLanguage,
        geo,
        serviceCate,
        appointment,
        appointment_today,
        orderService,
        order_app
    };
    return <AppContext.Provider value={value} > {children} </AppContext.Provider>;
}