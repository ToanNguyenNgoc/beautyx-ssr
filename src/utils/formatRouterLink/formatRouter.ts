import slugify from "../formatUrlString";
import { pickBy, identity } from "lodash"
import { IDiscountPar, IITEMS_DISCOUNT } from "interface/discount";


export const formatRouterLinkProduct = (
    id: number | string,
    org_id: number | string,
    name: string
) => {
    const pathname = `/san-pham/${slugify(name)}?id=${id}&org=${org_id}`
    return pathname
}
export const formatRouterLinkService = (
    id: number | string,
    org_id: number | string,
    name: string
) => {
    const pathname = `/dich-vu/${slugify(name)}?id=${id}&org=${org_id}`
    return pathname
}
export const formatRouterLinkDiscount = (
    discountPar: IDiscountPar,
    discountChild: IITEMS_DISCOUNT
) => {
    const org = discountChild?.organization;
    const onCheckType = () => {
        let type;
        // let link = ""
        switch (discountChild.productable_type) {
            case "App\\Models\\CI\\Service":
                type = "service";
                // link = "chi-tiet-giam-gia"
                break;
            case "App\\Models\\CI\\Product":
                type = "product";
                // link = "chi-tiet-giam-gia-sp"
                break;
        }
        return type;
    };
    const type = onCheckType();
    const patchDiscountOb = {
        pathname: `/chi-tiet-giam-gia/${slugify(
            discountChild.productable.service_name ||
            discountChild.productable.product_name
        )}`,
        search: `type=${type}&org_id=${org?.id}&dis_id=${discountPar?.id}&item_id=${discountChild.productable_id}`,
    }
    return patchDiscountOb
}
export const formatRouterLinkOrg = (subdomain: any) => {
    const pathOrg = `/cua-hang/${subdomain}`
    return pathOrg
}
export const formatRouterCateResult = (id: number, name: string, type: "SERVICE" | "PRODUCT") => {
    let pathCateResult = `/danh-sach-dich-vu/${slugify(name)}?id=${id}`
    if (type === "PRODUCT") pathCateResult = `/danh-sach-san-pham/${slugify(name)}?id=${id}`
    return pathCateResult
}
export const formatParamsString = (params: any) => {
    const paramsURL = `${new URLSearchParams(pickBy(params, identity)).toString()}`
    return paramsURL
}