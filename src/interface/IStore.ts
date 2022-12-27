import { IOrgSlice } from '../redux/org/orgSlice';
import { IORGS_MAP } from '../redux/org/orgMapSlice';
import { IORG_DISCOUNTS } from '../redux/org_discounts/orgDiscountsSlice';
import { IUSER } from "redux/user/userSlice"
import { IFilterResult } from 'redux/filter-result'
import { ISearch } from 'redux/search_history';
import { CartType } from 'redux/cart'
//---
import { ICommunity } from 'redux/community'



export default interface IStore {
    ORG: IOrgSlice,
    ORGS_MAP: IORGS_MAP,
    ORG_DISCOUNTS: IORG_DISCOUNTS,
    USER: IUSER,
    FILTER_RESULT: IFilterResult,
    SEARCH_HIS: ISearch,
    COMMUNITY: ICommunity,
    carts: CartType
}