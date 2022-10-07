import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../../context/AppProvider';
import IStore from '../../interface/IStore';
import { ISortList } from './FilterService';
import { onSetFilterProductPromo } from '../../redux/filter/filterSlice';

interface FilterProductProps {
    onChangeFilter?: (query: string) => void,
    value?: string,
    type_price?: "price" | "retail_price",
    disable?:"location"|"-discount_percent"|"price"|"-price"|"retail_price"|"-retail_price"
}

function FilterProduct(props: FilterProductProps) {
    const { onChangeFilter, value, type_price, disable } = props;
    const price_query = type_price ?? "retail_price"
    const { t } = useContext(AppContext);
    const dispatch = useDispatch();
    const { query } = useSelector((state: IStore) => state.FILTER.FILTER_PRODUCT_PROMO)
    const query_value = value ?? query
    let sortList: ISortList[] = [
        { id: 1, title: "Gần bạn", query: "location" },
        { id: 2, title: t("home_2.hot_promotion"), query: '-discount_percent' },
        { id: 3, title: t("Mer_de.ascending_price"), query: `${price_query}` },
        { id: 4, title: t("Mer_de.decrease_price"), query: `-${price_query}` },
    ]
    if(disable){
        // const newSortList = sortList.filter((item => item.query !== disable))
        sortList = sortList.filter((item => item.query !== disable))
    }
    const onFilter = (query: string) => {
        if (onChangeFilter) {
            onChangeFilter(query)
        } else {
            dispatch(onSetFilterProductPromo(query))
        }
    }
    return (
        <div className='filter-ser-cnt'>
            <ul className="flex-row filter-ser-list">
                {
                    sortList.map(item => (
                        <li
                            key={item.id}
                            style={query_value === item.query ?
                                {
                                    backgroundColor: 'var(--pink)',
                                    color: 'var(--red-cl)',
                                    border: 'solid 1px var(--red-cl)'
                                }
                                :
                                {}}
                            onClick={() => onFilter(item.query)}
                        >
                            {item.title}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default FilterProduct;