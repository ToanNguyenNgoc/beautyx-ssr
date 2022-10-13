import React, { useState, useEffect } from 'react';
import { Service } from '../../../interface/service';
import serviceApi from '../../../api/serviceApi';
import { Pagination } from '@mui/material';
import scrollTop_2 from '../../../utils/scrollTop_2';
// google tag event
import {GoogleTagPush,GoogleTagEvents} from '../../../utils/dataLayer';
import { SerProItem } from 'components/Layout';
// end 

function Services(props: any) {
    const { org, act } = props;
    const [data, setData] = useState({
        services: [],
        page: 1,
        page_count: 1
    })
    async function handleGetServicesSpecial() {
        const ORG = await org;
        GoogleTagPush(GoogleTagEvents.PRODUCT_LIST_LOAD);
        try {
            const res_services = await serviceApi.getByOrgId({
                org_id: ORG?.id,
                page: data.page
            });
            setData({
                ...data,
                services: res_services?.data.context.data,
                page_count: res_services?.data.context.last_page
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (org) {
            handleGetServicesSpecial()
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
        act === 2 ?
            <ul
                className='sale-list-cnt'
            >
                {
                    data.services.map((item: Service, index: number) => (
                        <li
                            className='sale-list__item'
                            key={index}
                        >
                            <SerProItem
                                item={item}
                                org={org}
                                type="SERVICE"
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

export default Services;