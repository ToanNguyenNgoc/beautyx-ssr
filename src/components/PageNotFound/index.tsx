import React from "react";
import "./style.css";
import img from "../../constants/img";
import ButtonLoading from "../ButtonLoading";
import { useHistory } from "react-router-dom";

function PageNotFound() {
    const history = useHistory();
    const goBack = () => {
        history.goBack();
    };
    const goHome = () => {
        history.push("/");
    };
    return (
        <div className="page-not-found">
            <div className="flex-column page-not-found-cnt">
                {/* <div className="flex-row page-not-found__head">
                    <h1>4</h1>
                    <img src={img.beautyx} alt="" />
                    <h1>4</h1>
                </div> */}
                <div className="error-img">
                    <img src={img.resultNull} alt="" />
                </div>
                <span className="error-alert">Oops... Page not found</span>
                <span className="error-desc">
                    Xin lỗi, trang bạn đang tìm kiếm không tồn tại!
                </span>
                <div className="error-btn">
                    <ButtonLoading
                        title="Trở lại"
                        onClick={goBack}
                        loading={false}
                    />
                    <ButtonLoading
                        title="Trang chủ"
                        onClick={goHome}
                        loading={false}
                    />
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;
