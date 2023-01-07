/* eslint-disable dot-location */
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Masonry } from "@mui/lab"
import style from "./home-cate.module.css"
import { clst } from 'utils';
import { ITag } from 'interface';
import { formatRouterCateResult } from 'utils/formatRouterLink/formatRouter';
import { useTags } from 'hooks';

function HomeCate() {
    const { tagsProductLevel1, tagsServiceLevel1 } = useTags()
    // handle UI
    const refCatePar = useRef<any>();

    const onToggleCatePar = (open: boolean) => {
        if (open) refCatePar?.current?.classList?.add(style.cate_par_cnt_show)
        if (!open) refCatePar?.current?.classList?.remove(style.cate_par_cnt_show)
    }
    //--
    const [tagsChild, setTagsChild] = useState<ITag[]>([])
    const onHoverParentItem = (id: number) => {
        setTagsChild(tagsProductLevel1?.find((i: ITag) => i.id === id)?.children ?? [])
    }

    return (
        <div className={style.container}>
            <button
                className={style.btn_cnt}
                onFocus={() => onToggleCatePar(true)}
                onBlur={() => onToggleCatePar(false)}
            >
                <div className={style.cate_header}>
                    <span className={style.cate_header_title}>Sản phẩm </span>
                </div>
                <div ref={refCatePar} className={style.cate_par_cnt}>
                    <ul className={style.cate_par_list}>
                        {
                            tagsProductLevel1
                                ?.sort((a, b) => (b.children?.length ?? 0) - (a.children?.length ?? 0))
                                ?.map((par: ITag, index: number) => (
                                    <li
                                        onMouseEnter={() => onHoverParentItem(par.id)}
                                        key={index} className={style.cate_par_list_item}
                                    >
                                        <Link to={{ pathname: formatRouterCateResult(par.id, par.name, "PRODUCT") }} >
                                            {par.name}
                                        </Link>
                                    </li>
                                ))
                        }
                        <CateChildHover parent={tagsChild} />
                    </ul>
                </div>
            </button>
            {
                tagsServiceLevel1
                    ?.sort((a, b) => (b.children?.length ?? 0) - (a.children?.length ?? 0))
                    ?.map((tag: ITag, index: number) => (
                        <TagItemService tag={tag} key={index} />
                    ))
            }
        </div>
    );
}

export default HomeCate;



const CateChildHover = ({ parent }: { parent: ITag[] }) => {
    return (
        <div className={style.item_child_cnt}>
            <ul className={style.child_list}>
                {
                    parent?.map((i: ITag, index: number) => (
                        <li key={index} className={style.child_list_cnt}>
                            <Link
                                to={{ pathname: formatRouterCateResult(i.id, i.name, "PRODUCT") }}
                            >
                                <span className={style.child_list_name}>
                                    <img src={i?.media[0]?.original_url} alt="" />
                                    {i?.name}
                                </span>
                            </Link>
                            <ul className={style.child_child_list}>
                                {
                                    i.children?.map((child: ITag, i_child: number) => (
                                        <li key={i_child} className={style.child_child_item}>
                                            <Link
                                                to={{ pathname: formatRouterCateResult(child.id, child.name, "PRODUCT") }}
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
const TagItemService = ({ tag }: { tag: ITag }) => {
    const [openChild, setOpenChild] = useState(false)
    const onBlurTagItem = () => {
        setTimeout(() => { setOpenChild(false) }, 300)
    }
    return (
        <button
            onFocus={() => setOpenChild(true)}
            onBlur={onBlurTagItem}
            className={style.tag_item_services}
        >
            {tag.name}
            <div
                className={
                    openChild ? clst([style.tag_service_child_cnt, style.tag_service_child_show])
                        :
                        style.tag_service_child_cnt
                }
            >
                {openChild && <TagItemServiceChild parent={tag} />}
            </div>
        </button>
    )
}
const TagItemServiceChild = ({ parent }: { parent: ITag }) => {
    return (
        <div className={style.tag_service_child_list}>
            {
                <Masonry columns={3} spacing={3} >
                    {
                        parent?.children?.map((i: ITag, index: number) => (
                            <div key={index} className={style.child_list_cnt}>
                                <Link
                                    to={{ pathname: formatRouterCateResult(i.id, i.name, "SERVICE") }}
                                >
                                    <span className={style.child_list_name}>
                                        <img src={i?.media[0]?.original_url} alt="" />
                                        {i.name}
                                    </span>
                                </Link>
                                <ul className={style.child_child_list}>
                                    {
                                        i.children?.map((child: ITag, i_child: number) => (
                                            <li key={i_child} className={style.child_child_item}>
                                                <Link
                                                    to={{ pathname: formatRouterCateResult(child.id, child.name, "SERVICE") }}
                                                >
                                                    {child.name}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                    <></>
                </Masonry>
            }
        </div>
    )
}