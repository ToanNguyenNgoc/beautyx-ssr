import { Dialog } from "@mui/material"
import { ReactNode } from "react"
import style from './dialog.module.css'
import { XButton } from "components/Layout"
import icon from "constants/icon"

interface OrgDialogProps {
  title?:string
  open: boolean,
  onClose?: () => void,
  children?: ReactNode
}

export const OrgDialog = ({ open, onClose, children, title }: OrgDialogProps) => {
  return (
    <Dialog
      open={open}
      fullScreen
    >
      <div className={style.head}>
        <XButton
          className={style.head_back}
          onClick={onClose}
          icon={icon.chevronRightBlack}
          iconSize={20}
        />
        <span className={style.head_title}>{title}</span>
      </div>
      {children}
    </Dialog>
  )
}