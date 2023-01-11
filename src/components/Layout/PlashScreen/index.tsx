import React from 'react';
import img from 'constants/img';
import plashScreenMb from 'assets/image/plashScreen.png'
import style from './plash.module.css'
import { useDeviceMobile } from 'hooks';

export function PlashScreen() {
    const IS_MB = useDeviceMobile()
    return (
        <div className={style.container}>
            {
                !IS_MB ?
                    <img
                        className={style.container_image}
                        src={img.plashScreenPc}
                        alt=""
                    />
                    :
                    <img
                        className={style.container_image_mb}
                        src={plashScreenMb}
                        alt=""
                    />
            }
        </div>
    );
}