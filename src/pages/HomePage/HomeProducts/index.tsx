import React from 'react';
import { Link } from 'react-router-dom';
import HomeTitle from '../Components/HomeTitle';
import { productsSection } from '../data'
import style from './style.module.css'

function HomeProducts() {
    return (
        <div className={style.container}>
            <HomeTitle title='Sản phẩm làm đẹp' />
            <div className={style.content}>
                <ul className={style.product_list}>
                    {
                        productsSection.map(item => (
                            <li key={item.id} className={style.product_list_item}>
                                <Link className={style.link_item} to={{ pathname: '/' }} >
                                    <div className={style.link_item_img}>
                                        <img src={item.image_url} alt="" />
                                    </div>
                                    <div className={style.link_item_cnt}>
                                        <p className={style.link_item_cate}>{item.cate}</p>
                                        <p className={style.link_item_text}>{item.text}</p>
                                    </div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default HomeProducts;