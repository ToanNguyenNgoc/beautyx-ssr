import React from 'react';
import HomeTitle from '../Components/HomeTitle';
import { whyNots } from '../data'
import style from './style.module.css'

function HomeWhyNot() {
    return (
        <div className={style.container}>
            <HomeTitle title='Vì sao nên chọn BeautyX?' />
            <ul className={style.list}>
                {
                    whyNots.map(item => (
                        <li key={item.content} className={style.list_item}>
                            <img src={item.image_url} alt="" />
                            <p className={style.list_item_title}>{item.title}</p>
                            <p className={style.list_item_content}>{item.content}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default HomeWhyNot;