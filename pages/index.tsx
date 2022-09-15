import React from 'react'
import servicePromoApi from '../api-client/servicePromoApi'
import { GetStaticPathsContext, GetStaticProps } from 'next'
import { Container } from '@mui/material'
import ExtraFlatForm from '../rootComponents/extraPlatForm'
import { useRouter } from 'next/router'
import useStorage from '../context/hooks/useStorage'
import Head from 'next/head'
import { NextPageWithLayout } from '../models'
import {
	HomeFooterTags,
	HomeDiscounts,
	Province,
	HomeTags,
	HomeBanners,
} from '../components/home/index'
import provincesApi from '../api-client/provinceApi'
import tagsApi from '../api-client/tagApi'
import bannerApi from '../api-client/bannerApi'
import { ITag } from '../interfaces/tags'
import { IBanner } from '../interfaces/banner'
import { HomePromo } from '../components/home/HomePromo'
import MainLayout from '../components/layout/Main'
// import HomeBanners from '../components/home/HomeBanners'

interface IPopsHomePage {
	services: any[]
	province: any[]
	tags: ITag[]
	banners: IBanner[]
}

const Home: NextPageWithLayout = (props: any) => {
	const { services, province, tags, banners } = props
	const { setItem } = useStorage()
	const router = useRouter()
	const changeLang = (lang: string) => {
		setItem('lang', lang, 'local')
		router.push('/', '/', { locale: lang })
	}
	return (
		<>
			<Head>
				<title>BeautyX - Đặt lịch làm hẹn Online</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<ExtraFlatForm />
			{/* <button onClick={() => changeLang('vi')}>Việt</button>
			<button onClick={() => changeLang('en')}>Anh</button> */}
			<div style={{ backgroundColor: 'var(--bg-gray)' }}>
				<Container>
					<HomeBanners banners={banners} />
					<HomeTags />
				</Container>
				<HomeDiscounts />
				<Container>
					<HomePromo services={services} />
					<Province province={province} />
					<HomeFooterTags tags={tags} />
				</Container>
			</div>
		</>
	)
}
Home.Layout = MainLayout

export default Home

export const getStaticProps: GetStaticProps<IPopsHomePage> = async (
	context: GetStaticPathsContext
) => {
	const res = await servicePromoApi.getServicesPromo({
		page: 1,
		limit: 18,
		sort: '-discount_percent',
	})
	const hits: any[] = await res.data.data.hits
	const resProvinces = await provincesApi.getAll()
	const resTags = await tagsApi.getAll({
		include: 'children',
	})
	const resBanners = await bannerApi.getAll()
	const provinces: any = await resProvinces.data.context.data
	const tags = await resTags.data.context.data
	const banners = await resBanners.data.context.data
	return {
		props: {
			services: hits,
			province: provinces.slice(0, 6),
			tags: tags,
			banners: banners,
		},
		revalidate: 3600 * 24,
	}
}
