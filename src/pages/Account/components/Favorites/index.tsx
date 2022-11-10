import API_ROUTE from 'api/_api';
import IStore from 'interface/IStore';
import { HeadTitle } from 'pages/Account';
import React, { useRef } from 'react';
import { Favorite, IOrganization } from 'interface'
import { useSelector } from 'react-redux';
import { useSwr, useSwrInfinite, onErrorImg } from 'utils'
import { formatRouterLinkOrg } from 'utils/formatRouterLink/formatRouter'
import style from './favorite.module.css'
import { Link } from 'react-router-dom';
import icon from 'constants/icon';
import { XButton } from 'components/Layout';

function Favorites() {
    const { USER } = useSelector((state: IStore) => state.USER)
    const params = {
        user_id: USER?.id,
    }
    const { resData } = useSwrInfinite(USER?.id, `${API_ROUTE.FAVORITES}`, params)
    return (
        <>
            <HeadTitle title='Đang theo dõi' />
            <div className={style.container}>
                <ul className={style.favorite_list}>
                    {
                        resData
                            ?.slice(0, 10)
                            ?.map((item: Favorite, index: number) => (
                                <li key={index} className={style.favorite_list_item}>
                                    <FavoriteItem favorite={item} />
                                </li>
                            ))
                    }
                </ul>
            </div>
        </>
    );
}

export default Favorites;

const FavoriteItem = ({ favorite }: { favorite: Favorite }) => {
    const { response } = useSwr(API_ROUTE.ORG(favorite?.organization_id), favorite?.organization_id)
    const org: IOrganization = response
    const refLink = useRef<HTMLDivElement>(null)
    const refView = useRef<HTMLDivElement>(null)
    const toggleView = (className: string) => {
        refView.current?.classList.add(className)
    }
    const onHover = () => {
        if (refLink.current) {
            if (refLink.current.offsetTop < window.scrollY + 300) {
                toggleView(style.org_view_show)
            } else {
                toggleView(style.org_view_show_above)
            }
        }

    }
    const onLeave = () => {
        refView.current?.classList.remove(style.org_view_show)
        refView.current?.classList.remove(style.org_view_show_above)
    }
    return (
        <Link
            to={{ pathname: formatRouterLinkOrg(favorite.organization_id) }}
            className={style.favorite_item_cnt}
        >
            <div className={style.favorite_org_img}>
                <img src={org?.image_url} onError={(e) => onErrorImg(e)} alt="" />
            </div>
            <div
                ref={refLink}
                onMouseLeave={onLeave}
                className={style.favorite_org_de}
            >
                <p
                    onMouseEnter={onHover}
                    className={style.org_name}
                >
                    {org?.name}
                </p>
                {
                    org &&
                    <div ref={refView} className={style.org_view}>
                        <div className={style.org_view_cnt}>
                            <div className={style.org_view_cnt_head}>
                                <div className={style.view_left}>
                                    <div className={style.view_left_img}>
                                        <img src={org.image_url} onError={(e) => onErrorImg(e)} alt="" />
                                    </div>
                                </div>
                                <div className={style.view_right}>
                                    <p className={style.view_org_name}>{org.name}</p>
                                    <p className={style.view_org_address}>{org?.full_address}</p>
                                    <p className={style.view_org_address}>
                                        {org.description ? org.description : 'Đang cập nhật...'}
                                    </p>
                                    <p className={style.view_org_f_count}>
                                        <img src={icon.Favorite} alt="" className={style.view_right_icon} />
                                        {org.favorites_count} lượt thích
                                    </p>
                                    <p className={style.view_org_f_count}>
                                        <img src={icon.phonePurple} alt="" className={style.view_right_icon} />
                                        {org.telephone?.join(', ')}
                                    </p>
                                </div>
                            </div>
                            <div className={style.org_view_cnt_bot}>
                                <XButton
                                    title='Đang theo dõi'
                                />
                                <XButton
                                    title='Xem chi tiết'
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Link>
    )
}