/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, AvatarGroup } from '@mui/material';
import { Container } from '@mui/system';
import { XButton } from 'components/Layout';
import HeadMobile from 'features/HeadMobile';
import HeadTitle from 'features/HeadTitle';
import { useDeviceMobile } from 'hooks';
import IStore from 'interface/IStore';
import imgC from 'pages/Community/assets';
import { PostCard, PostInput } from 'pages/Community/components';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { groups, IGroup, IPost } from '../../data'
import style from './group-detail.module.css'
import GroupInfo from './GroupInfo';


function GroupDetail() {
    const { id } = useParams() as any
    const IS_MB = useDeviceMobile()
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const group = groups.find((i: IGroup) => i.id === parseInt(id))
    useEffect(() => {
        if (!id || !group) history.replace('/error')
    }, [])
    const {posts} = useSelector((state:IStore) => state.COMMUNITY)
    const postList = posts.filter((i: IPost) => i.group.id === parseInt(id))

    window.addEventListener('scroll', () => {
        const header = document.getElementById("head_mobile");
        const scrolled = window.scrollY;
        if (header) {
            header.style.backgroundColor = `rgb(255 255 255 / ${scrolled}%)`
        }
    })

    return (
        <>
            <HeadTitle title={group?.name} />
            {
                IS_MB && <HeadMobile
                    className={style.head_mobile}
                    classNameInput={style.head_mobile_back}
                    title=''
                />
            }
            <Container>
                <div className={style.container}>
                    <div className={style.cover}>
                        <img src={group?.image_url} className={style.cover_image_bg} alt="" />
                        <div className={style.cover_image}>
                            <img src={group?.image_url} alt="" />
                        </div>
                        <div className={style.detail_cnt}>
                            <div className={style.detail}>
                                <div className={style.detail_left}>
                                    <p className={style.group_name}>{group?.name}</p>
                                    <div className={style.group_member}>
                                        <AvatarGroup max={4}>
                                            <Avatar alt="Remy Sharp" src={imgC.avatar} />
                                            <Avatar alt="Travis Howard" src={imgC.avatar} />
                                            <Avatar alt="Cindy Baker" src={imgC.avatar} />
                                            <Avatar alt="Agnes Walker" src={imgC.avatar} />
                                            <Avatar alt="Trevor Henderson" src={imgC.avatar} />
                                        </AvatarGroup>
                                        <span className={style.group_member_count}>
                                            200 thành viên
                                        </span>
                                    </div>
                                </div>
                                <div className={style.detail_right}>
                                    <XButton
                                        className={style.detail_right_join_btn}
                                        title='Tham gia ngay'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.body}>
                        <div className={style.body_left}>
                            <div className={style.group_post_inp}>
                                <p className={style.title}>Tạo bài viết</p>
                                {group && <PostInput group={group} />}
                            </div>
                            <div className={style.group_posts}>
                                <p className={style.title}>Bài viết ({postList?.length})</p>
                                <ul className={style.post_list}>
                                    {
                                        postList?.map((post, index: number) => (
                                            <li key={index} className={style.post_list_item}>
                                                <PostCard post={post} />
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className={style.desc}>
                            <p className={style.title}>Giới thiệu nhóm</p>
                            <div className={style.desc_cnt}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet elit purus, et gravida libero
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet elit purus, et gravida libero
                                ...<span onClick={() => setOpen(true)} >Xem thêm</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            {
                group &&
                <GroupInfo
                    open={open}
                    setOpen={setOpen}
                    group={group}
                    postListCount={postList?.length}
                />
            }
        </>
    );
}

export default GroupDetail;