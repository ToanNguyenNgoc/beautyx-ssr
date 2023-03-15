import React, {useContext} from 'react';
import { AppContext } from '../../../context/AppProvider';
import OrgSelectItem from './OrgSelectItem';

function OrgSelect(props: any) {
      const { t } = useContext(AppContext) as any
      const { myServices, setOrgAll, chooseOrg, setChooseOrg, servicesBook, setServicesBook } = props;
      const orgListId: any[] = [];
      for (var service of myServices) {
            orgListId.push(service.organization_id)
      }
      function unique(arr: any) {
            var newArr = []
            for (var i = 0; i < arr.length; i++) {
                  if (newArr.indexOf(arr[i]) === -1) {
                        newArr.push(arr[i])
                  }
            }
            return newArr
      }
      const listOrgId = unique(orgListId)
      return (
            <ul
                  className="my-ser__org"
            >
                  <li
                        onClick={() => setChooseOrg(0)}
                        style={chooseOrg === 0 ?
                              { backgroundColor: 'var(--bgGray)', color: 'var(--purple)' } : {}
                        }
                        className="my-ser__org-item"
                  >
                        {t('my_ser.all_business')}
                  </li>
                  <div
                        className="my-ser__org-head"
                  >
                        {t('my_ser.choose_business')}
                  </div>
                  {
                        listOrgId.map(item => (
                              <OrgSelectItem
                                    setOrgAll={setOrgAll}
                                    myServices={myServices}
                                    key={item}
                                    org_id={item}
                                    chooseOrg={chooseOrg}
                                    setChooseOrg={setChooseOrg}
                                    servicesBook={servicesBook}
                                    setServicesBook={setServicesBook}
                              />
                        ))
                  }
            </ul>
      );
}

export default OrgSelect;