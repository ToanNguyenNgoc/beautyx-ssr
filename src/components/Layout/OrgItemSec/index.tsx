import favorites from 'api/favorite';
import icon from 'constants/icon';
import { IOrganization } from 'interface';
import IStore from 'interface/IStore';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { onErrorImg, clst, formatDistance } from 'utils';
import { XButton } from '../XButton';
import { formatRouterLinkOrg } from 'utils/formatRouterLink/formatRouter'
import OrgBranches from './OrgBranches'
import style from './style.module.css'

interface OrgItemSecProps {
    org: IOrganization,
    changeStyle?: boolean
}

export function OrgItemSec(props: OrgItemSecProps) {
    const history = useHistory()
    const { changeStyle } = props;
    const [open, setOpen] = useState(false)
    const [org, setSetOrg] = useState<IOrganization>(props.org)
    const { USER } = useSelector((state: IStore) => state.USER)
    const handleFavorite = async () => {
        if (!org.is_favorite) {
            await favorites.postFavorite(org.id)
            setSetOrg({
                ...org,
                is_favorite: true,
                favorites_count: org.favorites_count + 1
            })
        } else {
            await favorites.deleteFavorite(org.id)
            setSetOrg({
                ...org,
                is_favorite: false,
                favorites_count: org.favorites_count - 1
            })
        }
    }
    const onToggleFavorite = () => {
        if (USER) return handleFavorite()
        if (!USER) return history.push('/sign-in?1')
    }
    return (
        <>
            <Link
                to={{
                    pathname: formatRouterLinkOrg(org.subdomain)
                }}
            >
                <div className={changeStyle ? clst([style.container, style.container_ch]) : style.container}>
                    <div className={
                        changeStyle ? (clst([style.img_container, style.img_container_ch])) : style.img_container
                    }>
                        <img
                            className={changeStyle ? clst([style.org_img, style.org_img_ch]) : style.org_img}
                            src={org.image_url}
                            onError={(e) => onErrorImg(e)} alt=""
                        />
                        <div
                            className={changeStyle ? clst([style.org_react_cnt, style.org_react_cnt_ch]) : style.org_react_cnt}
                        >
                            <div className={style.org_react_cnt_heart}>
                                {
                                    !changeStyle &&
                                    <span
                                        className={style.org_react_cnt_heart_count}>
                                        {org.favorites_count}
                                    </span>
                                }
                                <img
                                    onClick={(e) => {
                                        onToggleFavorite()
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    style={changeStyle ? {
                                        width: "20px",
                                        height: "20px",
                                    } : {}}
                                    src={org.is_favorite ? icon.Favorite : icon.favoriteStroke}
                                    alt="" className={style.org_react_cnt_heart_icon}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={changeStyle ? clst([style.org_detail, style.org_detail_ch]) : style.org_detail}>
                        <div>
                            <span className={changeStyle ? clst([style.org_name, style.org_name_ch]) : style.org_name}>{org.name}</span>
                            <span className={style.org_address}>
                                {org.full_address}
                            </span>
                        </div>
                        <div className={changeStyle ? clst([style.org_bot, style.org_bot_ch]) : style.org_bot}>
                            {
                                org.branches?.length > 0 &&
                                <XButton
                                    onClick={(e) => {
                                        setOpen(true);
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    className={style.org_branch_btn}
                                    title={`${org.branches?.length} chi nhánh`}
                                />
                            }
                            <div className={style.org_bot_star}>
                                <img src={icon.star} className={style.org_bot_icon} alt="" />
                                <span className={style.org_bot_text}>5</span>
                            </div>
                            {
                                changeStyle &&
                                <div className={style.org_bot_star}>
                                    <img src={icon.heart} className={style.org_bot_icon} alt="" />
                                    <span className={style.org_bot_text}>{org.favorites_count}</span>
                                </div>
                            }
                            {
                                org.distance &&
                                <XButton
                                    className={clst([style.org_branch_btn, style.org_map_btn])}
                                    icon={icon.pinMapRed}
                                    iconSize={12}
                                    title={formatDistance(org.distance)}
                                />
                            }
                        </div>
                    </div>
                </div>
            </Link>
            <OrgBranches
                open={open} setOpen={setOpen} org={org}
            />
        </>
    );
}