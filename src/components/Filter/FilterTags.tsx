import { ITag } from 'interface';
import React from 'react';
import { useSelector } from 'react-redux';
import style from './style.module.css'

interface FilterTagsProps {
    onChange: (e: string) => void, value: string
}

export function FilterTags(props: FilterTagsProps) {
    const { onChange, value } = props;
    const tagsArr = value.split('|').filter(Boolean) ?? []
    const { tags } = useSelector((state: any) => state.HOME)
    const onChangeTag = (tag_name: string) => {
        if (tagsArr.includes(tag_name)) {
            const newArr = tagsArr.filter((i: string) => i !== tag_name)
            onChange(newArr.join('|'))
        } else {
            const newArr = [...tagsArr, tag_name]
            onChange(newArr.join('|'))
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
                                {tagsArr.includes(item.name) && <span></span>}
                            </div>
                            <span className={style.tag_name}>{item.name}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}