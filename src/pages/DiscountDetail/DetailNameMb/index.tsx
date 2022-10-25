import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppProvider";
import { IITEMS_DISCOUNT } from "../../../interface/discount";
import formatPrice from "../../../utils/formatPrice";
import DetailControl from "./DetailControl";
import "./detailNameMb.css";

function DetailNameMb(props: any) {
    const { discount } = props;
    const discount_item_child: IITEMS_DISCOUNT = discount?.items[0];
    const detailDiscountItem = discount.productable;
    const percent = Math.round(
        100 -
            (discount_item_child.view_price /
                discount_item_child.productable.price) *
                100
    );
    const [open, setOpen] = useState(false);
    const { t } = useContext(AppContext);

    return (
        <>
            <div className="detail-name-mb">
                <div className="detail-name-mb__name">
                    {detailDiscountItem?.service_name}
                </div>
                <div className="detail-name-mb__price">
                    <span className="price-old">
                        {formatPrice(discount_item_child.productable.price)}đ
                    </span>
                    <div className="flex-row price-sale">
                        <span>
                            {`${t("detail_item.off")}`}
                            {percent}%
                        </span>
                        <span>
                            {formatPrice(discount_item_child?.view_price)}đ
                        </span>
                    </div>
                </div>
                <div className="detail-name-mb__add">
                    <button onClick={() => setOpen(true)}>
                        {t("detail_item.add_cart")}
                    </button>
                </div>
            </div>
            <DetailControl open={open} setOpen={setOpen} discount={discount} />
        </>
    );
}

export default DetailNameMb;
