/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import icon from '../../../constants/icon';
import { IOrganization } from '../../../interface/organization';
import {
    onDeleteFavoriteOrg,
    onFavoriteOrg,
    fetchAsyncByKeyword
} from '../../../redux/org/orgSlice';
import OrgSearch from './OrgPages/OrgSearch/OrgSearch';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _, { debounce } from 'lodash';
import { getTotal } from '../../../redux/cartSlice';

interface IProps {
    org: IOrganization,
    isShowSearch?: boolean,
    onBackFunc?: () => void
}

// onload event
window.addEventListener("scroll", function () {
    const scrolled = window.scrollY;
    const de_header = document.querySelector(".mb-head-org-cnt");
    const windowPosition = scrolled > 80;
    if (de_header) {
        de_header.classList.toggle("mb-head-act", windowPosition);
    }
});

function HeadOrg(props: IProps) {
    const { USER } = useSelector((state: any) => state.USER);
    const dispatch = useDispatch();
    const history = useHistory();
    const { org, isShowSearch, onBackFunc } = props;
    const orgHeadRef = useRef<any>();
    const orgSearchBtn = useRef<any>();
    const orgSearchCnt = useRef<any>();
    const orgInputRef = useRef<any>();
    const handleFavoriteOrg = () => {
        if (USER) {
            if (org?.is_favorite) {
                dispatch(onDeleteFavoriteOrg(org))
            } else {
                dispatch(onFavoriteOrg(org))
            }
        }
        else {
            history.push('/sign-in?1')
        }
    }
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
            <div ref={orgHeadRef} className='flex-row-sp mb-head-org-cnt' >
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
                    {
                        isShowSearch &&
                        <button
                            className='mb-head-org-cnt__button'
                            onClick={handleFavoriteOrg}
                        >
                            <div className="icon-btn">
                                <img src={org?.is_favorite ? icon.heart : icon.unHeart} alt="" />
                            </div>
                        </button>
                    }
                </div>
            </div>
            <OrgSearch
                orgSearchCnt={orgSearchCnt}
                keyword={keyword}
                org={org}
            />
        </>
    );
}

export default HeadOrg;