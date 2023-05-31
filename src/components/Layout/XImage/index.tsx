import img from 'constants/img';
import React from 'react';
import { onErrorImg } from 'utils';

interface Props {
    src: string,
    alt?: string,
    className?: string
}

export function XImage(props: Props) {
    const src = props.src ?? img.imgDefault
    const alt = props.alt ?? ''
    const className = props.className ?? ''
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={(e) => onErrorImg(e)}
        />
    );
}