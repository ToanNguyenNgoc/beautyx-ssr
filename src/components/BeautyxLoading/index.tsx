import React from 'react';
// import img from '../../constants/img';
import { CircularProgress } from '@mui/material';
import './style.css';

function BeautyLoading() {
    return (
        <div className='loading-cnt'>
            <CircularProgress />
        </div>
    );
}

export default BeautyLoading;