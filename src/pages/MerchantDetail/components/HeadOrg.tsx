/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OrgSearch from './OrgPages/OrgSearch/OrgSearch';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _, { debounce } from 'lodash';
import { getTotal } from 'redux/cart';
import { IOrganization } from 'interface';
import { fetchAsyncByKeyword } from 'redux/org/orgSlice';
import icon from 'constants/icon';
import '../style.css'

interface IProps {
    org: IOrganization,
    isShowSearch?: boolean,
    onBackFunc?: () => void
}

// onload event

function HeadOrg(props: IProps) {
    window.addEventListener("scroll", function () {
        const scrolled = window.scrollY;
        const de_header = document.getElementById("org_head");
        if (de_header) {
            de_header.style.backgroundColor = `rgb(255 255 255 / ${scrolled}%)`
        }
    });
    const { org, isShowSearch, onBackFunc } = props;
    const { USER } = useSelector((state: any) => state.USER);
    const dispatch = useDispatch();
    const history = useHistory();
    const orgHeadRef = useRef<any>();
    const orgSearchBtn = useRef<any>();
    const orgSearchCnt = useRef<any>();
    const orgInputRef = useRef<any>();
    const onBackClick = () => {
        if (onBackFunc) {
            return onBackFunc()
        }
        if (orgSearchCnt.current.offsetHeight > 0) {
            if (window.scrollY <= 80) {
                orgHeadRef.current.classList.remove('mb-head-act')
            }
            orgSearchBtn.current.style.borderRadius = '100%';
            orgInputRef.current.classList.remove('mb-head-org__input-show');
            orgSearchCnt.current.classList.remove("org-search-show")
        } else {
            history.goBack()
        }
    }
    const onClickSearchIcon = () => {
        orgHeadRef.current.classList.add('mb-head-act')
        orgSearchBtn.current.style.marginLeft = 0;
        orgSearchBtn.current.style.borderRadius = '0px 16px 16px 0px';
        orgInputRef.current.classList.add("mb-head-org__input-show");
        orgSearchCnt.current.classList.add("org-search-show")
    }
    //on input change
    const callByKeyword = (text: string) => {
        const values = {
            keyword: text,
            org_id: org?.id
        }
        dispatch(fetchAsyncByKeyword(values))
    }

    const getByKeyword = useCallback(debounce((text) => callByKeyword(text), 800), [org])
    const [keyword, setKeyword] = useState('')
    const onInputChange = (e: any) => {
        setKeyword(e.target.value)
        getByKeyword(e.target.value)
    }
    const carts = useSelector((state: any) => state.carts);
    useEffect(() => {
        dispatch(getTotal(USER?.id));
    }, [dispatch, carts]);

    const onGotoCart = () => {
        if (USER) {
            history.push("/gio-hang")
        } else {
            history.push("/sign-in?1")
        }
    }

    return (
        <>
            <div id='org_head' ref={orgHeadRef} className='flex-row-sp mb-head-org-cnt' >
                <div className="mb-head-org-cnt__left">
                    <button
                        className='mb-head-org-cnt__button'
                        onClick={onBackClick}
                    >
                        <div className="icon-btn">
                            <img src={icon.chevronLeft} alt="" />
                        </div>
                    </button>
                </div>
                <div className="flex-row mb-head-org-cnt__right">
                    <input
                        className='mb-head-org__input'
                        ref={orgInputRef}
                        onChange={onInputChange}
                        value={keyword}
                        type="text"
                        placeholder='Tìm kiếm trong cửa hàng...'
                    />
                    {
                        isShowSearch &&
                        <button
                            className='mb-head-org-cnt__button'
                            ref={orgSearchBtn}
                            onClick={onClickSearchIcon}
                        >
                            <div className="icon-btn">
                                <img src={icon.searchPurple} alt="" />
                            </div>
                        </button>
                    }
                    <button
                        className='mb-head-org-cnt__button'
                        onClick={onGotoCart}
                    >
                        {
                            carts.cartQuantity > 0 &&
                            <div className="badge">
                                {carts.cartQuantity >= 10 ? "9+" : carts.cartQuantity}
                            </div>
                        }
                        <div className="icon-btn">
                            <img src={icon.ShoppingCartSimple} alt="" />
                        </div>
                    </button>
                </div>
            </div>
            {
                isShowSearch &&
                <OrgSearch
                    orgSearchCnt={orgSearchCnt}
                    keyword={keyword}
                    org={org}
                />
            }
        </>
    );
}

export default HeadOrg;