/* eslint-disable react-hooks/exhaustive-deps */
import API_3RD from 'api/3rd-api';
import { useFetchInfinite } from 'hooks';
import IStore from 'interface/IStore';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    formatRouterLinkOrg, formatRouterLinkProduct, formatRouterLinkService
} from 'utils/formatRouterLink/formatRouter';
import { onSetSearch, onDeleteAll } from 'redux/search_history'
import style from './search.module.css'

export interface ISeachHistory {
    _id: string,
    text: string,
    type: string,
    user_id: number,
    user_name: string,
    image_url: string,
    organization_id: string,
    productable_id: string,
    createdAt: string,
    updatedAt: string,
}

interface SearchHistoryProps {
    onCloseSearch: () => void
}

function SearchHistory(props: SearchHistoryProps) {
    const { onCloseSearch } = props;
    const { USER } = useSelector((state: IStore) => state.USER)
    const { searches } = useSelector((state: IStore) => state.SEARCH_HIS)
    const dispatch = useDispatch()
    const { resData, isValidating } = useFetchInfinite(
        USER?.id,
        `${API_3RD.API_NODE}/search_history/users/${USER?.id}`,
        { limit: 8 }
    )
    useEffect(() => {
        dispatch(onSetSearch(resData))
    }, [isValidating])
    const histories = searches?.filter((i: ISeachHistory) => i.type !== 'KEYWORD')
    const historiesKeyword = searches?.filter((i: ISeachHistory) => i.type === "KEYWORD")
    const onDeleteAllClick = () => {
        dispatch(onDeleteAll())
    }
    return (
        searches.length > 0 ?
            <div className={style.his_container}>
                <div className={style.his_container_head}>
                    <span className={style.his_container_title}>Tìm kiếm gần đây</span>
                    <div onClick={onDeleteAllClick} >Xóa tất cả</div>
                </div>
                <ul className={style.list_history}>
                    {
                        histories.map(((i, index: number) => (
                            <li
                                onClick={onCloseSearch}
                                key={index} className={style.list_history_item}
                            >
                                <ItemLink item={i} />
                            </li>
                        )))
                    }
                </ul>
                <ul className={style.list_history}>
                    {
                        historiesKeyword.map(((i, index: number) => (
                            <li
                                onClick={onCloseSearch}
                                key={index} className={style.list_history_item}
                            >
                                <Link
                                    className={style.item_link}
                                    to={{ pathname: "/ket-qua-tim-kiem/dich-vu/", search: `keyword=${encodeURIComponent(i.text)}` }}
                                >
                                    <span className={style.item_link_text}>{i.text}</span>
                                </Link>
                            </li>
                        )))
                    }
                </ul>
            </div>
            :
            <></>
    );
}

export default SearchHistory;

const ItemLink = ({ item }: { item: ISeachHistory }) => {
    let link = ``
    if (item.type === 'ORG') link = formatRouterLinkOrg(item.organization_id)
    if (item.type === 'SERVICE') link = formatRouterLinkService(item.productable_id, item.organization_id, item.text)
    if (item.type === 'PRODUCT') link = formatRouterLinkProduct(item.productable_id, item.organization_id, item.text)
    return (
        <Link className={style.item_link} to={{ pathname: link }} >
            <div className={style.item_link_img}>
                <img src={item.image_url} alt="" />
            </div>
            <span className={style.item_link_text}>{item.text}</span>
        </Link>
    )
}
