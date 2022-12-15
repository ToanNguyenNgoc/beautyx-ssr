/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetProductsByCateChild } from '../../../redux/cate-tree/cateTreeSlice';
import onErrorImg from '../../../utils/errorImg';
import formatNumber from '../../../utils/formatPrice';

function TabProduct(props: any) {
    const { catesChildByTab } = props;
    const { PRODUCTS } = useSelector((state: any) => state.CATE_TREE)
    const dispatch = useDispatch();
    const cateChildFirst = catesChildByTab.filter((item: any) => item.type === "PRODUCT")[0];
    const callProductsByCate = () => {
        const keywordsArr = cateChildFirst?.keywords;
        for (var keyword of keywordsArr) {
            const action = {
                page: 1,
                limit: 3,
                keyword: keyword,
                CATE_CHILD: cateChildFirst
            }
            dispatch(fetProductsByCateChild(action))
        }
    }
    useEffect(() => {
        callProductsByCate()
    }, [])
    const productsSection = cateChildFirst.keywords.map((item: any) => {
        const productsByCateName = PRODUCTS.products.filter((i: any) => i.CATE_NAME === item);
        return {
            key: item,
            productsList: productsByCateName
        }
    })
    
    return (
        <div className='cate-tree__pr-cate'>
            <div className="cate-tree__pr-cate-list">
                {
                    productsSection?.map((item: any, index: any) => (
                        <div className='cate-tree__pr-cate-list-item' key={index} >
                            <div className="flex-row-sp head">
                                <span>{item.key}</span>
                                <span>Tất cả</span>
                            </div>
                            <ul className="cate-services__list">
                                {
                                    item.productsList.map((pr: any, i: number) => (
                                        <li key={i} >
                                            <div className="flex-row-sp cate-services__list-item">
                                                <img
                                                    src={pr.image_url ? pr.image_url : pr.org_image}
                                                    alt=""
                                                    className="item-img"
                                                    onError={(e) => onErrorImg(e)}
                                                />
                                                <div className="item-detail">
                                                    <span className="item-name">
                                                        {pr.product_name}
                                                    </span>
                                                    <div className="flex-row item-price">
                                                        {
                                                            pr.special_price > 0 ?
                                                                <>
                                                                    <span>{formatNumber(pr.special_price)}đ</span>
                                                                    <span>{formatNumber(pr.retail_price)}đ</span>
                                                                </>
                                                                :
                                                                <span
                                                                    style={{ color: "var(--purple)" }} >
                                                                    {formatNumber(pr.retail_price)}đ
                                                                </span>

                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default TabProduct;