import React, { useContext } from 'react';
import icon from '../../../constants/icon';
import { Dialog } from '@mui/material';
import ButtonCus from '../../../components/ButtonCus';
import {useHistory} from 'react-router-dom'
import { AppContext } from '../../../context/AppProvider';

function PopupSuccess(props: any) {
      const history = useHistory();
      const {t} = useContext(AppContext)
      const { popup, setPopup, title } = props;
      const handleClose = () => {
            setPopup(false);
      }
      const goBack=()=>{
            setPopup(false);
            history.push('/')
      }
      return (
            <Dialog
                  open={popup}
                  onClose={handleClose}
            >
                  <div className="flex-column pu-success">
                        <img className="pu-success__img" src={icon.success} alt="" />
                        <span className="pu-success__title">
                              {title}
                        </span>
                        <div
                              className="pu-success__booking"
                        >
                              <div className="flex-row">
                                    <ButtonCus
                                          borderRadius="18px"
                                          margin="8px 0px 0px"
                                          text={t('Home.home')}
                                          color="var(--purple)"
                                          backColor="var(--bg-color)"
                                          onClick={goBack}
                                    />
                              </div>
                        </div>
                  </div>
            </Dialog>
      );
}

export default PopupSuccess;