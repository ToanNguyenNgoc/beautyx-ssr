import style from './banner.module.css'
import img from 'constants/img'
import { XButton } from 'components/Layout'
import icon from 'constants/icon'
import { useFavorite } from 'hooks'
import { useContext, useState } from 'react'
import { OrgContext, OrgContextType } from 'context'
import { usePostAnalytics } from '../../hooks'
import { OrgDialog } from '../OrgDialog'
import { MapOrg } from '../Map'


export const Banner = () => {
  const { galleries, org } = useContext(OrgContext) as OrgContextType
  const galleriesList = galleries.map(i => i.images)?.flat()?.map(i => i.image_url)?.slice(0, 5)
  const [oImg, setOImg] = useState(false)
  const [map, setMap] = useState(false)
  usePostAnalytics(org)
  const { favoriteSt, onToggleFavorite } = useFavorite({
    id: org.id,
    org_id: org.id,
    type: 'ORG',
    count: org.favorites_count,
    favorite: org.is_favorite
  })
  return (
    <>
      <div className={style.cnt}>
        <div className={style.head}>
          <div className={style.head_left}>
            <div className={style.head_left_detail}>
              <img src={org.image ? org.image_url : img.imgDefault} alt="" />
              <h1 className={style.head_left_name}>{org.name}</h1>
            </div>
            <div className={style.head_left_data}>
              <span
                onClick={() => setMap(true)}
                className={style.head_left_map}
              >
                {org.full_address}
              </span>
              <div className={style.head_left_rate}>
                <div className={style.head_left_rate_item}>
                  <img src={icon.star} alt="" />
                  5
                </div>
                <div className={style.head_left_rate_item}>
                  <img src={icon.heart} alt="" />
                  {favoriteSt.favorite_count}
                </div>
              </div>
            </div>
          </div>
          <div className={style.head_right}>
            <XButton
              iconSize={16}
              icon={icon.share}
              title='Chia sẻ'
            />
            <XButton
              onClick={onToggleFavorite}
              iconSize={16}
              icon={favoriteSt.is_favorite ? icon.heart : icon.unHeart}
              title={favoriteSt.is_favorite ? 'Đã thích' : 'Yêu thích'}
            />
            <XButton
              iconSize={16}
              icon={icon.chatSquare}
              title='Tư vấn'
            />
          </div>
        </div>
        <div className={style.image_cnt}>
          {
            galleriesList.map(url => (
              <div key={url}>
                <img src={url} alt="" />
              </div>
            ))
          }
          <XButton
            onClick={() => setOImg(true)}
            className={style.open_image_btn}
            title='Hiển thị tất cả hình'
          />
        </div>
      </div>
      <OrgDialog
        open={oImg}
        title='Thư viện hình ảnh'
        onClose={() => setOImg(false)}
      >
      </OrgDialog>
      <OrgDialog
        open={map}
        title='Bản đồ & chi nhánh'
        onClose={() => setMap(false)}
      >
        <MapOrg />
      </OrgDialog>
    </>
  )
}