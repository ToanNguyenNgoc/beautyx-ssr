export const handleScroll = (
    is_mobile?: boolean,
    setValue?: any,
    scrollReview?: any,
    scrollDesc?: any,
    scrollMap?: any,
    scrollPolicy?: any
) => {
    const b = is_mobile ? 113 : 72;
    if (window.scrollY + b < scrollReview) {
        setValue(1);
    } else if (
        window.scrollY + b > scrollDesc &&
        window.scrollY + b < scrollMap
    ) {
        setValue(2);
    } else if (
        window.scrollY + b > scrollReview &&
        window.scrollY + b < scrollPolicy
    ) {
        setValue(3);
    } else if (window.scrollY + b > scrollMap) {
        setValue(4);
    }
};
export const handleChangeScroll = (
    is_mobile: boolean,
    value: any,
    setValue: (value: any) => void,
    refDesc: any,
    refReview: any,
    refMap: any,
    refPolicy: any
) => {
    const b = is_mobile ? 113 : 72;
    let top;
    switch (value) {
        case 1:
            top = refDesc?.current?.offsetTop - b;
            setValue(value);
            break;
        case 2:
            top = refReview?.current?.offsetTop - b;
            setValue(value);
            break;
        case 3:
            top = refMap?.current?.offsetTop - b;
            setValue(value);
            break;
        case 4:
            top = refPolicy?.current?.offsetTop - b;
            setValue(value);
            break;
        default:
            break;
    }
    return top;
};
