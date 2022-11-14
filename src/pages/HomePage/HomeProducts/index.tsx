import { cateChild1 } from 'data/category';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchOrgsByTag, onChooseCate, onChooseTab, onSetFirstCateProducts } from 'redux/CateTree/cateTreeSlice';
import { useDeviceMobile, scrollTop } from 'utils';
import HomeTitle from '../Components/HomeTitle';
import { productsSection, IProductsSection } from '../data'
import style from './style.module.css'

function HomeProducts() {
    const IS_MB = useDeviceMobile()
    const history = useHistory()
    const dispatch = useDispatch()
    const handleNavigateProductCate = (id: number, title: string) => {
        const action = {
            title: title,
            cate_id: id,
        };
        dispatch(onChooseCate(action));
        dispatch(
            fetchOrgsByTag({
                tags: title,
                page: 1,
            })
        );
        const cateProductsFirst = cateChild1.filter(
            (i) => i.cate_id === id
        );
        dispatch(
            onSetFirstCateProducts(
                cateProductsFirst.filter((i) => i.type === "PRODUCT")[0]
            )
        );
        dispatch(onChooseTab('PRODUCT'));
    }
    const onProductItem = (item: IProductsSection) => {
        if (IS_MB) {
            switch (item.id) {
                case 1:
                    handleNavigateProductCate(4, 'Thẩm mỹ viện')
                    history.push("-danh-muc")
                    break;
                case 2:
                    handleNavigateProductCate(2, 'Salon')
                    history.push("-danh-muc")
                    break;
                case 3:
                    handleNavigateProductCate(7, '')
                    history.push("-danh-muc")
                    break;
                case 4:
                    handleNavigateProductCate(1, 'Spa')
                    history.push("-danh-muc")
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
            <HomeTitle title='Sản phẩm làm đẹp' />
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