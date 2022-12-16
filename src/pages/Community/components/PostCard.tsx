import { Masonry } from '@mui/lab';
import { XButton } from 'components/Layout';
import icon from 'constants/icon';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import { IPost } from '../data';
import style from './com-cpn.module.css'

export function PostCard({ post }: { post: IPost }) {
    return (
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
                    columns={2}
                    spacing={1}
                >
                    {
                        post.medias?.slice(0, 4).map((media_url: string, j: number) => (
                            <img key={j} src={media_url} alt="" />
                        ))
                    }
                </Masonry>
            </div>
            <div className={style.post_item_interactive}>
                <div className={style.interactive_item}>
                    <XButton
                        iconSize={28}
                        icon={icon.thumbUp}
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
    );
}