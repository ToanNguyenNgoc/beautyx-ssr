import slugify from "../formatUrlString";
import { pickBy, identity } from "lodash";
import { IDiscountPar, IITEMS_DISCOUNT } from "interface/discount";

export const formatRouterLinkProduct = (
    id: number | string,
    org_id: number | string,
    name: string
) => {
    const pathname = `/san-pham/${id}_${org_id}_${slugify(name)}`;
    return pathname;
};
//---
export const formatRouterLinkService = (
    id: number | string,
    org_id: number | string,
    name: string
) => {
    const pathname = `/dich-vu/${id}_${org_id}_${slugify(name)}`;
    return pathname;
};
export const formatRouterLinkCombo = (
    id: number | string,
    org_id: number | string,
    name: string
) => {
    const pathname = `/combo-detail/${id}_${org_id}_${slugify(name)}`;
    return pathname;
};
//---
export const formatLinkDetail = (
    id: number | string,
    org_id: number | string,
    name: string,
    type:
        | "SERVICE"
        | "PRODUCT"
        | "COMBO"
        | "App\\Models\\CI\\Service"
        | "App\\Models\\CI\\Product"
        | "App\\Models\\CI\\TreatmentCombo"
) => {
    let link: string = "";
    if (type === "SERVICE" || type === "App\\Models\\CI\\Service") {
        link = formatRouterLinkService(id, org_id, name);
    }
    if (type === "PRODUCT" || type === "App\\Models\\CI\\Product") {
        link = formatRouterLinkProduct(id, org_id, name);
    }
    if (type === "COMBO" || type === "App\\Models\\CI\\TreatmentCombo") {
        link = `/combo-detail/${id}_${org_id}_${slugify(name)}`;
    }
    return link;
};
//---
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
    const name =
        discountChild.productable.service_name ??
        discountChild.productable.product_name;
    const patchDiscountOb = `/chi-tiet-giam-gia/${type}_${org?.id}_${
        discountPar.uuid || discountPar.id
    }_${discountChild.productable_id}_${slugify(name)}`;
    return patchDiscountOb;
};
//---
export const formatRouterLinkOrg = (subdomain: any) => {
    const pathOrg = `/cua-hang/${subdomain}`;
    return pathOrg;
};
export const formatRouterCateResult = (
    id: number,
    name: string,
    type: "SERVICE" | "PRODUCT"
) => {
    let pathCateResult = `/danh-sach-dich-vu/${slugify(name)}?id=${id}`;
    if (type === "PRODUCT")
        pathCateResult = `/danh-sach-san-pham/${slugify(name)}?id=${id}`;
    return pathCateResult;
};
export const formatParamsString = (params: any) => {
    const paramsURL = `${new URLSearchParams(
        pickBy(params, identity)
    ).toString()}`;
    return paramsURL;
};
export const navigateSearchResult = (
    type: "SERVICE" | "PRODUCT" | "ORG",
    keyword: string
) => {
    let link = "";
    if (type === "SERVICE") {
        link = `/ket-qua-tim-kiem/dich-vu?keyword=${keyword}`;
    }
    if (type === "PRODUCT") {
        link = `/ket-qua-tim-kiem/san-pham?keyword=${keyword}`;
    }
    if (type === "ORG") {
        link = `/ket-qua-tim-kiem/cua-hang?keyword=${keyword}`;
    }
    return link;
};
