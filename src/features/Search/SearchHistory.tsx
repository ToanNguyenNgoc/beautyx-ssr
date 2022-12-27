/* eslint-disable react-hooks/exhaustive-deps */
import IStore from 'interface/IStore';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    formatRouterLinkOrg,
    formatRouterLinkProduct,
    formatRouterLinkService
} from 'utils/formatRouterLink/formatRouter';
import style from './search.module.css'
import {
    useGetSearchQuery,
    useDeleteAllMutation
} from 'redux-toolkit-query/hook-search-history';

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
    const { data } = useGetSearchQuery(USER?.id)
    const histories: ISeachHistory[] = data ?? []
    const historiesOther = histories?.filter((i: ISeachHistory) => i.type !== 'KEYWORD')
    const historiesKeyword = histories?.filter((i: ISeachHistory) => i.type === "KEYWORD")
    const [deleteAll] = useDeleteAllMutation()
    const onDeleteAllClick = () => {
        deleteAll('')
    }
    return (
        histories.length > 0 ?
            <div className={style.his_container}>
                <div className={style.his_container_head}>
                    <span className={style.his_container_title}>Tìm kiếm gần đây</span>
                    <div onClick={onDeleteAllClick} >Xóa tất cả</div>
                </div>
                <ul className={style.list_history}>
                    {
                        historiesOther.map(((i, index: number) => (
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
