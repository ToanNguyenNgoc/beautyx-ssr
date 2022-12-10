/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { deals } from 'pages/HomePage/data'
import style from './deal-banner.module.css'
import { useParams, useHistory } from 'react-router-dom';
import { useDeviceMobile, useElementOnScreen, useSwrInfinite } from 'hooks'
import { slugify } from 'utils';
import { Container } from '@mui/system';
import { paramsServices } from 'params-query';
import { ParamService } from 'params-query/param.interface';
import API_ROUTE from 'api/_api';
import { IServicePromo } from 'interface';
import { BackTopButton, SerProItem, XButton } from 'components/Layout';
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
    const refHead = useRef<HTMLDivElement>(null)
    const bannerRef = useRef<HTMLDivElement>(null)
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
    };
    const isVisible = useElementOnScreen(options, bannerRef);
    window.addEventListener("scroll", () => {
        if (isVisible) {
            refHead.current?.classList.remove(style.head_show)
        } else {
            refHead.current?.classList.add(style.head_show)
        }
    });
    return (
        <>
            {
                IS_MB &&
                <div ref={refHead} className={style.head}>
                    <XButton
                        onClick={() => history.goBack()}
                        icon={icon.chevronLeftWhite}
                        iconSize={28}
                    />
                </div>
            }
            <Container>
                <div className={style.container}>
                    <div ref={bannerRef} className={style.deal_banner_cnt}>
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
            <BackTopButton />
        </>
    );
}

export default DealBanner;