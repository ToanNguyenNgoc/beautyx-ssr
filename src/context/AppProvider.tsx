/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { fetchAsyncUser } from 'redux/user/userSlice';
import { fetchAsyncHome } from 'redux/home/homeSlice';
import { AUTH_LOCATION, getPosition } from "api/authLocation";
import { useAppointment, useOrderService } from "hooks";
// import Echo from 'laravel-echo'
// import Pusher from 'pusher-js/worker'
// import { AUTH_HEADER } from "api/authHeader";

export const AppContext = createContext({});
export default function AppProvider({ children }: { children: any }) {
    const { t } = useTranslation();
    // const pusher = new Pusher('APP_KEY', {
    //     cluster: 'APP_CLUSTER',
    // });
    // const echo = new Echo({
    //     broadcaster: pusher,
    //     key: process.env.MIX_PUSHER_APP_KEY,
    //     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    //     disableStats: true,
    //     forceTLS: false,
    //     wsHost: window.location.hostname,
    //     wsPort: 6001,
    //     wssPort: 6001,
    //     encrypted: false,
    //     enabledTransports: ['ws', 'wss'],
    //     authEndpoint: '/ws/auth',
    //     auth: AUTH_HEADER()
    // })
    // console.log(echo)
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
            const res: any = await getPosition();
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
    }, [])
    const serviceCate: any[] = []
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