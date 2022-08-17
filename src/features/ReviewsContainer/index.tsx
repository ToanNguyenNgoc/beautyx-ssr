import React from "react";
import { Drawer } from "@mui/material";
import "./style.css";
import useFullScreen from "../../utils/useDeviceMobile";
import Review from "../Reviews";
import { IComment } from "../../interface/comments";

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    commentable_type: string;
    comments: IComment[];
    totalItem: number;
    page: number;
    org_id: number;
    muiCustomClass?: string;
}

function ReviewsContainer(props: IProps) {
    const { open, setOpen, comments, totalItem, org_id, page, muiCustomClass } =
        props;
    const IS_MB = useFullScreen();
    const anchor = IS_MB ? "bottom" : "right";
    return (
        <Drawer
            open={open}
            anchor={anchor}
            className={muiCustomClass}
            onClose={() => setOpen(false)}
        >
            <div className="all-review-cnt">
                <Review
                    commentable_type="ORGANIZATION"
                    comments={comments}
                    totalItem={totalItem}
                    id={org_id}
                    page={page}
                    changeStyle={true}
                />
            </div>
        </Drawer>
    );
}

export default ReviewsContainer;
