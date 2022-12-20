import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { formatRouterLinkProduct } from 'utils/formatRouterLink/formatRouter'
import { AppContext } from "context/AppProvider";
import { onErrorImg, scrollTop } from "utils";
import { formatAddCart } from "utils/cart/formatAddCart";
import { addCart, onClearPrevCartItem } from "redux/cart";
import formatPrice, { formatSalePriceService } from "utils/formatPrice";
import { XButton } from "components/Layout";
import { IOrganization, Product } from "interface";
import productsApi from "api/productApi";
import { PopupSnack } from "components/Notification";
import { useNoti } from "hooks";

interface ProductItemProps {
  product: Product,
  org: IOrganization,
  quantity: number
}

function ProductItem(props: ProductItemProps) {
  const { product, org, quantity } = props;
  const { USER } = useSelector((state: any) => state.USER);
  const { t } = useContext(AppContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const { firstLoad, resultLoad, noti, onCloseNoti } = useNoti()

  const getProductDetail = async () => {
    firstLoad()
    let resProduct
    try {
      const res = await productsApi.getDetailById({
        org_id: org.id, id: product.id
      })
      resProduct = await res?.data.context
    } catch (error) {
      console.log(error)
    }
    return resProduct
  }

  const sale_price = formatSalePriceService(product.special_price, product.special_price_momo)
  const handleDetailProduct = () => {
    scrollTop();
    history.push({
      pathname: formatRouterLinkProduct(product.id, org.id, product.product_name)
    })
  };
  // add cart
  const cartValues = formatAddCart(
    product, org, 'PRODUCT', 1, (sale_price > 0 ? sale_price : product.retail_price)
  )
  const handleAddCart = async () => {
    const resProduct = await getProductDetail()
    if (!resProduct)
      return resultLoad('Hiện tại sản phẩm này không còn tồn tại !')
    if (!resProduct?.is_momo_ecommerce_enable || !org.is_momo_ecommerce_enable)
      return resultLoad('Hiện tại sản phẩm này không còn được bán Online !')
    dispatch(onClearPrevCartItem())
    dispatch(addCart({
      ...cartValues,
      cart_id: cartValues.cart_id,
      user_id: USER?.id
    }))
    history.push('/gio-hang')
  };
  return (
    <li>
      <PopupSnack
        open={noti.openAlert}
        onClose={onCloseNoti}
        title={noti.message}
        color='warning'
      />
      <div className="order-de-list__item">
        <img
          src={product?.image_url ? product?.image_url : org.image_url}
          onError={(e) => onErrorImg(e)}
          alt=""
          className="order-de-pr-item__img"
        />
        <div className="order-de-pr-item__cnt">
          <div className="item-detail">
            <span className="flex-row-sp item-name">
              {product?.product_name}
              <span> x{quantity}</span>
            </span>
            <span className="item-org__name">{org.name}</span>
          </div>
          <div className="flex-row-sp item-bottom">
            <span className="price">{formatPrice(sale_price > 0 ? sale_price : product.retail_price)}đ</span>
            <div className="flex-row item-button">
              <XButton
                onClick={handleDetailProduct}
                title={t("order.watch_info")}
              />
              <XButton
                onClick={handleAddCart}
                title="Re-Order"
                loading={noti.load}
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ProductItem;
