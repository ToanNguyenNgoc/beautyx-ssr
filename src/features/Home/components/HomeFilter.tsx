import React, { useContext, useState } from 'react';
import ButtonCus from '../../../components/ButtonCus/index';
import icon from '../../../constants/icon';
import HomeFilterForm from './HomeFilterForm';
import { AppContext } from '../../../context/AppProvider'
import { useHistory } from 'react-router-dom'

function HomeFilter(props: any) {
      const { styleFilter, setCurPage } = props;
      const { t } = useContext(AppContext);
      const history = useHistory();
      const [searchText, setSearchText] = useState("");
      const handleOnSearchChange = (e: any) => {
            setSearchText(e.target.value)
      }
      const handleSearchClick = () => {
            // history.push(`/Search-result/${searchText}`)
            history.push({
                  pathname: "/Search-result/",
                  search: `?search=${searchText}`
            })
            if (setCurPage) {
                  setCurPage(1)
            }
      }
      return (
            <div
                  style={{
                        position: styleFilter?.position,
                        width: styleFilter?.width,
                        boxShadow: styleFilter?.boxShadow,
                        padding: styleFilter?.padding
                  }}
                  className="home-banner__filter"
            >
                  <div className="home__filter-search-box">
                        <input
                              onChange={handleOnSearchChange}
                              value={searchText}
                              className="input-search"
                              type="text"
                              placeholder={t('Home.Filter_form_input')}
                        />
                        <ButtonCus
                              disabled={searchText.length === 0 ? true : false}
                              onClick={handleSearchClick}
                              imgIcon={icon.search}
                              backColor='var(--purple)'
                              borderRadius='0px 20px 20px 0px'
                        />
                  </div>
                  <HomeFilterForm />
            </div>
      );
}

export default HomeFilter;