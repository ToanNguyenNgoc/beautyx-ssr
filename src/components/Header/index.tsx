import React from 'react';
import HeadTitle from '../../features/HeadTitle';
import { Container } from '@mui/system';
import style from './Header.module.css';
import { Link } from 'react-router-dom';
import img from '../../constants/img';


function Header({ title }: { title?: string }) {
    return (
        <>
            <div className={style.header}>
                <Container>
                    <div className={style.header_cnt}>
                        <Link
                            className={style.header_left}
                            to={"/"}
                        >
                            <img src={img.beautyX} alt="" />
                        </Link>
                        <div className={style.header_right}>
                            <div className={style.header_right_search}>
                                <input 
                                    className={style.header_right_search_input}
                                    type="text" placeholder='Bạn muốn tìm gì' 
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default Header;