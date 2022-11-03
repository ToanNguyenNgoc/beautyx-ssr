import React, { useContext, useState, KeyboardEvent } from 'react';
import img from '../../constants/img';
import './style.css'
import { AppContext } from '../../context/AppProvider';
import { Container } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Footer from '../../features/Footer';
import icon from '../../constants/icon';

const onDropList = () => {
    document.querySelector('.sel-cent-cnt__form .inp-right')?.classList.toggle('drop')
}

function SellerCenter() {
    const history = useHistory();
    const { t } = useContext(AppContext)
    const [sub, setSub] = useState('');
    const domains = ['.myspa.vn', '.myclinic.vn'];
    const [chooseDomain, setChooseDomain] = useState('.myspa.vn')
    const onGotoManager = () => {
        if (sub.length > 0) {
            const newWindow = window.open(`https://${sub}${chooseDomain}`, '_blank', 'noopener,noreferrer')
            if (newWindow) newWindow.opener = null
        }
    }
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
            onGotoManager();
        }
    };

    return (
        <>
            {/* <Head /> */}
            <div
                className='sel-cent-cnt'
            >
                <div className="sel-cent-cnt__head">
                    <Container>
                        <div className="flex-row-sp cnt">
                            <img
                                onClick={() => history.push('/home')}
                                src={img.beautyX}
                                alt=""
                            />
                            <button
                                onClick={() => history.push('/partner')}
                            >
                                {t("Header.1")}
                            </button>
                        </div>
                    </Container>
                </div>
                <img src={img.sellerCenterImg} alt="" />
                <div className="sel-cent-cnt__form">
                    <div className="container">
                        <div className="form-cnt">
                            <img className='logo' src={img.beautyX} alt="" />
                            <span className="title"></span>
                            <div className="inp">
                                <input
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => setSub(e.target.value)}
                                    type="text"
                                    placeholder={t("sell_center.enter_your_subdomain")}
                                />
                                <div
                                    className="inp-right"
                                    onClick={onDropList}
                                >
                                    <span className='flex-row'>
                                        {chooseDomain}
                                        <img src={icon.down_2} alt="" />
                                    </span>
                                    <ul className="inp-right__list">
                                        {
                                            domains.map((item, index) => (
                                                <li
                                                    onClick={() => setChooseDomain(item)}
                                                    key={index}
                                                    style={chooseDomain === item ? { color: 'var(--purple)' } : {}}
                                                >
                                                    {item}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="form-cnt__btn">
                                <button
                                    onClick={onGotoManager}
                                >
                                    {t("sell_center.next")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SellerCenter;