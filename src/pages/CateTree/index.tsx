import { Container } from '@mui/system';
import React from 'react';
import style from './cate-tree.module.css'

function CateTree() {
    return (
        <>
            <Container>
                <div className={style.container}>
                    <div className={style.left}></div>
                    <div className={style.right}></div>
                </div>
            </Container>
        </>
    );
}

export default CateTree;