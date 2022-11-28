/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'features/Head';
import React, { useEffect } from 'react';
import { deals } from 'pages/HomePage/data'
import style from './deal-banner.module.css'
import { useParams, useHistory } from 'react-router-dom';
import { useDeviceMobile, useSwrInfinite } from 'hooks'
import { slugify } from 'utils';
import { Container } from '@mui/system';
import { paramsServices } from 'params-query';
import { ParamService } from 'params-query/param.interface';
import API_ROUTE from 'api/_api';
import { IServicePromo } from 'interface';
import { BackTopButton, SerProItem } from 'components/Layout';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoadGrid } from 'components/LoadingSketion';
import icon from 'constants/icon';

function DealBanner() {
    const { _id } = useParams()
    const history = useHistory()
    const IS_MB = useDeviceMobile()
    const deal = deals.find(i => _id === slugify(i.title))
    useEffect(() => {
        if (!deal) history.replace('/error')
    }, [])
    const param: ParamService = {
        ...paramsServices,
        'limit': 18,
        'filter[special_price]': true,
        'filter[is_momo_ecommerce_enable]': true,
        'filter[discount_percent]': deal?.percent ?? '',
        'filter[min_price]': deal?.min_price ?? '',
        'filter[max_price]': deal?.max_price ?? ''
    }
    const { resData, totalItem, onLoadMore } = useSwrInfinite(
        deal,
        API_ROUTE.SERVICES,
        param
    )
    const onMore = () => { if (resData.length < totalItem) onLoadMore() }
    return (
        <>
            <Head iconBack={icon.chevronLeftWhite} title={deal?.title ?? ''} changeStyle={IS_MB} />
            <Container>
                <div className={style.container}>
                    <div className={style.deal_banner_cnt}>
                        <img src={deal?.banner} className={style.deal_banner} alt="" />
                    </div>
                    <InfiniteScroll
                        dataLength={resData.length}
                        hasMore={true}
                        loader={<></>}
                        next={onMore}
                    >
                        <ul className={style.list_container}>
                            {
                                resData?.map((item: IServicePromo, index: number) => (
                                    <SerProItem
                                        key={index}
                                        item={item}
                                        type='SERVICE'
                                    />
                                ))
                            }
                        </ul>
                        {resData.length < totalItem && <LoadGrid item_count={12} grid={IS_MB ? 2 : 6} />}
                    </InfiniteScroll>
                </div>
            </Container>
            <BackTopButton/>
        </>
    );
}

export default DealBanner;