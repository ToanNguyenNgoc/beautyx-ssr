/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { LayoutProps } from '../../../models'
import Link from 'next/link'
import style from './header.module.css'
import img from '../../../src/constants/img'
import icon from '../../../src/constants/icon'
import Image from 'next/image'
import { Container } from '@mui/system'

const dataTag = [
	{
		id: 1,
		name: 'Gần bạn',
		url: '/',
	},
	{
		id: 2,
		name: 'Spa',
		url: '/',
	},
	{
		id: 3,
		name: 'Salon',
		url: '/',
	},
	{
		id: 4,
		name: 'Nail',
		url: '/',
	},
	{
		id: 5,
		name: 'Clinic',
		url: '/',
	},
	{
		id: 6,
		name: 'Massage',
		url: '/',
	},
	{
		id: 7,
		name: 'Thẩm mỹ viện',
		url: '/',
	},
	{
		id: 8,
		name: 'Nha khoa',
		url: '/',
	},
]
export function HeaderLayout() {
	return (
		<>
			<header className={style.header}>
				<Container>
					<div className={style.headerWrap}>
						<div className={style.headerLeft}>
							<Link href="/">
								<div className={style.headerLogo}>
									<Image src={img.beautyX} alt="" />
								</div>
							</Link>
							<div className={style.headerSearch}>
								<>
									<input
										placeholder="Tìm kiếm dịch vụ, sản phẩm, combo, doanh nghiệp ..."
										type="text"
										readOnly
									/>
									<div className={style.headerSearchImg}>
										<Image
											width={24}
											height={24}
											className={style.img}
											src={icon.searchPurple}
											alt=""
										/>
									</div>
								</>
								<div className={style.headerSearchBot}>
									{dataTag.map((item: any, index: number) => (
										<Link key={index} href={item.url}>
											<a className={style.headerSearchBotItem}>{item.name}</a>
										</Link>
									))}
								</div>
							</div>
						</div>

						<div className={style.headerRight}>
							<div className={style.partner}>
								<Link href="/">
									<span className={style.partnerText}>Kênh người bán</span>
								</Link>
							</div>
							<div className={style.headerSignUp}>
								<Link href="/">
									<a>Đăng ký</a>
								</Link>
							</div>
							<div className={style.headerSignIn}>
								<Link href="/">
									<a>Đăng Nhập</a>
								</Link>
							</div>
							<div className={style.headerLanguage}>
								<Link href="/">
									<>
										<Image width={24} height={24} src={icon.languagePurple} alt="" />
										<a>VN</a>
									</>
								</Link>
							</div>
							<div className={style.headerCart}>
								<Link href="/">
									<Image width={30} height={30} src={icon.ShoppingCartSimple} alt="" />
								</Link>
							</div>
						</div>
					</div>
				</Container>
			</header>
		</>
	)
}
