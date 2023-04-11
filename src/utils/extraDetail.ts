import { Service } from "../interface/service";

export const EXTRA_DETAIL_SERVICE = (service: Service) => {
    const detail = {
        ...service,
        special_price_momo: service?.special_price_momo > 0 ?
            service?.special_price_momo
            :
            service?.special_price,
        special_price: service?.special_price_momo > 0 ?
            service?.special_price_momo
            :
            service?.special_price,
    }
    return detail
}