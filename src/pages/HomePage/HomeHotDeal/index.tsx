import React, { useContext } from "react";
import { AppContext } from "../../../context/AppProvider";
import HomeTitle from "../Components/HomeTitle";
import HomePromo from "../HomePromo";
import "./homeHotDeal.css";
export default function HomeHotDeal() {
    const { t } = useContext(AppContext)
    return (
        <div className="home-hot__deal">
            <HomeTitle
                title={t("home_2.top_deal")}
                url={`/deal-lam-dep-cuc-HOT`}
                seemore={t("trending.watch_all") + " > "}
            />
            <HomePromo />
        </div>
    );
}
