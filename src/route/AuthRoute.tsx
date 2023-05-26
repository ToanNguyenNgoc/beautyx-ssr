/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from 'hooks'
import {  useHistory } from 'react-router-dom'
import React, { ReactNode, useEffect } from 'react'

interface LayoutProps {
    children: ReactNode[]
}

function AuthRoute({ children }: LayoutProps) {
    const history = useHistory()
    const { firstLoad, USER } = useAuth()
    console.log(firstLoad, USER)
    useEffect(() => {
        if (!firstLoad && !USER) history.replace('/sign-in?1')
    }, [firstLoad, USER])
    return (
        <>
            {children}
        </>
    );
}

export default AuthRoute;

