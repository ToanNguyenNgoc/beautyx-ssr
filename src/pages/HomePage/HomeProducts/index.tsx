import { AppContext } from 'context/AppProvider';
import { useDeviceMobile } from 'hooks';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { onSetCateParentId, onSetTab } from 'redux/cates-tree';
import { scrollTop } from 'utils';
import HomeTitle from '../Components/HomeTitle';
import { productsSection, IProductsSection } from '../data'
import style from './style.module.css'

function HomeProducts() {
    const { t } = useContext(AppContext) as any
    const IS_MB = useDeviceMobile()
    const history = useHistory()
    const dispatch = useDispatch()
    const handleNavigateProductCate = (id: number) => {
        dispatch(onSetTab('PRODUCT'))
        dispatch(onSetCateParentId(id))
    }
    const onProductItem = (item: IProductsSection) => {
        if (IS_MB) {
            switch (item.id) {
                case 1:
                    handleNavigateProductCate(129)
                    history.push("danh-muc")
                    break;
                case 2:
                    handleNavigateProductCate(5)
                    history.push("danh-muc")
                    break;
                case 3:
                    handleNavigateProductCate(185)
                    history.push("danh-muc")
                    break;
                case 4:
                    handleNavigateProductCate(185)
                    history.push("danh-muc")
                    break;
                default:
                    break;
            }
        } else {
            history.push(item.url)
        }
        scrollTop()
    }
    return (
        <div className={style.container}>
            <HomeTitle title={t('Home.beauty_products')} />
            <div className={style.content}>
                <ul className={style.product_list}>
                    {
                        productsSection.map(item => (
                            <li
                                onClick={() => onProductItem(item)}
                                key={item.id} className={style.product_list_item}
                            >
                                <div className={style.link_item}>
                                    <div className={style.link_item_img}>
                                        <img src={item.image_url} alt="" />
                                    </div>
                                    <div className={style.link_item_cnt}>
                                        <p className={style.link_item_cate}>{item.cate}</p>
                                        <p className={style.link_item_text}>{item.text}</p>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default HomeProducts;