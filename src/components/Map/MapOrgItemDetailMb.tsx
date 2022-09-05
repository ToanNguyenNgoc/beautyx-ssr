import React from 'react';
import { Drawer } from '@mui/material';
import MapOrgItemDetail from './MapOrgItemDetail';
import { IOrganization } from '../../interface/organization';

interface IProps {
    // open: IOpenState,
    open: boolean,
    setOpen: any,
    org: IOrganization,
    handleDirection?:() => void
}
interface IOpenState {
    open: boolean,
    check: boolean
}
function MapOrgItemDetailMb(props: IProps) {
    const { open, setOpen, org, handleDirection } = props
    return (
        <Drawer
            // open={open.open}
            // onClose={() => setOpen({...open,open:false})}
            open={open}
            onClose={() => setOpen(false)}
            anchor={"bottom"}
        >
            <div className='map map-org-de-mb-wrap'>
                <MapOrgItemDetail
                    org={org}
                    openDetail={open}
                    setOpenDetail={setOpen}
                    handleDirection={handleDirection}
                />
            </div>
        </Drawer>
    );
}

export default MapOrgItemDetailMb;