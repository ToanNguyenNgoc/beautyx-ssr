import { XButton } from 'components/Layout';
import icon from 'constants/icon';
import React from 'react';
import { useDeviceMobile } from 'utils';
import style from './style.module.css'


function HomeCate2() {
    const IS_MB = useDeviceMobile()
    const cates = [
        { title: 'Sản phẩm', icon: icon.cateSanpham, link: `product` },
        { title: 'Spa', icon: icon.cateSpa, link: `/ket-qua-tim-kiem/cua-hang?keyword=spa` },
        { title: 'Nail', icon: icon.cateNail, link: `/ket-qua-tim-kiem/cua-hang?keyword=nail` },
        { title: 'Salon', icon: icon.cateSalon, link: `/ket-qua-tim-kiem/cua-hang?keyword=salon` },
        { title: 'Clinic', icon: icon.cateClinic, link: `/ket-qua-tim-kiem/cua-hang?keyword=clinic` },
    ]
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                {
                    cates.map(item => (
                        <div key={item.title} className={style.item_cnt}>
                            <XButton
                                icon={IS_MB ? item.icon : ''}
                                title={IS_MB ? '' : item.title}
                                className={style.item_btn}
                            />
                            <span className={style.item_title}>
                                {item.title}
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default HomeCate2;