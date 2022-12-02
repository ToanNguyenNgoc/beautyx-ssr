import React from 'react';
import { Helmet } from "react-helmet";


interface SeoProps {
    imageCover: string,
    title: string,
    content: string
}

export function Seo(props: SeoProps) {
    const { title, content, imageCover } = props;
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={content} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <meta property="og:image" content={imageCover} />
            <meta property="twitter:image" content={imageCover} />
        </Helmet>
    );
}