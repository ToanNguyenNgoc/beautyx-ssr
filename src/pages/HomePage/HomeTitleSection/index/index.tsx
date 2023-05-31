import React from "react";
import { useHistory } from "react-router-dom";
import scrollTop from "../../../../utils/scrollTop";
import "../../home-se.css";

interface IProps {
    title: string;
    url?: string;
    seemore?: string;
}

function HomeTitleSection(props: IProps) {
    const { title, url, seemore } = props;
    const history = useHistory();
    const gotoSeemore = () => {
        history.push(`${url}`);
        scrollTop();
    };
    return (
        <div className="flex-row-sp home-se-promo__header">
            <div className="home-se-sec-title">{title}</div>
            <div onClick={() => gotoSeemore()}>
                <div className="flex-row cursor-pointer">
                    <p
                        style={{
                            color: "var(--purple)",
                            fontWeight: "bold",
                        }}
                    >
                        {seemore ? seemore : null}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomeTitleSection;
