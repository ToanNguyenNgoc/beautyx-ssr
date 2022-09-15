import * as React from 'react'
import { LayoutProps } from '../../models'
import Footer from './Footer'
import { HeaderLayout } from './Header'

export interface IMainLayoutProps {}

export default function MainLayout({ children }: LayoutProps) {
	return (
		<>
			<HeaderLayout />
			{<div>{children}</div>}
			<Footer />
		</>
	)
}
