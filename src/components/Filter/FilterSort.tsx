import { AppContext } from 'context/AppProvider';
import React, { useContext } from 'react';
import style from './style.module.css'

interface FilterSortProps {
    type: 'SERVICE' | 'PRODUCT' | 'ORG'
    value?: string
    onChange?: (value: string) => void
}
interface ISort {
    query: string, title: string
}

export function FilterSort(props: FilterSortProps) {
    const { type, onChange, value } = props
    const { t } = useContext(AppContext) as any
    const paramSortService: ISort[] = [
        { query: '-discount_percent', title: t('home_2.hot_promotion') },
        { query: 'price', title: t('Mer_de.ascending_price') },
        { query: '-price', title: t('Mer_de.decrease_price') },
        { query: '-favorites_count', title: t('Mer_de.priority') },
    ]
    const paramSortProduct: ISort[] = [
        { query: '-discount_percent', title: t('home_2.hot_promotion') },
        { query: 'price', title: t('Mer_de.ascending_price') },
        { query: '-price', title: t('Mer_de.decrease_price') },
        { query: '-favorites_count', title: t('Mer_de.priority') },
        { query: '-sold_count', title: 'Bán chạy' },
    ]
    const paramSortOrg: ISort[] = [
        { query: '-priority', title: t('Mer_de.priority') },
        { query: '-favorites_count', title: t('Mer_de.favorite') },
    ]
    const renderSortDe = () => {
        let list: ISort[] = []
        switch (type) {
            case 'SERVICE':
                list = paramSortService
                break;
            case 'PRODUCT':
                list = paramSortProduct
                break;
            case 'ORG':
                list = paramSortOrg
                break;
            default:
                break;
        }
        return list
    }
    const onChangeSort = (query: string) => {
        if (onChange) {
            onChange(query)
        }
    }
    return (
        <div className={style.container}>
            <span className={style.title}>{t('Mer_de.sort_by')}</span>
            <ul className={style.sort_list}>
                {
                    renderSortDe().map((item: ISort) => (
                        <li
                            onClick={() => onChangeSort(item.query)}
                            key={item.query} className={style.province_item}
                        >
                            <div className={style.province_item_name}>
                                <div className={style.radio_btn}>
                                    {
                                        value === item.query && <div className={style.radio_btn_check}></div>
                                    }
                                </div>
                                <span className={style.province_name}>
                                    {item.title}
                                </span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}