export const EXTRA_FLAT_FORM = () => {
    const FLAT_FORM = sessionStorage.getItem('FLAT_FORM') || "BEAUTYX";
    return FLAT_FORM;
}