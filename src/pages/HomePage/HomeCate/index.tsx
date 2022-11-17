/* eslint-disable dot-location */
import React, { useContext, useRef, useState } from 'react';
import { AppContext } from '../../../context/AppProvider';
import { ITag, ITagParent } from "../../../interface/tags";
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
    formatRouterCateResult,
} from '../../../utils/formatRouterLink/formatRouter';
import { Masonry } from "@mui/lab"
import style from "./home-cate.module.css"
import slugify from '../../../utils/formatUrlString';
import { SpecialItem } from 'components/Layout';
import { clst } from 'utils';
import API_ROUTE from 'api/_api';
import { useSwr } from 'hooks';

function HomeCate() {
    const { tags } = useSelector((state: any) => state.HOME)
    const TAGS_PRODUCT = tags.map((i: ITag) => {
        return {
            ...i,
            children: i.children?.filter((child: ITag) => child.group === "PRODUCT")
        }
    }).
        filter((tag: any) => tag.children?.length > 0).
        sort((a: any, b: any) => b.children?.length - a.children?.length)
    const TAGS_SERVICE = tags.map((i: ITag) => {
        return {
            ...i,
            children: i.children?.filter((child: ITag) => child.group === "SERVICE")
        }
    }).
        filter((tag: any) => tag.children?.length > 0).
        sort((a: any, b: any) => b.children?.length - a.children?.length)
    // handle UI
    const refCatePar = useRef<any>();
    const refCateSerPar = useRef<any>();

    const onToggleCatePar = (open: boolean) => {
        if (open) refCatePar?.current?.classList?.add(style.cate_par_cnt_show)
        if (!open) refCatePar?.current?.classList?.remove(style.cate_par_cnt_show)
    }
    const onToggleCateSerPar = (open: boolean) => {
        if (open) refCateSerPar?.current?.classList?.add(style.cate_par_cnt_show)
        if (!open) refCateSerPar?.current?.classList?.remove(style.cate_par_cnt_show)
    }
    //--
    const [tagsChild, setTagsChild] = useState<ITag[]>([])
    const [tagsSerChild, setTagsSerChild] = useState<ITag[]>([])
    const onHoverParentItem = (id: number) => {
        setTagsChild(TAGS_PRODUCT?.find((i: ITag) => i.id === id)?.children)
    }
    const onHoverParentSerItem = (id: number) => {
        setTagsSerChild(TAGS_SERVICE.find((i: ITag) => i.id === id)?.children)
    }

    return (
        <div className={style.container}>
            <button
                className={style.btn_cnt}
                onFocus={() => onToggleCateSerPar(true)}
                onBlur={() => onToggleCateSerPar(false)}
            >
                {/* <div className={style.cate_header}>
                    <img src={icon.boxOrange} alt="" />
                    <span className={style.cate_header_title}>Danh mục dịch vụ </span>
                </div> */}
                <div ref={refCateSerPar} className={style.cate_par_cnt}>
                    <ul className={style.cate_par_list}>
                        {
                            TAGS_SERVICE.map((par: ITagParent, index: number) => (
                                <li
                                    onMouseEnter={() => onHoverParentSerItem(par.id)}
                                    key={index} className={style.cate_par_list_item}
                                >
                                    <Link to={{ pathname: formatRouterCateResult(par.id, par.name, "SERVICE") }} >
                                        {par.name}
                                    </Link>
                                </li>
                            ))
                        }
                        <CateSerChildHover parent={tagsSerChild} />
                    </ul>
                </div>
            </button>
            <button
                className={style.btn_cnt}
                onFocus={() => onToggleCatePar(true)}
                onBlur={() => onToggleCatePar(false)}
            >
                <div className={style.cate_header}>
                    {/* <img src={icon.lipstickOrange} alt="" /> */}
                    <span className={style.cate_header_title}>Sản phẩm </span>
                </div>
                <div ref={refCatePar} className={style.cate_par_cnt}>
                    <ul className={style.cate_par_list}>
                        {
                            TAGS_PRODUCT.map((par: ITagParent, index: number) => (
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
                TAGS_SERVICE.map((tag: ITag, index: number) => (
                    <TagItemService tag={tag} key={index} />
                ))
            }
        </div>
    );
}

export default HomeCate;

interface TagsChildGroup {
    parent: ITag,
    children: ITag[]
}

const CateSerChildHover = ({ parent }: { parent: ITag[] }) => {
    const { serviceCate, specialItems } = useContext(AppContext);
    const history = useHistory();
    const tagsChildGroup: TagsChildGroup[] = parent.map((par: ITag) => {
        return {
            parent: par,
            children: serviceCate.filter((child: ITag) => child.parent_id === par.id)
        }
    })
    const onItemSpecial = (item: any) => {
        if (item.type === "DISCOUNT") {
            return history.push(`/chi-tiet-giam-gia/service_${item.organization_id}_${item.id}_${item.item_id}_${slugify(item.name)}`)
        }
        if (item.type === "SERVICE") {
            return history.push(`/dich-vu/${item.id}_${item.organization_id}_${slugify(item.name)}`)
        }
    }
    return (
        <div className={`${style.item_child_cnt} ${style.item_child_cnt_ser}`}>
            <div className={style.item_child_cnt_right}>
                <Masonry columns={3} spacing={3} >
                    {
                        tagsChildGroup.map((i: TagsChildGroup, index: number) => (
                            <div key={index} className={style.child_list_cnt}>
                                <Link
                                    to={{ pathname: formatRouterCateResult(i.parent.id, i.parent.name, "SERVICE") }}
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
                </Masonry>
            </div>
            <div className={style.item_child_cnt_left}>
                <span className={style.item_child_cnt_title}>
                    Top dịch vụ bán chạy
                </span>
                <ul className={style.special_list}>
                    {
                        specialItems.map((item: any, index: number) => (
                            <li
                                onClick={() => onItemSpecial(item)}
                                key={index} className={style.special_list_item}
                            >
                                <SpecialItem item={item} />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
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
                                to={{ pathname: formatRouterCateResult(i.parent.id, i.parent.name, "PRODUCT") }}
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
        setTimeout(() => { setOpenChild(false) }, 100)
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
    const { response } = useSwr(API_ROUTE.TAGS_ID(parent?.id), parent.id)
    return (
        <div className={style.tag_service_child_list}>
            {
                response &&
                <Masonry columns={3} spacing={3} >
                    {
                        response?.children?.map((i: ITag, index: number) => (
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
                </Masonry>
            }
        </div>
    )
}