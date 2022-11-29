import React from 'react';
import img from 'constants/img';
import plashScreenMb from 'assets/image/plashScreen.png'
import style from './plash.module.css'

export function PlashScreen() {
    return (
        <div className={style.container}>
            <img
                className={style.container_image}
                src={img.beautyxSlogan}
                alt=""
            />
            <img
                className={style.container_image_mb}
                src={plashScreenMb}
                alt=""
            />
        </div>
    );
}