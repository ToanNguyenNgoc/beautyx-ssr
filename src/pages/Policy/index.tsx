import React from 'react';
import { policies } from '../../data/policies';
import { extraParamsUrl } from '../../utils/extraParamsUrl';
// import parser from 'html-react-parser';
import './policy.css';
import Head from '../../features/Head';
import { Container } from '@mui/material'
import { useDeviceMobile } from 'hooks';
import HeadMobile from 'features/HeadMobile';

function Policy() {
    const params = extraParamsUrl();
    const IS_MB = useDeviceMobile()
    const id = params?.id
    // eslint-disable-next-line eqeqeq
    const dataRender = policies.find((item: any) => item.id == id)
    return (
        <>
            {IS_MB ? <HeadMobile title={dataRender?.title ?? ''} /> : <Head />}
            {
                id && dataRender &&
                <Container>
                    <div className="po-container">
                        <div dangerouslySetInnerHTML={{ __html: dataRender.templateHtml }}>
                        </div>
                    </div>
                </Container>
            }
        </>
    );
}

export default Policy;