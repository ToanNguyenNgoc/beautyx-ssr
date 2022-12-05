import React from 'react';
import { groupCates } from './data'
import style from './community.module.css'
import { Link } from 'react-router-dom';

function TabCommunity() {
    return (
        <div className={style.com_container}>
            <div className={style.com_container_left}>
                <span className={style.com_container_left_title}>
                    Danh mục đề xuất
                </span>
                <ul className={style.group_cate_list}>
                    {
                        groupCates.map(i => (
                            <li key={i.name}>
                                <Link
                                    style={{ backgroundColor: `${i.bgColor}` }}
                                    className={style.group_cate_list_item} to={{ pathname: '/' }}
                                >
                                    <div className={style.group_item_icon}>
                                        <img src={i.icon} alt="" />
                                    </div>
                                    <div className={style.group_item_info}>
                                        <p className={style.group_item_info_name}>{i.name}</p>
                                        <p className={style.group_item_info_count}>{i.total} nhóm </p>
                                    </div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={style.com_container_center}>

            </div>
            <div className={style.com_container_right}></div>
        </div>
    );
}

export default TabCommunity;