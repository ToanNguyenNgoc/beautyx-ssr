import { IBanner } from 'interface/banner';
import React from 'react';
import { useFetch } from 'utils';
import { SerProItem } from 'components/Layout'
import style from "./style.module.css"
import { IServicePromo } from 'interface/servicePromo';

export function TypeSearchResult({ banner }: { banner: IBanner }) {
    const condition = banner ? true : false
    const url = banner?.url ?? ""
    const { response } = useFetch(condition, url)
    return (
        <div className={style.body_container}>
            <ul className={style.list_item}>
                {
                    response?.hits?.map((item: IServicePromo, index: number) => (
                        <li key={index} className={style.item_container}>
                            <SerProItem
                                item={item}
                                type="SERVICE"
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}