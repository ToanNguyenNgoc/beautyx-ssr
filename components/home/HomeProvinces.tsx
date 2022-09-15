import * as React from 'react'
import HomeSectionHead from '../../components/homeSectionHead'
import useTrans from '../../context/hooks/useTrans'
import style from './home.module.css'
import { formatRoundOrgCount } from '../../src/utils/format'
import Image from 'next/image'
import { LazyLoadImage } from 'react-lazy-load-image-component'
export interface IProvinceProps {
	province: any[]
}

export function Province(props: IProvinceProps) {
	const { province } = props
	const trans = useTrans()
	return (
		<div className={style.province}>
			<HomeSectionHead seemore={'Xem thêm >>'} title={trans.home_2.places_you_are_interested_in} />

			<div className={style.provinceList}>
				{province.slice(0, 6).map((item: any, index: number) => (
					<div key={index} className={style.provinceItem}>
						<LazyLoadImage src={`${item.media[1].original_url}`} alt="" />

						<div className={style.provinceContent}>
							<div className={style.provinceTitle}>{item?.name}</div>
							<div className={style.provinceTotal}>
								<span>
									{formatRoundOrgCount(item.organizations_count + item.branches_count)}{' '}
									{trans.home_2.beauty_places}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
