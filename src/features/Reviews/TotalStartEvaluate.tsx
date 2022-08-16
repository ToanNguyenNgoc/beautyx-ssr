import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import { AppContext } from "../../context/AppProvider";
interface IProps {
    totalItem: number | undefined;
    openSeeMoreCmt: any;
    item?: any;
}
export default function TotalStartEvaluate(props: IProps) {
    const { t } = useContext(AppContext);
    const [value, setValue] = React.useState<number | null>(5);
    const { totalItem, openSeeMoreCmt, item } = props;
    return (
        <>
            {/* rating pc */}
            <div className="evaluate-rating">
                <div className="evaluate-rating__left">
                    <div className="evaluate-rating__total">
                        <span>{item.rating > 0 ? ((item.rating === 5) ? 5 : 4+(item.rating/10)) : 0}/</span>
                        <span>5</span>
                    </div>
                    <div className="evaluate-rating__start">
                        <Rating
                            readOnly
                            name="simple-controlled"
                            value={(item.rating === 5) ? 5 : 4+(item.rating/10)}
                            // onChange={(event, newValue) => {
                            //     setValue(item.rating);
                            // }}
                        />
                    </div>
                    <div className="evaluate-rating__quantity">
                        <span>
                            {totalItem} {t("Mer_de.feedback")}
                        </span>
                    </div>
                </div>
                <div className="evaluate-rating__right">
                    <div className="evaluate-rating__progress">
                        <span>5</span>
                        <div className="progess-bar"></div>
                        <span>7</span>
                    </div>
                    <div className="evaluate-rating__progress">
                        <span>4</span>
                        <div className="progess-bar"></div>
                        <span>2</span>
                    </div>
                    <div className="evaluate-rating__progress">
                        <span>3</span>
                        <div className="progess-bar"></div>
                        <span>0</span>
                    </div>
                    <div className="evaluate-rating__progress">
                        <span>2</span>
                        <div className="progess-bar"></div>
                        <span>0</span>
                    </div>
                    <div className="evaluate-rating__progress">
                        <span>1</span>
                        <div className="progess-bar"></div>
                        <span>0</span>
                    </div>
                </div>
            </div>
            {/* rating mobile */}
            <div className="evaluate-rating__mobile">
                <div className="rating-left">
                    <div className="evaluate-rating__total rating-left__total">
                        <span>{item.rating > 0 ? ((item.rating === 5) ? 5 : 4+(item.rating/10)) : 0}/</span>
                        <span>5</span>
                    </div>
                    <div className="rating-left__infor">
                        <div className="rating-left__start">
                            <Rating
                                readOnly
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </div>
                        <div className="rating-left__text">
                            {totalItem} {t("Mer_de.feedback")}
                        </div>
                    </div>
                </div>
                <div className="rating-right">
                    <button
                        onClick={openSeeMoreCmt}
                        className="rating-right__btn"
                    >
                        <p>{t("detail_item.see_more")}</p>
                    </button>
                </div>
            </div>
        </>
    );
}
