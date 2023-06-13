import { IOrgSlice } from '../redux/org/orgSlice';
import { IORGS_MAP } from '../redux/org/orgMapSlice';
import { IUSER } from "redux/profile/userSlice"
import { IFilterResult } from 'redux/filter-result'
import { CartType } from 'redux/cart'
import { CATE } from 'redux/cates-tree'
//---
import { ICommunity } from 'redux/community'



export default interface IStore {
    ORG: IOrgSlice,
    ORGS_MAP: IORGS_MAP,
    USER: IUSER,
    FILTER_RESULT: IFilterResult,
    COMMUNITY: ICommunity,
    carts: CartType,
    CATE: CATE
}