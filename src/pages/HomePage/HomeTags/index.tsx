import icon from "constants/icon";
import { imgTag } from "constants/img";
import { AppContext } from "context/AppProvider";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FLAT_FORM_TYPE } from "rootComponents/flatForm";
import { onErrorImg } from "utils";
import scrollTop from "utils/scrollTop";
import '../home-se.css'

function HomeTags(props: any) {
    //const history = useHistory();
    const { t, geo } = useContext(AppContext);
    const FLAT_FORM = sessionStorage.getItem("FLAT_FORM");
    // console.log(geo)
    // const tagsList: ITag[] = useSelector((state: any) => state.HOME.tags);
    // const tags = tagsList.filter(e => e.children && e.children?.length > 0 && e.organizations_count > 0);
    // console.log(t)
    const tags_data = [
        // { id: 9, title: t("home_2.places_near_you"), text: t("home_2.places_near_you"), img: icon.distance },
        { id: 4, title: "spa", text: "Spa", img: imgTag.spa },
        { id: 3, title: "salon", text: "Salon", img: imgTag.hairSalon },
        { id: 1, title: "nails", text: "Nail", img: imgTag.nails },
        {
            id: 6,
            title: "clinic",
            text: "Clinic",
            img: imgTag.clinic,
        },
        {
            id: 8,
            title: "massage center",
            text: "Massage",
            img: imgTag.massage,
        },
        {
            id: 5,
            title: "thẩm mỹ viện",
            text: t("home_2.beauty_salon"),
            img: imgTag.skinCare,
        },
        {
            id: 2,
            title: "nha khoa",
            text: t("home_2.dentistry"),
            img: imgTag.nhaKhoa,
        },
        // { id: 7, title: 'Yoga', text: "Yoga", img: imgTag.yoga },
    ];
    // const gotoDetail = (tag: string) => {
    //     history.push({
    //         pathname: "/danh-muc/",
    //         search: `${tag}`,
    //     });
    // };
    let currentLocation
    if (geo) {
        currentLocation = `${geo.context[1]?.text_vi},${geo.context[2]?.text_vi},${geo.context[3]?.text_vi}`
    }
    return (
        <>
            <div className="home-tags">
                <ul className="home-tags-list">
                    {
                        FLAT_FORM !== FLAT_FORM_TYPE.MB &&
                        <li>
                            <Link
                                to={{
                                    pathname: "/ban-do",
                                }}
                                onClick={() => scrollTop()}
                                className="flex-column tag-item-cnt">
                                <img
                                    src={icon.locationCate}
                                    onError={(e) => onErrorImg(e)} alt="" />
                                <div className="tag-item-title">
                                    {geo ? currentLocation : "Gần bạn"}
                                </div>
                            </Link>
                        </li>}
                    {tags_data.map((item) => (
                        <li key={item.id}>
                            <Link
                                to={{
                                    pathname: "/ket-qua-tim-kiem/cua-hang",
                                    search: `?keyword=${item.title}`,
                                }}
                                onClick={() => scrollTop()}
                                className="flex-column tag-item-cnt">
                                <img
                                    // src={item.img.length > 0 ? item.img[0].original_url : ""} 
                                    src={item.img}
                                    onError={(e) => onErrorImg(e)} alt="" />
                                <div className="tag-item-title">{item.text}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default HomeTags;
