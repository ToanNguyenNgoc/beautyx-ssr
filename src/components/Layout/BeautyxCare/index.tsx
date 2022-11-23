import React from 'react';
import style from './care.module.css';
import careIcon from 'assets/icon/careGreen.svg'
import { Link } from 'react-router-dom';
import {scrollTop} from 'utils'

export function BeautyxCare() {
    return (
        <div className={style.container}>
            <div className={style.head}>
                <img className={style.head_icon} src={careIcon} alt="" />
                <div className={style.head_text}>
                    <span>BeautyX</span>
                    <span>Care</span>
                </div>
            </div>
            <p className={style.body}>
                Hoàn tiền 100% nếu khách hàng đến không sử dụng dịch vụ tại cơ sở.
            </p>
            <Link 
                onClick={scrollTop}
                className={style.link} to={{ pathname: '/chinh-sach/bao-ve-quyen-loi-khach-hang?id=17' }} 
            >
                Chính sách bảo vệ người mua BeautyX
            </Link>
        </div>
    );
}