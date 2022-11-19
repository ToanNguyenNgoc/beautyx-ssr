/* eslint-disable react-hooks/exhaustive-deps */
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useGetParamUrl, useSwr } from 'hooks';
import React, { useEffect } from 'react';
import LoadDetail from 'components/LoadingSketion/LoadDetail';
import Head from 'features/Head';
import { DetailProp } from './detail.interface'
import { formatSalePriceService } from 'utils/formatPrice';
import { IOrganization } from 'interface';
import API_ROUTE from 'api/_api';

const routeType = [
    {
        path: 'dich-vu', type: 'SERVICE', api: 'services', params: {
            'include': 'category|favorites_count',
            'append': 'is_favorite|rating|bought_count'
        }
    },
    {
        path: 'san-pham', type: 'PRODUCT', api: 'products', params: {
            'append': 'is_favorite|rating',
            'include': 'category|favorites_count'
        }
    },
    {
        path: 'combo-detail', type: 'COMBO', api: 'treatment_combo', params: {
            'include': 'products|services'
        }
    }
]

function SerProCoDetail() {
    const match = useRouteMatch()
    const history = useHistory()
    const currentRoute = match.url.split('/').slice(-1)[0]
    const currentRouteType = routeType.find(i => i.path === currentRoute)
    const paramsArr = useGetParamUrl();
    let redirectPageError = false
    const params = {
        org: parseInt(paramsArr[1]),
        id: parseInt(paramsArr[0])
    }
    if (!params.id || !params.org) redirectPageError = true
    if (!currentRouteType) redirectPageError = true

    const { response, error } = useSwr(
        `/organizations/${params.org}/${currentRouteType?.api}/${params.id}`,
        (params.id && params.org && currentRouteType),
        currentRouteType?.params ?? {}
    )
    if (error) redirectPageError = true
    useEffect(() => {
        if (redirectPageError) {
            history.replace('/error')
        }
    }, [redirectPageError])

    const DETAIL: DetailProp = {
        name: response?.service_name ?? response?.name ?? response?.product_name ?? '...',
        type: currentRouteType?.type,
        SPECIAL_PRICE: formatSalePriceService(response?.special_price, response?.special_price_momo),
        PRICE: currentRouteType?.type === 'COMBO' ? response?.use_value : (response?.price ?? response?.retail_price),
        ...response
    }
    const org: IOrganization = useSwr(API_ROUTE.ORG(params.org), params.org).response

    return (
        response ?
            <>
                <Head title={DETAIL.name} />
            </>
            :
            <LoadDetail />
    );
}

export default SerProCoDetail