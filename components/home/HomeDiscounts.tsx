/* eslint-disable jsx-a11y/anchor-is-valid */
import { Container } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import axiosClient from '../../api-client/axios'
import { IDiscountPar, IITEMS_DISCOUNT } from '../../interfaces/discount'
import { DISCOUNT_TYPE } from '../../src/utils/formatRouterLink/fileType'
import { discountParamsURL } from '../../context/query-params'
import style from './home.module.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import formatPrice from '../../src/utils/formatPrice'
import icon from '../../src/constants/icon'
import Image from 'next/image'

export function HomeDiscounts(props) {
	const { data, error, mutate, isValidating } = useSWR(`/discounts?page=1&${discountParamsURL}`, {
		revalidateOnFocus: false,
	})
	console.log('data', data)
	let discounts: IDiscountPar[] = []
	if (!data) {
		return <>Loading...</>
	} else {
		discounts = data.data.context.data
	}
	return (
		<div className={style.discount_cnt}>
			<Container>
				<div className={style.home_discounts__title}>
					<span>Khuyến mãi HOT</span>
					<Link href="/giam-gia">
						<a>Xem thêm {'>>'}</a>
					</Link>
				</div>
				<div className={style.homeDiscountWrap}>
					<ul className={style.homeDiscountList}>
						{discounts
							.filter(
								(i: IDiscountPar) =>
									i.items.length > 0 &&
									(i.discount_type === DISCOUNT_TYPE.PRODUCT.key ||
										i.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key)
							)
							.slice(0, 12)
							.map((discount: IDiscountPar, index: number) => (
								<div key={index}>
									{discount.items.map((item: IITEMS_DISCOUNT, i: number) => (
										<li key={i}>
											<div className={style.homeDiscountItem}>
												<div className={style.discountImgOrg}>
													{item?.organization.image_url !== '' &&
														item?.organization.image_url !== null && (
															<LazyLoadImage src={item?.organization.image_url} alt="" />
														)}
												</div>
												<div className={style.discountImg}>
													<LazyLoadImage
														src={
															item?.productable.image
																? item?.productable.image_url
																: item?.organization.image_url
														}
														alt=""
													/>
												</div>
												<div className={style.discountDetail}>
													<span className={style.discountTitle}>
														{item.productable.service_name ?? item.productable.product_name}
													</span>
													<div className={style.discountWrapPrice}>
														<span className={style.discountSpecialPrice}>
															{discount.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key
																? `${formatPrice(discount.discount_value)}đ`
																: `${formatPrice(item.view_price)}đ`}
														</span>
														<span className={style.discountOdlPrice}>
															{formatPrice(
																item?.productable.price || item?.productable.retail_price
															)}
															đ
														</span>
													</div>
													<div className={style.discountAddressWrap}>
														<div className={style.iconMap}>
															<Image src={icon.pinMapRed} width={12} height={12} />
														</div>
														<span className={style.discountAddress}>
															{item?.organization.full_address}
														</span>
													</div>
													<div className={style.discountLimitBar}>
														<div
															style={
																!discount?.total || discount?.total === discount?.used
																	? { width: '100%' }
																	: {
																			width: `${(discount?.used / discount?.total) * 100}%`,
																	  }
															}
															className={style.discountLimitBarUser}
														></div>
														<span className={style.discountLimitBarNum}>
															{discount?.total
																? `Đã bán ${discount.used}/${discount.total}`
																: 'Đang mở'}
														</span>
													</div>
												</div>
											</div>
										</li>
									))}
								</div>
							))}
						{/* <div className="watch-more-card" onClick={onViewMore}>
                            <li>
                                <div>{'>'}</div>
                                <span>Xem thêm</span>
                            </li>
                        </div> */}
					</ul>
				</div>
			</Container>
		</div>
	)
}
