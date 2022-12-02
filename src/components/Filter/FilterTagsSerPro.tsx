import API_ROUTE from 'api/_api';
// import { AppContext } from 'context/AppProvider';
import { useSwr } from 'hooks';
import { ITag } from 'interface';
import { paramsProductsCate } from 'params-query';
import React from 'react';
import { useSelector } from 'react-redux';

interface FilterTagsSerProProps {
    value: string,
    type: 'SERVICE' | 'PRODUCT'
}

export function FilterTagsSerPro(props: FilterTagsSerProProps) {
    const { value, type } = props
    // const {serviceCate, productCate} = useContext(AppContext);
    // const listCate = type ==='SERVICE' ? serviceCate : productCate
    const result: ITag = useFindTagByName(value)
    const paramTag = {
        ...paramsProductsCate,
        'filter[group]': type
    }
    const tagDetail: ITag = useSwr(API_ROUTE.TAGS_ID(result?.id), result, paramTag).response
    // const tagsChild = listCate?.filter((i:ITag) => i.parent_id === tagDetail?.id)
    console.log(tagDetail)
    return (
        <div>

        </div>
    );
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