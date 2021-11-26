import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/index';
import './SearchResult.css'
import {useLocation} from 'react-router-dom';
import Result from './components/Result';
import MapWrapper from './components/MapWrapper';
import {Container} from '@mui/material';
import Footer from '../Footer/index';
import {Organization} from '../../interface/organization';
import orgApi from '../../api/organizationApi';
import { AppContext } from '../../context/AppProvider';

function SearchResult(props:any) {
      const {t} = useContext(AppContext)
      const location = useLocation();
      const [chooseItem, setChooseItem] = useState();
      const params = location.search.slice(8, location.search.length)
      const keySearch = decodeURI(params)
      const [loading, setLoading] = useState(false);
      const [orgs, setOrgs] = useState<Organization[]>([])
      const [totalItem, setTotalItem] = useState()
      const [curPage, setCurPage] = useState(1)
      useEffect(() => {
            async function handleGetOrgs() {
                  setLoading(true)
                  try {
                        const res = await orgApi.getOrgByKeyword({
                              page: curPage,
                              keySearch: keySearch
                        });
                        setTotalItem(res.data.context.total);
                        setOrgs(res.data.context.data);
                        setLoading(false);
                  } catch (err) {
                        console.log(err)
                  }
            }
            handleGetOrgs()
      }, [keySearch, curPage])
      return (
            <div style={{
                  backgroundColor: 'var(--bg-gray)'
            }}>
                  <Header />
                  <Container>
                        <div className="result-content">
                              <Result
                                    t={t}
                                    keySearch={keySearch}
                                    totalItem={totalItem}
                                    setCurPage={setCurPage}
                                    resultList={orgs}
                                    setChooseItem={setChooseItem}
                                    loading={loading}
                              />
                              <MapWrapper
                                    chooseItem={chooseItem}
                                    width='50%'
                              />
                        </div>
                  </Container>
                  <Footer/>
            </div>
      );
}

export default SearchResult;