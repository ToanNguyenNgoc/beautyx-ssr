import { Dialog } from '@mui/material';
import { XButton } from 'components/Layout';
import icon from 'constants/icon';
import { User } from 'interface';
import IStore from 'interface/IStore';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import style from './com-cpn.module.css'

export function PostInput() {
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
                />
            }
        </>
    );
}

interface PostFormCntProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    USER: User
}

const PostFormCnt = (props: PostFormCntProps) => {
    const { open, setOpen, USER } = props;
    return (
        <Dialog
            open={open} onClose={() => setOpen(false)}
        >
            <div className={style.form_post_cnt}>
                <div className={style.form_post_user}>
                    <img src={USER?.avatar ?? icon.Avatar} className={style.form_post_user_avt} alt="" />
                    <span className={style.form_post_user_name}>
                        {USER?.fullname}
                    </span>
                </div>
                <div className={style.form_post_body}>
                    <textarea
                        className={style.form_post_text}
                        placeholder='Viết bài...'
                    />
                    <div className={style.form_post_btn}>
                        <label className={style.form_post_btn_img} htmlFor="file_img">
                            <img src={icon.addImg} className={style.form_post_btn_icon} alt="" />
                            <p className={style.form_post_btn_title}>Hình ảnh</p>
                        </label>
                        <input
                            hidden
                            id='file_img'
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                        />
                    </div>
                </div>
            </div>
        </Dialog>
    )
}