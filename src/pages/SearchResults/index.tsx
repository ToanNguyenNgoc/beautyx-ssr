/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from "react";
import Head from "../../features/Head";
import HeadTitle from "../../features/HeadTitle";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import { Container, Tab } from "@mui/material";
import Footer from "../../features/Footer";
import icon from "../../constants/icon";
import { Drawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    onSetTabResult,
    fetchAsyncOrgsByFilter,
    fetchServicesByFilter,
    fetchProductsByFilter,
    onSetEmptyOrgs,
    onSetEmptyServices,
} from "../../redux/search/searchResultSlice";
import useFullScreen from "../../utils/useDeviceMobile";
import { BackTopButton, SerProItem } from "components/Layout";
import { onToggleSearchCnt } from "../../redux/search/searchSlice";
import Map from "../../components/Map";
import { STATUS } from "../../redux/status";
import FilterOrgs from "../../features/Filter/FilterOrgs";
import { extraParamsUrl } from "../../utils/extraParamsUrl";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import FilterService from "../../features/Filter/FilterService";
import { ISortList } from "../../features/Filter/FilterService";

import { useDeviceMobile } from 'utils'
import { useProducts, useServices } from 'features/Search/hook'
import { paramsServices, paramsProducts } from 'params-query'
import style from './search-result.module.css'
import { ICON } from "constants/icon2";
import { IServicePromo } from "interface";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadGrid } from "components/LoadingSketion";

function SearchResults(props: any) {
    const params = useParams();
    const paramsUrl: any = extraParamsUrl()
    const keyword = paramsUrl.keyword ?? ''
    const tab = params.tab ?? 'dich-vu'
    const links = [
        { link: "dich-vu", title: 'Dịch vụ', icon: ICON.servicePurple, act_icon: ICON.serviceWhite },
        { link: "san-pham", title: 'Sản phẩm', icon: ICON.barberPurple, act_icon: ICON.barberWhite },
        { link: "cua-hang", title: 'Dịch vụ', icon: ICON.orgPurple, act_icon: ICON.orgWhite },
    ]
    const onSwitchLick = (link: string) => {
        return {
            pathname: `/ket-qua-tim-kiem/${link}`,
            search: `keyword=${keyword}`
        }
    }
    //
    return (
        <>
            <Head />
            <Container>
                <div className={style.container}>
                    <div className={style.left_cnt}>
                        <ul className={style.list_link}>
                            {
                                links.map(link => (
                                    <li key={link.link} className={style.link_item_cnt}>
                                        <Link
                                            className={tab === link.link ? `${style.link_item} ${style.link_item_act}` : style.link_item}
                                            to={onSwitchLick(link.link)} >
                                            <div style={tab === link.link ? {
                                                backgroundColor: "var(--purple)"
                                            } : {}} className={style.link_item_icon}>
                                                <img src={tab === link.link ? link.act_icon : link.icon} alt="" />
                                            </div>
                                            <span className={style.link_item_text}>{link.title}</span>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={style.right_cnt}>
                        {tab === "dich-vu" && <TabService keyword={keyword} />}
                        {tab === "san-pham" && <TabProduct keyword={keyword} />}
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default SearchResults;

const TabService = ({ keyword }: { keyword: string }) => {
    const IS_MB = useDeviceMobile()
    const PARAMS_SERVICES = {
        ...paramsServices,
        "filter[keyword]": keyword
    }
    const { services, totalService, onLoadMoreService } = useServices(PARAMS_SERVICES, true)
    const onViewMore = () => {
        if (services.length >= 30 && services.length < totalService) {
            onLoadMoreService()
        }
    }
    return (
        <div className={style.result_body}>
            <InfiniteScroll
                dataLength={services.length}
                hasMore={true}
                loader={<></>}
                next={onViewMore}
            >
                <ul className={style.result_list}>
                    {
                        services.map((item: IServicePromo) => (
                            <li key={item.id} className={style.result_list_item}>
                                <SerProItem
                                    type="SERVICE"
                                    item={item}
                                />
                            </li>
                        ))
                    }
                </ul>
                {services.length < totalService && <LoadGrid grid={IS_MB ? 1 : 5} item_count={10} />}
            </InfiniteScroll>
        </div>
    )
}
const TabProduct = ({ keyword }: { keyword: string }) => {
    const IS_MB = useDeviceMobile()
    const PARAMS_PRODUCTS = {
        ...paramsProducts,
        "filter[keyword]": keyword
    }
    const { products, totalProduct, onLoadMoreProduct } = useProducts(PARAMS_PRODUCTS, true)
    const onViewMore = () => {
        if (products.length >= 30 && products.length < totalProduct) {
            onLoadMoreProduct()
        }
    }
    return (
        <div className={style.result_body}>
            <InfiniteScroll
                dataLength={products.length}
                hasMore={true}
                loader={<></>}
                next={onViewMore}
            >
                <ul className={style.result_list}>
                    {
                        products.map((item: IServicePromo) => (
                            <li key={item.id} className={style.result_list_item}>
                                <SerProItem
                                    type="SERVICE"
                                    item={item}
                                />
                            </li>
                        ))
                    }
                </ul>
                {products.length < totalProduct && <LoadGrid grid={IS_MB ? 1 : 5} item_count={10} />}
            </InfiniteScroll>
        </div>
    )
}



// let tabs = [
//     {
//         value: "1",
//         title: t("Mer_de.services"),
//         total: location.state?.servicesTotal,
//     },
//     {
//         value: "2",
//         title: t("Mer_de.products"),
//         total: location.state?.productsTotal,
//     },
//     {
//         value: "3",
//         title: t("my_ser.business"),
//         total: location.state?.orgsTotal,
//     },
// ];