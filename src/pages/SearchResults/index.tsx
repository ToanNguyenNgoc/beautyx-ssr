/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clst, extraParamsUrl, useDeviceMobile } from 'utils'
import { useOrgs, useProducts, useServices } from 'features/Search/hook'
import { paramsServices, paramsProducts, paramOrgs } from 'params-query'
import { ICON } from "constants/icon2";
import { IOrganization, IServicePromo } from "interface";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadGrid } from "components/LoadingSketion";
import { ParamOrg, ParamProduct, ParamService } from "params-query/param.interface";
import { FilterLocation, FilterPrice, FilterSort, FilterTags } from "components/Filter";
import { EventLocation } from "components/Filter";
import IStore from "interface/IStore";
import {
    onChangeFilterOrg,
    onChangeFilterService,
    onResetFilter,
    onSaveKeyword,
    onChangeFilterProduct
} from "redux/filter-result";
import Head from "features/Head";
import { Container, Drawer } from "@mui/material";
import Footer from "features/Footer";
import { EmptyRes, OrgItemSec, SerProItem, XButton } from "components/Layout";
import { AppContext } from "context/AppProvider";
import icon from "constants/icon";
import style from './search-result.module.css'

function SearchResults() {
    const { t } = useContext(AppContext)
    const dispatch = useDispatch()
    const { keyword_re } = useSelector((state: IStore) => state.FILTER_RESULT)
    const params = useParams();
    const paramsUrl: any = extraParamsUrl()
    const keyword = paramsUrl.keyword ?? ''
    const tab = params.tab ?? 'dich-vu'
    const links = [
        { link: "dich-vu", title: t('Mer_de.services'), icon: ICON.servicePurple, act_icon: ICON.serviceWhite },
        { link: "san-pham", title: t('Mer_de.products'), icon: ICON.barberPurple, act_icon: ICON.barberWhite },
        { link: "cua-hang", title: t('my_ser.business'), icon: ICON.orgPurple, act_icon: ICON.orgWhite },
    ]
    const onSwitchLick = (link: string) => {
        return {
            pathname: `/ket-qua-tim-kiem/${link}`,
            search: `keyword=${keyword}`
        }
    }
    useEffect(() => {
        dispatch(onSaveKeyword(keyword))
        if (keyword !== keyword_re) dispatch(onResetFilter())
    }, [keyword])
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
                                            replace={true}
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
                        {tab === "cua-hang" && <TabOrg keyword={keyword} />}
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
    const dispatch = useDispatch()
    const [openFilter, setOpenFilter] = useState(false);
    const { SERVICE_PR } = useSelector((state: IStore) => state.FILTER_RESULT)
    const PARAMS_SERVICES: ParamService = {
        ...paramsServices,
        "filter[keyword]": keyword,
        "filter[location]": SERVICE_PR["filter[location]"],
        "filter[min_price]": SERVICE_PR["filter[min_price]"],
        "filter[max_price]": SERVICE_PR["filter[max_price]"],
        "sort": SERVICE_PR.sort
    }
    const { services, totalService, onLoadMoreService } = useServices(PARAMS_SERVICES, true)
    const onViewMore = () => {
        if (services.length >= 30 && services.length < totalService) {
            onLoadMoreService()
        }
    }
    const onChangeFilterLocation = (e: EventLocation) => {
        dispatch(onChangeFilterService({
            ...SERVICE_PR,
            "filter[location]": e.coords,
            "filter[province_code]": e.province?.province_code ?? "cur",
            "filter[district_code]": e.district?.district_code ?? "cur"
        }))
    }
    const onChangePrice = (e: any) => {
        dispatch(onChangeFilterService({
            ...PARAMS_SERVICES,
            "filter[min_price]": e.min_price,
            "filter[max_price]": e.max_price
        }))
    }
    const onChangeSort = (query: string) => {
        dispatch(onChangeFilterService({
            ...PARAMS_SERVICES,
            "sort": query
        }))
    }
    return (
        <>
            <div className={style.filter_container}>
                <div className={style.filter_right}>
                    <FilterLocation
                        onChange={onChangeFilterLocation}
                        province_code={SERVICE_PR["filter[province_code]"]}
                        district_code={SERVICE_PR["filter[district_code]"]}
                    />
                </div>
                <div className={style.filter_left}>
                    {
                        IS_MB ?
                            <>
                                <XButton
                                    icon={icon.settingsSliders}
                                    title="Bộ lọc"
                                    className={style.filter_btn}
                                    onClick={() => setOpenFilter(true)}
                                />
                                <Drawer open={openFilter} onClose={() => setOpenFilter(false)} anchor="bottom" >
                                    <div className={style.filter_cnt_mt}>
                                        <FilterSort
                                            type="SERVICE"
                                        />
                                        <FilterPrice
                                            onChangePrice={onChangePrice}
                                            min_price={SERVICE_PR["filter[min_price]"]}
                                            max_price={SERVICE_PR["filter[max_price]"]}
                                        />
                                    </div>
                                </Drawer>
                            </>
                            :
                            <>
                                <FilterSort
                                    type="SERVICE"
                                    onChange={onChangeSort}
                                    value={SERVICE_PR.sort}
                                />
                                <FilterPrice
                                    onChangePrice={onChangePrice}
                                    min_price={SERVICE_PR["filter[min_price]"]}
                                    max_price={SERVICE_PR["filter[max_price]"]}
                                />
                            </>
                    }
                </div>
            </div>
            <div className={style.result_body}>
                {totalService === 0 && <EmptyRes title="Không có dịch vụ phù hợp !" />}
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
                    {services.length < totalService && <LoadGrid grid={IS_MB ? 2 : 5} item_count={10} />}
                </InfiniteScroll>
            </div>
        </>
    )
}
const TabProduct = ({ keyword }: { keyword: string }) => {
    const IS_MB = useDeviceMobile()
    const dispatch = useDispatch()
    const [openFilter, setOpenFilter] = useState(false);
    const { PRODUCT_PR } = useSelector((state: IStore) => state.FILTER_RESULT)
    const PARAMS_PRODUCTS: ParamProduct = {
        ...paramsProducts,
        "filter[keyword]": keyword,
        "filter[location]": PRODUCT_PR["filter[location]"],
        "filter[min_price]": PRODUCT_PR["filter[min_price]"],
        "filter[max_price]": PRODUCT_PR["filter[max_price]"],
        "sort": PRODUCT_PR.sort
    }
    const onChangeFilterLocation = (e: EventLocation) => {
        dispatch(onChangeFilterProduct({
            ...PRODUCT_PR,
            "filter[location]": e.coords,
            "filter[province_code]": e.province?.province_code ?? "cur",
            "filter[district_code]": e.district?.district_code ?? "cur"
        }))
    }
    const onChangePrice = (e: any) => {
        dispatch(onChangeFilterProduct({
            ...PARAMS_PRODUCTS,
            "filter[min_price]": e.min_price,
            "filter[max_price]": e.max_price
        }))
    }
    const onChangeSort = (query: string) => {
        dispatch(onChangeFilterProduct({
            ...PARAMS_PRODUCTS,
            "sort": query
        }))
    }
    const { products, totalProduct, onLoadMoreProduct } = useProducts(PARAMS_PRODUCTS, true)
    const onViewMore = () => {
        if (products.length >= 30 && products.length < totalProduct) {
            onLoadMoreProduct()
        }
    }
    return (
        <>
            <div className={style.filter_container}>
                <div className={style.filter_right}>
                    <FilterLocation
                        title="Nơi bán"
                        onChange={onChangeFilterLocation}
                        province_code={PRODUCT_PR["filter[province_code]"]}
                        district_code={PRODUCT_PR["filter[district_code]"]}
                    />
                </div>
                <div className={style.filter_left}>
                    {
                        IS_MB ?
                            <>
                                <XButton
                                    icon={icon.settingsSliders}
                                    title="Bộ lọc"
                                    className={style.filter_btn}
                                    onClick={() => setOpenFilter(true)}
                                />
                                <Drawer open={openFilter} onClose={() => setOpenFilter(false)} anchor="bottom" >
                                    <div className={style.filter_cnt_mt}>
                                        <FilterSort
                                            type="PRODUCT"
                                        />
                                        <FilterPrice
                                            onChangePrice={onChangePrice}
                                            min_price={PRODUCT_PR["filter[min_price]"]}
                                            max_price={PRODUCT_PR["filter[max_price]"]}
                                        />
                                    </div>
                                </Drawer>
                            </>
                            :
                            <>
                                <FilterSort
                                    type="PRODUCT"
                                    onChange={onChangeSort}
                                    value={PRODUCT_PR.sort}
                                />
                                <FilterPrice
                                    onChangePrice={onChangePrice}
                                    min_price={PRODUCT_PR["filter[min_price]"]}
                                    max_price={PRODUCT_PR["filter[max_price]"]}
                                />
                            </>
                    }
                </div>
            </div>
            <div className={style.result_body}>
                {totalProduct === 0 && <EmptyRes title="Không có sản phẩm phù hợp !" />}
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
                                        type="PRODUCT"
                                        item={item}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                    {products.length < totalProduct && <LoadGrid grid={IS_MB ? 2 : 5} item_count={10} />}
                </InfiniteScroll>
            </div>
        </>
    )
}
const TabOrg = ({ keyword }: { keyword: string }) => {
    const [openFilter, setOpenFilter] = useState(false)
    const { tags } = useSelector((state: any) => state.HOME)
    const resultTag = handlePassTagKeyword(keyword, tags)
    useEffect(() => {
        dispatch(onChangeFilterOrg({
            ...ORG_PR,
            "filter[tags]": resultTag[0]?.name
        }))
    }, [])
    const IS_MB = useDeviceMobile()
    const dispatch = useDispatch()
    const { ORG_PR } = useSelector((state: IStore) => state.FILTER_RESULT)
    const PRAMS_ORG: ParamOrg = {
        ...paramOrgs,
        ...ORG_PR,
        "filter[province_code]": ORG_PR["filter[province_code]"] === "cur" ? "" : ORG_PR["filter[province_code]"],
        "filter[district_code]": ORG_PR["filter[district_code]"] === "cur" ? "" : ORG_PR["filter[district_code]"],
        "filter[keyword]": resultTag[0] ? "" : keyword
    }
    const { orgs, totalOrg, onLoadMoreOrg } = useOrgs(PRAMS_ORG, true)
    const onViewMore = () => {
        if (orgs.length >= 15 && orgs.length < totalOrg) {
            onLoadMoreOrg()
        }
    }
    const onFilterLocation = (e: EventLocation) => {
        dispatch(onChangeFilterOrg({
            ...ORG_PR,
            "filter[location]": e.coords,
            "filter[province_code]": e.province?.province_code ?? "cur",
            "filter[district_code]": e.district?.district_code ?? "cur"
        }))
    }
    const onChangePrice = (e: any) => {
        dispatch(onChangeFilterOrg({
            ...ORG_PR,
            "filter[min_price]": e.min_price,
            "filter[max_price]": e.max_price
        }))
    }
    const onChangeTag = (e: string) => {
        dispatch(onChangeFilterOrg({
            ...ORG_PR,
            "filter[tags]": e
        }))
    }
    const onChangeSort = (query: string) => {
        dispatch(onChangeFilterOrg({
            ...ORG_PR,
            "sort": query
        }))
    }
    return (
        <>
            <div className={style.filter_container}>
                <div className={style.filter_right}>
                    <FilterLocation
                        onChange={onFilterLocation}
                        province_code={ORG_PR["filter[province_code]"]}
                        district_code={ORG_PR["filter[district_code]"]}
                    />
                </div>
                <div className={style.filter_left}>
                    {
                        IS_MB ?
                            <>
                                <XButton
                                    icon={icon.settingsSliders}
                                    title="Bộ lọc"
                                    className={style.filter_btn}
                                    onClick={() => setOpenFilter(true)}
                                />
                                <Drawer
                                    open={openFilter} onClose={() => setOpenFilter(false)} anchor="bottom"
                                >
                                    <div className={style.filter_cnt_mt}>
                                        <FilterTags
                                            onChange={onChangeTag}
                                            value={ORG_PR["filter[tags]"] ?? ""}
                                        />
                                        <FilterSort
                                            type="ORG"
                                            onChange={onChangeSort}
                                            value={ORG_PR.sort}
                                        />
                                        <FilterPrice
                                            onChangePrice={onChangePrice}
                                            min_price={ORG_PR["filter[min_price]"]}
                                            max_price={ORG_PR["filter[max_price]"]}
                                        />
                                    </div>
                                </Drawer>
                            </>
                            :
                            <>
                                <FilterTags
                                    onChange={onChangeTag}
                                    value={ORG_PR["filter[tags]"] ?? ""}
                                />
                                <FilterSort
                                    type="ORG"
                                    onChange={onChangeSort}
                                    value={ORG_PR.sort}
                                />
                                <FilterPrice
                                    onChangePrice={onChangePrice}
                                    min_price={ORG_PR["filter[min_price]"]}
                                    max_price={ORG_PR["filter[max_price]"]}
                                />
                            </>
                    }
                </div>
            </div>
            <div className={style.result_body}>
                {totalOrg === 0 && <EmptyRes title="Không có doanh nghiệp phù hợp !" />}
                <InfiniteScroll
                    dataLength={orgs.length}
                    hasMore={true}
                    loader={<></>}
                    next={onViewMore}
                >
                    <ul className={clst([style.result_list, style.result_list_org])}>
                        {
                            orgs.map((item: IOrganization) => (
                                <li key={item.id} className={clst([style.result_list_item, style.result_list_item_org])}>
                                    <OrgItemSec changeStyle={IS_MB} org={item} />
                                </li>
                            ))
                        }
                    </ul>
                    {orgs.length < totalOrg && <LoadGrid grid={IS_MB ? 1 : 5} item_count={10} />}
                </InfiniteScroll>
            </div>
        </>
    )
}
const handlePassTagKeyword = (keyword: string, list: any[]) => {
    // console.log(list, keyword)
    const result = list?.filter((item: { [x: string]: { toString: () => string; }; }) => {
        return Object.keys(item).some(key =>
            item[key]?.toString().toLowerCase().includes(keyword.toString().toLowerCase())
        )
    })
    return result
}