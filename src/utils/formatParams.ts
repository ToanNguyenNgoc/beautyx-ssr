export const formatOrgParam = (pathname: string) => {
    const query = pathname.split("?");
    const urlParam = new URLSearchParams(`?${query[1]}`);
    const tab = Object.fromEntries(urlParam.entries());
    const sub_domain = query[0].slice(10, pathname.length);
    return { sub_domain, tab }
}