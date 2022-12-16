import React, { useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import icon from 'constants/icon';
import style from './head-mobile.module.css'
import { XButton } from "components/Layout"
import img from 'constants/img';
import { Container } from '@mui/system';
import { useDeviceMobile } from 'hooks';
import { clst } from 'utils';

interface IProps {
    title: string,
    prevUrl?: string,
    onBack?: (back: boolean) => void,
    onBackFunc?: () => void,
    handleCancelPayment?: () => void,
    element?: any,
    ref?: any,
    className?: string,
    classNameInput?: string
}


function HeadMobile(props: IProps) {
    const { title, onBack, handleCancelPayment, element, prevUrl, onBackFunc, ref } = props;
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
    const refHead = useRef<HTMLDivElement>(null)
    const className = props.className ?? ''
    const classNameInput = props.classNameInput ?? ''
    return (
        <div id='head_mobile' ref={ref ?? refHead} className={clst([style.container, className])}>
            <Container>
                <div className={style.wrapper}>
                    <XButton
                        icon={icon.chevronLeft}
                        title={IS_MB ? "" : 'Trở lại'}
                        className={clst([style.button, classNameInput])}
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