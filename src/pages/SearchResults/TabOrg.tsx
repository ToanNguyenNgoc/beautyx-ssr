/* eslint-disable react-hooks/exhaustive-deps */
import { EventLocation, FilterLocation, FilterPrice, FilterSort, FilterTags } from 'components/Filter';
import { useOrgs } from 'features/Search/hook';
import { useDeviceMobile } from 'hooks';
import IStore from 'interface/IStore';
import { paramOrgs } from 'params-query';
import { ParamOrg } from 'params-query/param.interface';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clst, extraParamsUrl } from 'utils';
import { onChangeFilterOrg } from 'redux/filter-result';
import { EmptyRes, OrgItemSec, XButton } from 'components/Layout';
import icon from 'constants/icon';
import { Drawer } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IOrganization } from 'interface';
import { LoadGrid } from 'components/LoadingSketion';
import style from './search-result.module.css'
import { useHistory } from 'react-router-dom';

function TabOrg({ keyword }: { keyword: string }) {
    const history = useHistory()
    const params: any = extraParamsUrl()
    const [openFilter, setOpenFilter] = useState(false)
    const { tags } = useSelector((state: any) => state.HOME)
    const resultTag = handlePassTagKeyword(keyword, tags)
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
    useEffect(() => {
        dispatch(onChangeFilterOrg({
            ...ORG_PR,
            "filter[tags]": resultTag[0]?.name ?? ORG_PR["filter[tags]"],
            "filter[province_code]": params?.province
        }))
    }, [])
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
        if (IS_MB) setOpenFilter(false)
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
                        showApplyBtn={IS_MB}
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
                    {orgs.length < totalOrg && <>
                        <LoadGrid grid={IS_MB ? 1 : 5} item_count={10} />
                        <div className={style.load_bottom}>
                            <XButton title="" loading={true} />
                        </div>
                    </>}
                </InfiniteScroll>
            </div>
            <div className={style.bottom}>
                <XButton
                    icon={icon.pinMapGreen}
                    title='Bản đồ'
                    className={style.bottom_btn}
                    onClick={() => history.push({
                        pathname: '/ban-do'
                    })}
                />
            </div>
        </>
    );
}

export default TabOrg;
const handlePassTagKeyword = (keyword: string, list: any[]) => {
    let result = []
    if (!keyword || keyword === "") return result = []
    result = list?.filter((item: { [x: string]: { toString: () => string; }; }) => {
        return Object.keys(item).some(key =>
            item[key]?.toString().toLowerCase().includes(keyword.toString().toLowerCase())
        )
    })
    return result
}