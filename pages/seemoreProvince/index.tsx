import * as React from 'react'
import { NextPageWithLayout } from '../../models'
import style from './seemoreProvince.module.css'
import { GetStaticPathsContext, GetStaticProps } from 'next'
import provincesApi from '../../api-client/provinceApi'
import { Container } from '@mui/system'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { formatRoundOrgCount } from '../../src/utils/format'
import useTrans from '../../context/hooks/useTrans'
import MainLayout from '../../components/layout/Main'

export interface ISeemoreProvinceProps {
	provinces: any
}

const SeemoreProvince: NextPageWithLayout = ({ provinces }: any) => {
	const trans = useTrans()
	return (
		<Container>
			<div className={style.seemoreProvince}>
				{/* <Province province={provinces} /> */}

				<div className={style.seemoreList}>
					{provinces.map((item: any, index: number) => (
						<div key={index} className={style.seemoreItem}>
							<LazyLoadImage src={`${item.media[1].original_url}`} alt="" />
							<div className={style.seemoreContent}>
								<div className={style.seemoreTitle}>{item?.name}</div>
								<div className={style.seemoreTotal}>
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
		</Container>
	)
}
SeemoreProvince.Layout = MainLayout
export default SeemoreProvince

export const getStaticProps: GetStaticProps<ISeemoreProvinceProps> = async (
	context: GetStaticPathsContext
) => {
	const res = await provincesApi.getAll()
	const provinces: any = await res.data.context.data

	return {
		props: { provinces },
	}
}
