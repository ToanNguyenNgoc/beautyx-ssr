/* eslint-disable no-useless-escape */
declare global {
    interface String { cleanString(): string; }
}
// eslint-disable-next-line
String.prototype.cleanString = function () {
    return this.replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g, "").replace(/\s{2,}/g, " ");
}
export { }