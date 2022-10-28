import { ITag } from 'interface';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import style from './style.module.css'

interface FilterTagsProps{
    onChange:(e:string)=>void, value:string
}

export function FilterTags(props: FilterTagsProps) {
    const {onChange, value} = props;
    const { tags } = useSelector((state: any) => state.HOME)
    const [arr, setArr] = useState<string[]>([])
    const onChangeTag = (tag_name: string) => {
        if (arr?.includes(tag_name)) {
            setArr(arr.filter((i: string) => i !== tag_name))
        } else {
            setArr([...arr, tag_name])
        }
    }

    return (
        <div className={style.container}>
            <span className={style.filter_title}>Danh mục</span>
            <ul className={style.tags_list}>
                {
                    tags?.map((item: ITag, index: number) => (
                        <li onClick={() => onChangeTag(item.name)} key={index} className={style.tag_item_cnt}>
                            <div className={style.tag_check}>
                                {arr.includes(item.name) && <span></span>}
                            </div>
                            <span className={style.tag_name}>{item.name}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}