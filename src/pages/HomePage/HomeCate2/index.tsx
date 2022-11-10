import { XButton } from 'components/Layout';
import React from 'react';
import style from './style.module.css'


function HomeCate2() {
    const list = [
        { title: "Sản phẩm", url: '' },
        { title: "Spa", url: '' },
        { title: "Nails", url: '' },
        { title: "Salon", url: '' },
        { title: "Clinic", url: '' },
    ]
    return (
        <div className={style.container}>
            {
                list.map(item => (
                    <XButton
                        key={item.title}
                        title={item.title}
                        className={style.item_btn}
                    />
                ))
            }
        </div>
    );
}

export default HomeCate2;