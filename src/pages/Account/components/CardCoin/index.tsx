import { Dialog } from "@mui/material";
import { XButton } from "components/Layout";
import icon from "constants/icon";
import img from "constants/img";
import { User } from "interface";
import { useRef, useState } from "react";
import style from './card-coin.module.css'


function CardCoin(
    { user, open, setOpen }: { user: User, open: boolean, setOpen: (open: boolean) => void }
) {
    const cardRefFont = useRef<HTMLDivElement>(null)
    const cardRefBack = useRef<HTMLDivElement>(null)
    const onRotateCard = () => {
        if (cardRefBack && cardRefFont) {
            cardRefFont.current?.classList.toggle(style.card_font_tr)
            cardRefBack.current?.classList.toggle(style.card_back_tr)
        }
    }
    const list = [
        { title: 'Đồng', bgColor: '#C27830', min: 0, max: 20000 },
        { title: 'Bạc', bgColor: '#DCDCDC', min: 20000, max: 40000 },
        { title: 'Vàng', bgColor: '#E9D674', min: 40000, max: 60000 },
        { title: 'Bạch kim', bgColor: '#EDECEA', min: 60000, max: 1000000000 },
    ]
    const curRank = list.find(i => (i.min <= user?.btx_points && user.btx_points <= i.max))
    const percent = Math.round(user?.btx_points / 60000 * 100)
    const [viewRank, setViewRank] = useState(list[0])
    return (
        <Dialog
            open={open}
            fullScreen
        >
            <div className={style.container}>
                <div onClick={() => setOpen(false)} className={style.card}>
                    <div onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }} className={style.card_cnt}
                    >
                        <div ref={cardRefFont} className={style.card_cnt_font}>
                            <XButton
                                className={style.rotate_btn}
                                icon={icon.refresh}
                                onClick={onRotateCard}
                            />
                            <div className={style.card_head}>
                                <div className={style.card_head_img}>
                                    <img src={user?.avatar ?? img.imgDefault} alt="" />
                                </div>
                                <div className={style.card_head_user}>
                                    <p className={style.user_name}>{user?.fullname}</p>
                                    <p className={style.user_email}>
                                        <img src={icon.phoneWhite} alt="" />
                                        {user?.telephone}
                                    </p>
                                    <p className={style.user_email}>
                                        <img src={icon.emailWhite} alt="" />
                                        {user?.email}
                                    </p>
                                </div>
                            </div>
                            <div className={style.card_bot}>
                                <div className={style.card_bot_de}>
                                    <div className={style.card_bot_left}>
                                        <div className={style.card_bot_qr}>
                                            <img src="" alt="" />
                                        </div>
                                    </div>
                                    <div className={style.card_bot_right}>
                                        <img src={icon.coins} alt="" className="" />
                                        <div className={style.card_bot_right_count}>
                                            <p>Hạng : {curRank?.title}</p>
                                            <p>{user?.btx_points}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className={style.card_bot_qr_label}>
                                    Quét mã để xem các ưu đãi cho hạng thành viên
                                </p>
                            </div>
                        </div>
                        <div ref={cardRefBack} className={style.card_cnt_back}>
                            <XButton
                                className={style.rotate_btn}
                                icon={icon.refresh}
                                onClick={onRotateCard}
                            />
                            <div className={style.back_head}>
                                <div className={style.card_back_rank}>
                                    <p className={style.card_back_rank_label}>
                                        <img src={icon.coins} alt="" />
                                        Phân hạng thành viên
                                    </p>
                                    <p className={style.card_back_rank_point}>
                                        Điểm : {user?.btx_points}
                                    </p>
                                </div>
                                <div className={style.card_back_rank_track}>
                                    <ul className={style.track_cnt}>
                                        {
                                            list.map((item) => (
                                                <li
                                                    onClick={() => setViewRank(item)}
                                                    key={item.title}
                                                    style={{
                                                        backgroundColor: `${item.bgColor}`,
                                                        opacity: user?.btx_points > item.min ? '1' : '0.5'
                                                    }}
                                                    className={style.track_item}>
                                                    {item.title}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <div className={style.track_line}>
                                        <div className={style.track_line_par}>
                                            <div style={{ width: `${percent}%` }} className={style.track_line_child}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style.back_rank_detail}>
                                <p className={style.back_rank_detail_label}>
                                    Ưu đãi giàng cho thành viên hạng: {viewRank?.title}
                                </p>
                                <div className={style.back_rank_detail_body}>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default CardCoin;