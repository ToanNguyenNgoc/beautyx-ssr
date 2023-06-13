import { Drawer } from "@mui/material";
import { EventLocation, FilterLocation, FilterPrice, FilterSort, FilterTagsSerPro } from "components/Filter";
import { EmptyRes, ProductableItem, XButton } from "components/Layout";
import { LoadGrid } from "components/LoadingSketion";
import icon from "constants/icon";
import { useDeviceMobile, useProductable } from "hooks";
import { Productable } from "interface";
import IStore from "interface/IStore";
import { paramsProductable } from "params-query";
import { ParamsProductable } from "params-query/param.interface";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { onChangeFilterServiceProductable } from "redux/filter-result";
import { clst } from "utils";
import style from './search-result.module.css'

function TabServiceProductable({ keyword }: { keyword: string }) {
    const IS_MB = useDeviceMobile()
    const dispatch = useDispatch()
    const [openFilter, setOpenFilter] = useState(false)
    const { SERVICE_PRODUCTABLE_PR } = useSelector((state: IStore) => state.FILTER_RESULT)
    const SERVICE_PARAM: ParamsProductable = {
        ...paramsProductable,
        'min_price': SERVICE_PRODUCTABLE_PR.min_price,
        'max_price': SERVICE_PRODUCTABLE_PR.max_price,
        'keyword': SERVICE_PRODUCTABLE_PR.keyword === '' ? keyword : SERVICE_PRODUCTABLE_PR.keyword,
        'discount_price': SERVICE_PRODUCTABLE_PR.discount_price,
        'location': SERVICE_PRODUCTABLE_PR.location,
        'sort': SERVICE_PRODUCTABLE_PR.sort
    }
    const { serviceData } = useProductable("1", SERVICE_PARAM, true)
    const onViewMore = () => {
        if (serviceData.productable?.length >= 15 && serviceData.productable.length < serviceData.totalItem) {
            serviceData.onLoadMore()
        }
    }
    const onChangeFilterLocation = (e: EventLocation) => {
        dispatch(onChangeFilterServiceProductable({
            ...SERVICE_PRODUCTABLE_PR,
            "location": e.coords,
            "province_code": e.province?.province_code ?? "cur",
            "district_code": e.district?.district_code ?? "cur",
            "sort": "location"
        }))
    }
    const onChangePrice = (e: any) => {
        dispatch(onChangeFilterServiceProductable({
            ...SERVICE_PRODUCTABLE_PR,
            min_price: e.min_price,
            max_price: e.max_price
        }))
    }
    const onChangeSort = (query: string) => {
        dispatch(onChangeFilterServiceProductable({
            ...SERVICE_PRODUCTABLE_PR,
            sort: query,
            discount_price: query === '-discount_percent' ? true : ''
        }))
    }
    const onChangeTag = (value: string) => {
        dispatch(onChangeFilterServiceProductable({
            ...SERVICE_PRODUCTABLE_PR,
            'keyword': value
        }))
    }

    return (
        <>
            <div className={style.filter_container}>
                <div className={style.filter_right}>
                    <FilterLocation
                        onChange={onChangeFilterLocation}
                        province_code={SERVICE_PRODUCTABLE_PR.province_code}
                        district_code={SERVICE_PRODUCTABLE_PR.district_code}
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
                                <Drawer open={openFilter} onClose={() => setOpenFilter(false)} anchor="bottom" >
                                    <div className={style.filter_cnt_mt}>
                                        <FilterTagsSerPro
                                            originKey={keyword}
                                            value={SERVICE_PRODUCTABLE_PR.keyword}
                                            type='SERVICE'
                                            onChange={onChangeTag}
                                        />
                                        <FilterSort
                                            type="SERVICE"
                                            onChange={onChangeSort}
                                            value={SERVICE_PRODUCTABLE_PR.sort}
                                        />
                                        <FilterPrice
                                            onChangePrice={onChangePrice}
                                            onCloseDrawer={() => setOpenFilter(false)}
                                            min_price={SERVICE_PRODUCTABLE_PR.min_price}
                                            max_price={SERVICE_PRODUCTABLE_PR.max_price}
                                        />
                                    </div>
                                </Drawer>
                            </>
                            :
                            <>
                                <FilterSort
                                    type="SERVICE"
                                    onChange={onChangeSort}
                                    value={SERVICE_PRODUCTABLE_PR.sort}
                                />
                                <FilterPrice
                                    onChangePrice={onChangePrice}
                                    min_price={SERVICE_PRODUCTABLE_PR.min_price}
                                    max_price={SERVICE_PRODUCTABLE_PR.max_price}
                                />
                            </>
                    }
                </div>
            </div>
            <div className={style.result_body}>
                {serviceData.totalItem === 0 && <EmptyRes title="Không có dịch vụ phù hợp !" />}
                <InfiniteScroll
                    dataLength={serviceData.productable.length}
                    hasMore={true}
                    loader={<></>}
                    next={onViewMore}
                >
                    <ul
                        className={clst([style.result_list, style.result_list_service])}
                    >
                        {
                            serviceData.productable.map((item: Productable) => (
                                <li key={item.id} className={style.result_list_item}>
                                    <ProductableItem productable={item} changeStyle={IS_MB} />
                                </li>
                            ))
                        }
                    </ul>
                    {serviceData.productable.length < serviceData.totalItem && <>
                        <>
                            <LoadGrid grid={IS_MB ? 1 : 5} item_count={10} />
                            <div className={style.load_bottom}>
                                <XButton title="" loading={true} />
                            </div>
                        </>
                    </>}
                </InfiniteScroll>
            </div>
        </>
    )
}
export default TabServiceProductable