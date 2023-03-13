import React from "react";
import { useHistory } from "react-router-dom";
import spaLocation from 'assets/image/spaLocation.png'
import style from './home-location.module.css'
import { XButton } from "components/Layout";

export default function HomeLocation() {
    const history = useHistory();
    function gotoMap() {
        history.push("/ban-do");
    }
    return (
        <div className={style.container}>
            <XButton
                icon={spaLocation}
                iconSize={40}
                className={style.navigate_map_btn}
                onClick={gotoMap}
            />
        </div>
    );
}
