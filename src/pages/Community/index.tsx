/* eslint-disable jsx-a11y/iframe-has-title */
import HeadMobile from 'features/HeadMobile';
import React from 'react';
import style from './community.module.css'


function Community() {
    return (
        <>
            <HeadMobile prevUrl='/' title='Cộng đồng' />
            <div className={style.container}>
                <iframe id='myFrame' className={style.container_frame} src="https://beautyx.vn/blog/" />
            </div>
        </>
    );
}

export default Community;