/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { IProductPromo } from "../../../interface/productPromo";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductPromoItem from "../../ViewItemCommon/ProductPromoItem";
import ProductResultItem from "../../Search/components/ProductResultItem";
import useFullScreen from "../../../utils/useDeviceMobile";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilter } from "../../../redux/search/searchResultSlice";
import { STATUS } from "../../../redux/status";
import { LoadingServices } from "../../../components/LoadingSketion";
import LoadingMore from "../../../components/LoadingMore";
import EmptyRes from "../../EmptyRes";

function TabProduct(props: any) {
    const { keyword } = props;
    const IS_MB = useFullScreen();
    const { products, page, totalItem, status } = useSelector(
        (state: any) => state.SEARCH_RESULT.RE_PRODUCTS
    );
    const dispatch = useDispatch();

    const onViewMore = () => {
        if (products.length >= 15 && products.length < totalItem) {
            dispatch(
                fetchProductsByFilter({
                    page: page + 1,
                    keyword: keyword,
                })
            );
        }
    };

    return (
        <div>
            {page === 1 && status !== STATUS.SUCCESS && <LoadingServices />}
            {(status === STATUS.SUCCESS && products.length === 0)&&<EmptyRes title={'Không tìm được kết quả phù hợp!'} />}
            <InfiniteScroll
                dataLength={products.length}
                hasMore={true}
                loader={<></>}
                next={onViewMore}
            >
                <ul className="re-ser-list">
                    {products.map((item: IProductPromo, index: number) => (
                        <li className="re-ser-list__item" key={index}>
                            {IS_MB ? (
                                <ProductResultItem
                                    keyword={keyword}
                                    product={item}
                                />
                            ) : (
                                <ProductPromoItem product={item} />
                            )}
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>
            {products.length < totalItem && <LoadingMore />}
        </div>
    );
}

export default TabProduct;
