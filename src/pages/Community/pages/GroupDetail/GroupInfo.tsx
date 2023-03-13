import { Dialog } from '@mui/material';
import icon from 'constants/icon';
import HeadMobile from 'features/HeadMobile';
import { useDeviceMobile } from 'hooks';
import { IGroup } from 'pages/Community/data';
import React from 'react';
import style from './group-detail.module.css'

interface GroupInfoProps {
    open: boolean, setOpen: (open: boolean) => void, group: IGroup,
    postListCount: number
}

function GroupInfo(props: GroupInfoProps) {
    const { open, setOpen, group, postListCount } = props
    const IS_MB = useDeviceMobile()
    const members: any[] = []
    for (var i = 0; i < 20; i++) {
        const member = {
            id: i,
            fullname: `Full name ${i}`,
            avatar: `https://picsum.photos/id/1${i}/100/100`
        }
        members.push(member)
    }

    return (
        <>
            <Dialog fullScreen={IS_MB} open={open} onClose={() => setOpen(false)} >
            {IS_MB && <HeadMobile onBackFunc={() => setOpen(false)} title={group?.name} />}
                <div className={style.information}>
                    <div className={style.info_wrapper}>
                        <div className={style.info_section}>
                            <p className={style.info_section_title}>
                                Thông tin chung
                            </p>
                            <div className={style.info_section_desc}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Proin laoreet elit purus, et gravida libero. Lorem ipsum
                                dolor sit amet ...Xem thêm
                            </div>
                            <ul className={style.info_section_other}>
                                <li className={style.info_section_other_item}>
                                    <img src={icon.userGray} alt="" />
                                    200 thành viên
                                </li>
                                <li className={style.info_section_other_item}>
                                    <img src={icon.postGray} alt="" />
                                    {postListCount} bài viết
                                </li>
                                <li className={style.info_section_other_item}>
                                    <img src={icon.createAtGray} alt="" />
                                    Tạo ngày 01/12/2022
                                </li>
                            </ul>
                        </div>
                        <div className={style.info_section}>
                            <p className={style.info_section_title}>
                                Quy định nhóm
                            </p>
                            <div className={style.info_section_desc}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Proin laoreet elit purus, et gravida libero. Lorem ipsum
                                dolor sit amet ...Xem thêm
                            </div>
                        </div>
                        <div className={style.info_section}>
                            <p className={style.info_section_title}>
                                Thành viên nhóm
                            </p>
                            <ul className={style.info_member_list}>
                                {
                                    members.map(i => (
                                        <li key={i.id} className={style.info_member_item}>
                                            <div className={style.info_member_item_avt}>
                                                <img src={i.avatar} alt="" />
                                            </div>
                                            <div className={style.info_member_item_name}>
                                                {i.fullname}
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default GroupInfo;