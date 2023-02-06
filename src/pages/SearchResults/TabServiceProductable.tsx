import { EventLocation, FilterLocation, FilterPrice } from "components/Filter";
import { EmptyRes, ProductableItem, XButton } from "components/Layout";
import { LoadGrid } from "components/LoadingSketion";
import { useProductableService } from "features/Search/hook";
import { useDeviceMobile } from "hooks";
import { Productable } from "interface";
import IStore from "interface/IStore";
import { paramsProductable } from "params-query";
import { ParamsProductable } from "params-query/param.interface";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { onChangeFilterServiceProductable } from "redux/filter-result";
import { clst } from "utils";
import style from './search-result.module.css'

function TabServiceProductable({ keyword }: { keyword: string }) {
    const IS_MB = useDeviceMobile()
    const dispatch = useDispatch()
    const { SERVICE_PRODUCTABLE_PR } = useSelector((state: IStore) => state.FILTER_RESULT)
    console.log(SERVICE_PRODUCTABLE_PR)
    const SERVICE_PARAM: ParamsProductable = {
        ...paramsProductable,
        'min_price': SERVICE_PRODUCTABLE_PR.min_price,
        'max_price': SERVICE_PRODUCTABLE_PR.max_price,
        'keyword': keyword,
        'location': SERVICE_PRODUCTABLE_PR.location,
        'sort': SERVICE_PRODUCTABLE_PR.location !== '' ? 'distance' : ''
    }
    const { services, totalService, onLoadMoreService } = useProductableService(
        SERVICE_PARAM,
        true
    )
    const onViewMore = () => {
        if (services.length >= 15 && services.length < totalService) {
            onLoadMoreService()
        }
    }
    const onChangeFilterLocation = (e: EventLocation) => {
        dispatch(onChangeFilterServiceProductable({
            ...SERVICE_PRODUCTABLE_PR,
            "location": e.coords,
            "province_code": e.province?.province_code ?? "cur",
            "district_code": e.district?.district_code ?? "cur"
        }))
    }
    const onChangePrice = (e: any) => {
        dispatch(onChangeFilterServiceProductable({
            ...SERVICE_PRODUCTABLE_PR,
            min_price: e.min_price,
            max_price: e.max_price
        }))
    }
    return (
        <>
            <div className={style.filter_container}>
                {/* <FilterTagsSerPro type='SERVICE' value={keyword} /> */}
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
                                {/* <XButton
                                    icon={icon.settingsSliders}
                                    title="Bộ lọc"
                                    className={style.filter_btn}
                                    onClick={() => setOpenFilter(true)}
                                />
                                <Drawer open={openFilter} onClose={() => setOpenFilter(false)} anchor="bottom" >
                                    <div className={style.filter_cnt_mt}>
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
                                    </div>
                                </Drawer> */}
                            </>
                            :
                            <>
                                {/* <FilterSort
                                    type="SERVICE"
                                    onChange={onChangeSort}
                                    value={SERVICE_PR.sort}
                                /> */}
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
                {totalService === 0 && <EmptyRes title="Không có dịch vụ phù hợp !" />}
                <InfiniteScroll
                    dataLength={services.length}
                    hasMore={true}
                    loader={<></>}
                    next={onViewMore}
                >
                    <ul
                        className={clst([style.result_list, style.result_list_service])}
                    >
                        {
                            services.map((item: Productable) => (
                                <li key={item.id} className={style.result_list_item}>
                                    <ProductableItem productable={item} changeStyle={IS_MB} />
                                </li>
                            ))
                        }
                    </ul>
                    {services.length < totalService && <>
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