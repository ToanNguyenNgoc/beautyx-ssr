/** @type {import('next').NextConfig} */
const { i18n } = require('./i18n.config')
const nextConfig = {
	reactStrictMode: true,
}

module.exports = {
	nextConfig,
	i18n,
	images: {
		domains: ['dev.myspa.vn', 'dev_spala.myspa.vn', 'myspa.vn', 'api.myspa.vn', 'i.imgur.com'],
	},
	async rewrites() {
		return [
			{
				source: '/v1/:url',
				destination: '/api/:url',
			},
			{
				source: '/v1/:context/:id',
				destination: '/api/:context/:id',
			},
			{
				source: '/v1/:context/:id/:context_child',
				destination: '/api/:context/:id/:context_child',
			},
			{
				source: '/v1/:context/:id/:context_child/:child_id',
				destination: '/api/:context/:id/:context_child/:child_id',
			},
			{
				source: '/MOMO',
				destination: '/',
			},
			{
				source: '/TIKI',
				destination: '/',
			},
			{
				source: '/MBBANK',
				destination: '/',
			},
			{
				source: '/MOMO/:data',
				destination: '/',
			},
			{
				source: '/TIKI/:data',
				destination: '/',
			},
			{
				source: '/MBBANK/:data',
				destination: '/',
			},

			{
				source: '/cua-hang',
				destination: '/org',
			},
			{
				source: '/giam-gia',
				destination: '/discounts',
			},
			//org detail
			{
				source: '/vi/cua-hang/:org',
				destination: '/vi/org/:org',
				locale: false,
			},
			{
				source: '/en/org/:org',
				destination: '/en/org/:org',
				locale: false,
			},
			//------
			{
				source: '/:service_name',
				has: [
					{
						type: 'query',
						key: 'ser_id',
						value: '(?<cmsId>.*)',
					},
				],
				destination: '/services',
			},
			{
				source: '/:service_name',
				has: [
					{
						type: 'query',
						key: 'pro_id',
						value: '(?<cmsId>.*)',
					},
				],
				destination: '/products',
			},
		]
	},
}
