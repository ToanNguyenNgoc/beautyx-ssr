import React from 'react';
import { useDispatch } from 'react-redux';
import { IProductPromo } from '../../interface/productPromo';
import { onSetTabResult } from '../../redux/search/searchResultSlice';
import { onToggleSearchCnt } from '../../redux/search/searchSlice';
import ProductResultItem from './components/ProductResultItem';

function SectionProducts(props: any) {
    const { PRODUCTS, onGotoFilterResult } = props;
    const dispatch = useDispatch();
    const onViewMore = () => {
        if (onGotoFilterResult) {
            onGotoFilterResult()
            dispatch(onSetTabResult(2))
            dispatch(onToggleSearchCnt(false))
        }
    }
    return (
        PRODUCTS.products.length > 0 ?
            <div className='search-section-item'>
                <div className="flex-row-sp search-section-item__title">
                    Sản phẩm
                    <span onClick={onViewMore} >Xem tất cả</span>
                </div>
                <div className="search-section-item__list">
                    <ul className="list">
                        {
                            PRODUCTS.products.slice(0, 4).map((item: IProductPromo, index: number) => (
                                <li key={index}>
                                    <ProductResultItem
                                        product={item}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            :
            <></>
    );
}

export default SectionProducts;