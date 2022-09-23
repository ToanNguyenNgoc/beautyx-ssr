import { Container } from '@mui/material';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import BackTopButton from '../../../components/BackTopButton';
// import { AppContext } from '../../../context/AppProvider';
import IStore from '../../../interface/IStore';
import useDeviceMobile from '../../../utils/useDeviceMobile';
import Footer from '../../Footer';
import Head from '../../Head';
import HeadMobile from '../../HeadMobile';
import HeadTitle from '../../HeadTitle';
import HomeTitleSection from '../../HomePage/HomeTitleSection/index';
import { paramsProducts } from '../../../params-query';
import useSwrInfinite from '../../../utils/useSwrInfinite';
import ProductPromoItem from '../../ViewItemCommon/ProductPromoItem';
import ProductResultItem from '../../Search/components/ProductResultItem';
import { IProductPromo } from '../../../interface/productPromo';
import { LoadGrid } from '../../../components/LoadingSketion';
import FilterProduct from '../../Filter/FilterProduct';

function HomePromoProduct() {
    const IS_MB = useDeviceMobile();
    // const { t } = useContext(AppContext);
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
                                            {
                                                IS_MB ? <ProductResultItem keyword={""} product={item} />
                                                    :
                                                    <ProductPromoItem product={item} />
                                            }
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