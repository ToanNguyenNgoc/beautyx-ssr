const isHTMLTemplate = (str) => {
  const htmlRegex = /<([a-z][a-z\d]*)\b[^>]*>(.*?)<\/\1>/i;
  return htmlRegex.test(str);
}
module.exports = { isHTMLTemplate }