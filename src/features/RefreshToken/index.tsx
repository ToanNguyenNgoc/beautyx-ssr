import { auth } from 'api/authApi';
import { XButton } from 'components/Layout';
import { PopupNotification } from 'components/Notification';
import { useNoti } from 'hooks';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAsyncUser } from 'redux/profile/userSlice';

function RefreshToken() {
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch()
    const { firstLoad, resultLoad, noti } = useNoti()
    const handleCancel = () => {
        localStorage.removeItem('_WEB_TK_RE')
        localStorage.removeItem('_WEB_TK')
        sessionStorage.removeItem('_WEB_TK_RE')
        sessionStorage.removeItem('_WEB_TK')
        setOpen(false)
    }
    const handleRefreshToken = async () => {
        firstLoad()
        const token_refresh = sessionStorage.getItem('_WEB_TK_RE') ?? localStorage.getItem('_WEB_TK_RE')
        if (token_refresh) {
            try {
                const res = await auth.refreshToken(token_refresh)
                localStorage.setItem("_WEB_TK", res.data.context.token);
                localStorage.setItem('_WEB_TK_EX', res.data.context.token_expired_at)
                dispatch(fetchAsyncUser())
                setOpen(false)
                resultLoad('')
            } catch (error) {
                console.log(error)
                resultLoad('')
            }
        }
    }
    return (
        <div>
            <PopupNotification
                open={open}
                title='Phiên đăng nhập đã hết hạn'
                content='Vui lòng đăng nhập lại'
                children={
                    <>
                        <XButton
                            title='Hủy'
                            onClick={handleCancel}
                        />
                        <XButton
                            title='OK'
                            onClick={handleRefreshToken}
                            loading={noti.load}
                        />
                    </>
                }
            />
        </div>
    );
}

export default RefreshToken;