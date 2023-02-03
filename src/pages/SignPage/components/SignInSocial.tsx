import React from 'react';
import { social } from 'constants/img';
import style from '../sign-page.module.css'
import { XButton } from 'components/Layout';

function SignInSocial() {
    return (
        <div className={style.social}>
            <p className={style.social_title}>
                hoặc đăng nhập với
            </p>
            <div className={style.social_list_btn}>
                <XButton
                    icon={social.zalo}
                    iconSize={42}
                />
                <XButton
                    icon={social.facebook}
                    iconSize={42}
                />
            </div>
        </div>
    );
}

export default SignInSocial;