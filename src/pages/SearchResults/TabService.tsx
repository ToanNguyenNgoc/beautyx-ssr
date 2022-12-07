import { Drawer } from '@mui/material';
import { EventLocation, FilterLocation, FilterPrice, FilterSort } from 'components/Filter';
import { EmptyRes, SerProItem, XButton } from 'components/Layout';
import { LoadGrid } from 'components/LoadingSketion';
import icon from 'constants/icon';
import { useServices } from 'features/Search/hook';
import { useDeviceMobile } from 'hooks';
import { IServicePromo } from 'interface';
import IStore from 'interface/IStore';
import { paramsServices } from 'params-query';
import { ParamService } from 'params-query/param.interface';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeFilterService } from 'redux/filter-result';
import style from './search-result.module.css'

function TabService({ keyword }: { keyword: string }) {
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
        if (IS_MB) setOpenFilter(false)
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
                {/* <FilterTagsSerPro type='SERVICE' value={keyword} /> */}
                <div className={style.filter_right}>
                    <FilterLocation
                        onChange={onChangeFilterLocation}
                        province_code={SERVICE_PR["filter[province_code]"]}
                        district_code={SERVICE_PR["filter[district_code]"]}
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
                    {services.length < totalService && <>
                        <>
                            <LoadGrid grid={IS_MB ? 2 : 5} item_count={10} />
                            <div className={style.load_bottom}>
                                <XButton title="" loading={true} />
                            </div>
                        </>
                    </>}
                </InfiniteScroll>
            </div>
        </>
    );
}

export default TabService;