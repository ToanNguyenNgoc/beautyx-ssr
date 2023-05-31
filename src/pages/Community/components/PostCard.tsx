import { Masonry } from '@mui/lab';
import { FullImage, XButton } from 'components/Layout';
import icon from 'constants/icon';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IPost } from '../data';
import {onFavorite} from 'redux/community'
import style from './com-cpn.module.css'

export function PostCard({ post }: { post: IPost }) {
    const dispatch = useDispatch()
    const [openImg, setOpenImg] = useState(false)
    let column = 3
    if (post?.medias?.length >= 4) column = 4
    if (post?.medias?.length === 2) column = 2
    if (post?.medias?.length === 1) column = 1

    const toggleFavorite = () => {
        dispatch(onFavorite({
            id: post.id,
            isFavorite: !post.isFavorite
        }))
    }

    return (
        <>
            <div className={style.post_item}>
                <div className={style.post_item_head}>
                    <div className={style.post_item_head_group}>
                        <img src={post.group.image_url} alt="" />
                    </div>
                    <div className={style.post_item_head_cnt}>
                        <p className={style.post_item_group_name}>{post.group.name}</p>
                        <div className={style.post_item_head_de}>
                            <div className={style.post_item_head_user}>
                                <img className={style.user_avatar} src={post.user.avatar} alt="" />
                                <span className={style.user_name}>{post.user.fullname}</span>
                            </div>
                            <span className={style.post_create_at}>
                                {dayjs(post.created_at).format('DD-MM-YYYY')}
                            </span>
                            <span className={style.post_group_cate}>{post.groupCate.name}</span>
                        </div>
                    </div>
                </div>
                <div className={style.post_item_content}>
                    {post.content}...<Link to={{ pathname: `/bai-viet/${post.id}` }} >xem thêm</Link>
                </div>
                <div className={style.post_item_img_cnt}>
                    <Masonry
                        columns={column}
                        spacing={1}
                    >
                        {
                            post.medias?.map((media_url: string, j: number) => (
                                <img onClick={() => setOpenImg(true)} key={j} src={media_url} alt="" />
                            ))
                        }
                    </Masonry>
                </div>
                <div className={style.post_item_interactive}>
                    <div className={style.interactive_item}>
                        <XButton
                            onClick={toggleFavorite}
                            iconSize={28}
                            icon={post.isFavorite ? icon.thumbUpPurple : icon.thumbUp}
                        />
                        <span>{post.favorite_count}</span>
                    </div>
                    <div className={style.interactive_item}>
                        <XButton
                            iconSize={28}
                            icon={icon.chatSquare}
                        />
                        <span>{post.comment_count}</span>
                    </div>
                </div>
            </div>
            <FullImage
                open={openImg}
                setOpen={setOpenImg}
                src={post.medias}
            />
        </>
    );
}
