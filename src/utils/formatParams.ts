export const formatOrgParam = () => {
    const locationCus = window.location;
    const query = locationCus.search;
    const urlParam = new URLSearchParams(query);
    const tab = Object.fromEntries(urlParam.entries());
    const sub_domain = locationCus.pathname.split("/")[locationCus.pathname.split("/").findIndex((e:any)=>e==='cua-hang')+1]
    return { sub_domain, tab }
}