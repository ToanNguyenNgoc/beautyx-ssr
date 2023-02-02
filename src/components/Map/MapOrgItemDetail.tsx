import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import icon from "constants/icon";
import { AppContext } from "context/AppProvider";
import { extraOrgTimeWork } from "../../pages/MerchantDetail/Functions/extraOrg";
import { paramsGalleries } from 'params-query'
import API_ROUTE from "api/_api";
import { IOrganization, IOrgMobaGalleries, Product, Service } from 'interface'
import { useDeviceMobile, useFavorite, useSwr, useSwrInfinite } from "hooks";
import { AUTH_LOCATION } from "api/authLocation";
import img from "constants/img";
import { FullImage, SerProItem, XButton } from "components/Layout";
import { useProductsSpecial, useServicesSpecial } from "pages/MerchantDetail/Functions";
import { formatRouterLinkOrg } from "utils/formatRouterLink/formatRouter";
import style from './map.module.css'

interface IProps {
    org: IOrganization;
    openDetail: any;
    setOpenDetail: any;
    handleDirection?: () => void;
}

export default function MapOrgItemDetail(props: IProps) {
    const { org, setOpenDetail, openDetail } = props;
    const IS_MB = useDeviceMobile()
    const history = useHistory();
    const { t } = useContext(AppContext);
    const refDetail = useRef<HTMLDivElement>(null)
    const refListTime = useRef<HTMLDivElement>(null)
    const refIconTime = useRef<HTMLImageElement>(null)
    const onToggleTime = () => {
        refListTime.current?.classList.toggle(style.org_time_word_body_act)
        refIconTime.current?.classList.toggle(style.time_icon_ch)
    }

    const LOCATION = AUTH_LOCATION()
    const orgResponse: IOrganization = useSwr(
        `${API_ROUTE.ORG(org?.id)}`,
        (org),
        { 'filter[location]': LOCATION }
    ).response
    const galleries: IOrgMobaGalleries[] = useSwrInfinite(
        (org?.id),
        API_ROUTE.GALLERIES_ORG_ID(org?.id),
        paramsGalleries).resData ?? []

    const images_url = galleries.map((img: IOrgMobaGalleries) => {
        const imgChild = img?.images?.map((child: any) => child.image_url)
        return [img.image_url].concat(imgChild)
    }).flat().filter(Boolean)

    const { favoriteSt, onToggleFavorite } = useFavorite({
        org_id: org.id,
        type: 'ORG',
        count: orgResponse?.favorites_count,
        favorite: orgResponse?.is_favorite
    })
    const orgTimes = extraOrgTimeWork(org.opening_time)
    const onClose = () => {
        if (!IS_MB) return setOpenDetail({ ...openDetail, open: false })
        setOpenDetail(false)
    }
    const onOrgDetail = () => {
        if (IS_MB) {
            history.push(formatRouterLinkOrg(org.subdomain))
        } else {
            window.open(formatRouterLinkOrg(org.subdomain), '_blank', 'noopener,noreferrer');
        }
    }

    return (
        <>
            <div className={style.org_detail_cnt}>
                <div className={style.org_detail_head}>
                    <XButton
                        onClick={onClose}
                        className={style.org_detail_head_btn}
                        icon={icon.closeBlack}
                        iconSize={20}
                    />
                </div>
                <div className={style.org_detail}>
                    <div ref={refDetail} className={style.org_detail_banners}>
                        <div className={style.org_banner_linear}></div>
                        <img
                            className={style.org_banner_img}
                            src={images_url[0] ?? org?.image_url ?? img.imgDefault} alt=""
                        />
                        {
                            images_url?.length > 0 &&
                            <div className={style.org_banner_count}>
                                {images_url?.length} {t('Mer_de.galleries')}
                            </div>
                        }
                    </div>
                    <div className={style.org_detail_card}>
                        <div className={style.org_detail_avatar}>
                            <img src={org?.image_url ?? img.imgDefault} alt="" />
                        </div>
                        <div className={style.org_detail_info}>
                            <p className={style.org_name}>{org.name}</p>
                            <p className={style.org_address}>{org.full_address}</p>
                            <div className={style.org_exc}>
                                <div className={style.org_exc_left}>
                                    <XButton
                                        onClick={onOrgDetail}
                                        className={style.org_exc_left_btn}
                                        title={t('app.details')}
                                    />
                                    <div className={style.org_exc_item}>
                                        <img src={icon.heartBoldRed} alt="" />
                                        <span>{favoriteSt.favorite_count}</span>
                                    </div>
                                </div>
                                <XButton
                                    onClick={onToggleFavorite}
                                    className={style.org_exc_right}
                                    icon={favoriteSt?.is_favorite ? icon.heart : icon.unHeart}
                                    iconSize={16}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={style.org_time_word}>
                        <div
                            onClick={onToggleTime}
                            className={style.org_time_word_head}
                        >
                            <p className={style.org_section_title}>{t('pr.open_time')}</p>
                            <img ref={refIconTime}
                                src={icon.chevronRightBlack} className={style.org_time_word_head_icon} alt=""
                            />
                        </div>
                        <div ref={refListTime} className={style.org_time_word_body}>
                            <ul className={style.org_list_time}>
                                {
                                    orgTimes.map((time: any, index: number) => (
                                        <li
                                            style={time.todayAct ? {
                                                color: 'var(--green)'
                                            } : {}}
                                            key={index} className={style.org_list_time_item}
                                        >
                                            <span className={style.time_day}>{time.day_week}</span>
                                            {
                                                time.status === 'on' ?
                                                    <div className={style.time_word}>
                                                        {t('se.from')} <h4 style={{ marginRight: '16px' }} >{time.from_time_opening}</h4> {t('se.to')} <h4>{time.to_time_opening}</h4>
                                                    </div>
                                                    :
                                                    <div className={style.time_word}>----</div>
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        {images_url?.length > 0 && <OrgImage images_url={images_url} />}
                        <OrgSpecial org={org} />
                    </div>
                </div>
            </div>
        </>
    );
}

const OrgImage = ({ images_url }: { images_url: string[] }) => {
    const { t } = useContext(AppContext)
    return (
        <>
            <p className={style.org_section_title}>{t('Mer_de.galleries')}</p>
            <div className={style.org_galleries}>
                <ul className={style.org_galleries_list}>
                    {
                        images_url.map((image_url: string) => (
                            <li key={image_url} className={style.org_gallery_item}>
                                <OrgImageItem image_url={image_url} />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}
const OrgImageItem = ({ image_url }: { image_url: string }) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <img onClick={() => setOpen(true)} src={image_url} className={style.org_gallery_item_img} alt="" />
            <FullImage
                open={open} setOpen={setOpen} src={[image_url]}
            />
        </>
    )
}
const OrgSpecial = ({ org }: { org: IOrganization }) => {
    const { t } = useContext(AppContext)
    const { services_special } = useServicesSpecial(org)
    const { products_special } = useProductsSpecial(org)
    return (
        <>
            {
                services_special?.length > 0 &&
                <div className={style.org_special_cnt}>
                    <p className={style.org_section_title}>{t('Mer_de.services')}</p>
                    <div className={style.org_special_par}>
                        <ul className={style.org_special_list}>
                            {
                                services_special?.map((item: Service, index: number) => (
                                    <li key={index} className={style.org_special_item}>
                                        <SerProItem
                                            item={item}
                                            org={org}
                                            type='SERVICE'
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            }
            {
                products_special?.length > 0 &&
                <div className={style.org_special_cnt}>
                    <p className={style.org_section_title}>{t('Mer_de.products')}</p>
                    <div className={style.org_special_par}>
                        <ul className={style.org_special_list}>
                            {
                                products_special?.map((item: Product, index: number) => (
                                    <li key={index} className={style.org_special_item}>
                                        <SerProItem
                                            item={item}
                                            org={org}
                                            type='PRODUCT'
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            }
        </>
    )
}
