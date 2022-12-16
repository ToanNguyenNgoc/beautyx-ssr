import React from 'react';
import { groupCates, groups, posts } from './data'
import style from './community.module.css'
import { Link } from 'react-router-dom';
import { Avatar, AvatarGroup } from '@mui/material';
import imgC from './assets'
import { PostCard } from './components';

function TabCommunity() {
    return (
        <>
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
                                        className={style.group_cate_list_item}
                                        to={{ pathname: `` }}
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
                    <div className={style.center_group_recommend}>
                        <p className={style.section_title}>Gợi ý cho bạn</p>
                        <ul className={style.group_recommend_list}>
                            {
                                groups.map((item, index: number) => (
                                    <li key={index} className={style.group_recommend_li}>
                                        <Link to={{ pathname: `/nhom/${item.id}` }} className={style.group_card_item} >
                                            <div className={style.group_cover}>
                                                <img className={style.group_cover_img} src={item.image_url} alt="" />
                                            </div>
                                            <div className={style.group_detail}>
                                                <p className={style.group_detail_name}>{item.name}</p>
                                                <div className={style.group_detail_member}>
                                                    <AvatarGroup max={4}>
                                                        <Avatar alt="Remy Sharp" src={imgC.avatar} />
                                                        <Avatar alt="Travis Howard" src={imgC.avatar} />
                                                        <Avatar alt="Cindy Baker" src={imgC.avatar} />
                                                        <Avatar alt="Agnes Walker" src={imgC.avatar} />
                                                        <Avatar alt="Trevor Henderson" src={imgC.avatar} />
                                                    </AvatarGroup>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={style.center_post_cnt}>
                        <div className={style.center_post_head}>
                            <span className={style.section_title}>Bài viết</span>
                        </div>
                        <ul className={style.center_post}>
                            {
                                posts.map((post, index: number) => (
                                    <li key={index} className={style.center_post_li}>
                                        <PostCard post={post} />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className={style.com_container_right}></div>
            </div>
        </>
    );
}

export default TabCommunity;