import Skeleton from 'react-loading-skeleton'
import style from './loading.module.css'

export const Loading = () => {
  return (
    <div className={style.container}>
      <div className={style.head}>
        <div className={style.head_left}>
          <div className={style.head_left_name}>
            <Skeleton style={{ width: '100%', height: '100%' }} />
          </div>
          <div className={style.head_left_address}>
            <Skeleton style={{ width: '100%', height: '100%' }} />
          </div>
          <div className={style.head_left_data}>

          </div>
        </div>
        <div className={style.head_right}>
          <Skeleton style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
      <div className={style.banner}>
        <div> <Skeleton style={{ width: '100%', height: '100%' }} /></div>
        <div> <Skeleton style={{ width: '100%', height: '100%' }} /></div>
        <div> <Skeleton style={{ width: '100%', height: '100%' }} /></div>
        <div> <Skeleton style={{ width: '100%', height: '100%' }} /></div>
        <div> <Skeleton style={{ width: '100%', height: '100%' }} /></div>
      </div>
      <div className={style.tab}>
        <Skeleton style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  )
}