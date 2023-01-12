import { Container } from '@mui/system';
import API_ROUTE from 'api/_api';
import { XButton } from 'components/Layout';
import img from 'constants/img';
import { useSwrInfinite, useTags } from 'hooks';
import { IOrganization, ITag } from 'interface';
import IStore from 'interface/IStore';
import { paramOrgs } from 'params-query';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { onSetCateChildId, onSetCateParentId, onSetTab } from 'redux/cates-tree';
import { clst, onErrorImg } from 'utils';
import { formatRouterLinkOrg, navigateSearchResult } from 'utils/formatRouterLink/formatRouter';
import style from './cate-tree.module.css'
import SectionProduct from './SectionProduct';
import SectionService from './SectionService';

function CateTree() {
    const tabs = [
        { title: 'Dịch vụ', value: 'SERVICE' },
        { title: 'Sản phẩm', value: 'PRODUCT' }
    ]
    const { tagsServiceLevel1, tagsProductLevel1, queryTag } = useTags()
    const history = useHistory()
    const dispatch = useDispatch()
    const CATE = useSelector((state: IStore) => state.CATE)
    const tab = CATE.tab
    const tags = tab === 'PRODUCT' ? tagsProductLevel1 : tagsServiceLevel1
    const parentId = CATE.parentId ?? tags[0]?.id
    const tagsParent = queryTag(parentId, tab)
    const childId = CATE.childId ?? (tagsParent?.children ? tagsParent?.children[0]?.id : 0)
    const child = queryTag(childId, tab)
    const { orgs, loadOrgs } = useOrgsByTag(tagsParent)

    const handleSetCateParentId = (id: number) => {
        dispatch(onSetCateParentId(id))
    }
    const handleSetCateChildId = (id: number) => {
        dispatch(onSetCateChildId(id))
    }
    const navigatorOrg = (org: IOrganization) => {
        let link = ''
        if (tab === 'SERVICE') {
            link = `${formatRouterLinkOrg(org.subdomain)}/dich-vu`
        }
        if (tab === 'PRODUCT') {
            link = `${formatRouterLinkOrg(org.subdomain)}/san-pham`
        }
        return link
    }

    return (
        <>
            <Container>
                <div className={style.container}>
                    <div className={style.head}>
                        {
                            tabs.map((item) => (
                                <XButton
                                    onClick={() => dispatch(onSetTab(item.value))}
                                    className={clst([style.tab_btn, item.value === tab ? style.tab_btn_act : ''])}
                                    key={item.value}
                                    title={item.title}
                                />
                            ))
                        }
                    </div>
                    <div className={style.body}>
                        <div className={style.left}>
                            <ul className={style.left_cate_par_list}>
                                {
                                    tags?.map((item, index: number) => (
                                        <li
                                            key={index}
                                            className={
                                                clst([style.left_cate_par_item, item.id === parentId ? style.cate_par_act : ''])
                                            }
                                            onClick={() => handleSetCateParentId(item.id)}
                                        >
                                            <div className={style.left_cate_par_img}>
                                                <img src={item.media[0]?.original_url} alt="" />
                                            </div>
                                            <p className={style.left_cate_par_name}>{item.name}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className={style.right}>
                            <div className={style.right_tag_child}>
                                <ul className={style.right_tag_child_list}>
                                    {
                                        tagsParent?.children?.map((item, index: number) => (
                                            <li
                                                onClick={() => handleSetCateChildId(item.id)}
                                                key={index} className={style.right_tag_child_item}
                                            >
                                                <div className={style.tag_child_img}>
                                                    <img src={item.media[0]?.original_url} alt="" />
                                                </div>
                                                <div
                                                    className={
                                                        clst([style.tag_child_name, item.id === childId ? style.chile_name_act : ''])
                                                    }>
                                                    {item.name}
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className={style.right_org_cnt}>
                                <p className={style.right_org_cnt_label}>
                                    Cửa hàng
                                    <span
                                        onClick={()=>history.push(navigateSearchResult("ORG", tagsParent?.name??''))}
                                    >
                                        Xem thêm
                                    </span>
                                </p>
                                {(loadOrgs && orgs.length === 0) && <LoadGridOrg />}
                                <ul className={style.right_org_list}>
                                    {
                                        orgs?.map((org: IOrganization) => (
                                            <li key={org.id} className={style.right_org_item}>
                                                <Link
                                                    to={{ pathname: navigatorOrg(org) }}
                                                    className={style.right_org_item_img}
                                                >
                                                    <img
                                                        src={org.image_url ?? img.imgDefault}
                                                        onError={(e) => onErrorImg(e)} alt=""
                                                    />
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            {
                                tab === 'SERVICE' ?
                                    <SectionService tagChild={child} />
                                    :
                                    <SectionProduct child={child} />
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default CateTree;

const useOrgsByTag = (parent?: ITag) => {
    const { resData, totalItem, isValidating } = useSwrInfinite(
        parent,
        API_ROUTE.ORGS,
        {
            ...paramOrgs, 'filter[tags]': parent?.name, 'limit': '12',
            'filter[is_momo_ecommerce_enable]': true
        }
    )
    const orgs: IOrganization[] = resData ?? []
    const totalOrg = totalItem ?? 1
    const loadOrgs = isValidating
    return { orgs, totalOrg, loadOrgs }
}

const LoadGridOrg = () => {
    let liArr = []
    for (var i = 0; i <= 11; i++) {
        const li = <li key={i} className={style.right_org_item}>
            <div style={{ paddingBottom: 'calc(100% - 16px)' }} className={style.right_org_item_img}>
                <Skeleton style={{ position: 'absolute' }} width={'100%'} height={'100%'} />
            </div>
        </li>
        liArr.push(li)
    }
    return (
        <ul className={style.right_org_list}>
            {liArr}
        </ul>
    )
}