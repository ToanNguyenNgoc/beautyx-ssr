/* eslint-disable react-hooks/exhaustive-deps */
import { useRouteMatch, useHistory, Link } from 'react-router-dom';
import { useDeviceMobile, useFavorite, useGetParamUrl, useSwr } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import LoadDetail from 'components/LoadingSketion/LoadDetail';
import Head from 'features/Head';
import { DetailProp } from './detail.interface'
import formatPrice, { formatSalePriceService } from 'utils/formatPrice';
import { IDiscountPar, IOrganization } from 'interface';
import API_ROUTE from 'api/_api';
import { XButton } from 'components/Layout';
import { Container } from '@mui/system';
import { Drawer, Rating } from '@mui/material';
import style from './detail.module.css'
import Slider from 'react-slick';
import icon from 'constants/icon';
import { clst, formatDistance, onErrorImg } from 'utils';
import { formatRouterLinkOrg } from 'utils/formatRouterLink/formatRouter';
import { AUTH_LOCATION } from 'api/authLocation';
import { formatAddCart } from 'utils/cart/formatAddCart';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'interface/IStore';
import { addCart } from 'redux/cartSlice';
import { PopupMessage } from 'components/Notification';
import { clearAllServices } from 'redux/servicesBookSlice';
import { IS_VOUCHER } from 'utils/cart/checkConditionVoucher';

interface RouteType {
    path: string,
    type: 'SERVICE' | 'PRODUCT' | 'COMBO',
    api: string,
    params: any
}

const routeType: RouteType[] = [
    {
        path: 'dich-vu', type: 'SERVICE', api: 'services', params: {
            'include': 'category|favorites_count',
            'append': 'is_favorite|rating|bought_count'
        }
    },
    {
        path: 'san-pham', type: 'PRODUCT', api: 'products', params: {
            'append': 'is_favorite|rating',
            'include': 'category|favorites_count'
        }
    },
    {
        path: 'combo-detail', type: 'COMBO', api: 'treatment_combo', params: {
            'include': 'products|services'
        }
    }
]

function SerProCoDetail() {
    const match = useRouteMatch()
    const history = useHistory()
    const LOCATION = AUTH_LOCATION()
    const IS_MB = useDeviceMobile()
    const currentRoute = match.url.split('/').slice(-1)[0]
    const currentRouteType = routeType.find(i => i.path === currentRoute)
    const paramsArr = useGetParamUrl();
    let redirectPageError = false
    const params = {
        org: parseInt(paramsArr[1]),
        id: parseInt(paramsArr[0])
    }
    if (!params.id || !params.org) redirectPageError = true
    if (!currentRouteType) redirectPageError = true

    const { response, error } = useSwr(
        `/organizations/${params.org}/${currentRouteType?.api}/${params.id}`,
        (params.id && params.org && currentRouteType),
        currentRouteType?.params ?? {}
    )
    if (error) redirectPageError = true
    useEffect(() => {
        if (redirectPageError) {
            history.replace('/error')
        }
    }, [redirectPageError])

    const DETAIL: DetailProp = {
        name: response?.service_name ?? response?.name ?? response?.product_name ?? '...',
        type: currentRouteType?.type,
        SPECIAL_PRICE: formatSalePriceService(response?.special_price, response?.special_price_momo),
        PRICE: currentRouteType?.type === 'COMBO' ? response?.use_value : (response?.price ?? response?.retail_price),
        ...response
    }
    const PERCENT = Math.ceil(100 - DETAIL.SPECIAL_PRICE / DETAIL.PRICE * 100)
    const org: IOrganization = useSwr(API_ROUTE.ORG(params.org), params.org, {
        'filter[location]': LOCATION
    }).response
    // const { responseArray } = useSwr(API_ROUTE.DISCOUNTS, params?.org, {
    //     'filter[organization_id]': params?.org
    // })
    const discounts: IDiscountPar[] = []
    const { favoriteSt, onToggleFavorite } = useFavorite({
        id: DETAIL.id,
        type: currentRouteType?.type ?? 'SERVICE',
        count: DETAIL.favorites_count,
        favorite: DETAIL.is_favorite,
        org_id: org?.id
    })
    let onCommerce = false
    if (org?.is_momo_ecommerce_enable && DETAIL?.is_momo_ecommerce_enable) onCommerce = true
    //---
    // const mediaArray: any[] = [DETAIL.video_url, DETAIL.image_url]
    const settings = {
        dots: false,
        arrows: false,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        // nextArrow: <NextButton />,
        // prevArrow: <PrevButton />,
        swipe: true,
    }
    //navigate---
    const onNavigateCateList = () => {
        if (org?.id) {
            history.push(`/cua-hang/${org.subdomain}/dich-vu?cate_id=${DETAIL.category?.id}`)
        }
    }

    return (
        response && org ?
            <>
                {IS_MB ? <></> : <Head title={DETAIL.name} />}
                <Container>
                    <div className={style.container}>
                        <div className={style.container_head}>
                            <div className={style.container_head_left}>
                                <div className={style.container_head_img_slide}
                                >
                                    <Slider
                                        {...settings}
                                        className={style.slide}
                                    >
                                        {
                                            DETAIL.video_url &&
                                            <div className={style.media_item_video}>
                                                <video
                                                    className={style.media_item_bg}
                                                    src={DETAIL.video_url}>

                                                </video>
                                                <video
                                                    className={style.video_container}
                                                    loop
                                                    controls
                                                    webkit-playsinline="webkit-playsinline"
                                                    playsInline={true}
                                                >
                                                    <source src={DETAIL.video_url} />
                                                </video>
                                            </div>
                                        }
                                        {
                                            [DETAIL.image_url].map(i => (
                                                <div
                                                    style={IS_MB ? {
                                                        height: `414px`
                                                    } : {}}
                                                    key={i} className={style.media_item_img}
                                                >
                                                    <img src={i} alt="" />
                                                </div>
                                            ))
                                        }
                                    </Slider>
                                </div>
                                <div className={style.container_head_img_thumb}>

                                </div>
                            </div>
                            <div className={style.container_head_right}>
                                <div>
                                    {
                                        DETAIL.category &&
                                        <div className={style.detail_cate}>
                                            Loại: <span onClick={onNavigateCateList}>{DETAIL.category?.name}</span>
                                        </div>
                                    }
                                    <span className={style.detail_name}>{DETAIL.name}</span>
                                    <div className={style.duration}>
                                        {
                                            DETAIL.duration > 0 &&
                                            <div className={style.duration_item}>
                                                <img src={icon.clockGray} className={style.duration_item_icon} alt="" />
                                                <span className={style.duration_item_text}>{DETAIL.duration} phút</span>
                                            </div>
                                        }
                                    </div>
                                    <div className={style.detail_buy}>
                                        <div className={style.detail_price}>
                                            <div className={style.detail_price_left}>
                                                {
                                                    DETAIL.SPECIAL_PRICE > 0 &&
                                                    <span className={style.price_percent}>
                                                        -{PERCENT}%
                                                    </span>
                                                }
                                                <div className={style.price}>
                                                    {DETAIL.SPECIAL_PRICE > 0 && <span>{formatPrice(DETAIL.SPECIAL_PRICE)}đ</span>}
                                                    <span>{formatPrice(DETAIL.PRICE)}đ</span>
                                                </div>
                                            </div>
                                            <div className={style.detail_price_right}>
                                                <XButton
                                                    className={style.right_btn}
                                                    icon={favoriteSt.is_favorite ? icon.heart : icon.unHeart}
                                                    iconSize={20}
                                                    onClick={onToggleFavorite}
                                                />
                                            </div>
                                        </div>
                                        <div className={style.detail_rate}>
                                            <div className={style.detail_rate_item}>
                                                <Rating name="read-only" value={5} readOnly />
                                            </div>
                                            <div className={style.detail_rate_item}>
                                                <span className={style.detail_rate_item_count}>{favoriteSt.favorite_count}</span>
                                                <img src={icon.heart} className={style.detail_rate_icon} alt="" />
                                            </div>
                                            {
                                                DETAIL.bought_count &&
                                                <div className={style.detail_rate_item}>
                                                    <span className={style.detail_rate_item_count}>
                                                        {DETAIL.bought_count} đã bán
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {!IS_MB && <DetailOrgCard org={org} />}
                                </div>
                                {
                                    !IS_MB &&
                                    <>
                                        {
                                            onCommerce ? <DetailQuantity discounts={discounts} org={org} detail={DETAIL} />
                                                :
                                                <p className={style.detail_dis}>Sản phẩm/ Dịch vụ này chưa được bán Online</p>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <DetailDesc detail={DETAIL} />
                    {
                        IS_MB &&
                        <DetailBottom PERCENT={PERCENT} discounts={discounts} org={org} detail={DETAIL} />
                    }
                </Container>
            </>
            :
            <LoadDetail />
    );
}

export default SerProCoDetail

const DetailOrgCard = ({ org }: { org: IOrganization }) => {
    const { favoriteSt, onToggleFavorite } = useFavorite({
        org_id: org?.id,
        type: 'ORG',
        count: org?.favorites_count,
        favorite: org?.is_favorite
    })
    return (
        <div className={style.detail_org}>
            <div className={style.detail_org_left}>
                <div className={style.org_avatar}>
                    <img src={org?.image_url} onError={(e) => onErrorImg(e)} alt="" />
                </div>
                <div className={style.org_detail}>
                    <p className={style.org_name}>{org?.name}</p>
                    <p className={style.org_address}>{org?.full_address}</p>
                    {
                        org?.distance &&
                        <div className={style.org_distance}>
                            <img src={icon.pinMapRed} alt="" />
                            <span>{formatDistance(org?.distance)}</span>
                        </div>
                    }
                </div>
            </div>
            <div className={style.detail_org_right}>
                <Link
                    className={style.detail_org_right_btn}
                    to={{ pathname: formatRouterLinkOrg(org?.subdomain) }}
                >
                    Chi tiết
                </Link>
                <XButton
                    style={favoriteSt.is_favorite ? {
                        backgroundColor: 'var(--red-cl)',
                        color: 'var(--bg-white)'
                    } : {}}
                    title={favoriteSt.is_favorite ? 'Đã thích' : 'Yêu thích'}
                    className={clst([style.detail_org_right_btn, style.detail_org_link])}
                    onClick={onToggleFavorite}
                />
            </div>
        </div>
    )
}
const DetailDesc = ({ detail }: { detail: DetailProp }) => {
   const [more, setMore] = useState(false)
    return (
        <div className={style.container_desc}>
            <p className={style.container_desc_title}>
                Mô tả chi tiết
            </p>
            <div 
                style={more?{height:'max-content',  maxHeight: 'unset'}:{}}
                className={style.container_desc_content}
            >
                <div>{detail.description}</div>
               {!more && <div className={style.gradient}></div>}
            </div>
            <XButton
                onClick={()=> setMore(!more)}
                className={style.view_more_btn}
                title={more ? 'Thu gọn':'Xem thêm'}
            />
        </div>
    )
}
const DetailBottom = (
    { detail, org, discounts, PERCENT }:
        { detail: DetailProp, org: IOrganization, discounts: IDiscountPar[], PERCENT: number }
) => {
    const [dra, setDra] = useState({
        open: false, type: ''
    })
    return (
        <div className={style.bottom}>
            <XButton
                title='Đặt hẹn ngay'
                onClick={() => setDra({ open: true, type: 'NOW' })}
            />
            <XButton
                title='Thêm vào giỏ hàng'
                onClick={() => setDra({ open: true, type: 'ADD_CART' })}
            />
            <Drawer anchor='bottom' open={dra.open} onClose={() => setDra({ open: false, type: '' })} >
                <div className={style.bottom_wrapper}>
                    <div className={style.bottom_detail}>
                        <img src={detail.image_url} className={style.bottom_detail_img} alt="" />
                        <div className={style.bottom_detail_info}>
                            <p className={detail.name}>{detail.name}</p>
                            <div className={style.duration}>
                                {
                                    detail.duration > 0 &&
                                    <div className={style.duration_item}>
                                        <img src={icon.clockGray} className={style.duration_item_icon} alt="" />
                                        <span className={style.duration_item_text}>{detail.duration} phút</span>
                                    </div>
                                }
                            </div>
                            <div className={style.detail_price_left}>
                                {
                                    detail.SPECIAL_PRICE > 0 &&
                                    <span className={style.price_percent}>
                                        -{PERCENT}%
                                    </span>
                                }
                                <div className={style.price}>
                                    {detail.SPECIAL_PRICE > 0 && <span>{formatPrice(detail.SPECIAL_PRICE)}đ</span>}
                                    <span>{formatPrice(detail.PRICE)}đ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DetailQuantity draType={dra.type} org={org} detail={detail} discounts={discounts} />
                </div>
            </Drawer>
        </div>
    )
}
const DetailQuantity = (
    { detail, org, discounts, draType }:
        { detail: DetailProp, org: IOrganization, discounts: IDiscountPar[], draType?: string }
) => {
    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false)
    const vouchers = IS_VOUCHER(discounts);
    const dispatch = useDispatch()
    const { USER } = useSelector((state: IStore) => state.USER)
    const history = useHistory()
    const onDescQuantity = () => quantity > 1 && setQuantity(quantity - 1)
    const checkType = () => {
        let typeNumber
        switch (detail.type) {
            case 'COMBO':
                typeNumber = 3
                break;
            case 'SERVICE':
                typeNumber = 2
                break;
            case 'PRODUCT':
                typeNumber = 1
                break;
            default:
                break;
        }
        return typeNumber
    }
    const handleAddCart = () => {
        const sale_price = detail.SPECIAL_PRICE > 0 ? detail.SPECIAL_PRICE : detail.PRICE
        const is_type = checkType()
        const values = formatAddCart(detail, org, is_type, quantity, sale_price);
        if (USER) {
            const valuesCart = {
                ...values,
                cart_id: parseInt(`${USER.id}${values.cart_id}`),
                user_id: USER.id
            }
            dispatch(addCart(valuesCart))
            setOpen(true)
        } else {
            history.push("/sign-in?1")
        }
    }
    const onBookingNow = () => {
        if (USER) {
            const services = [{ service: detail, quantity: quantity }];
            const TYPE = "BOOK_NOW";
            history.push({
                pathname: "/dat-hen",
                state: { org, services, TYPE, vouchers },
            })
            dispatch(clearAllServices());
        } else {
            history.push("/sign-in?1")
        }
    }
    return (
        <div className={style.detail_cart}>
            <div className={style.detail_quantity}>
                <span className={style.detail_quantity_title}>Số lượng</span>
                <div className={style.detail_quantity_calc}>
                    <XButton
                        title='-'
                        className={style.detail_quantity_btn}
                        onClick={onDescQuantity}
                    />
                    <span className={style.quantity}>{quantity}</span>
                    <XButton
                        title='+'
                        className={style.detail_quantity_btn}
                        onClick={() => setQuantity(quantity + 1)}
                    />
                </div>
            </div>
            <div className={style.add_cart}>
                {detail.type === 'SERVICE' &&
                    <XButton
                        style={draType === "NOW" ? { display: 'flex' } : {}}
                        title='Đặt hẹn ngay'
                        className={style.add_cart_btn}
                        onClick={onBookingNow}
                    />
                }
                {(detail.type === 'PRODUCT' || detail.type === 'COMBO') &&
                    <XButton
                        style={draType === "NOW" ? { display: 'flex' } : {}}
                        title='Mua ngay'
                        className={style.add_cart_btn}
                    />
                }
                <XButton
                    style={draType === "ADD_CART" ? { display: 'flex' } : {}}
                    icon={icon.cartWhiteBold}
                    iconSize={15}
                    title='Thêm vào giỏ hàng'
                    className={style.add_cart_btn}
                    onClick={handleAddCart}
                />
            </div>
            <PopupMessage
                iconLabel={detail.image_url}
                content={`Đã thêm ${detail.name} vào giỏ hàng`}
                open={open}
                onClose={() => setOpen(false)}
                autoHide={true}
            />
        </div>
    )
}