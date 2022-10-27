export function useGetParamUrl(){
   const pathnameArr = window.location.pathname.split("/")[2]
   const paramsArr = pathnameArr?.split("_")
   return paramsArr
}