import React, { useEffect, useState } from 'react';
import icon from '../../../constants/icon';
import { IOrganization } from '../../../interface/organization';
import orgApi from '../../../api/organizationApi';

function OrgSelectItem(props: any) {
      const { 
            org_id, 
            setChooseOrg, 
            chooseOrg, 
            setOrgAll, 
            // servicesBook, 
            setServicesBook, 
            myServices 
      } = props;
      const [org, setOrg] = useState<IOrganization>()
      const handleChooseOrg = () => {
            setChooseOrg(org_id)
            setServicesBook(myServices.filter((item: any) => item.organization_id === org_id))
      }
      useEffect(() => {
            async function getOrgById() {
                  const res = await orgApi.getOrgById(org_id)
                  setOrg(res.data.context)
                  setOrgAll((prev: any) => [...prev, res.data.context])
            }
            getOrgById()
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [org_id])
      return (
            <li
                  style={org_id === chooseOrg ?
                        { backgroundColor: 'var(--bgGray)', color: 'var(--purple)' } : {}
                  }
                  onClick={handleChooseOrg}
                  className="flex-row-sp my-ser__org-item"
            >
                  {org?.name}
                  <img src={icon.chevronRight} alt="" />
            </li>
      );
}

export default OrgSelectItem;