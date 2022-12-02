import { Drawer } from '@mui/material';
import { EventLocation, FilterLocation, FilterPrice, FilterSort } from 'components/Filter';
import { EmptyRes, SerProItem, XButton } from 'components/Layout';
import { LoadGrid } from 'components/LoadingSketion';
import icon from 'constants/icon';
import { useProducts } from 'features/Search/hook';
import { useDeviceMobile } from 'hooks';
import { IServicePromo } from 'interface';
import IStore from 'interface/IStore';
import { paramsProducts } from 'params-query';
import { ParamProduct } from 'params-query/param.interface';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeFilterProduct } from 'redux/filter-result';
import style from './search-result.module.css'

function TabProduct({ keyword }: { keyword: string }) {
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
        "filter[special_price]": PRODUCT_PR["filter[special_price]"],
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
        if (IS_MB) setOpenFilter(false)
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
                {/* <FilterTagsSerPro type='PRODUCT' value={keyword} /> */}
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
                                            onChange={onChangeSort}
                                            value={PRODUCT_PR.sort}
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
                    {products.length < totalProduct &&
                        <>
                            <LoadGrid grid={IS_MB ? 2 : 5} item_count={10} />
                            <div className={style.load_bottom}>
                                <XButton title="" loading={true} />
                            </div>
                        </>
                    }
                </InfiniteScroll>
            </div>
        </>
    );
}

export default TabProduct;