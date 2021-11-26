import React, { useState } from 'react';
import {headerStyle} from '../style';
import icon from '../../../constants/icon';
import ButtonCus from '../../../components/ButtonCus';
import CheckNotification from './CheckNotification'
import '../header.css';

function Menu(props:any) {
      const {openMenu} = props;
      const menu = headerStyle();
      const [openSetting, setOpenSetting] = useState(false);
      const openSettingClick = () => {
            if (openSetting === false) { setOpenSetting(true) }
            else { setOpenSetting(false) }
      }
      return (
            <div
                  style={openMenu === true ? { top: '3rem', opacity: '1', visibility: 'visible' } : {top: '5rem', opacity:'0', visibility: 'hidden' }}
                  className={menu.menuBox}
            >
                  <div className={menu.menuBoxTitle}>Menu</div>
                  <ul>
                        <li className={menu.menuBoxItem}>
                              <div className={menu.menuItemContent}>
                                    <img src={icon.User_purple} alt="" />
                                    <span className={menu.menuItemText}>Tài khoản của tôi</span>
                              </div>
                        </li>
                        <li className={menu.menuBoxItem}>
                              <div className={menu.menuItemContent}>
                                    <img src={icon.Credit_card} alt="" />
                                    <span className={menu.menuItemText}>Phương thức thanh toán</span>
                              </div>
                        </li>
                        <li className={menu.menuBoxItem}>
                              <div className={menu.menuItemContent}>
                                    <img src={icon.Clock_purple} alt="" />
                                    <span className={menu.menuItemText}>Lịch sử đơn hàng</span>
                              </div>
                        </li>
                        <li className={menu.menuBoxItem}>
                              <div className={menu.menuItemContent}>
                                    <img src={icon.Ticket} alt="" />
                                    <span className={menu.menuItemText}>Danh sách mã ưu đãi</span>
                              </div>
                        </li>
                        <li className={menu.menuBoxItem}>
                              <div className={menu.menuItemContent}>
                                    <img src={icon.Bell} alt="" />
                                    <span className={menu.menuItemText}>Thông báo</span>
                              </div>
                        </li>
                        <li className={menu.menuBoxItem}>
                              <div 
                                    onClick={openSettingClick}
                                    className={menu.menuItemDrop}
                              >
                                    <div className={menu.menuItemContent}>
                                          <img src={icon.Setting} alt="" />
                                          <span className={menu.menuItemText}>Cài đặt</span>
                                    </div>
                                    <img src={icon.down} alt="" />
                              </div>
                              <ul
                                    style={openSetting === false ? { display: 'none' } : { display: 'block' }}
                                    className={menu.menuSetting}
                              >
                                    <li className={menu.menuSettingItem}>
                                          <span>Nhận thông báo</span>
                                          <CheckNotification/>
                                    </li>
                                    <li className={menu.menuSettingItem}>
                                          <span>Ngôn ngữ</span>
                                          <CheckNotification />
                                    </li>
                              </ul>
                        </li>
                        <li className={menu.menuBoxItem}>
                              <div className={menu.menuItemContent}>
                                    <img src={icon.Headphones_purple} alt="" />
                                    <span className={menu.menuItemText}>Hỗ trợ</span>
                              </div>
                        </li>
                  </ul>
                  <div className={menu.menuBottom}>
                        <img src={icon.Menu} alt="" />
                        <ButtonCus
                              text='Đăng xuất'
                              color='var(--purple)'
                              fontSize='14px'
                              lineHeight='20px'
                              paddingLeft='4px'
                        />
                  </div>
            </div>
      );
}

export default Menu;