import React, { useState } from 'react';
import style from './open-app.module.css'
import { XButton } from 'components/Layout'
import { EXTRA_FLAT_FORM } from 'api/extraFlatForm';
import { useDeviceMobile } from 'hooks';
import { Drawer } from '@mui/material';
import img from 'constants/img';

interface OpenAppProps {
    type: 'product' | 'service' | 'org' | 'discount' | 'none',
    id?: number | string,
    item_id?: number | string,
    org_id?: number | string
}

export function OpenApp(props: OpenAppProps) {
    const config = sessionStorage.getItem('config')
    const [open, setOpen] = useState(config ? JSON.parse(config).open : true)
    const { type, item_id, org_id, id } = props
    const PLATFORM = EXTRA_FLAT_FORM()
    const IS_MB = useDeviceMobile()
    let show = false
    if (PLATFORM === "BEAUTYX" && IS_MB) show = true
    let deepLink = `https://beautyx.page.link/?link=https://beautyx.page.link/myspa?${type}%3D${id}%26merchant%3D${org_id}&apn=com.myspa.beautyx&amv=18&isi=1614767784&ibi=com.myspa.beautyx&imv=18&cid=3028181755793109443&_osl=https://beautyx.page.link/MoBKVqvvHTrirbCG6&_icp=1`
    if (type === "discount") {
        deepLink = `https://beautyx.page.link/?link=https://beautyx.page.link/myspa?discount%3D${id}%26merchant%3D${org_id}%26service%3D${item_id}&apn=com.myspa.beautyx&amv=18&isi=1614767784&ibi=com.myspa.beautyx&imv=18&cid=3028181755793109443&_osl=https://beautyx.page.link/MoBKVqvvHTrirbCG6&_icp=1`
    }
    if (type === "org") {
        deepLink = `https://beautyx.page.link/?link=https://beautyx.page.link/myspa?org%3D${org_id}&apn=com.myspa.beautyx&amv=18&isi=1614767784&ibi=com.myspa.beautyx&imv=18&cid=3028181755793109443&_osl=https://beautyx.page.link/MoBKVqvvHTrirbCG6&_icp=1`
    }
    if (type === "none") deepLink = 'https://beautyx.page.link/myspa'
    const onOpenDeepLink = () => {
        const newWindow = window.open(deepLink, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null
    }
    const onClosePopup = () => {
        setOpen(false)
        sessionStorage.setItem('config', JSON.stringify({ open: false }))
    }
    return (
        show ?
            <Drawer
                open={open} onClose={onClosePopup}
                anchor="top"
            >
                <div className={style.wrapper}>
                    <div className={style.container}>
                        <div className={style.left}>
                            <img src={img.beautyx} alt="" />
                        </div>
                        <div className={style.right}>
                            <span className={style.right_title}>
                                Mở app BeautyX để có trải nghiệm tốt hơn nhé !
                            </span>
                            <div className={style.right_bot}>
                                <XButton
                                    className={style.right_btn}
                                    title='Sử dụng bản Web'
                                    onClick={onClosePopup}
                                />
                                <XButton
                                    className={style.right_btn}
                                    title='Mở App'
                                    onClick={onOpenDeepLink}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
            :
            <></>
    );
}