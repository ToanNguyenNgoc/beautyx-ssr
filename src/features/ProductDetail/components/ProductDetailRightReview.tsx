import { Rating } from "@mui/material";
import React, { useContext } from "react";
import icon from "../../../constants/icon";
import { AppContext } from "../../../context/AppProvider";
import { IComment } from "../../../interface/comments";
import { IServiceUser } from "../../../interface/servicesUser";
interface IProps {
    setValue?: any;
    data: any;
    comment: any;
}
export default function ProductDetailRightReview(props: IProps) {
    const { setValue, data, comment } = props;
    const { t } = useContext(AppContext);

    return (
        <div className="detail-right__evaluate">
            <div
                // onClick={() => setValue(2)}
                className="evaluate-item cursor-pointer"
            >
                <Rating
                    size="small"
                    readOnly
                    name="simple-controlled"
                    value={data.rating}
                />

                {comment.totalItem > 0 ? (
                    <p>
                        {`(${t("detail_item.see")} ${comment.totalItem} ${t(
                            "detail_item.evaluate"
                        )})`}
                    </p>
                ) : (
                    <p>{`(${t("detail_item.not_evaluate")})`}</p>
                )}
            </div>
            <div className="evaluate-item">
                <img src={icon.Favorite} alt="" />
                <p>{data.favorites_count}</p>
            </div>
            <div className="evaluate-item">
                <img src={icon.ShoppingCartSimple} alt="" />
                <p>
                    {`${t("detail_item.sold")}`} {data.bought_count}
                </p>
            </div>
        </div>
    );
}