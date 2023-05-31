import { useHistory } from "react-router-dom";
import "./home-title.css"
import { scrollTop } from "utils";

interface IProps {
  title: string;
  url?: string;
  seemore?: string;
  onClick?: () => void
}

export function HomeTitle(props: IProps) {
  const { title, url, seemore, onClick } = props;
  const history = useHistory();

  const onSeeMoreClick = () => {
    if (url) {
      history.push(url)
      scrollTop()
    }
    if (onClick) onClick()
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
