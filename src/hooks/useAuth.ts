/* eslint-disable react-hooks/exhaustive-deps */
import IStore from "interface/IStore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncUser } from "redux/user/userSlice";

export function useAuth() {
    const dispatch = useDispatch()
    const [firstLoad, setFirstLoad] = useState(true)
    const { USER } = useSelector((state: IStore) => state.USER)
    const getUser = async () => {
        if (!USER) await dispatch(fetchAsyncUser())
        setFirstLoad(false)
    }
    useEffect(() => {
        getUser()
    }, [])
    return { firstLoad, USER }
}