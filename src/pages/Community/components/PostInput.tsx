import { Dialog } from '@mui/material';
import { XButton } from 'components/Layout';
import icon from 'constants/icon';
import HeadMobile from 'features/HeadMobile';
import { postMediaMulti, useDeviceMobile } from 'hooks';
import { User } from 'interface';
import IStore from 'interface/IStore';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IGroup, IPost } from '../data';
import style from './com-cpn.module.css';
import product from '../assets/product.svg'
import dayjs from 'dayjs';
import { addPost } from 'redux/community';

export function PostInput({ group }: { group: IGroup }) {
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const { USER } = useSelector((state: IStore) => state.USER)
    const handleOpenPostForm = () => {
        if (!USER) return history.push('/sign-in?1')
        setOpen(true)
    }
    return (
        <>
            <div className={style.post_inp_cnt}>
                <div className={style.post_inp_head}>
                    <div className={style.post_inp_head_user}>
                        <img src={USER?.avatar ?? icon.Avatar} alt="" />
                    </div>
                    <div onClick={handleOpenPostForm} className={style.post_inp_head_btn}>
                        <p>Bạn viết gì đi...</p>
                    </div>
                </div>
            </div>
            {
                USER &&
                <PostFormCnt
                    open={open}
                    setOpen={setOpen}
                    USER={USER}
                    group={group}
                />
            }
        </>
    );
}

interface PostFormCntProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    USER: User,
    group: IGroup
}

interface IMedia {
    model_id: number,
    original_url: string
}

interface IValues {
    body: string,
    media: IMedia[]
}

const PostFormCnt = (props: PostFormCntProps) => {
    const IS_MB = useDeviceMobile()
    const { posts } = useSelector((state: IStore) => state.COMMUNITY)
    const { open, setOpen, USER, group } = props;
    const [values, setValues] = useState<IValues>({ body: '', media: [] })
    const refText = useRef<HTMLTextAreaElement>(null)
    const dispatch = useDispatch()
    const onChangeMedia = async (e: any) => {
        const tempMedia: any[] = []
        for (var i = 0; i < e.target.files.length; i++) {
            const tempMediaItem = {
                original_url: '',
                model_id: i
            }
            tempMedia.push(tempMediaItem)
        }
        setValues({
            ...values,
            media: [...values.media, ...tempMedia]
        })
        const { mediaList } = await postMediaMulti(e)
        setValues({
            ...values,
            media: [...values.media, ...mediaList]
        })
    }
    const onRemoveImg = (model_id: number) => {
        setValues({
            ...values,
            media: values.media.filter(item => item.model_id !== model_id)
        })
    }
    const onCreatePost = () => {
        const params: IPost = {
            id: posts.length + 1,
            group: group,
            groupCate: { id: 1, icon: product, name: 'Mỹ phẩm', total: 60, bgColor: "#C9C0FF" },
            user: {
                fullname: USER?.fullname,
                avatar: USER?.avatar
            },
            content: refText.current?.value ?? '',
            medias: values.media.map(i => i.original_url),
            favorite_count: 0,
            created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            comment_count: 0,
            isFavorite:false
        }
        dispatch(addPost(params))
        setOpen(false)
    }

    return (
        <Dialog
            fullScreen={IS_MB}
            open={open} onClose={() => setOpen(false)}
        >
            {IS_MB && <HeadMobile title='Tạo bài viết' onBackFunc={() => setOpen(false)} />}
            <div className={style.form_post_cnt}>
                <div className={style.form_post_user}>
                    <img src={USER?.avatar ?? icon.Avatar} className={style.form_post_user_avt} alt="" />
                    <span className={style.form_post_user_name}>
                        {USER?.fullname}
                    </span>
                </div>
                <div className={style.form_post_body}>
                    <textarea
                        ref={refText}
                        className={style.form_post_text}
                        placeholder='Viết bài...'
                    />
                    <div className={style.form_post_btn}>
                        <label className={style.form_post_btn_img} htmlFor="file_img">
                            <img src={icon.addImg} className={style.form_post_btn_icon} alt="" />
                            <p className={style.form_post_btn_title}>Hình ảnh</p>
                        </label>
                        <input
                            multiple
                            onChange={onChangeMedia}
                            hidden
                            id='file_img'
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                        />
                    </div>
                    <div className={style.form_post_btn_media}>
                        <ul className={style.form_media_list}>
                            {
                                values.media.map(item => (
                                    <li key={item.model_id} className={style.form_media_list_item}>
                                        <div className={style.form_media_img_cnt}>
                                            {
                                                item.original_url !== '' &&
                                                <>
                                                    <img src={item.original_url}
                                                        className={style.form_media_item_img} alt=""
                                                    />
                                                    <XButton
                                                        onClick={() => onRemoveImg(item.model_id)}
                                                        className={style.remove_img_btn}
                                                        icon={icon.closeCircleWhite}
                                                        iconSize={22}
                                                    />
                                                </>
                                            }
                                            {
                                                item.original_url === '' &&
                                                <div className={style.form_media_item_load}>
                                                    <span>Đang tải lên...</span>
                                                </div>
                                            }
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className={style.form_post_bottom}>
                    <XButton
                        onClick={onCreatePost}
                        title='Đăng bài viết'
                    />
                </div>
            </div>
        </Dialog>
    )
}