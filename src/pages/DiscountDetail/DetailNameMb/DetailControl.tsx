import React from "react";
import { Drawer } from "@mui/material";
import DetailRight from "../components/DetailRight";
import { IDiscountPar } from "../../../interface/discount";

interface IProps {
    discount: IDiscountPar;
    open: boolean;
    setOpen: (open: boolean) => void;
}

function DetailControl(props: IProps) {
    const { open, setOpen, discount } = props;
    // console.log(discount)
    return (
        <Drawer open={open} anchor="bottom" onClose={() => setOpen(false)}>
            <div className="mb-de-control">
                <div className="mb-de-control_x"></div>
                {open && <DetailRight discount={discount} />}
            </div>
        </Drawer>
    );
}

export default DetailControl;
