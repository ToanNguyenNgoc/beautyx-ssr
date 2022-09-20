import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../../context/AppProvider';
import { onSetFilterPromo } from '../../redux/filter/filterSlice'
import './filter-services.css';
import { clearServicesPromo } from '../../redux/home/homePageSlice'

interface IProps {
    onChangeFilter?: (item?: any) => void
}
export interface ISortList {
    id: number, title: string, query: string
}

function FilterService(props: IProps) {
    const { onChangeFilter } = props;
    const { t } = useContext(AppContext)
    const dispatch = useDispatch();
    const sortList: ISortList[] = [
        { id: 2, title: t("home_2.hot_promotion"), query: '-discount_percent' },
        { id: 5, title: t("home_2.selling"), query: '-bought_count' },
        { id: 1, title: t("home_2.places_near_you"), query: 'distance' },
        //{ id: 8, title: 'Dịch vụ HOT', query: '-modified_date' },
        { id: 3, title: t("Mer_de.ascending_price"), query: 'price' },
        { id: 4, title: t("Mer_de.decrease_price"), query: '-price' },
        // { id: 6, title: t("home_2.name") + 'A-Z', query: 'service_name' },
        // { id: 7, title: t("home_2.name") + 'Z-A', query: '-service_name' },
    ]
    const { FILTER_PROMO } = useSelector((state: any) => state.FILTER)
    const onChooseSortType = (item: any) => {
        const action = {
            id: item.id,
            query: item.query
        }
        dispatch(onSetFilterPromo(action))
        if (onChangeFilter) {
            dispatch(clearServicesPromo())
            onChangeFilter(action)
        }
    }
    return (
        <div className='filter-ser-cnt'>
            <ul className="flex-row filter-ser-list">
                {
                    sortList.map(item => (
                        <li
                            style={FILTER_PROMO.query === item.query ?
                                {
                                    backgroundColor: 'var(--pink)',
                                    color: 'var(--red-cl)',
                                    border: 'solid 1px var(--red-cl)'
                                }
                                :
                                {}}
                            onClick={() => onChooseSortType(item)}
                            key={item.id}
                        >
                            {item.title}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default FilterService;