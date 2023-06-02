import { Dialog } from "@mui/material"
import style from "./share.module.css"
import { useContext, useState } from "react"
import { OrgContext, OrgContextType } from "context"
import { XButton } from "components/Layout"
import icon from "constants/icon"
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  EmailShareButton,
  EmailIcon,

} from 'react-share'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { PopupMessage } from "components/Notification"

interface SharePopupProps {
  open: boolean,
  onClose?: () => void,
  fullscreen?: boolean
}

export const SharePopup = ({ open = false, onClose, fullscreen = false }: SharePopupProps) => {
  const close = () => onClose && onClose()
  return (
    <Dialog open={open} onClose={close} fullScreen={fullscreen}  >
      <Share close={close} />
    </Dialog>
  )
}

export const Share = ({ close }: { close?: () => void }) => {
  const { org } = useContext(OrgContext) as OrgContextType
  const link = window.location.href
  const [open, setOpen] = useState(false)
  return (
    <div className={style.container}>
      <div className={style.head}>
        <XButton
          onClick={close}
          icon={icon.closeBlack}
        />
        <span>Chi sẻ về doanh nghiệp này</span>
        <div></div>
      </div>
      <div className={style.org}>
        <div className={style.org_image}>
          <img src={org?.image_url} alt={org?.name} />
        </div>
        <h5>{org?.name}</h5>
      </div>
      <div className={style.body}>
        <ul className={style.list}>
          <li className={style.list_item}>
            <FacebookShareButton url={link} >
              <FacebookIcon size={34} round={true} />
              <span> Facebook</span>
            </FacebookShareButton>
          </li>
          <li className={style.list_item}>
            <FacebookMessengerShareButton appId='686071616240588' url={link} >
              <FacebookMessengerIcon size={34} round={true} />
              <span>Messenger</span>
            </FacebookMessengerShareButton>
          </li>
          <li className={style.list_item}>
            <EmailShareButton body={org?.name || org?.description} url={link} >
              <EmailIcon size={34} round={true} />
              <span>Email</span>
            </EmailShareButton>
          </li>
          <li className={style.list_item}>
            <CopyToClipboard text={link} >
              <XButton
                onClick={() => setOpen(true)}
                className={style.copy_btn}
              >
                <div className={style.copy_icon}>
                  <img style={{ width: '16px', height: '16px', margin: '0px' }} src={icon.shareWhite} alt="" />
                </div>
                <span>Sao chép liên kết</span>
              </XButton>
            </CopyToClipboard>
            <PopupMessage
              open={open}
              onClose={() => setOpen(false)}
              content='Đã sao chép'
              iconLabel={icon.checkGreen}
              iconSize={40}
              autoHide={true}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}