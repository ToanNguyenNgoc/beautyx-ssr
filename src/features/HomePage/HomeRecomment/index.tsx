/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { IServicePromo } from "../../../interface/servicePromo";
import ServicePromoItem from "../../ViewItemCommon/ServicePromoItem";
import HomeTitle from "../Components/HomeTitle";
import "./homeRecomment.css";
import { AppContext } from "../../../context/AppProvider";
import { AUTH_LOCATION } from "../../../api/authLocation";
import { paramsServices } from "../../../params-query";
import useSwrInfinite from "../../../utils/useSwrInfinite";

export default function HomeRecomment() {
    const { t } = useContext(AppContext);
    const LOCATION = AUTH_LOCATION()

    const params = {
        ...paramsServices,
        "limit": 12,
        "filter[location]": LOCATION,
    }
    const { resData } = useSwrInfinite(true, "/services", params)


    return (
        <div className="home-recomment">
            <HomeTitle title={t("home_2.suggestions_for_you")} />
            <ul className="home-recomment__list">
                {resData.filter(e=>e.org_id !== 164).map((item: IServicePromo, index: number) => (
                    <li className="home-recomment__item" key={index}>
                        <ServicePromoItem service={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
