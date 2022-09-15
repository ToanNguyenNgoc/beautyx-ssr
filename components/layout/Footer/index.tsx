import { Container } from '@mui/system'
import * as React from 'react'
import useTrans from '../../../context/hooks/useTrans'
import style from './footer.module.css'
import img, { paymentMethod, social } from '../../../src/constants/img'
import icon from '../../../src/constants/icon'
import Image from 'next/image'

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
	const url_map = `https://goo.gl/maps/dnGMKnfdeB91xCj7A`
	const trans = useTrans()
	const data_footer = [
		{
			id: 1,
			title: `${trans.footer.customer_support}`,
			items: [
				{
					id: 11,
					title: `${trans.footer.consultation_call_center}: 0899310908`,
					type: 'NUMBER',
					url: '0899310908',
				},
				{
					id: 12,
					title: `${trans.footer.customer_care_call_center} : 0899855223`,
					type: 'NUMBER',
					url: '0899855223',
				},
				{
					id: 13,
					title: 'sales@myspa.vn',
					type: 'EMAIL',
					url: 'sales@myspa.vn',
				},
				{
					id: 14,
					title: 'support@myspa.vn',
					type: 'EMAIL',
					url: 'support@myspa.vn',
				},
				{
					id: 15,
					title: `${trans.footer.privacy_policy}`,
					type: 'URL',
					url: '/',
				},
				{
					id: 16,
					title: `${trans.footer.return_and_refund}`,
					type: 'URL',
					url: '/',
				},
				{
					id: 17,
					title: `${trans.footer.protect_the_interests_of_customers}`,
					type: 'URL',
					url: '/',
				},
			],
		},
		{
			id: 2,
			title: `${trans.footer.myspa_company}`,
			items: [
				{
					id: 20,
					title: `${trans.footer.operating_regulations}`,
					type: 'URL',
					url: '/',
				},
				{
					id: 21,
					title: `${trans.footer.general_rules}`,
					type: 'URL',
					url: '/',
				},
				{
					id: 22,
					title: `${trans.footer.commodity_trading_regulations}`,
					type: 'URL',
					url: '/',
				},
				{
					id: 23,
					title: `${trans.footer.payment_process}`,
					type: 'URL',
					url: '/',
				},
				{
					id: 24,
					title: `${trans.footer.secure_transaction}`,
					type: 'URL',
					url: '/',
				},
				{
					id: 26,
					title: `${trans.footer.responsibility}`,
					type: 'URL',
					url: '/',
				},
				{
					id: 27,
					title: `${trans.footer.terms_and_commitments}`,
					type: 'URL',
					url: '/',
				},
			],
		},
	]
	const social_list: any = [
		{
			id: 1,
			img: social.facebook,
			type: 'SOCIAL',
			url: 'https://www.facebook.com/beautyxdatlichlamdep/',
		},
		{
			id: 2,
			img: social.instagram,
			type: 'SOCIAL',
			url: 'https://www.instagram.com/myspa.vn_phanmemquanlyspa/',
		},
		{
			id: 3,
			img: social.tiktok,
			type: 'SOCIAL',
			url: 'https://www.tiktok.com/@beautyx.vn',
		},
		{
			id: 4,
			img: social.youtube,
			type: 'SOCIAL',
			url: 'https://www.youtube.com/channel/UCAWXbDX56x8OhJyA1cjIFRA',
		},
	]
	const downList = [
		{
			id: 1,
			type: 'DOWN',
			img: img.playStore,
			url: 'https://play.google.com/store/apps/details?id=com.myspa.beautyx',
		},
		{
			id: 2,
			type: 'DOWN',
			img: img.appStore,
			url: 'https://apps.apple.com/vn/app/beautyx/id1614767784?l=vi',
		},
	]
	const payment = [
		// {
		//     id: 1,
		//     img: paymentMethod.tikiPay,
		// },
		// {
		//     id: 2,
		//     img: paymentMethod.visa,
		// },
		// {
		//     id: 3,
		//     img: paymentMethod.masterCard,
		// },
		// {
		//     id: 4,
		//     img: paymentMethod.jcb,
		// },
		// {
		//     id: 5,
		//     img: paymentMethod.atm,
		// },
		{
			id: 6,
			img: paymentMethod.momoPayment,
		},
		// {
		//     id: 7,
		//     img: paymentMethod.zaloPay,
		// },
		// {
		//     id: 8,
		//     img: paymentMethod.mocaGrap,
		// },
		// {
		//     id: 9,
		//     img: paymentMethod.phonePay,
		// },
		// {
		//     id: 10,
		//     img: paymentMethod.vnPay,
		// },
		{
			id: 11,
			img: paymentMethod.handPay,
		},
		// {
		//     id: 12,
		//     img: icon.payon,
		// },
	]
	const app = [
		{
			id: 1,
			img: icon.momo,
			type: 'APP',
			url: 'bit.ly/myspamomo',
		},
		{
			id: 2,
			img: paymentMethod.tikiPay,
			type: 'APP',
			url: 'https://ti.ki/beautyx12 ',
		},
	]

	const gotoPolicy = (item: any) => {
		// scrollTop()
		switch (item.type) {
			case 'NUMBER':
				return window.open(`tel:${item.url}`, '_seft')
			case 'EMAIL':
				return window.open(`mailto:${item.url}`)
			case 'URL':
				// return history.push({
				// 	pathname: `/chinh-sach/${slugify(item.title)}`,
				// 	state: item,
				// })
				console.log('object :>> ')
			case 'SOCIAL':
				return window.open(`${item.url}`, '_blank', 'noopener,noreferrer')
			case 'DOWN':
				return window.open(`${item.url}`, '_blank', 'noopener,noreferrer')
			case 'APP':
				return window.open(`${item.url}`, '_blank', 'noopener,noreferrer')
			default:
				break
		}
	}
	return (
		<footer className={style.footer}>
			<Container>
				<div className={style.footerContent}>
					<div className={style.footerLeft}>
						{data_footer.map((item, index) => (
							<div className={style.footerLeftWrap}>
								<div className={style.footerLeftTitle}>{item.title}</div>
								<ul className={style.footerLeftList}>
									{item.items.map((a: any, i: number) => (
										<li onClick={() => gotoPolicy(a)} key={i} className={style.footerLeftListItem}>
											{a.title}
										</li>
									))}
									<li className={style.footerLeftListItem}></li>
								</ul>
							</div>
						))}
					</div>
					<div className={style.footerRight}>
						<div className={style.footerLeftWrap}>
							<div className={style.footerLeftTitle}>{trans.footer.payment_method}</div>
							<div className={style.footerRightSocial}>
								{payment.map((item: any, index: number) => (
									<div
										onClick={() => gotoPolicy(item)}
										key={index}
										className={style.footerRightSocialItem}
									>
										<div className={style.footerRightSocialItemImg}>
											<Image height={36} width={36} src={item.img} alt="" />
										</div>
									</div>
								))}
							</div>
							<div style={{ marginTop: '24px' }} className={style.footerLeftTitle}>
								{trans.footer.beautyx_is_on}
							</div>
							<div className={style.footerRightSocial}>
								{app.map((item: any, index: number) => (
									<div
										onClick={() => gotoPolicy(item)}
										key={index}
										className={style.footerRightSocialItem}
									>
										<div className={style.footerRightSocialItemImg}>
											<Image height={36} width={36} src={item.img} alt="" />
										</div>
									</div>
								))}
							</div>
						</div>
						<div className={style.footerLeftWrap}>
							<div className={style.footerLeftTitle}>{trans.footer.contact_width_me}</div>
							<div className={style.footerRightSocial}>
								{social_list.map((item: any, index: number) => (
									<div onClick={() => gotoPolicy(item)} key={index} className={style.itemSocial}>
										<div className={style.footerRightSocialItemImg}>
											<Image height={36} width={36} src={item.img} alt="" />
										</div>
									</div>
								))}
							</div>

							<div style={{ marginTop: '24px' }} className={style.footerLeftTitle}>
								{trans.footer.download_app}
							</div>
							<div className={style.downApp}>
								<div className={style.downAppQR}>
									<Image height={107} width={107} src={img.qrCode} alt="" />
								</div>
								<div className={style.downAppWrap}>
									{downList.map((item: any, index: number) => (
										<div onClick={() => gotoPolicy(item)} key={index} className={style.downAppBtn}>
											<Image width={160.8} height={45} src={item.img} alt="" />
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div
					onClick={() => window.open(`${url_map}`, '_blank', 'noopener,noreferrer')}
					className={style.footerAddress}
				>
					{trans.footer.address_company}
				</div>
				<div className={style.footerCoppyRigth}>{trans.footer.policy}</div>
				<div className={style.footerCoppyRigth}>© Copyright Myspa | ProductX teams.</div>
			</Container>
		</footer>
	)
}
