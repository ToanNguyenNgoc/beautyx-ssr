import icon from 'constants/icon';
import React from 'react';
import HomeTitle from '../Components/HomeTitle';
import style from './style.module.css'

function HomeTopic() {
    return (
        <div className={style.container} >
            <div className={style.title}>
                <img src={icon.flash} className={style.title_icon} alt="" />
                <HomeTitle title='Phụ nữ Việt - Đẹp toàn diện' />
            </div>
            <div className={style.body}>
                {/* <div className={sty}></div> */}
            </div>
        </div>
    );
}

export default HomeTopic;