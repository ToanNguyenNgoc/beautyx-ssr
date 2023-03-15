import img from "constants/img";
import { AppContext } from "context/AppProvider";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";

export default function HomePartners() {
    const {t} = useContext(AppContext) as any
    return (
        <div className={style.home_partners}>
            <div className={style.home_partner}>
                <div className={style.home_partner_left}>
                    <span>{t('Home.become')}</span>
                    <p>{t('Home.a_beautyX_partner')}</p>
                    <Link
                        to={{
                            pathname: "/partner",
                        }}
                        className={style.home_partnert_btn}
                    >
                        <span>{t('Home.Sign_up_now')}</span>
                    </Link>
                </div>
                <div className={style.home_partner_right}>
                    <img src={img.home_partners} alt="" />
                </div>
            </div>
            <div
                onClick={() => window.open("https://beautyx.vn/blog", "_blank")}
                className={style.home_blog}
            >
                <div className={style.home_partner_left}>
                    <span>{t('Home.discover')}</span>
                    <p>Blog BeautyX</p>
                </div>
                <div className={style.home_partner_right}>
                    <img src={img.home_blog} alt="" />
                </div>
            </div>
        </div>
    );
}
