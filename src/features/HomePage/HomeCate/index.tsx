/* eslint-disable dot-location */
import React, { useContext, useRef, useState } from 'react';
import { AppContext } from '../../../context/AppProvider';
import { ITag, ITagParent } from "../../../interface/tags";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatRouterCateResult } from '../../../utils/formatRouterLink/formatRouter';

import icon from '../../../constants/icon';
import style from "./home-cate.module.css"

function HomeCate() {

    // const productCatePage1 = useSwr("/tags", true, { page: 1, ...paramsProductsCate }).responseArray;
    // console.log(productCatePage1)
    const { tags } = useSelector((state: any) => state.HOME)
    const TAGS_PRODUCT = tags.map((i: ITag) => {
        return {
            ...i,
            children: i.children?.filter((child: ITag) => child.group === "PRODUCT")
        }
    }).
        filter((tag: any) => tag.children?.length > 0).
        sort((a: any, b: any) => b.children?.length - a.children?.length)
    // handle UI
    const refCatePar = useRef<any>();

    const onToggleCatePar = (open: boolean) => {
        if (open) refCatePar?.current?.classList?.add(style.cate_par_cnt_show)
        if (!open) refCatePar?.current?.classList?.remove(style.cate_par_cnt_show)
    }
    //--
    const [tagsChild, setTagsChild] = useState<ITag[]>([])
    const onHoverParentItem = (id: number) => {
        setTagsChild(TAGS_PRODUCT?.find((i: ITag) => i.id === id)?.children)
    }

    return (
        <button
            onFocus={() => onToggleCatePar(true)}
            onBlur={() => onToggleCatePar(false)}
            className={style.container}
        >
            <div className={style.cate_header}>
                <img src={icon.listOrange} alt="" />
                <span className={style.cate_header_title}>Danh mục sản phẩm </span>
            </div>
            <div ref={refCatePar} className={style.cate_par_cnt}>
                <ul className={style.cate_par_list}>
                    {
                        TAGS_PRODUCT.map((par: ITagParent, index: number) => (
                            <li
                                onMouseEnter={() => onHoverParentItem(par.id)}
                                key={index} className={style.cate_par_list_item}
                            >
                                <Link to={{ pathname: formatRouterCateResult(par.id, par.name) }} >
                                    {par.name}
                                </Link>
                            </li>
                        ))
                    }
                    <CateChildHover parent={tagsChild} />
                </ul>
            </div>
        </button>
    );
}

export default HomeCate;

interface TagsChildGroup {
    parent: ITag,
    children: ITag[]
}

const CateChildHover = ({ parent }: { parent: ITag[] }) => {
    const { productCate } = useContext(AppContext);
    const tagsChildGroup: TagsChildGroup[] = parent.map((par: ITag) => {
        return {
            parent: par,
            children: productCate.filter((child: ITag) => child.parent_id === par.id)
        }
    })
    return (
        <div className={style.item_child_cnt}>
            <ul className={style.child_list}>
                {
                    tagsChildGroup.map((i: TagsChildGroup, index: number) => (
                        <li key={index} className={style.child_list_cnt}>
                            <Link
                                to={{ pathname: formatRouterCateResult(i.parent.id, i.parent.name) }}
                            >
                                <span className={style.child_list_name}>
                                    <img src={i.parent?.media[0]?.original_url} alt="" />
                                    {i.parent?.name}
                                </span>
                            </Link>
                            <ul className={style.child_child_list}>
                                {
                                    i.children?.map((child: ITag, i_child: number) => (
                                        <li key={i_child} className={style.child_child_item}>
                                            <Link
                                                to={{ pathname: formatRouterCateResult(child.id, child.name) }}
                                            >
                                                {child.name}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}