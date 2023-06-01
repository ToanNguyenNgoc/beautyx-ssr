import { Container, Dialog } from "@mui/material"
import style from './gallery.module.css'
import { FullImage, XButton } from "components/Layout"
import icon from "constants/icon"
import { useContext, useState } from "react"
import { OrgContext, OrgContextType } from "context"

interface GalleryProps {
  open: boolean,
  onClose?: () => void
}

export const Gallery = ({ open, onClose }: GalleryProps) => {
  const { galleries } = useContext(OrgContext) as OrgContextType
  const [tab, setTab] = useState(galleries[0])
  const [fullImg, setFullImg] = useState(false)
  const [index, setIndex] = useState(1)
  const onOpenFull = (i: number) => {
    setFullImg(true)
    setIndex(i)
  }
  return (
    <Dialog
      open={open}
      fullScreen
    >
      <FullImage
        index={index}
        open={fullImg} setOpen={setFullImg}
        src={tab?.images?.map(i => i.image_url)}
      />
      <div className={style.head}>
        <XButton
          className={style.head_back}
          onClick={onClose}
          icon={icon.chevronRightBlack}
          iconSize={20}
        />
        <span className={style.head_title}>Thư viện hình ảnh</span>
      </div>
      <Container>
        <div className={style.body}>
          <ul className={style.list_thumb}>
            {
              galleries?.map(item => (
                <li
                  onClick={() => setTab(item)}
                  key={item.id} className={style.thumb_item}
                >
                  <div className={style.thumb_item_img}>
                    <img src={item.image_url} alt="" />
                  </div>
                  <div className={style.thumb_item_detail}>
                    <p>{item.name}</p>
                    <p>{item.images?.length} hình</p>
                  </div>
                </li>
              ))
            }
          </ul>
          <div className={style.tab_cnt}>
            <span className={style.tab_name}>{tab?.name}</span>
            <ul className={style.tab_image_list}>
              {
                tab?.images?.map((item, index) => (
                  <li onClick={() => onOpenFull(index)} key={item.id} className={style.tab_image_item}>
                    <img src={item.image_url} alt="" />
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </Container>
    </Dialog>
  )
}