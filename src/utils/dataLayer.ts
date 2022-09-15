
export const GoogleTagEvents = {
    ADD_TO_CART: 'add_to_cart',
    PRODUCT_CLICK: 'select_item',
    PRODUCT_LIST_LOAD: 'view_item_list',
    PROMOTION_CLICK: 'select_promotion',
    PROMOTION_LOAD: 'view_promotion',
    PAYMENT_CLICK: 'purchase',
    REMOVE_FROM_CART: 'remove_from_cart'
}
const $:any = window;
export function GoogleTagPush(event_name:String){
    try{
        $?.dataLayer?.push({'event': {event_name}});
    }catch(err){
        console.log(err);
    }
}
export default GoogleTagPush;