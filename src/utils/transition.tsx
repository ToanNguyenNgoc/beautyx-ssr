import React from "react";
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material'

export const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="left" ref={ref} {...props} />;
});