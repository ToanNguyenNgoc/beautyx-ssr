import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import icon from 'constants/icon';
import style from './head-mobile.module.css'
import { XButton } from "components/Layout"
import img from 'constants/img';
import { Container } from '@mui/system';
import { useDeviceMobile } from 'utils';

interface IProps {
    title: string,
    prevUrl?: string,
    onBack?: (back: boolean) => void,
    onBackFunc?: () => void,
    handleCancelPayment?: () => void,
    element?: any,
}


function HeadMobile(props: IProps) {
    const { title, onBack, handleCancelPayment, element, prevUrl, onBackFunc } = props;
    const location: any = useLocation()
    const IS_MB = useDeviceMobile()
    const history = useHistory();
    const onBackClick = () => {
        if (handleCancelPayment) {
            handleCancelPayment()
        }
        if (onBack) {
            return onBack(false)
        } if (onBackFunc) {
            return onBackFunc()
        }
        if (location?.state?.payment_url) {
            history.push("/");
        }
        if (prevUrl) {
            history.push(prevUrl)
        }
        else {
            history.goBack()
        }
    }
    return (
        <div className={style.container}>
            <Container>
                <div className={style.wrapper}>
                    <XButton
                        icon={icon.chevronLeft}
                        title={IS_MB ? "" : 'Trở lại'}
                        className={style.button}
                        onClick={onBackClick}
                    />
                    <img className={style.head_icon} src={img.beautyX} alt="" />
                    <span className={style.head_title}>{title}</span>
                    <div className={style.head_left}>
                        {element}
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default HeadMobile;