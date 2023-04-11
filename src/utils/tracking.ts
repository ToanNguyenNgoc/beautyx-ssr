export const formatProductList = (listItem:any) => {
    let pr_list = listItem.products?.map((e:any)=>{
        const res = {
            id: e.product.id || e.id,
            quantity: e.quantity,
            price: e.special_price ? e.special_price > 0 ? e.special_price : e.retail_price : (e.price_discount && e.price_discount > 0) ? e.price_discount : e.price
        }
        return res

    })
    return pr_list;
}
export default formatProductList;