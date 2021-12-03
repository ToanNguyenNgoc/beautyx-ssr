import React, { useState } from 'react';
import SectionTitle from '../../SectionTitle/index';
import icon from '../../../constants/icon';
import {category} from '../../../data/category';

function ServiceCate(props: any) {
      const { t, categories, setChooseCate } = props;
      const [activeCate, setActiveCate] = useState();
      const handleActiveCateClick = (cate: any) => {
            setActiveCate(cate)
            setChooseCate(cate.id);
      }
      return (
            <div className="ser-category">
                  <div className="flex-row">
                        <img src={icon.dashboard} alt="" />
                        <SectionTitle
                              title={t('Home.Filter_category')}
                        />
                  </div>
                  <div className="ser-category-box">
                        <ul className="ser-category-box__list">
                              {
                                    categories.map((item:any) => (
                                          <li
                                                onClick={() => handleActiveCateClick(item)}
                                                key={item.id}
                                                className="ser-category-box__item"
                                          >
                                                <div
                                                      style={activeCate === item ?
                                                            { color: 'var(--purple)' }
                                                            :
                                                            { color: 'var(--text-hover)' }
                                                      }
                                                      className="flex-row-sp"
                                                >
                                                      {item.name}
                                                      <img src={icon.next} alt="" />
                                                </div>
                                                {/* <ul
                                                      style={activeCate === item ?
                                                            { display: 'block' }
                                                            :
                                                            { display: 'none' }}
                                                      className="ser-category-box__item-child"
                                                >
                                                      {
                                                            item.child.map(itemChild => (
                                                                  <li key={itemChild.id} >{itemChild.name}</li>
                                                            ))
                                                      }
                                                </ul> */}
                                          </li>
                                    ))
                              }
                        </ul>
                  </div>
            </div>
      );
}

export default ServiceCate;