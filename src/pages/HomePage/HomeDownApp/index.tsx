import React from 'react';
import thumbApp from 'assets/image/thumbApp.png'
import style from './style.module.css'
import { XButton } from 'components/Layout';
import img from 'constants/img';

function HomeDownApp() {
    return (
        <div className={style.container} >
            <img src={thumbApp} alt="" className={style.img_thumb} />
            <div className={style.content}>
                <div className={style.content_top}>
                    Tải app <span>Giảm 5%</span><br /> cho đơn hàng<br /> đầu tiên.
                </div>
                <span className={style.content_desc}>
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor lorem ipsum dolor */}
                </span>
                <div className={style.content_button}>
                    <XButton
                        onClick={() =>
                            window.open(
                                'https://play.google.com/store/apps/details?id=com.myspa.beautyx',
                                "_blank",
                                "noopener,noreferrer"
                            )
                        }
                        className={style.content_button_icon}
                        icon={img.playStore}
                    />
                    <XButton
                        onClick={() =>
                            window.open(
                                'https://apps.apple.com/vn/app/beautyx/id1614767784?l=vi',
                                "_blank",
                                "noopener,noreferrer"
                            )
                        }
                        className={style.content_button_icon}
                        icon={img.appStore}
                    />
                </div>
            </div>
        </div>
    );
}

export default HomeDownApp;