import { social } from 'constants/img';
import style from '../sign-page.module.css'
import { XButton } from 'components/Layout';

function SignInSocial() {
    const handleLoginZalo = () => {
        window.location.assign(
            `https://oauth.zaloapp.com/v4/permission?app_id=${process.env.REACT_APP_ZALO_APP_ID}&redirect_uri=https://beautyx-spa.web.app/auth/zalo&state=9434933241`,
        )
    }
    return (
        <div className={style.social}>
            <p className={style.social_title}>
                hoặc đăng nhập với
            </p>
            <div className={style.social_list_btn}>
                <XButton
                    icon={social.zalo}
                    iconSize={42}
                    onClick={handleLoginZalo}
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