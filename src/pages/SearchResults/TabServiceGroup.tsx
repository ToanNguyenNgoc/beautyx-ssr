import { Drawer } from '@mui/material';
import { EventLocation, FilterLocation, FilterPrice, FilterSort, FilterTagsSerPro } from 'components/Filter';
import { EmptyRes, XButton } from 'components/Layout';
import { LoadGrid } from 'components/LoadingSketion';
import icon from 'constants/icon';
import { useServicesGroup } from 'features/Search/hook';
import { useDeviceMobile } from 'hooks';
import { IServicePromo, IServicePromoGroupOrg } from 'interface';
import IStore from 'interface/IStore';
import { paramsServices } from 'params-query';
import { ParamService } from 'params-query/param.interface';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { onChangeFilterService } from 'redux/filter-result';
import { clst, formatDistance, onErrorImg } from 'utils';
import formatPrice, { formatSalePriceService } from 'utils/formatPrice';
import { formatRouterLinkOrg, formatRouterLinkService } from 'utils/formatRouterLink/formatRouter';
import style from './search-result.module.css'

function TabServiceGroup({ keyword }: { keyword: string }) {
    const IS_MB = useDeviceMobile()
    const dispatch = useDispatch()
    const [openFilter, setOpenFilter] = useState(false);
    const { SERVICE_PR } = useSelector((state: IStore) => state.FILTER_RESULT)
    const PARAMS_SERVICES: ParamService = {
        ...paramsServices,
        "filter[keyword]": SERVICE_PR['filter[keyword]'] === '' ? keyword : SERVICE_PR['filter[keyword]'],
        "filter[location]": SERVICE_PR["filter[location]"],
        "filter[min_price]": SERVICE_PR["filter[min_price]"],
        "filter[max_price]": SERVICE_PR["filter[max_price]"],
        "sort": SERVICE_PR.sort
    }
    const {
        services,
        totalService,
        onLoadMoreService,
        servicesGroupByOrg,
    } = useServicesGroup(PARAMS_SERVICES, true)
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
    const onChangeTag = (value: string) => {
        dispatch(onChangeFilterService({
            ...PARAMS_SERVICES,
            'filter[keyword]': value
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
                        showApplyBtn={IS_MB}
                    />
                </div>
                <div className={style.filter_left}>
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
                                value={SERVICE_PR['filter[keyword]']}
                                type='SERVICE'
                                onChange={onChangeTag}
                            />
                            <FilterSort
                                type="SERVICE"
                                onChange={onChangeSort}
                                value={SERVICE_PR.sort}
                            />
                            <FilterPrice
                                onChangePrice={onChangePrice}
                                min_price={SERVICE_PR["filter[min_price]"]}
                                max_price={SERVICE_PR["filter[max_price]"]}
                                onCloseDrawer={()=>setOpenFilter(false)}
                            />
                        </div>
                    </Drawer>
                </div>
            </div>
            <div className={style.result_body}>
                {totalService === 0 && <EmptyRes title="Không có dịch vụ phù hợp !" />}
                <InfiniteScroll
                    dataLength={servicesGroupByOrg.length}
                    hasMore={true}
                    loader={<></>}
                    next={onViewMore}
                >
                    <ul className={clst([style.result_list, style.result_list_group])}>
                        {
                            servicesGroupByOrg.map((item: any, index: number) => (
                                <li key={index} className={style.result_list_item}>
                                    <ItemOrgGroup
                                        item={item}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                    {services.length < totalService && <>
                        <>
                            <LoadGrid grid={IS_MB ? 1 : 5} item_count={IS_MB ? 8 : 10} />
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

export default TabServiceGroup;

const ItemOrgGroup = ({ item }: { item: IServicePromoGroupOrg }) => {
    const history = useHistory()
    const onOrgDetail = () => {
        history.push(formatRouterLinkOrg(item.org?.org_id))
    }
    return (
        <div
            onClick={onOrgDetail}
            className={style.item_org_group}
        >
            <div className={style.group_org}>
                <div className={style.group_org_img}>
                    <img src={item.org?.org_image} onError={(e) => onErrorImg(e)} alt="" />
                </div>
                <div className={style.group_org_detail}>
                    <p className={style.group_org_detail_name}>{item.org?.org_name}</p>
                    <p className={style.group_org_detail_address}>
                        {item.org?.org_full_address}
                    </p>
                    <div className={style.group_org_detail_rate}>
                        <div className={style.rate_item}>
                            <img src={icon.star} alt="" />
                            <span>5</span>
                        </div>
                        {
                            item.org?._geoDistance &&
                            <div className={style.rate_item}>
                                <img src={icon.pinMapRed} alt="" />
                                <span>
                                    {formatDistance(item.org?._geoDistance)}
                                </span>
                            </div>
                        }
                    </div>
                    <ul className={style.group_org_services}>
                        {
                            item.services?.slice(0, 2)?.map((service: IServicePromo, index: number) => (
                                <li key={index} className={style.gr_service_item}>
                                    <ServicePro
                                        service={service}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
const ServicePro = ({ service }: { service: IServicePromo }) => {
    const history = useHistory()
    const special_price = formatSalePriceService(service?.special_price, service?.special_price_momo)
    const onDetail = () => {
        history.push(
            formatRouterLinkService(
                service.service_id, service.org_id, service.service_name
            ))
    }
    return (
        <div
            onClick={(e) => {
                onDetail();
                e.preventDefault();
                e.stopPropagation();
            }}
            className={style.gr_service_link}
        >
            <div className={style.gr_service_img}>
                <img
                    src={service.image_url ?? service.org_image}
                    onError={(e) => onErrorImg(e)} alt=""
                />
            </div>
            <div className={style.gr_service_detail}>
                <p className={style.gr_service_detail_name}>
                    {service.service_name}
                </p>
                <div className={style.gr_service_price}>
                    {
                        special_price > 0 &&
                        <span style={{ color: 'var(--text-orange)' }} >
                            {formatPrice(special_price)}đ
                        </span>
                    }
                    <span>{formatPrice(service?.price)}</span>
                </div>
            </div>
        </div>
    )
}