import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../../context/AppProvider';
import IStore from '../../interface/IStore';
import { ISortList } from './FilterService';
import { onSetFilterProductPromo } from '../../redux/filter/filterSlice';

function FilterProduct() {
    const { t } = useContext(AppContext);
    const dispatch = useDispatch();
    const { query } = useSelector((state: IStore) => state.FILTER.FILTER_PRODUCT_PROMO)
    const sortList: ISortList[] = [
        { id: 2, title: t("home_2.hot_promotion"), query: '-discount_percent' },
        //{ id: 8, title: 'Dịch vụ HOT', query: '-modified_date' },
        { id: 3, title: t("Mer_de.ascending_price"), query: 'retail_price' },
        { id: 4, title: t("Mer_de.decrease_price"), query: '-retail_price' },
        // { id: 6, title: t("home_2.name") + 'A-Z', query: 'service_name' },
        // { id: 7, title: t("home_2.name") + 'Z-A', query: '-service_name' },
    ]
    const onFilter = (query: string) => {
        dispatch(onSetFilterProductPromo(query))
    }
    return (
        <div className='filter-ser-cnt'>
            <ul className="flex-row filter-ser-list">
                {
                    sortList.map(item => (
                        <li
                            style={query === item.query ?
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