import axiosClient from './axios';

class BranchApi{
      getBranchByOrg=(param:any)=>{
            const url =`/organizations/${param}/branches`;
            return axiosClient.get(url);
      }
}
const branchApi = new BranchApi();
export default branchApi;