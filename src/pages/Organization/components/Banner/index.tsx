import style from './banner.module.css'
import img from 'constants/img'
import { XButton } from 'components/Layout'
import icon from 'constants/icon'
import { useAuth, useFavorite } from 'hooks'
import { useContext, useRef, useState } from 'react'
import { MessengerContext, MessengerCtxType, OrgContext, OrgContextType } from 'context'
import { usePostAnalytics } from '../../hooks'
import { Gallery } from '../Gallery'
import { SharePopup } from '../Share'
import { OrgItemMap } from 'components/Layout/OrgItemMap'
import { formatOrgTimeWork } from 'utils'
import { useMediaQuery } from '@mui/material'
import Slider, { Settings } from 'react-slick'
import { useHistory } from 'react-router-dom'
import { chatApi } from 'api'

export const Banner = () => {
  const { galleries, org, loadGalleries, discounts, servicesSpecial, productsSpecial } =
    useContext(OrgContext) as OrgContextType
  const { currTopic } = useContext(MessengerContext) as MessengerCtxType
  const history = useHistory()
  const { USER } = useAuth()
  const mb = useMediaQuery('(max-width:767px)')
  const servicesList = discounts?.map(i => i.items[0]?.productable?.image_url)
    .concat(servicesSpecial.map(i => i.image_url))
    .concat(productsSpecial.map(i => i.image_url))
    .filter(Boolean)
  const galleriesList = galleries.map(i => i.images)?.flat()?.map(i => i.image_url)
    ?.concat(servicesList).slice(0, 5)
  const [oImg, setOImg] = useState(false)
  const [map, setMap] = useState(false)
  const [share, setShare] = useState(false)
  const refTime = useRef<HTMLUListElement>(null)
  const refIcon = useRef<HTMLImageElement>(null)
  const onToggleTime = () => {
    refTime.current?.classList.toggle(style.time_show)
    refIcon.current?.classList.toggle(style.time_tody_icon_ch)
  }
  window.addEventListener('click', () => {
    refTime.current?.classList.remove(style.time_show)
    refIcon.current?.classList.remove(style.time_tody_icon_ch)
  })
  usePostAnalytics(org)
  const { favoriteSt, onToggleFavorite } = useFavorite({
    id: org.id,
    org_id: org.id,
    type: 'ORG',
    count: org.favorites_count,
    favorite: org.is_favorite
  })
  const { orgTimes, orgTimeToday } = formatOrgTimeWork(org?.opening_time)
  const onChat = async () => {
    if (!USER) history.push('/sign-in?1')
    const topic = currTopic(org.id)
    if (topic) {
      console.log(topic)
      history.push("/messages")
    } else {
      const res = await chatApi.createTopic({
        org: org.id,
        group_name: org.name
      })
      console.log(res.context)
      history.push("/messages")
    }
  }

  return (
    <>
      <div className={style.cnt}>
        <div className={style.head_wrapper}>
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
              <div className={style.head_right_fa}>
                <XButton
                  onClick={onToggleFavorite}
                  iconSize={mb ? 18 : 16}
                  icon={favoriteSt.is_favorite ? icon.heart : icon.unHeart}
                  title={favoriteSt.is_favorite ? 'Đã thích' : 'Yêu thích'}
                />
                <XButton
                  iconSize={mb ? 18 : 16}
                  icon={icon.chatSquare}
                  title='Tư vấn'
                  onClick={onChat}
                />
                <XButton
                  onClick={() => setShare(true)}
                  iconSize={mb ? 18 : 16}
                  icon={icon.share}
                  title='Chia sẻ'
                />
                <SharePopup open={share} onClose={() => setShare(false)} />
              </div>
              <div className={style.head_right_time}>
                <div className={style.head_right_time_left}>
                  <img src={icon.clockGray} alt="" />
                  {mb ? `Thời gian làm việc ${orgTimeToday?.day_week}` : 'Hôm nay'}
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleTime()
                  }}
                  className={style.head_right_time_right}
                >
                  <div className={style.time_tody}>
                    {orgTimeToday?.from_time_opening}{" "}-{" "}
                    {orgTimeToday?.to_time_opening}
                    <img className={style.time_tody_icon} ref={refIcon} src={icon.arrowDownPurple} alt="" />
                  </div>
                </div>
                <ul onClick={(e) => e.stopPropagation()} ref={refTime} className={style.time_list_cnt}>
                  {
                    orgTimes.map(i => (
                      <li style={i.todayAct ? { color: 'var(--pr-green)' } : {}}
                        key={i.day_week}
                        className={style.time_work_item}
                      >
                        {i.day_week}
                        <span>{i.from_time_opening}-{i.to_time_opening}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={style.image_cnt}>
          {
            mb ?
              <SliderGallery />
              :
              galleriesList.map(url => (
                <div key={url}>
                  <img src={url} alt="" />
                </div>
              ))
          }
          <XButton
            onClick={() => setOImg(true)}
            className={style.open_image_btn}
            title={mb ? '' : 'Hiển thị tất cả hình'}
            icon={mb ? icon.expend : ''}
          />
        </div>
        {
          (!loadGalleries && oImg) &&
          <Gallery
            open={oImg}
            onClose={() => setOImg(false)}
          />
        }
      </div>
      <OrgItemMap
        open={map}
        setOpen={setMap}
        org={org}
      />
    </>
  )
}
const SliderGallery = () => {
  const { galleries } = useContext(OrgContext) as OrgContextType
  const settings: Settings = {
    dots: false,
    arrows: false,
    speed: 500,
    autoplay: false,
    draggable: true,
  }
  return (
    <Slider {...settings} >
      {
        galleries.map(item => (
          <div key={item.id} className={style.sl_image_cnt}>
            <img src={item.image_url} className={style.sl_image_bg} alt={item.name} />
            <div className={style.sl_image_bg_linear}></div>
          </div>
        ))
      }
    </Slider>
  )
}