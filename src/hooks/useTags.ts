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
    }).filter(Boolean) as ITag[]

    const tagsChildServiceLevel2 = tagsChildLevel2.filter(i => i.group === 'SERVICE')
    const tagsChildServiceParentIdLevel2: number[] = unique(tagsChildServiceLevel2.map(i => i.parent_id))
    const tagsServiceLevel1 = tagsChildServiceParentIdLevel2.map(id => {
        return tags.find(item => item.id === id)
    }).filter(Boolean) as ITag[]



    return {
        tagsServiceLevel1,
        tagsProductLevel1,
        tagsChildServiceLevel2,
        tagsChildProductLevel2
    }
}