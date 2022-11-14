/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import HomeTitle from '../Components/HomeTitle';
import { ParamOrg } from 'params-query/param.interface';
import { formatDistance, onErrorImg, useDeviceMobile, useSwr } from 'utils';
import style from './home-distance.style.module.css';
import API_ROUTE from 'api/_api';
import { IOrganization, IOrgMobaGalleries, ITag } from 'interface';
import { Link } from 'react-router-dom';
import { formatRouterLinkOrg } from 'utils/formatRouterLink/formatRouter';
import { XButton } from 'components/Layout';
import { LoadGrid } from 'components/LoadingSketion';
import icon from 'constants/icon';
import { AUTH_LOCATION } from 'api/authLocation';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeFilterOrg, onResetFilter, onResetFilterOrg } from 'redux/filter-result';
import IStore from 'interface/IStore';
import Skeleton from 'react-loading-skeleton';

function HomeOrgDistance() {
    const dispatch = useDispatch()
    const { tags } = useSelector((state: any) => state.HOME)
    const { ORG_PR } = useSelector((state: IStore) => state.FILTER_RESULT)
    const LOCATION = AUTH_LOCATION()
    const IS_MB = useDeviceMobile()
    useEffect(() => {
        dispatch(onResetFilterOrg())
    }, [])
    const params: ParamOrg = {
        ...ORG_PR,
        "limit": 8,
        "filter[is_momo_ecommerce_enable]": true,
        "filter[location]": LOCATION,
        "sort": "-priority"
    }
    const { responseArray, isValidating } = useSwr(API_ROUTE.ORGS, true, params)

    const onViewMore = () => {
        dispatch(onResetFilter())
        dispatch(onChangeFilterOrg({
            ...params,
            "limit": 15,
            "filter[location]": LOCATION,
            "filter[is_momo_ecommerce_enable]": true,
        }))
    }
    const onChangeTag = (item: ITag) => {
        dispatch(onChangeFilterOrg({
            ...params,
            "filter[tags]": item.name
        }))
    }

    return (
        <div className={style.container}>
            <HomeTitle
                onClick={onViewMore}
                url={`/ket-qua-tim-kiem/cua-hang`}
                title={'Gần bạn'} seemore="Xem tất cả >"
            />
            <div className={style.org_filter_cnt}>
                {tags.length === 0 && <TagSkelton />}
                <ul className={style.tag_list}>
                    {
                        tags
                            .slice(0, 7)
                            .map((item: ITag) => (
                                <li
                                    key={item.id}
                                    style={item.name === ORG_PR['filter[tags]'] ? {
                                        backgroundColor: "var(--purple)",
                                        color: 'var(--bg-white)'
                                    } : {}}
                                    onClick={() => onChangeTag(item)}
                                    className={style.tag_item}
                                >
                                    {item.name}
                                </li>
                            ))
                    }
                </ul>
            </div>
            {
                responseArray?.length === 0 &&
                isValidating &&
                (IS_MB ? <OrgSkelton /> : <LoadGrid grid={4} item_count={8} />)
            }
            <div className={style.org_list_cnt}>
                <ul className={style.org_list}>
                    {responseArray?.map((item: IOrganization) => (
                        <li key={item.id} className={style.org_list_item}>
                            <OrgDistanceItem org={item} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HomeOrgDistance;

const OrgDistanceItem = ({ org }: { org: IOrganization }) => {
    const { responseArray } = useSwr(API_ROUTE.GALLERIES_ORG_ID(org?.id), org?.id)
    const galleries: IOrgMobaGalleries[] = responseArray
    return (
        <Link
            className={style.org_card_item}
            to={{ pathname: formatRouterLinkOrg(org.subdomain) }}
        >
            <div className={style.org_img_cnt}>
                {
                    galleries.length > 0 ?
                        <img
                            className={style.org_avatar} src={galleries[0]?.image_url} alt=""
                            onError={(e) => onErrorImg(e)}
                        />
                        :
                        <img
                            className={style.org_avatar} src={org.image_url} alt=""
                            onError={(e) => onErrorImg(e)}
                        />
                }
            </div>
            <div className={style.org_detail}>
                {
                    org.distance &&
                    <XButton
                        icon={icon.pinMapRed}
                        iconSize={12}
                        title={formatDistance(org.distance)}
                        className={style.btn_distance}
                    />
                }
                <div className={style.org_name_cnt}>
                    <div className={style.org_de_avt}>
                        <img src={org.image_url} onError={(e) => onErrorImg(e)} alt="" />
                    </div>
                    <span className={style.org_de_name}>{org.name}</span>
                </div>
                <span className={style.org_address}>
                    {org.full_address}
                </span>
            </div>
        </Link>
    )
}

const TagSkelton = () => {
    const count = [1, 2, 3, 4, 5]
    return (
        <ul className={style.tag_list}>
            {
                count
                    .map(item => (
                        <li key={item} className={style.tag_item_load}
                        >
                            <Skeleton width={"84px"} height={"30px"} />
                        </li>
                    ))
            }
        </ul>
    )
}
const OrgSkelton = () => {
    const count = [1, 2, 3, 4, 5]
    return (
        <div className={style.org_list_cnt}>
            <ul className={style.org_list}>
                {count?.map(item => (
                    <li key={item} className={style.org_list_item_load}>
                        <div className={style.load_img}>
                            <Skeleton height={'100%'} width={'100%'} />
                        </div>
                        <div className={style.load_detail}>
                            <Skeleton width={'100%'} height={'52px'} />
                            <Skeleton width={'100%'} height={'16px'} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}