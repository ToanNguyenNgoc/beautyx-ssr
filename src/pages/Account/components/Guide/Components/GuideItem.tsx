import React, { useContext } from "react";
import { AppContext } from "../../../../../context/AppProvider";

export default function GuideItem(props: any) {
    const { item, slide, setSlide, setSlideIndex, goTosilide, step } = props;
    const { t } = useContext(AppContext);
    return (
        <div className="guided-section-step">
            <div className="step-content">
                <div className="step">
                    {t("account_guide.ac_gui_step")} {step + 1}
                </div>
                <div className="step-desc">
                    <span>{item.title}</span>
                </div>
            </div>
            <div className="step-slide">
                {item.img.map((value: any, index: number) => (
                    <div key={index}>
                        <div
                            className="step-img"
                            onClick={() => {
                                setSlide(!slide);
                                setSlideIndex(step);
                                goTosilide(step);
                            }}
                        >
                            <img
                                src={value.url}
                                alt={"step" + item.step + index}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
