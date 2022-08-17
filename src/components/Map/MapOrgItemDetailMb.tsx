import React from 'react';
import { Drawer } from '@mui/material';
import MapOrgItemDetail from './MapOrgItemDetail';
import { IOrganization } from '../../interface/organization';

interface IProps {
    open: boolean
    setOpen: (open: boolean) => void,
    org: IOrganization,
    handleDirection?:() => void
}

function MapOrgItemDetailMb(props: IProps) {
    const { open, setOpen, org, handleDirection } = props
    return (
        <Drawer
            open={open}
            onClose={() => setOpen(false)}
            anchor={"bottom"}
        >
            <div className='map map-org-de-mb-wrap'>
                <MapOrgItemDetail
                    org={org}
                    openDetail={open}
                    setOpenDetail={setOpen}
                    // handleDirection={handleDirection}
                />
            </div>
        </Drawer>
    );
}

export default MapOrgItemDetailMb;