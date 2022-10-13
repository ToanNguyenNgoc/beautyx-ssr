import { Container } from '@mui/material';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { BackTopButton, SerProItem } from 'components/Layout';
import { useDeviceMobile, useSwrInfinite } from 'utils';
import IStore from 'interface/IStore';
import { paramsProducts } from 'params-query';
import HeadMobile from 'features/HeadMobile';
import Head from 'features/Head';
import HeadTitle from 'features/HeadTitle';
import HomeTitleSection from 'pages/HomePage/HomeTitleSection/index';
import FilterProduct from 'features/Filter/FilterProduct';
import { IProductPromo } from 'interface/productPromo';
import { LoadGrid } from "components/LoadingSketion"
import Footer from 'features/Footer';

function HomePromoProduct() {
    const IS_MB = useDeviceMobile();
    const { query } = useSelector((state: IStore) => state.FILTER.FILTER_PRODUCT_PROMO)
    const params = {
        ...paramsProducts,
        "filter[special_price]": true,
        "sort": query
    }

    const { resData, isValidating, totalItem, onLoadMore } = useSwrInfinite(true, "/products", params)



    const onViewMore = () => {
        if (resData.length >= 15 && resData.length < totalItem) {
            onLoadMore()
        }
    }

    return (
        <>
            {
                IS_MB ?
                    <HeadMobile
                        title="TOP sản phẩm đang giảm giá"
                        prevUrl="/homepage"
                    />
                    :
                    <Head prev_url="/homepage" />
            }
            <HeadTitle title={`TOP sản phẩm đang giảm giá`} />
            <Container>
                {
                    !IS_MB &&
                    <div className="home-result-ser-cnt">
                        <HomeTitleSection
                            title={`TOP sản phẩm đang giảm giá`}
                        />
                    </div>
                }
                <div className="home-promo-ser home-promo-ser__mb">
                    <FilterProduct />
                    <InfiniteScroll
                        next={onViewMore}
                        hasMore={true}
                        loader={<></>}
                        dataLength={resData.length}
                    >
                        <ul className="ser-list ser-list__mb home-result__cus">
                            {resData
                                .map(
                                    (item: IProductPromo, index: number) => (
                                        <li
                                            key={index}
                                            className="ser-list-item__mb ser-item__cus"
                                        >
                                            <SerProItem changeStyle={IS_MB} item={item} type="PRODUCT" />
                                        </li>
                                    )
                                )}
                        </ul>
                        {resData.length < totalItem && isValidating && <LoadGrid />}
                    </InfiniteScroll>
                </div>
            </Container>
            <BackTopButton />
            <Footer />
        </>
    );
}

export default HomePromoProduct;