import icon from 'constants/icon';
import img from 'constants/img';
import { IBranchV3 } from 'interface';
import { Link } from 'react-router-dom';
import { clst, onErrorImg, formatDistanceKM } from 'utils';
import { formatRouterLinkOrg } from 'utils/formatRouterLink/formatRouter';
import { XButton } from '../XButton';
import style from './branch-item.module.css'

export function BranchV3Item({ branch, changeStyle }: { branch: IBranchV3, changeStyle?:boolean }) {
    return (
        <>
            <Link
                to={{
                    pathname: formatRouterLinkOrg(branch.subdomain ?? branch.organization_id)
                }}
            >
                <div className={changeStyle ? clst([style.container, style.container_ch]) : style.container}>
                    {
                        branch.is_momo_ecommerce_enable &&
                        <div className={style.org_on_e}>
                            <img className={style.org_on_e_icon} src={icon.flash} alt="" />
                        </div>
                    }
                    <div className={
                        changeStyle ? (clst([style.img_container, style.img_container_ch])) : style.img_container
                    }>
                        <img
                            className={changeStyle ? clst([style.org_img, style.org_img_ch]) : style.org_img}
                            src={branch.image_url ?? img.imgDefault}
                            onError={(e) => onErrorImg(e)} alt=""
                        />
                        {/* <div
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
                        </div> */}
                    </div>
                    <div className={changeStyle ? clst([style.org_detail, style.org_detail_ch]) : style.org_detail}>
                        <div>
                            <span className={changeStyle ? clst([style.org_name, style.org_name_ch]) : style.org_name}>
                                {branch.name}
                            </span>
                            <span className={style.org_address}>
                                {branch.full_address}
                            </span>
                        </div>
                        <div className={changeStyle ? clst([style.org_bot, style.org_bot_ch]) : style.org_bot}>
                            {/* {
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
                            } */}
                            <div className={style.org_bot_star}>
                                <img src={icon.star} className={style.org_bot_icon} alt="" />
                                <span className={style.org_bot_text}>5</span>
                            </div>
                            {/* {
                                changeStyle &&
                                <div className={style.org_bot_star}>
                                    <img src={icon.heart} className={style.org_bot_icon} alt="" />
                                    <span className={style.org_bot_text}>{favoriteSt.favorite_count}</span>
                                </div>
                            } */}
                            {
                                branch.distance &&
                                <XButton
                                    className={clst([style.org_branch_btn, style.org_map_btn])}
                                    icon={icon.pinMapRed}
                                    iconSize={12}
                                    title={`${formatDistanceKM(branch.distance)}`}
                                />
                            }
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}