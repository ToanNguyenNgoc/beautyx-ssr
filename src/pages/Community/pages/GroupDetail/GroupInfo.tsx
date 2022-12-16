import { Dialog } from '@mui/material';
import { IGroup } from 'pages/Community/data';
import React from 'react';
import style from './group-detail.module.css'

interface GroupInfoProps {
    open: boolean, setOpen: (open: boolean) => void, group: IGroup
}

function GroupInfo(props: GroupInfoProps) {
    const { open, setOpen, group } = props
    return (
        <Dialog open={open} onClose={() => setOpen(false)} >
            <div className={style.information}>
                
            </div>
        </Dialog>
    );
}

export default GroupInfo;