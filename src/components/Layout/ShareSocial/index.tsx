import React, { useState } from 'react';
import {
    FacebookShareButton,
    FacebookIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    EmailShareButton,
    EmailIcon,
} from 'react-share'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import style from './share.module.css'
import { XButton } from '../XButton';
import icon from 'constants/icon';
import { DOMAIN } from 'common'
import { PopupMessage } from 'components/Notification'

interface ShareSocialProps {
    url: string
}

export function ShareSocial(props: ShareSocialProps) {
    const [open, setOpen] = useState(false)
    const originUrl = window.location.href
    return (
        <>
            <div className={style.container}>
                <span className={style.title}>Chia sẻ:</span>
                <div className={style.list_btn}>
                    <div className={style.share_btn}>
                        <FacebookShareButton url={originUrl} >
                            <FacebookIcon size={30} round={true} />
                        </FacebookShareButton>
                    </div>
                    <div className={style.share_btn}>
                        <FacebookMessengerShareButton appId='686071616240588' url={originUrl} >
                            <FacebookMessengerIcon size={30} round={true} />
                        </FacebookMessengerShareButton>
                    </div>
                    <div className={style.share_btn}>
                        <EmailShareButton body='mxknsjxnsk' url={originUrl} >
                            <EmailIcon size={30} round={true} />
                        </EmailShareButton>
                    </div>
                    <div className={style.share_btn} >
                        <CopyToClipboard text={originUrl} >
                            <XButton
                                onClick={() => setOpen(true)}
                                className={style.clip_board_icon}
                                icon={icon.shareWhite}
                                iconSize={15}
                            />
                        </CopyToClipboard>
                    </div>
                </div>
            </div>
            <PopupMessage
                open={open}
                onClose={() => setOpen(false)}
                content='Đã sao chép'
                iconLabel={icon.checkGreen}
                iconSize={40}
                autoHide={true}
            />
        </>
    );
}