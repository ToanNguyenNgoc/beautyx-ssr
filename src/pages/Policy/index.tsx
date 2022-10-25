import React from 'react';
import { policies } from '../../data/policies';
import { extraParamsUrl } from '../../utils/extraParamsUrl';
// import parser from 'html-react-parser';
import './policy.css';
import Head from '../../features/Head';
import { Container } from '@mui/material'

function Policy() {
    const params = extraParamsUrl();
    const id = params?.id
    // eslint-disable-next-line eqeqeq
    const dataRender = policies.find((item: any) => item.id == id)
    return (
        <>
            <Head />
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