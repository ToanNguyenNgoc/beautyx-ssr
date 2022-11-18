/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from 'hooks'
import { Route, useHistory } from 'react-router-dom'
import React, { ReactNode, useEffect } from 'react'
import PageNotFound from 'components/PageNotFound'

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

// export const PrivateRoute = ({children, ...res})=>{
//     return (
//         <Route>

//         </Route>
//     )
// }