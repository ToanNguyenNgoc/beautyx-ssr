import React from 'react';
import HomeTitle from '../Components/HomeTitle';
import { paramOrgs } from 'params-query';
import { ParamOrg } from 'params-query/param.interface';
import { formatDistance, onErrorImg, useSwr } from 'utils';
import style from './home-distance.style.module.css';
import API_ROUTE from 'api/_api';
import { IOrganization, IOrgMobaGalleries } from 'interface';
import { Link } from 'react-router-dom';
import { formatRouterLinkOrg } from 'utils/formatRouterLink/formatRouter';
import { XButton } from 'components/Layout';
import icon from 'constants/icon';


function HomeOrgDistance() {
    const params: ParamOrg = {
        ...paramOrgs,
        "limit": 8,
        "filter[is_momo_ecommerce_enable]": true,
        "filter[location]": "10.7993172,106.6854014",
        "include": "tags|province|district"
    }
    const { responseArray } = useSwr(API_ROUTE.ORGS, true, params)
    return (
        <div className={style.container}>
            <HomeTitle title={'Gần bạn'} seemore="Xem tất cả >" />
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
                <XButton
                    icon={icon.pinMapRed}
                    iconSize={12}
                    title={formatDistance(org.distance)}
                    className={style.btn_distance}
                />
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