import { IOrgSlice } from '../redux/org/orgSlice';
import { IORG_COMMENTS } from '../redux/org/orgCommentsSlice';
import { IORGS_MAP } from '../redux/org/orgMapSlice';
import { IORG_SPECIALS } from '../redux/org_specials/orgSpecialSlice';
import { IORG_DISCOUNTS } from '../redux/org_discounts/orgDiscountsSlice';
import { IPRODUCT } from '../redux/org_products/productSlice';
import { ISERVICE } from '../redux/org_services/serviceSlice';
import { ICOMMENT_MEDIA } from '../redux/commentSlice';
import { IORDER } from "../redux/order/orderSlice"
import { IUSER } from "redux/USER/userSlice"
import { INotification } from 'redux/notifications'
import { IFilterResult } from 'redux/filter-result'
import { ITrendItem } from 'redux/trend_detail'


export default interface IStore {
    ORG: IOrgSlice,
    ORG_COMMENTS: IORG_COMMENTS,
    ORGS_MAP: IORGS_MAP,
    ORG_SPECIALS: IORG_SPECIALS,
    ORG_DISCOUNTS: IORG_DISCOUNTS,
    PRODUCT: IPRODUCT,
    SERVICE: ISERVICE,
    COMMENT_MEDIA: ICOMMENT_MEDIA,
    ORDER: IORDER,
    USER: IUSER,
    NOTI: INotification,
    FILTER_RESULT: IFilterResult,
    TREND_DETAIL: ITrendItem
}