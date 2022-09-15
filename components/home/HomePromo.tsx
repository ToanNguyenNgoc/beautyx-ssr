import React from 'react'
import useTrans from '../../context/hooks/useTrans'
import { IServicePromo } from '../../src/interface/servicePromo'
import HomeSectionHead from '../homeSectionHead'
import ServicePromoItem from '../ServicePromoItem'
import style from './home.module.css'

export interface IPropsHomePromo {
	services: IServicePromo[]
}

export function HomePromo(props: IPropsHomePromo) {
	const trans = useTrans()
	const { services } = props
	return (
		<div className={style.home_section_promo}>
			<HomeSectionHead title={trans.home_2.top_deal} />
			<ul className={style.home_service_list}>
				{services?.map((i: IServicePromo, index: number) => (
					<li key={index}>
						<ServicePromoItem service={i} />
					</li>
				))}
			</ul>
		</div>
	)
}
