import { IBanner } from 'interface/banner';
import React from 'react';
import parse from 'html-react-parser'
import style from './style.module.css'

export function TypeLandingPage({ banner }: { banner: IBanner }) {
    return (
        <div className={style.body_container}>
            {banner?.htmlTemplate && parse(banner.htmlTemplate)}
        </div>
    );
}