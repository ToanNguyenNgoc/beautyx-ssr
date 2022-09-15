/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { imgTag } from '../../src/constants/img';
import icon from '../../src/constants/icon';
import useTrans from '../../context/hooks/useTrans';
import Link from 'next/link';
import style from './home.module.css'
import Image from 'next/image';
import { Container } from '@mui/material';

export function HomeTags() {
    const trans = useTrans()
    const tags_data = [
        // { id: 9, title: t("home_2.places_near_you"), text: t("home_2.places_near_you"), img: icon.distance },
        { id: 4, title: "Spa", text: "Spa", img: imgTag.spa },
        { id: 3, title: "Salon", text: "Salon", img: imgTag.hairSalon },
        { id: 1, title: "Nail", text: "Nail", img: imgTag.nails },
        {
            id: 6,
            title: "clinic",
            text: "clinic",
            img: imgTag.clinic,
        },
        {
            id: 8,
            title: "Massage",
            text: "Massage",
            img: imgTag.massage,
        },
        {
            id: 5,
            title: "Thẩm mỹ viện",
            text: trans.home_2.beauty_salon,
            img: imgTag.skinCare,
        },
        {
            id: 2,
            title: "nha khoa",
            text: trans.home_2.dentistry,
            img: imgTag.nhaKhoa,
        },
        // { id: 7, title: 'Yoga', text: "Yoga", img: imgTag.yoga },
    ];
    return (
        <Container>
            <div className={style.tags_cnt}>
                <ul className={style.tag_list}>
                    <li className={style.tag_item}>
                        <Link href={"/#"}>
                            <a>
                                <div className={style.tag_item_cnt}>
                                    <div className={style.tag_item_img}>
                                        <Image
                                            src={icon.locationCate}
                                            alt=""
                                            layout="responsive"
                                        />
                                    </div>
                                    <span className={style.item_name}>
                                        Gần bạn
                                    </span>
                                </div>
                            </a>
                        </Link>
                    </li>
                    {
                        tags_data.map(item => (
                            <li key={item.id} className={style.tag_item}>
                                <Link href={"/#"}>
                                    <a>
                                        <div className={style.tag_item_cnt}>
                                            <div className={style.tag_item_img}>
                                                <Image
                                                    src={item.img}
                                                    alt={item.title}
                                                    layout="responsive"
                                                />
                                            </div>
                                            <span className={style.item_name}>
                                                {item.text}
                                            </span>
                                        </div>
                                    </a>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </Container>
    );
}