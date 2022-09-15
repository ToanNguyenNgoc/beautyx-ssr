import '../styles/globals.css'
import '../src/assets/font/style.css'
import React from 'react'
import { wrapper } from '../redux/store/store'
import AppProvider from '../context/AppProvider'
import { EmptyLayout } from '../components/layout'
import { AppPropsWithLayout } from '../models'
import { SWRConfig } from 'swr'
import axiosServer from '../api-client/axios2'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	// return <Component {...pageProps} />
	const Layout = Component.Layout ?? EmptyLayout
	return (
		<SWRConfig value={{ fetcher: (url) => axiosServer.get(url), shouldRetryOnError: false }}>
			<AppProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AppProvider>
		</SWRConfig>
	)
}

export default wrapper.withRedux(MyApp)
