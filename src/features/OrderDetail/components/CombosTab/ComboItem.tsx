import React, { useContext, useEffect, useState } from "react";
import { Combo } from "../../../../interface/combo";
import formatPrice from "../../../../utils/formatPrice";
import ButtonCus from "../../../../components/ButtonCus";
import comboApi from "../../../../api/comboApi";
import { addCart } from "../../../../redux/cartSlice";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppContext } from "../../../../context/AppProvider";
import scrollTop from "../../../../utils/scrollTop";
// import slugify from "../../../../utils/formatUrlString";

function ComboItem(props: any) {
  const { t } = useContext(AppContext);
  const { combotItem, org, open } = props;
  const [combo, setCombo] = useState<Combo>();
  const history = useHistory();
  const dispatch = useDispatch();
  const is_type = 3;
  const values = {
    id: combo?.id,
    org_id: org.id,
    org_name: org.name,
    cart_id: parseInt(`${is_type}${org.id}${combo?.id}`), //is_type + org_id + id
    name: combo?.name,
    quantity: 1,
    is_type: is_type,
    isConfirm: true,
    price: combo?.price,
  };
  const handleAddCart = () => {
    scrollTop();
    const action = addCart(values);
    history.push({
      pathname: `/cart`,
    });
    dispatch(action);
  };
  // const handleDetailCombo = () => {
  //   history.push({
  //     pathname: `/Product-detail/${slugify(combo?.name)}`,
  //     search: `${org.id},${combotItem?.productable_id},${is_type}`,
  //     state: org,
  //   });
  // };
  useEffect(() => {
    async function handleGetComDet() {
      try {
        const res = await comboApi.getComboDetail({
          org_id: org.id,
          com_id: combotItem.productable_id,
        });
        setCombo(res.data.context);
      } catch (error) {
        console.log(error);
      }
    }
    if (open === true) {
      handleGetComDet();
    }
  }, [combotItem.productable_id, org.id, open]);
  return (
    <li>
      <div className="order-de-list__item">
        <img
          src={"https://picsum.photos/650/976?random=1" + combo?.id}
          alt=""
          className="order-de-pr-item__img"
        />
        <div className="order-de-pr-item__cnt">
          <div className="item-detail">
            <span className="flex-row-sp item-name">
              {combo?.name}
              <span>x{combotItem.quantity}</span>
            </span>
            <span className="item-org__name">{org.name}</span>
          </div>
          <div className="flex-row-sp item-bottom">
            <span className="price">{formatPrice(combo?.price)} đ</span>
            <div className="flex-row item-button">
              <ButtonCus
                // onClick={handleDetailCombo}
                text={t("order.watch_info")}
                padding="4px 8px"
                color="var(--purple)"
                backColor="var(--bgGray)"
                borderRadius="12px"
                margin="0px 16px 0px 0px"
              />
              <ButtonCus
                onClick={handleAddCart}
                text="Re-Order"
                padding="4px 8px"
                color="var(--bgWhite)"
                backColor="var(--purple)"
                borderRadius="12px"
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ComboItem;
