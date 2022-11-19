export function useGetParamUrl(){
   const pathnameArr = window.location.pathname.split("/").slice(-1)[0]
   const paramsArr = pathnameArr?.split("_")
   return paramsArr
}