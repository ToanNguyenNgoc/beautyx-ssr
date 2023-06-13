/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";
import { TFunction, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncUser } from 'redux/profile/userSlice';
import { fetchAsyncHome } from 'redux/home/homeSlice';
import { AUTH_LOCATION, getPosition } from "api/authLocation";
import { useAppointment, useOrderService } from "hooks";
import Echo from 'laravel-echo'
import IStore from "interface/IStore";
import { echoConfig } from "config";
import { LOCAL_TK } from "common";
const Pusher = require('pusher-js')

export type AppContextType = {
    t: TFunction<"translation", undefined>,
    language: any,
    setLanguage: any,
    geo: any,
    serviceCate: any,
    appointment: any,
    appointment_today: any,
    orderService: any,
    order_app: any,
    echo: Echo | null
}


export const AppContext = createContext<AppContextType | null>(null);
export default function AppProvider({ children }: { children: any }) {
    const { t } = useTranslation();
    const { USER } = useSelector((state: IStore) => state.USER)
    const [echo, setEcho] = useState<Echo | null>(null)
    useEffect(() => {
        if (USER) {
            setEcho(echoConfig())
        } else {
            // echoConfig().disconnect()
            setEcho(null)
        }
    }, [USER])

    let lat; let long
    const location: any = AUTH_LOCATION()
    if (location) {
        lat = location.split(',')[0]
        long = location.split(',')[1]
    }
    const [geo, setGeo] = useState<any>({ lat: lat, long: long });
    const dispatch = useDispatch();
    const lg = localStorage.getItem("i18nextLng");
    const token = localStorage.getItem(LOCAL_TK) ?? sessionStorage.getItem(LOCAL_TK)
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
        order_app,
        echo
    };
    return <AppContext.Provider value={value} > {children} </AppContext.Provider>;
}