import Link from 'next/link'
import React from 'react'
import style from './HomeSectionTitle.module.css'

interface IProps {
	title: string
	seemore?: string
}

function HomeSectionHead(props: IProps) {
	const { title, seemore } = props

	return (
		<Link href="/seemoreProvince">
			<div className={style.sectionHeadWrap}>
				<div className={style.home_title}>
					<h2 className={style.title}>{title}</h2>
				</div>

				<div className={style.homeSeemore}>{seemore ? seemore : null}</div>
			</div>
		</Link>
	)
}

export default HomeSectionHead
