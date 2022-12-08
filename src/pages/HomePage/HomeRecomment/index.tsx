import React, { useContext, useState } from "react";
import HomeTitle from "../Components/HomeTitle";
import { paramsServices } from "params-query";
import { AppContext } from "context/AppProvider";
import { IServicePromo, SerProCommonWatched } from "interface/servicePromo";
import { AUTH_LOCATION } from "api/authLocation";
import { SerProItem, XButton } from "components/Layout";
import { useServicesGroup } from 'features/Search/hook';
import style from './recommend.module.css'
import { useFetchInfinite } from "hooks";
import API_3RD from "api/3rd-api";
import { useSelector } from "react-redux";
import IStore from "interface/IStore";
import { CardItemCommon } from "../HomeWatched";


export default function HomeRecomment() {
    const { t } = useContext(AppContext)
    const { USER } = useSelector((state: IStore) => state.USER)
    const tabs = [
        { id: 1, title: 'Tất cả', element: <TabReCommend />, show: true },
        { id: 2, title: 'Đã xem', element: <TabHistory />, show: USER }
    ]
    const [tab, setTab] = useState(tabs[0])

    return (
        <div className={style.container}>
            <HomeTitle title={t("home_2.suggestions_for_you")} />
            <div className={style.tab}>
                <ul className={style.tab_list}>
                    {
                        tabs.filter(i => i.show).map(i => (
                            <li
                                style={i.id === tab.id ? { border: 'solid 1px var(--text-black)' } : {}}
                                key={i.id} className={style.tab_list_item}
                                onClick={() => setTab(i)}
                            >
                                {i.title}
                            </li>
                        ))
                    }
                </ul>
            </div>
            {tab.element}
        </div>
    );
}
const TabReCommend = () => {
    const { orderService } = useContext(AppContext)
    let service
    if (orderService[0]) {
        service = orderService[0]?.items[0]?.services_sold?.services[0]
    }
    const LOCATION = AUTH_LOCATION()

    const params = {
        ...paramsServices,
        "filter[keyword]": service ? service?.service_name : 'Gội đầu',
        "limit": 30,
        "filter[location]": LOCATION,
    }
    const { servicesGroupByOrg, onLoadMoreService, isLoadSer } = useServicesGroup(params, true)
    return (
        <div className={style.tab_container}>
            <ul className={style.list_recommend}>
                {
                    servicesGroupByOrg?.map((itemGroup: any, index: number) => (
                        <div key={index} >
                            {
                                itemGroup?.services?.slice(0, 1)?.map((service: IServicePromo) => (
                                    <li key={service.service_id} className={style.list_recommend_item}>
                                        <SerProItem item={service} type="SERVICE" />
                                    </li>
                                ))
                            }
                        </div>
                    ))
                }
            </ul>
            {
                servicesGroupByOrg?.length < 100 &&
                <div className={style.tab_bottom}>
                    <XButton
                        className={style.tab_bottom_btn}
                        title="Xem thêm"
                        onClick={onLoadMoreService}
                        loading={isLoadSer}
                    />
                </div>
            }
        </div>
    )
}

const TabHistory = () => {
    const { USER } = useSelector((state: IStore) => state.USER)
    const { resData, totalItem, onLoadMore, isValidating } = useFetchInfinite(
        USER,
        `${API_3RD.API_NODE}/history`,
        { 'limit': '10' }
    )
    return (
        <div className={style.tab_container}>
            <ul className={style.list_recommend}>
                {
                    resData?.map((service: SerProCommonWatched, index: number) => (
                        <div key={index} >
                            {
                                <li key={service._id} className={style.list_recommend_item}>
                                    <CardItemCommon detail={service} />
                                </li>
                            }
                        </div>
                    ))
                }
            </ul>
            {
                resData?.length < totalItem &&
                <div className={style.tab_bottom}>
                    <XButton
                        className={style.tab_bottom_btn}
                        title="Xem thêm"
                        onClick={onLoadMore}
                        loading={isValidating}
                    />
                </div>
            }
        </div>
    )
}
