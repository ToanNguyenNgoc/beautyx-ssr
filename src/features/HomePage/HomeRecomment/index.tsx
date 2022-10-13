import React, { useContext } from "react";
import HomeTitle from "../Components/HomeTitle";
import "./homeRecomment.css";
import { useSelector } from "react-redux";
import { useSwrInfinite } from "utils";
import IStore from "interface/IStore";
import { paramsServices } from "params-query";
import { AppContext } from "context/AppProvider";
import { IServicePromo } from "interface/servicePromo";
import { AUTH_LOCATION } from "api/authLocation";
import { SerProItem } from "components/Layout";

export default function HomeRecomment() {
    const { t } = useContext(AppContext);
    const { services } = useSelector((state: IStore) => state.ORDER).ORDER_SERVICES
    let service
    if (services[0]) {
        service = services[0]?.items[0]?.services_sold?.services[0]
    }
    const paramsKeyword = {
        ...paramsServices,
        "filter[keyword]": service?.service_name,
        "limit": 6
    }
    const services_keyword = useSwrInfinite(true, "/services", paramsKeyword).resData
    const LOCATION = AUTH_LOCATION()

    const params = {
        ...paramsServices,
        "limit": 6,
        "filter[location]": LOCATION,
    }
    const { resData } = useSwrInfinite(true, "/services", params)
    const services_recommend = services_keyword.concat(resData)


    return (
        <div className="home-recomment">
            <HomeTitle title={t("home_2.suggestions_for_you")} />
            <div className="home-recomment_cnt">
                <ul className="home-recomment__list">
                    {services_recommend.filter((e: any) => e.org_id !== 164).map((item: IServicePromo, index: number) => (
                        <li className="home-recomment__item" key={index}>
                            <SerProItem item={item} type="SERVICE" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
