import React from "react";
import { commonStyle } from "../../constants/style";
import "./ButtonCus.css";

function ButtonCus(props: any) {
  const btnStyle = commonStyle();
  const {
    width,
    padding,
    backColor,
    color,
    fontSize,
    lineHeight,
    borderRadius,
    onClick,
    text,
    imgIcon,
    border,
    margin,
    disabled,
    type,
  } = props;
  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <button
      disabled={disabled}
      style={{
        padding: padding,
        fontSize: fontSize,
        lineHeight: lineHeight,
        color: color,
        backgroundColor: backColor,
        borderRadius: borderRadius,
        border: border,
        margin: margin,
        width: width,
      }}
      className={btnStyle.button}
      onClick={handleOnClick}
      type={type}
    >
      {text}
      <img src={imgIcon} alt="" />
    </button>
  );
}

export default ButtonCus;
