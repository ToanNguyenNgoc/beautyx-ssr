/* eslint-disable react-hooks/exhaustive-deps */
import { Masonry } from '@mui/lab';
import { Container } from '@mui/system';
import { XButton } from 'components/Layout';
import icon from 'constants/icon';
import dayjs from 'dayjs';
import HeadTitle from 'features/HeadTitle';
import IStore from 'interface/IStore';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { onFavorite } from 'redux/community';
import { IPost } from '../../data'
import style from './post-detail.module.css'

function PostDetail() {
    const { id } = useParams() as any
    const history = useHistory()
    const dispatch = useDispatch()
    const { posts } = useSelector((state: IStore) => state.COMMUNITY)
    const post = posts.find((i: IPost) => i.id === parseInt(id))
    useEffect(() => {
        if (!id || !post) history.replace('/error')
    }, [])
    let column = 3
    if (post?.medias?.length === 1) column = 1
    if (post?.medias?.length === 2) column = 2
    return (
        <>
            <HeadTitle title={post?.group?.name} />
            <Container>
                <div className={style.container}>
                    <div className={style.head}>
                        <div className={style.head_left}>
                            <XButton
                                onClick={() => history.goBack()}
                                className={style.head_left_btn}
                                icon={icon.chevronLeft}
                                iconSize={28}
                            />
                            <div className={style.head_left_avatar}>
                                <img src={post?.user?.avatar} alt="" />
                            </div>
                        </div>
                        <div className={style.head_right}>
                            <p className={style.user_name}>{post?.user?.fullname}</p>
                            <p className={style.post_group_name}>
                                Trong nhóm <Link to={{ pathname: '/' }} >{post?.group?.name}</Link>
                            </p>
                            <p className={style.created_add}>{dayjs(post?.created_at).format('DD-MM-YYYY')}</p>
                        </div>
                    </div>
                    <div className={style.content}>{post?.content}</div>
                    <div className={style.images_cont}>
                        {
                            post?.medias &&
                            <Masonry
                                style={{ alignContent: 'center' }}
                                columns={column}
                                spacing={1}
                            >
                                {
                                    post?.medias?.map((media_url: string, index: number) => (
                                        <img key={index} src={media_url} alt="" />
                                    ))
                                }
                            </Masonry>
                        }
                    </div>
                    <div className={style.interactive}>
                        <div className={style.interactive_item}>
                            <XButton
                                onClick={() => dispatch(onFavorite({ id: post?.id, isFavorite: !post?.isFavorite }))}
                                iconSize={28}
                                icon={post?.isFavorite ? icon.thumbUpPurple : icon.thumbUp}
                            />
                            <span>{post?.favorite_count}</span>
                        </div>
                        <div className={style.interactive_item}>
                            <XButton
                                iconSize={28}
                                icon={icon.chatSquare}
                            />
                            <span>{post?.comment_count}</span>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default PostDetail;