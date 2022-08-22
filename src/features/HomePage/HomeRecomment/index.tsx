/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { IServicePromo } from "../../../interface/servicePromo";
import ServicePromoItem from "../../ViewItemCommon/ServicePromoItem";
import HomeTitle from "../Components/HomeTitle";
import "./homeRecomment.css";
import { fetchAsyncServicesRandom } from '../../../redux/home/homePageSlice'
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from '../../../redux/status'
import { AppContext } from "../../../context/AppProvider";
import servicePromoApi from "../../../api/servicePromoApi";

export default function HomeRecomment() {
    const { t } = useContext(AppContext);
    const dispatch = useDispatch();
    const [servicesByRecentSearch, setServicesByRecentSearch] = useState([])
    const { HISTORY } = useSelector((state: any) => state.SEARCH);
    const { SERVICES_RANDOM } = useSelector((state: any) => state.HOME_PAGE);
    const filterKeyWord = HISTORY.filter(
        (item: any) => item.TYPE === "KEYWORD"
    ).map((i: any) => i.item);
    const { services, status } = SERVICES_RANDOM;
    const { ORDER_SERVICES } = useSelector((state: any) => state.ORDER);
    const service_recent_order = ORDER_SERVICES.services[0]?.items[0]?.services_sold?.services[0]?.service_name;
    const callServicesRecentOrder = () => {
        if (status !== STATUS.SUCCESS && ORDER_SERVICES.status === STATUS.SUCCESS) {
            dispatch(fetchAsyncServicesRandom({
                keyword: service_recent_order,
                page: 1,
                sort: "distance"
            }))
        }
    }
    const callServicesRecentSearch = async () => {
        try {
            const res = await servicePromoApi.getServicesPromo({
                page: 1,
                keyword: filterKeyWord[0],
                sort: "distance"
            })
            setServicesByRecentSearch(res.data.data.hits)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        callServicesRecentOrder()
        if (filterKeyWord[0]) {
            callServicesRecentSearch()
        }
    }, [ORDER_SERVICES.status]);

    return (
        <div className="home-recomment">
            {
                (servicesByRecentSearch.length > 0 || services.length > 0) &&
                <>
                    <HomeTitle title={t("home_2.suggestions_for_you")} />
                    <ul className="home-recomment__list">
                        {servicesByRecentSearch.slice(0, 12).map((item: IServicePromo, index: number) => (
                            <li className="home-recomment__item" key={index}>
                                <ServicePromoItem service={item} />
                            </li>
                        ))}
                    </ul>
                    <ul className="home-recomment__list">
                        {services.slice(0, 12).map((item: IServicePromo, index: number) => (
                            <li className="home-recomment__item" key={index}>
                                <ServicePromoItem service={item} />
                            </li>
                        ))}
                    </ul>
                </>
            }
        </div>
    );
}
