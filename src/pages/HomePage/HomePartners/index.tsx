import img from "constants/img";
import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";

export default function HomePartners() {
    return (
        <div className={style.home_partners}>
            <div className={style.home_partner}>
                <div className={style.home_partner_left}>
                    <span>Trở thành</span>
                    <p>Đối Tác BeautyX</p>
                    <Link
                        to={{
                            pathname: "/partner",
                        }}
                        className={style.home_partnert_btn}
                    >
                        <span>ĐĂNG KÝ NGAY</span>
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
                    <span>Khám phá</span>
                    <p>Blog BeautyX</p>
                </div>
                <div className={style.home_partner_right}>
                    <img src={img.home_blog} alt="" />
                </div>
            </div>
        </div>
    );
}
