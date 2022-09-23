import React from "react";
import { useHistory } from "react-router-dom";
import scrollTop from "../../../../utils/scrollTop"
import "./homeTitle.css";

interface IProps {
    title: string;
    url?: string;
    seemore?: string;
}

function HomeTitle(props: IProps) {
    const { title, url, seemore } = props;
    const history = useHistory();

    const onSeeMoreClick = () => {
        if (url) {
            history.push(url)
            scrollTop()
        }
    }

    return (
        <div className="home-title">
            <h2 className="home-title__text">{title}</h2>
            <div
                onClick={onSeeMoreClick}
                className="home-title__seemore"
            >
                <p>{seemore}</p>
            </div>
        </div>
    );
}

export default HomeTitle;
