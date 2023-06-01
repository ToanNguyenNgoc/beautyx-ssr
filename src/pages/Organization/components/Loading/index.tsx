import Skeleton from 'react-loading-skeleton'
import style from './loading.module.css'
import { LoadGrid } from 'components/LoadingSketion'
import { useMediaQuery } from '@mui/material'

export const Loading = () => {
  const mb = useMediaQuery('(max-width:767px)')
  return (
    <div className={style.container}>
      <div className={style.banner_cnt}>
        <div className={style.head}>
          <div className={style.head_left}>
            <div className={style.head_left_name}>
              <Skeleton style={{ width: '100%', height: '100%' }} />
            </div>
            <div className={style.head_left_address}>
              <Skeleton style={{ width: '100%', height: '100%' }} />
            </div>
            <div className={style.head_left_data}>
              <Skeleton style={{ width: '100%', height: '100%' }} />
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
      </div>
      <div className={style.tab}>
        <Skeleton style={{ width: '100%', height: '100%' }} />
      </div>
      <div className={style.deal}>
        <div className={style.deal_title}>
          <Skeleton style={{ width: '100%', height: '100%' }} />
        </div>
        <div className={style.deal_list}>
          <LoadGrid grid={mb ? 1 : 6} item_count={mb ? 10 : 12} />
        </div>
      </div>
    </div>
  )
}