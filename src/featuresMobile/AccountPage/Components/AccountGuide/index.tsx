import React, { useContext, useRef, useState } from "react";
import { Dialog } from "@mui/material";
import HeadMobile from "../../../../features/HeadMobile";
import { Transition } from "../../../../utils/transition";
import step1 from "../../../../assets/image/user_guide/step_1.png";
import step2 from "../../../../assets/image/user_guide/step_2.png";
import step3 from "../../../../assets/image/user_guide/step_3.png";
import step4 from "../../../../assets/image/user_guide/step_4.png";
import GuideItem from "./Components/GuideItem";
import icon from "../../../../constants/icon";
import Slider from "react-slick";
import "./style.css";
import { AppContext } from "../../../../context/AppProvider";

function AccountGuide(props: any) {
    const { open } = props;
    const { t } = useContext(AppContext);
    const step = [
        {
            title: `${t("account_guide.ac_gui_title1")}`,
            img: [
                {
                    desc: `${t("account_guide.ac_gui_desc1")}`,
                    url: step1,
                },
            ],
        },
        {
            title: `${t("account_guide.ac_gui_title2")}`,
            img: [
                {
                    desc: `${t("account_guide.ac_gui_desc2")}`,
                    url: step2,
                },
            ],
        },
        {
            title: `${t("account_guide.ac_gui_title3")}`,
            img: [
                {
                    desc: `${t("account_guide.ac_gui_desc3")}`,
                    url: step3,
                },
            ],
        },
        {
            title: `${t("account_guide.ac_gui_title4")}`,
            img: [
                {
                    desc: `${t("account_guide.ac_gui_desc4")}`,
                    url: step4,
                },
            ],
        },
    ];
    const [slide, setSlide] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const ref: any = useRef({});
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        initialSlide: slideIndex,
        slidesToScroll: 1,
        swipeToSlide: true,
    };
    const goTosilide = (index: any) => {
        ref.current.slickGoTo(index);
    };

    return (
        <Dialog open={open} fullScreen TransitionComponent={Transition}>
            <HeadMobile title={`${t("account_guide.ac_gui_tutorial")}`} />
            <div className="guided-section-content">
                {step.map((item, index) => (
                    <GuideItem
                        key={index}
                        step={index}
                        slide={slide}
                        setSlide={setSlide}
                        setSlideIndex={setSlideIndex}
                        goTosilide={goTosilide}
                        item={item}
                    />
                ))}
            </div>
            <div className={slide ? "step-slider active" : "step-slider"}>
                <div className="close-btn" onClick={() => setSlide(!slide)}>
                    <img src={icon.closeCircleWhite} alt="" />
                </div>
                <Slider ref={ref} {...settings}>
                    {step.map((item, index) => (
                        <div key={index}>
                            {item.img.map((value, index) => (
                                <div key={index}>
                                    <div className="step-img__model">
                                        <img
                                            // src={value.url}
                                            alt={"step" + index + index}
                                        />
                                    </div>
                                    <div className="step-img-desc">
                                        <span>{item.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </Slider>
                <div className="bg-shadow"></div>
            </div>
        </Dialog>
    );
}

export default AccountGuide;
