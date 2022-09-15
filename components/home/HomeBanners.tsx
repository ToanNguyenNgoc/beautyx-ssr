import Image from 'next/image'
import React, { useState } from 'react'
import icon from '../../src/constants/icon'
import { dealHot } from '../../src/constants/img'
import style from './home.module.css'
import useDeviceMobile from '../../src/utils/useDeviceMobile'
import Slider from 'react-slick'

interface IProps {
	banners: any[]
}

const PrevButton = (props: any) => {
	const is_mb = useDeviceMobile()
	const { onClick } = props
	return (
		<button onClick={onClick} className={style.bannerBtnPrev}>
			<Image
				width={is_mb === true ? 24 : 32}
				height={is_mb === true ? 24 : 32}
				src={icon.chevronRight}
				alt=""
			/>
		</button>
	)
}
const NextButton = (props: any) => {
	const is_mb = useDeviceMobile()
	const { onClick } = props
	return (
		<button onClick={onClick} className={style.bannerBtnNext}>
			<Image
				width={is_mb === true ? 24 : 32}
				height={is_mb === true ? 24 : 32}
				src={icon.chevronRight}
				alt=""
			/>
		</button>
	)
}

export function HomeBanners(props: IProps) {
	const { banners } = props
	console.log('banner', banners)
	const [chooseBanner, setChooseBanner] = useState<any>()

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		//autoplay: true,
		nextArrow: <NextButton />,
		prevArrow: <PrevButton />,
		swipe: true,
		autoplaySpeed: 2000,
		//fade: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					swipe: true,
				},
			},
			{
				breakpoint: 480,
				settings: {
					swipe: true,
					dots: true,
					speed: 500,
				},
			},
		],
		appendDots: (dots: any) => (
			<div className="banner-dot">
				<ul>{dots}</ul>
			</div>
		),
		afterChange: function (index: number) {
			setChooseBanner(banners[index])
		},
	}
	return (
		<div className={style.banner}>
			<div className={style.bannerWrap}>
				<div className={style.bannerLeft}>
					<Slider {...settings}>
						{banners?.map((item: any, index: number) => (
							<div key={index + item.url} className={style.bannerLeftItem}>
								<Image width={840} height={350} src={item?.imageURL} alt="" />
							</div>
						))}
					</Slider>
				</div>
				<div className={style.bannerRight}>
					<div className={style.bannerRightTop}>
						<Image src={dealHot.dealhot} alt="" />
					</div>
					<div className={style.bannerRightBot}>
						<div className={style.bannerRightBotItem}>
							<Image src={dealHot.dealhot1} alt="" />
						</div>
						<div className={style.bannerRightBotItem}>
							<Image src={dealHot.dealhot2} alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
