import { IOrganization } from 'interface';
import style from './style-branch.module.css'
import React from 'react';
import { Dialog } from '@mui/material';

interface OrgBranchesProps {
    open: boolean, setOpen: (open: boolean) => void, org: IOrganization
}

function OrgBranches(props: OrgBranchesProps) {
    const { open, setOpen, org } = props;
    return (
        <Dialog
            open={open} onClose={() => setOpen(false)}
        >
            <div className={style.container}>

            </div>
        </Dialog>
    );
}

export default OrgBranches;