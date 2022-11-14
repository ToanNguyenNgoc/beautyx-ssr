import icon from "constants/icon";
import React from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";

export default function HomeLocation() {
    const history = useHistory();
    function gotoMap() {
        history.push("/ban-do");
    }
    return (
        <div onClick={() => gotoMap()} className={style.home_location}>
            <div className={style.home_location_img}>
                <img src={icon.mapPinRed} alt="" />
            </div>
            <p>Chia sẻ ngay</p>
            <p>
                nhận deal hot
                <br />
                gần bạn
            </p>
        </div>
    );
}
