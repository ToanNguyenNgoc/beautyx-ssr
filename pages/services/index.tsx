import { useRouter } from 'next/router'
import React from 'react'
import { HeaderLayout } from '../../components/layout'
import { NextPageWithLayout } from '../../models'

const Services: NextPageWithLayout = () => {
	const route = useRouter()
	const { ser_id } = route.query
	console.log(ser_id)
	return <div>Services List</div>
}
Services.Layout = HeaderLayout
export default Services
