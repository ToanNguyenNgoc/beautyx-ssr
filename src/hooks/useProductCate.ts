import { paramsProductsCate } from "params-query";
import { useSwr } from "./useSwr";

export function useProductCate() {
    let productCate: any[] = []
    const productCatePage1 = useSwr("/tags", true, { page: 1, ...paramsProductsCate }).responseArray;
    const productCatePage2 = useSwr("/tags", true, { page: 2, ...paramsProductsCate }).responseArray;
    const productCatePage3 = useSwr("/tags", true, { page: 3, ...paramsProductsCate }).responseArray;
    // const productCate = productCatePage1.concat(productCatePage2).concat(productCatePage3)
    if (productCatePage1?.length > 0 && productCatePage2?.length > 0 && productCatePage3?.length > 0) {
        productCate = productCatePage1.concat(productCatePage2).concat(productCatePage3)
    }
    return productCate
}