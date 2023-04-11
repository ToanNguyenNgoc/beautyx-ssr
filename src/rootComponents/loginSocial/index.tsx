/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

interface LoginSocialProps {
    params: any
}
interface ResponseAccessToken {
    access_token: string,
    expires_in: string,
    refresh_token: string,
    refresh_token_expires_in: string
}

function LoginSocial(props: LoginSocialProps) {
    const { params } = props;
    const history = useHistory()
    const handleGetAccessTokenZalo = async () => {
        const data = new URLSearchParams()
        data.append('code', params?.code)
        data.append('app_id', `${process.env.REACT_APP_ZALO_APP_ID}`)
        data.append('grant_type', 'authorization_code')
        if (params?.code) {
            const response: ResponseAccessToken = await axios.post(
                'https://oauth.zaloapp.com/v4/access_token',
                data,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "secret_key": `${process.env.REACT_APP_ZALO_SECRET_KEY}`
                    }
                }
            )
            if (response?.access_token) {
                const responseUser = await axios.get(
                    'https://graph.zalo.me/v2.0/me?fields=id,name,picture',
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "access_token": response.access_token
                        }
                    }
                )
                console.log(responseUser)
                history.replace('/')
            }
        }
    }
    useEffect(() => {
        handleGetAccessTokenZalo()
    }, [])
    return (
        <div>

        </div>
    );
}

export default LoginSocial;