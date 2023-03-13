import { Dialog } from '@mui/material';
import icon from 'constants/icon';
import React from 'react';
import { XButton } from '../XButton';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import style from './full-img.module.css'

interface FullImageProps {
    src: string[],
    content?: React.ReactNode,
    open: boolean,
    setOpen: (open: boolean) => void
}
export function FullImage(props: FullImageProps) {
    const { open, setOpen, src, content } = props;
    const settings = {
        canAutoPlay: false,
        hasSizeButton: false,
        hasIndexBoard: false
    };

    return (
        <Dialog fullScreen open={open}>
            <div className={style.container}>
                <Carousel
                    {...settings} objectFit="contain"
                    images={src.map(img_url => { return { src: img_url } })}
                />
                <div className={style.container_head}>
                    <XButton
                        onClick={() => setOpen(false)}
                        icon={icon.closeCircleWhite}
                        iconSize={30}
                    />
                </div>
                <div className={style.content_container}>
                    {content ?? ''}
                </div>
            </div>
        </Dialog>
    );
}