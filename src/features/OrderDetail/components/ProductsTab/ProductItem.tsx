import React, { useContext, useState } from "react";
import formatPrice from "../../../../utils/formatPrice";
import ButtonCus from "../../../../components/ButtonCus";
import { addCart, onClearPrevCartItem } from "../../../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import slugify from "../../../../utils/formatUrlString";
import { AppContext } from "../../../../context/AppProvider";
import scrollTop from "../../../../utils/scrollTop";
import onErrorImg from "../../../../utils/errorImg";
import { formatAddCart } from "../../../../utils/cart/formatAddCart";
import { fetchAsyncProductDetail } from '../../../../redux/org_products/productSlice'
import { Alert, Snackbar } from "@mui/material";
import {formatRouterLinkProduct} from 'utils/formatRouterLink/formatRouter'

function ProductItem(props: any) {
  const { productItem, org } = props;
  const product = productItem.productable;
  const { USER } = useSelector((state: any) => state.USER);
  const { t } = useContext(AppContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const [openNoti, setOpenNoti] = useState({
    open: false,
    title: ""
  })
  const handleDetailProduct = () => {
    scrollTop();
    // history.push({
    //   pathname: `/san-pham/${slugify(product?.product_name)}`,
    //   search: `id=${product?.id}&org=${org?.id}`,
    // })
    history.push({
      pathname:formatRouterLinkProduct(product.id, org.id, product.product_name)
    })
  };
  // add cart
  const cartValues = formatAddCart(
    product,
    org,
    1,
    1,
    product?.price,
    null,
    true
  )
  const handleAddCart = async () => {
    //check exits discount or service detail in merchant
    //check org and services on commerce
    const res = await dispatch(fetchAsyncProductDetail({
      org_id: org.id, id: product.id
    }))
    if (res?.meta?.requestStatus === "fulfilled") {
      //check org and services on commerce
      console.log(res)
      if (res?.payload?.is_momo_ecommerce_enable && org?.is_momo_ecommerce_enable) {
        dispatch(onClearPrevCartItem())
        dispatch(addCart({
          ...cartValues,
          cart_id: parseInt(`${USER.id}${cartValues.cart_id}`),
          user_id: USER?.id
        }))
        history.push('/gio-hang')
      } else {
        setOpenNoti({
          open: true,
          title: "Hiện tại sản phẩm này không còn được bán Online !"
        })
      }
    } else {
      setOpenNoti({
        open: true,
        title: "Hiện tại sản phẩm này không còn tồn tại !"
      })
    }
  };
  return (
    <li>
      <Snackbar open={openNoti.open} autoHideDuration={4000}
        onClose={() => setOpenNoti({ ...openNoti, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenNoti({ ...openNoti, open: false })}
          severity="warning" sx={{ width: '100%' }}
        >
          {openNoti.title}
        </Alert>
      </Snackbar>
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
              <span> x{productItem.quantity}</span>
            </span>
            <span className="item-org__name">{org.name}</span>
          </div>
          <div className="flex-row-sp item-bottom">
            <span className="price">{formatPrice(product?.retail_price)}đ</span>
            <div className="flex-row item-button">
              <ButtonCus
                onClick={handleDetailProduct}
                text={t("order.watch_info")}
              />
              <ButtonCus
                onClick={handleAddCart}
                text="Re-Order"
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ProductItem;
