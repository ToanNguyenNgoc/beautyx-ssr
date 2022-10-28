import { IOrgSlice } from '../redux/org/orgSlice';
import { IORG_COMMENTS } from '../redux/org/orgCommentsSlice';
import { IORGS_MAP } from '../redux/org/orgMapSlice';
import { IORG_SPECIALS } from '../redux/org_specials/orgSpecialSlice';
import { IORG_DISCOUNTS } from '../redux/org_discounts/orgDiscountsSlice';
import { IPRODUCT } from '../redux/org_products/productSlice';
import { ISERVICE } from '../redux/org_services/serviceSlice';
import { ICOMMENT_MEDIA } from '../redux/commentSlice';
import { IFILTER } from "../redux/filter/filterSlice"
import { IORDER } from "../redux/order/orderSlice"
import { IUSER } from "redux/USER/userSlice"
import { IFilterResult } from 'redux/filter-result'


export default interface IStore {
    ORG: IOrgSlice,
    ORG_COMMENTS: IORG_COMMENTS,
    ORGS_MAP: IORGS_MAP,
    ORG_SPECIALS: IORG_SPECIALS,
    ORG_DISCOUNTS: IORG_DISCOUNTS,
    PRODUCT: IPRODUCT,
    SERVICE: ISERVICE,
    COMMENT_MEDIA: ICOMMENT_MEDIA,
    FILTER: IFILTER,
    ORDER: IORDER,
    USER: IUSER,
    FILTER_RESULT: IFilterResult
}