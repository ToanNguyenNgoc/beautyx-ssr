import slugify from "../formatUrlString";
import { IOrganization } from '../../interface/organization';
import { Product } from '../../interface/product';
import { IProductPromo } from '../../interface/productPromo';
import { Service } from '../../interface/service';
import { IServicePromo } from '../../interface/servicePromo';
import { IDiscountPar, IITEMS_DISCOUNT } from '../../interface/discount'


export const formatRouterLinkProduct = (
    product: Product,
    org: IOrganization
) => {
    const pathProductOb = {
        pathname: `/san-pham/${slugify(product?.product_name)}`,
        search: `id=${product.id}&org=${org.id}`,
    }
    return pathProductOb
}
export const formatRouterLinkProductPromo = (
    productPromo: IProductPromo
) => {
    const pathProductOb = {
        pathname: `/san-pham/${slugify(productPromo?.product_name)}`,
        search: `id=${productPromo.product_id}&org=${productPromo.org_id}`,
    }
    return pathProductOb
}
export const formatRouterLinkService = (service: Service, org: IOrganization) => {
    const pathServiceOb = {
        pathname: `/dich-vu/${slugify(service?.service_name)}`,
        search: `id=${service.id}&org=${org?.id}`,
    }
    return pathServiceOb
}
export const formatRouterLinkServicePromo = (service: IServicePromo) => {
    const pathServiceOb = {
        pathname: `/dich-vu/${slugify(service?.service_name)}`,
        search: `id=${service.service_id}&org=${service.org_id}`,
    }
    return pathServiceOb
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