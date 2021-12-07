import React from 'react';
import HomeFilter from '../../Home/components/HomeFilter';
import icon from '../../../constants/icon';
import '../../Home/Home.css';
import {Pagination} from '@mui/material';
//import Loading from '../loading/Loading';
import SearchLoading from '../../Loading/SearchLoading';
import ResultItem from './ResultItem';

function Result(props:any) {
      const {
            t,
            keySearch,
            resultList,
            setChooseItem,
            loading,
            totalItem,
            setCurPage,
            total
      } = props;
      const serviceOfCardOrg = [
            { title: t('Search_result.parking'), text: '100m2', icon: icon.car },
            { title: t('Search_result.bed'), text: '80', icon: icon.bed },
            { title: t('Search_result.room'), text: '190', icon: icon.door },
            { title: t('Search_result.capacity'), text: '106 người', icon: icon.car },
      ]
      //const history = useHistory();
      // const handleChooseItem = (item: any) => {
      //       setChooseItem(item);
      // }
      // const gotoDetail = (org: any) => {
      //       history.push({
      //             pathname: `/Merchant-detail/${slugify(org.name)}`,
      //             search: `${org.id}`,
      //             state: org
      //       })
      //       scrollTop();
      // }
      const pageChange = (event: any, value: any) => {
            setCurPage(value)
      }
      return (
            <div className='result-detail'>
                  <HomeFilter
                        setCurPage={setCurPage}
                  />
                  <div className="result-detail__title">
                        <div className="result-detail__result">
                              <h3>"{keySearch}"</h3>
                              <span className="result-detail__result-total">
                                    <span>{total}</span> {t('Search_result.text_result')}
                              </span>
                        </div>
                        <div className="result-detail__path">
                              <span>{t('Search_result.text_home')}</span>
                              <img src={icon.Expand_right_2} alt="" />
                              <span>{t('Search_result.text_search')}</span>
                              <img src={icon.Expand_right_2} alt="" />
                              <span>Tp. Hồ Chí Minh</span>
                              <img src={icon.Expand_right_2} alt="" />
                              <span>Quận 3</span>
                        </div>
                  </div>
                  <ul className="result-detail__org">
                        {
                              loading === true ?
                                    <>
                                          <SearchLoading />
                                    </>
                                    :
                                    resultList.map((item: any) => (
                                          <ResultItem
                                                item={item}
                                                setChooseItem={setChooseItem}
                                                serviceOfCardOrg={serviceOfCardOrg}
                                          />
                                    ))
                        }
                  </ul>
                  <Pagination
                        color='secondary'
                        shape="rounded"
                        count={totalItem}
                        onChange={pageChange}
                  />
            </div>
      );
}

export default Result;