import { Service } from "interface";


export interface DetailProp extends Service {
    name: string,
    type: 'SERVICE' | 'COMBO' | 'PRODUCT',
    SPECIAL_PRICE: number,
    PRICE: number,
    services: any[]
}