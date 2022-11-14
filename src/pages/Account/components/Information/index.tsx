import React from 'react';
import { HeadTitle } from 'pages/Account';
import style from './info.module.css'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'interface/IStore';
import { User } from 'interface';
import * as Yup from "yup";
import { Input, XButton } from 'components/Layout'
import { clst, useNoti } from 'utils';
import { PopupNotification } from 'components/Notification'
import authentication from 'api/authApi';
import { AxiosError } from 'axios';
import { putUser, updateAsyncUser } from 'redux/USER/userSlice'
import { postMedia } from 'hooks'
import validateForm from 'utils/validateForm'
import icon from 'constants/icon';

function Information() {
  const { USER } = useSelector((state: IStore) => state.USER)
  return (
    <>
      <HeadTitle title='Thông tin tài khoản' />
      <div className={style.container}>
        {USER && <Form USER={USER} />}
      </div>
    </>
  );
}

export default Information;

const Form = ({ USER }: { USER: User }) => {
  const dispatch = useDispatch()
  const { noti, firstLoad, resultLoad, onCloseNoti } = useNoti()

  const formik = useFormik({
    initialValues: {
      fullname: USER.fullname ?? '',
      email: USER?.email ?? ''
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .required("Vui lòng nhập Họ và tên")
        .min(8, 'Tên đầy đủ phải từ 2 đến 128 ký tự')
        .max(128, 'Tên đầy đủ phải từ 2 đến 128 ký tự'),
      email: Yup.string()
        .required('Vui lòng nhập Email')
        .matches(validateForm.email, 'Vui lòng nhập đúng định dạng Email')
    }),
    onSubmit: async (values) => {
      firstLoad()
      try {
        await authentication.putUserProfile({
          fullname: values.fullname,
          email: USER.email !== values.email ? values.email : ''
        })
        dispatch(putUser({ ...USER, ...values }))
        resultLoad('Lưu thông tin thành công')
      } catch (error) {
        const err = error as AxiosError;
        switch (err.response?.status) {
          case 302:
            return resultLoad(`Email "${values.email}" đã được sử dụng ! Vui lòng thử Email khác`)
          default:
            return resultLoad(`Có lỗi xảy ra. Vui lòng thử lại (${err.response?.status}) `)

        }
      }
    },
  })
  const onChangeAvatar = async (e: any) => {
    const { model_id } = await postMedia(e)
    await dispatch(updateAsyncUser({
      media_id: model_id
    }))
  }


  return (
    <div className={style.form_cnt}>
      <div className={clst([style.form_row, style.form_row_avatar])}>
        <span className={style.form_row_labe}>Avatar</span>
        <div className={style.input_avatar_cnt}>
          <div className={style.avatar_cnt}>
            <img className={style.avatar_img} src={USER?.avatar} alt="" />
            <label htmlFor="file" className={style.avatar_btn}>
              <img src={icon.cameraAcc} alt="" />
            </label>
            <input
              hidden
              id="file"
              type="file"
              name="file"
              accept="image/jpeg"
              onChange={onChangeAvatar}
            />
          </div>
        </div>
      </div>
      <form
        autoComplete='off'
        className={style.form}
        onSubmit={formik.handleSubmit}
      >
        <div className={style.form_row}>
          <span className={style.form_row_labe}>Họ và tên</span>
          <Input
            value={formik.values.fullname}
            name='fullname'
            onChange={formik.handleChange}
            placeholder='Họ và tên...'
          />
          {formik.errors.fullname && formik.touched.fullname && (
            <p
              className={style.form_row_error}
            >
              {formik.errors.fullname}
            </p>
          )}
        </div>
        <div className={style.form_row}>
          <span className={style.form_row_labe}>Email</span>
          <Input
            value={formik.values.email}
            name='email'
            onChange={formik.handleChange}
            placeholder='Email...'
          />
          {formik.errors.email && formik.touched.email && (
            <p
              className={style.form_row_error}
            >
              {formik.errors.email}
            </p>
          )}
        </div>
        <div className={style.form_row}>
          <span className={style.form_row_labe}>Số điện thoại</span>
          <Input
            value={USER.telephone}
            disable={true}
          />
        </div>
        <div className={style.form_bot}>
          <XButton
            title='Lưu thay đổi'
            type='submit'
            loading={noti.load}
          />
        </div>
      </form>
      <PopupNotification
        title='Thông báo'
        content={noti.message}
        open={noti.openAlert}
        setOpen={onCloseNoti}
      />
    </div>
  )
}
