import React from 'react';
import './BackButton.css';
import icon from '../../../constants/icon';
import { Container } from '@mui/material';
import { useHistory } from 'react-router-dom'

interface BackButtonProps {
      onBackFunc?: () => void,
      setOpenFilter?: any,
      setStep?: any
}

export function BackButton(props: BackButtonProps) {
      const history = useHistory();
      const { setOpenFilter, setStep, onBackFunc } = props;
      const backClick = () => {
            if (onBackFunc) {
                  return onBackFunc()
            }
            if (setOpenFilter) {
                  setOpenFilter(false)
            }
            else if (setStep) {
                  setStep(1)
            }
            else {
                  history.goBack()
            }
      }
      return (
            <div className='cus-back'>
                  <Container>
                        <button onClick={backClick} className="cus-back__btn">
                              <img src={icon.chevronLeft} alt="" />
                              {
                                    document.body.offsetWidth < 767 ?
                                          ''
                                          :
                                          'Trở lại'
                              }
                        </button>
                  </Container>
            </div>
      );
}