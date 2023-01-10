import React, { useContext, useEffect } from 'react';
import HomeTitle from '../Components/HomeTitle';
import { ParamOrg } from 'params-query/param.interface';
import { formatDistance, onErrorImg } from 'utils';
import style from './home-distance.style.module.css';
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
import { useDeviceMobile } from 'hooks';
import { AppContext } from 'context/AppProvider';
import img from 'constants/img';
import {
    useGalleriesQuery,
    useOrgsDistanceQuery
} from 'redux-toolkit-query/hook-home';

function HomeOrgDistance() {
    const { t } = useContext(AppContext)
    const dispatch = useDispatch()
    const { tags } = useSelector((state: any) => state.HOME)
    const { ORG_PR } = useSelector((state: IStore) => state.FILTER_RESULT)
    const LOCATION = AUTH_LOCATION()
    const IS_MB = useDeviceMobile()
    useEffect(() => {
        dispatch(onResetFilterOrg())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const params: ParamOrg = {
        ...ORG_PR,
        "limit": 4,
        "filter[is_momo_ecommerce_enable]": true,
        "filter[location]": LOCATION,
        "sort":""
    }
    const { data, isFetching } = useOrgsDistanceQuery(params)
    const orgs: IOrganization[] = data ?? []

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
                title={t('Home.near_you')} seemore={t('detail_item.see_more') + '>'}
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
                isFetching &&
                (IS_MB ? <OrgSkelton /> : <LoadGrid grid={4} item_count={4} />)
            }
            <div className={style.org_list_cnt}>
                <ul className={style.org_list}>
                    {orgs.map((item: IOrganization) => (
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
    const { data } = useGalleriesQuery(org.subdomain)
    const galleries: IOrgMobaGalleries[] = data ?? []
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
                            className={style.org_avatar} src={org.image_url ?? img.imgDefault} alt=""
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
                        <img src={org.image_url ?? img.imgDefault} onError={(e) => onErrorImg(e)} alt="" />
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