import { Container } from '@mui/system';
import Head from 'components/Head';
import HeadMobile from 'features/HeadMobile';
import { useDeviceMobile } from 'hooks';
import React from 'react';
import style from './cart.module.css'

function Cart() {
	const IS_MB = useDeviceMobile()
	return (
		<>
			{IS_MB ? <HeadMobile title='Giỏ hàng' /> : <Head title='Giỏ hàng' />}
			<Container>
				<div className={style.container}>
					
				</div>
			</Container>
		</>
	);
}

export default Cart;