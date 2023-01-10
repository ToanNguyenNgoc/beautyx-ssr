/* eslint-disable eqeqeq */
import { ITag } from "interface";
import { useSelector } from "react-redux";
import { unique } from "utils";

export function useTags() {
    const tags: ITag[] = useSelector((state: any) => state.HOME.tags)
    const tagsChildLevel2: ITag[] = tags.map(i => (i.children ?? [])).flat()
    const tagsChildProductLevel2 = tagsChildLevel2.filter(i => i.group === 'PRODUCT')
    const tagsChildProductParentIdLevel2: number[] = unique(tagsChildProductLevel2.map(i => i.parent_id))
    const tagsProductLevel1 = tagsChildProductParentIdLevel2.map(id => {
        return tags.find(item => item.id === id)
    }).filter(Boolean)
        .map(i => { return { ...i, children: i?.children?.filter(child => child.group === 'PRODUCT') } }) as ITag[]

    const tagsChildServiceLevel2 = tagsChildLevel2.filter(i => i.group === 'SERVICE')
    const tagsChildServiceParentIdLevel2: number[] = unique(tagsChildServiceLevel2.map(i => i.parent_id))
    const tagsServiceLevel1 = tagsChildServiceParentIdLevel2.map(id => {
        return tags.find(item => item.id === id)
    }).filter(Boolean)
        .map(i => { return { ...i, children: i?.children?.filter(child => child.group === 'SERVICE') } }) as ITag[]

    const tagsChildServiceLevel3 = tagsChildServiceLevel2?.map(i => i.children).flat() as ITag[]
    const tagsAllService = tagsServiceLevel1.concat(tagsChildServiceLevel2).concat(tagsChildServiceLevel3)

    const tagsChildProductLevel3 = tagsChildProductLevel2?.map(i => i.children).flat() as ITag[]
    const tagsAllProduct = tagsProductLevel1.concat(tagsChildProductLevel2).concat(tagsChildProductLevel3)

    const queryTag = (id: any, type: 'SERVICE' | 'PRODUCT') => {
        let tag
        if (id && type === 'SERVICE') {
            tag = tagsAllService?.find(i => i.id == id)
        }
        if (id && type === 'PRODUCT') {
            tag = tagsAllProduct?.find(i => i.id == id)
        }
        return tag
    }


    return {
        tagsServiceLevel1,
        tagsProductLevel1,
        tagsChildServiceLevel2,
        tagsChildProductLevel2,
        queryTag
    }
}