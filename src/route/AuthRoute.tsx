/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from 'hooks'
import { Redirect, Route, useHistory } from 'react-router-dom'
import React, { ReactNode, useEffect } from 'react'

interface LayoutProps {
    children: ReactNode[]
}

function AuthRoute({ children }: LayoutProps) {
    const history = useHistory()
    const { firstLoad, USER } = useAuth()
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

function PrivateRoute({ children, ...rest }: any) {
    const user = true
    return (
        <Route
            {...rest}
            render={({ location }: any) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}