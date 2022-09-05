import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppProvider";
import { imgTag } from "../../../constants/img";
import icon from "../../../constants/icon";
// import { useSelector } from "react-redux";
// import { ITag } from "../../../interface/tags";
import onErrorImg from "../../../utils/errorImg";
import scrollTop from "../../../utils/scrollTop";

function HomeTags(props: any) {
    //const history = useHistory();
    const { t, geo } = useContext(AppContext);
    // console.log(geo)
    // const tagsList: ITag[] = useSelector((state: any) => state.HOME.tags);
    // const tags = tagsList.filter(e => e.children && e.children?.length > 0 && e.organizations_count > 0);
    // console.log(t)
    const tags_data = [
        // { id: 9, title: t("home_2.places_near_you"), text: t("home_2.places_near_you"), img: icon.distance },
        { id: 4, title: "Spa", text: "Spa", img: imgTag.spa },
        { id: 3, title: "Salon", text: "Salon", img: imgTag.hairSalon },
        { id: 1, title: "Nail", text: "Nail", img: imgTag.nails },
        {
            id: 6,
            title: "clinic",
            text: "clinic",
            img: imgTag.clinic,
        },
        {
            id: 8,
            title: "Massage",
            text: "Massage",
            img: imgTag.massage,
        },
        {
            id: 5,
            title: "Thẩm mỹ viện",
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
    const currentAddress = geo?.properties?.address ?? `${geo?.context[0]?.text_vi},${geo?.context[1]?.text_vi}`
    return (
        <>
            {/* <div className="home-title__tag">
                <HomeTitleSection title={`${t("home_2.categories")}`} />
            </div> */}
            <div className="home-tags">
                <ul className="home-tags-list">
                    <li
                    //onClick={() => gotoDetail(item.title)}
                    >
                        <Link
                            to={{
                                pathname: "/ban-do",
                            }}
                            onClick={() => scrollTop()}
                            className="flex-column tag-item-cnt">
                            {/* {
                                geo
                                    ?
                                    <div className="tag-item-title"
                                        style={{
                                            padding: "20px 4px"
                                        }}
                                    >
                                        <img
                                            // src={item.img.length > 0 ? item.img[0].original_url : ""} 
                                            src={icon.locationCate}
                                            style={{
                                                width: "15px",
                                                height: "15px",
                                                margin: 0,
                                                marginRight: '4px',
                                                display: "inline-block"
                                            }}
                                            onError={(e) => onErrorImg(e)} alt="" />
                                        {geo ? currentAddress : "Gần bạn"}
                                    </div>
                                    :
                                    <>
                                        <img
                                            // src={item.img.length > 0 ? item.img[0].original_url : ""} 
                                            src={icon.locationCate}
                                            onError={(e) => onErrorImg(e)} alt="" />
                                        <div className="tag-item-title">
                                        {geo ? currentAddress : "Gần bạn"}
                                        </div>
                                    </>

                            } */}
                            <img
                                // src={item.img.length > 0 ? item.img[0].original_url : ""} 
                                src={icon.locationCate}
                                onError={(e) => onErrorImg(e)} alt="" />
                            <div className="tag-item-title">
                                {geo ? currentAddress : "Gần bạn"}
                            </div>
                        </Link>
                    </li>
                    {tags_data.map((item) => (
                        <li
                            //onClick={() => gotoDetail(item.title)}
                            key={item.id}
                        >
                            <Link
                                to={{
                                    pathname: "/ket-qua/",
                                    search: `?tag=${item.title}`,
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
