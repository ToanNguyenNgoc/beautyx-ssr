import { Container } from '@mui/system';
import API_ROUTE from 'api/_api';
import { SerProItem } from 'components/Layout';
import img from 'constants/img';
import { useDeviceMobile, useSwr, useSwrInfinite, useTags } from 'hooks';
import { IOrganization, IServicePromo, ITag } from 'interface';
import IStore from 'interface/IStore';
import { paramOrgs } from 'params-query';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onSetCateChildId, onSetCateParentId } from 'redux/cates-tree';
import { clst, onErrorImg } from 'utils';
import style from './cate-tree.module.css'

function CateTree() {
    const IS_MB = useDeviceMobile()
    const { tagsServiceLevel1, queryTag } = useTags()
    const dispatch = useDispatch()
    const CATE = useSelector((state: IStore) => state.CATE)
    const parentId = CATE.parentId ?? tagsServiceLevel1[0]?.id
    const tagsParent = queryTag(parentId, 'SERVICE')
    const childId = CATE.childId ?? (tagsParent?.children ? tagsParent?.children[0]?.id : 0)


    const {orgs} = useOrgsByTag(tagsParent)

    const services = useSwrInfinite(
        true,
        API_ROUTE.SERVICES,
        { 'filter[keyword]': 'phun xăm', 'limit': '20' }
    ).resData

    const handleSetCateParentId = (id: number) => {
        dispatch(onSetCateParentId(id))
    }
    const handleSetCateChildId = (id: number) => {
        dispatch(onSetCateChildId(id))
    }

    return (
        <>
            <Container>
                <div className={style.container}>
                    <div className={style.left}>
                        <ul className={style.left_cate_par_list}>
                            {
                                tagsServiceLevel1?.map((item, index: number) => (
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
                            <p className={style.right_org_cnt_label}>Cửa hàng</p>
                            <ul className={style.right_org_list}>
                                {
                                    orgs?.map((org: IOrganization) => (
                                        <li key={org.id} className={style.right_org_item}>
                                            <div className={style.right_org_item_img}>
                                                <img
                                                    src={org.image_url ?? img.imgDefault}
                                                    onError={(e) => onErrorImg(e)} alt=""
                                                />
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className={style.services_cnt}>
                            <ul className={style.service_list}>
                                {
                                    services?.map((service: IServicePromo) => (
                                        <li key={service.service_id} className={style.service_list_item}>
                                            <SerProItem changeStyle={IS_MB} item={service} type='SERVICE' />
                                        </li>
                                    ))
                                }
                            </ul>
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
        { ...paramOrgs, 'filter[tags]': parent?.name, 'limit': '12' }
    )
    const orgs: IOrganization[] = resData ?? []
    const totalOrg = totalItem ?? 1
    const loadOrgs = isValidating
    return { orgs, totalOrg, loadOrgs }
}