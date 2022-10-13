import React, { useEffect, useState } from 'react';
import { Pagination } from '@mui/material'
import productsApi from 'api/productApi';
import scrollTop_2 from 'utils/scrollTop_2';
import { Product } from 'interface/product';
import { SerProItem } from 'components/Layout';

function Products(props: any) {
    const { org, act } = props;
    const [data, setData] = useState({
        products: [],
        page: 1,
        page_count: 1
    })
    async function handleGetProductsSpecial() {
        const ORG = await org
        try {
            const res_products = await productsApi.getByOrgId({
                org_id: ORG?.id,
                page: data.page
            });
            setData({
                ...data,
                products: res_products?.data.context.data,
                page_count: res_products?.data.context.last_page
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (org) {
            handleGetProductsSpecial()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [org, data.page])
    const pageChange = (event: any, value: any) => {
        setData({
            ...data,
            page: value
        })
        scrollTop_2(500);
    };
    return (
        act === 1 ?
            <ul
                className='sale-list-cnt'
            >
                {
                    data.products.map((item: Product, index: number) => (
                        <li
                            className='sale-list__item'
                            key={index}
                        >
                            <SerProItem
                                item={item}
                                org={org}
                                type="PRODUCT"
                            />
                        </li>
                    ))
                }
                <div className="sale-list-cnt__pagination">
                    <Pagination
                        color="secondary"
                        shape="rounded"
                        count={data.page_count}
                        onChange={pageChange}
                    />
                </div>
            </ul>
            :
            <></>
    );
}

export default Products;