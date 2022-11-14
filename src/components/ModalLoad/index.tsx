import React from "react";
import "./style.css";
import img from "../../constants/img";

interface IProps {
    title?: string;
}

function ModalLoad(props: IProps) {
    const { title } = props;
    return (
        <div className="modal-cnt">
            <div className="modal-cnt__body">
                <img
                    className="modal-cnt__body-img"
                    src={img.beautyxSlogan}
                    alt=""
                />
                <span className="text">{title ? title : "Đang xử lý..."}</span>
            </div>
        </div>
    );
}

export default ModalLoad;
