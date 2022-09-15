import React from 'react';
import { NextPageWithLayout } from '../../models';
import { HeaderLayout } from '../../components/layout';
import Head from 'next/head';
import useSWR, { useSWRInfinite } from 'swr';
// import useSWRInfinite from 'swr/infinite'
import { IDiscountPar } from '../../interfaces/discount';
import { discountParamsURL } from '../../context/query-params';
import useSwrInfinite from '../../context/hooks/useSwrInfinite';

const Discounts: NextPageWithLayout = () => {
    // const { data, error, mutate, isValidating, size, setSize } = useSWRInfinite(
    //     (index) => `/discounts?page=${index + 1}${discountParamsURL}`,
    //     {
    //         revalidateOnFocus: false,
    //         initialSize: 1
    //     }
    // );
    // let discounts: IDiscountPar[] = [];
    // let totalItem: number = 1
    // if (data) {
    //     discounts = data.map((i: any) => i.data.context.data)
    // }
    // const onViewMore = () => {
    //     setSize(size + 1)
    // }
    // console.log(discounts.flat(), isValidating)
    const { resData, onLoadMore, isValidating, totalItem } = useSwrInfinite("/discounts", discountParamsURL)
    // console.log(resData)
    console.log(resData.flat())
    return (
        <>
            <Head>
                <title>Giá tốt, Ưu đãi khủng - BEAUTYX</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div>
                <ul>
                    {
                        // discounts.map((item: IDiscountPar, index: number) => (
                        //     <li key={index} >
                        //         <span>{item.title}</span>
                        //     </li>
                        // ))
                    }
                </ul>
            </div>
            <button onClick={onLoadMore} >next</button>
        </>
    );
}

Discounts.Layout = HeaderLayout

export default Discounts;
