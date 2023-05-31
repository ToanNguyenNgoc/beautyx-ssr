import { ITag } from 'interface';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { navigateSearchResult } from 'utils/formatRouterLink/formatRouter';
import style from './cate-tree.module.css'

function SectionProduct({ child }: { child?: ITag }) {
    const history = useHistory()
    return (
        <div className={style.product_child_child_cnt}>
            <p className={style.product_child_child_labe}>
                Danh mục của "{child?.name}"
            </p>
            <ul className={style.product_child_child_list}>
                {
                    child?.children?.map((item, index: number) => (
                        <li 
                            onClick={()=>history.push(navigateSearchResult('PRODUCT', item.name))}
                            key={index} className={style.product_child_child_item}
                        >
                            <div className={style.child_child_img}>
                                <img src={item.media[0]?.original_url} alt="" />
                            </div>
                            <p className={style.child_child_name}>
                                {item.name}
                            </p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default SectionProduct;