import icon from 'constants/icon';
import { IOrganization } from 'interface';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { onErrorImg, clst, formatDistance } from 'utils';
import { XButton } from '../XButton';
import { formatRouterLinkOrg } from 'utils/formatRouterLink/formatRouter'
import { OrgItemMap } from '../OrgItemMap'
import style from './style.module.css'
import { useFavorite } from 'hooks';

interface OrgItemSecProps {
    org: IOrganization,
    changeStyle?: boolean
}

export function OrgItemSec(props: OrgItemSecProps) {
    const { changeStyle } = props;
    const [open, setOpen] = useState(false)
    const [org,] = useState<IOrganization>(props.org)
    const { favoriteSt, onToggleFavorite } = useFavorite({
        org_id: org.id,
        type: 'ORG',
        count: props.org.favorites_count,
        favorite: props.org.is_favorite ?? true
    })
    return (
        <>
            <Link
                to={{
                    pathname: formatRouterLinkOrg(org.subdomain)
                }}
            >
                <div className={changeStyle ? clst([style.container, style.container_ch]) : style.container}>
                    {
                        org.is_momo_ecommerce_enable &&
                        <div className={style.org_on_e}>
                            <img className={style.org_on_e_icon} src={icon.flash} alt="" />
                        </div>
                    }
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
                                        {favoriteSt.favorite_count}
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
                                    src={favoriteSt.is_favorite ? icon.Favorite : icon.favoriteStroke}
                                    alt="" className={style.org_react_cnt_heart_icon}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={changeStyle ? clst([style.org_detail, style.org_detail_ch]) : style.org_detail}>
                        <div>
                            <span className={changeStyle ? clst([style.org_name, style.org_name_ch]) : style.org_name}>{org.name}</span>
                            <span
                                onClick={(e) => {
                                    setOpen(true);
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                className={style.org_address}
                            >
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
                                    <span className={style.org_bot_text}>{favoriteSt.favorite_count}</span>
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
            {
                open &&
                <OrgItemMap
                    open={open} setOpen={setOpen} org={org}
                />
            }
        </>
    );
}