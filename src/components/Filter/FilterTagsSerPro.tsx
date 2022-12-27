import API_ROUTE from 'api/_api';
import icon from 'constants/icon';
import { useSwr } from 'hooks';
import { ITag } from 'interface';
import { paramsProductsCate } from 'params-query';
import React from 'react';
import { useSelector } from 'react-redux';
import style from './style.module.css'

interface FilterTagsSerProProps {
    originKey: string,
    value?: string,
    onChange?: (value: string) => void,
    type: 'SERVICE' | 'PRODUCT'
}

export function FilterTagsSerPro(props: FilterTagsSerProProps) {
    const { originKey, type, value, onChange } = props
    const result: ITag = useFindTagByName(originKey)
    const paramTag = {
        ...paramsProductsCate,
        'filter[group]': type
    }
    const tagDetail: ITag = useSwr(API_ROUTE.TAGS_ID(result?.id), result, paramTag).response
    const onChangeTagPar = (tagName: string) => {
        if (onChange) onChange(tagName)
    }

    return (
        result ?
            <div className={style.tag_ser_container}>
                <span className={style.tag_ser_title}>Danh mục</span>
                <div className={style.tag_ser_list_cnt}>
                    <ul className={style.tag_ser_list}>
                        <li
                            onClick={() => onChangeTagPar('')}
                            className={style.tag_ser_item}
                        >
                            {
                                value === '' &&
                                <div className={style.tag_ser_item_select}>
                                    <img src={icon.checkWhite} alt="" />
                                </div>
                            }
                            <div className={style.tag_ser_item_img}>
                                <img src={tagDetail?.media[0]?.original_url} alt="" />
                            </div>
                            <span className={style.tag_ser_item_text}>Tất cả</span>
                        </li>
                        {
                            tagDetail?.children?.map((child, index: number) => (
                                <TagSerItem
                                    key={index}
                                    child={child}
                                    index={index}
                                    onChangeTagPar={onChangeTagPar}
                                    value={value ?? ''}
                                />
                            ))
                        }
                    </ul>
                </div>
            </div>
            :
            <></>
    );
}

interface TagSerItemProps {
    child: ITag,
    index: number,
    value: string,
    onChangeTagPar: (tagName: string) => void,
}

const TagSerItem = (props: TagSerItemProps) => {
    const { child, value, onChangeTagPar } = props;

    return (
        <li
            onClick={() => onChangeTagPar(child.name)}
            className={style.tag_ser_item}
        >
            {
                value === child.name &&
                <div className={style.tag_ser_item_select}>
                    <img src={icon.checkWhite} alt="" />
                </div>
            }
            <div className={style.tag_ser_item_img}>
                <img src={child?.media[0]?.original_url} alt="" />
            </div>
            <span className={style.tag_ser_item_text}>{child.name}</span>
            {
                <div
                    className={style.tag_ser_item_child}
                >
                    <ul className={style.tag_ser_item_child_list}>
                        {
                            child?.children?.map((item, i: number) => (
                                <li key={i} className={style.tag_ser_item_child_item}>
                                    {item.name}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            }
        </li>
    )
}

const useFindTagByName = (keyword: string) => {
    const { tags } = useSelector((state: any) => state.HOME)
    let result = []
    if (!keyword || keyword === "") return result = []
    result = tags?.filter((item: { [x: string]: { toString: () => string; }; }) => {
        return Object.keys(item).some(key =>
            item[key]?.toString().toLowerCase().includes(keyword.toString().toLowerCase())
        )
    })
    return result[0]
}