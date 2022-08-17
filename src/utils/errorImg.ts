import img from "../constants/img";

export default function onErrorImg(e: any,isDisable?: boolean) {
    if (isDisable) { e.target.style.display = 'none';return}
    e.target.src = img.imgDefault;
    e.target.style.objectFit = "contain";
    //e.target.style.transform = "scale(0.5)";
}
export const onLoadImg = (e: any) => {
    e.target.src = img.imgDefault;
    e.target.style.objectFit = "contain";
    //e.target.style.transform = "scale(0.5)";
}