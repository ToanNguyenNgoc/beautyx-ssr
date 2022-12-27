import API_ROUTE from 'api/_api';
import IStore from 'interface/IStore';
import { HeadTitle } from 'pages/Account';
import React, { useContext, useRef } from 'react';
import { Favorite } from 'interface'
import { useSelector } from 'react-redux';
import { onErrorImg } from 'utils'
import { formatRouterLinkOrg } from 'utils/formatRouterLink/formatRouter'
import style from './favorite.module.css'
import { Link } from 'react-router-dom';
import icon from 'constants/icon';
import { XButton } from 'components/Layout';
import Skeleton from 'react-loading-skeleton';
import { AppContext } from 'context/AppProvider';
import { useSwrInfinite } from 'hooks';

function Favorites() {
    const {t} = useContext(AppContext)
    const { USER } = useSelector((state: IStore) => state.USER)
    const params = {
        'user_id': USER?.id,
        'limit': 14,
        'filter[favoritetable]': true,
        'include': 'organization'
    }
    const { resData, onLoadMore, totalItem, isValidating } = useSwrInfinite(USER?.id, `${API_ROUTE.FAVORITES}`, params)
    return (
        <>
            <HeadTitle title={t('Header.Following')} />
            <div className={style.container}>
                <ul className={style.favorite_list}>
                    {
                        resData?.map((item: Favorite, index: number) => (
                            <li key={index} className={style.favorite_list_item}>
                                <FavoriteItem favorite={item} />
                            </li>
                        ))
                    }
                </ul>
                {resData.length === 0 && <LoadSkelton />}
                {
                    resData.length >= 12 && resData.length < totalItem &&
                    <div className={style.favorite_list_btn}>
                        <XButton
                            onClick={onLoadMore}
                            loading={isValidating}
                            title={t('Mer_de.view_more')}
                        />
                    </div>
                }
            </div>
        </>
    );
}

export default Favorites;

const FavoriteItem = ({ favorite }: { favorite: Favorite }) => {
    const org = favorite.organization
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
            to={{ pathname: formatRouterLinkOrg(favorite.organization?.subdomain) }}
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
const LoadSkelton = () => {
    const counts = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <ul className={style.favorite_list}>
            {
                counts.map(i => (
                    <div key={i} className={style.favorite_list_item}>
                        <div className={style.load_item}>
                            <div className={style.load_item_img}>
                                <Skeleton width={'100%'} height={'100%'} />
                            </div>
                            <div className={style.load_item_img_right}>
                                <Skeleton width={'100%'} height={'100%'} />
                            </div>
                        </div>
                    </div>
                ))
            }
        </ul>
    )
}