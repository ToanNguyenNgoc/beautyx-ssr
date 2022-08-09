/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IOrganization } from "../../../../interface/organization";
import {
    fetchAsyncOrgComments,
    clearPrevState,
} from "../../../../redux/org/orgCommentsSlice";
import { STATUS } from "../../../../redux/status";
import Review from "../../../Reviews";
import ReviewsContainer from "../../../ReviewsContainer";

interface IProps {
    org: IOrganization;
    refReview?: any;
    isMapReview?: Boolean;
}

function OrgReviews(props: IProps) {
    const { org, refReview, isMapReview } = props;
    const dispatch = useDispatch();
    const [openAll, setOpenAll] = useState(false);
    const { org_id, comments, totalItem, status, page } = useSelector(
        (state: any) => state.ORG_COMMENTS
    );
    const handleOpenSeemoreCmt = () => {
        setOpenAll(true);
    };
    const callOrgComments = () => {
        if (org?.id !== org_id || status !== STATUS.SUCCESS) {
            dispatch(clearPrevState());
            dispatch(
                fetchAsyncOrgComments({
                    org_id: org?.id,
                    page: 1,
                })
            );
        }
    };
    useEffect(() => {
        callOrgComments();
    }, [org]);
    return (
        <>
            <div ref={refReview} className="org-evaluate">
                <Review
                    commentable_type="ORGANIZATION"
                    comments={comments.slice(0, 10)}
                    totalItem={totalItem}
                    id={org_id}
                    page={page}
                    openSeeMoreCmt={handleOpenSeemoreCmt}
                />
                {comments && comments.length >= 8 ? (
                    <div
                        style={{
                            justifyContent: "center",
                        }}
                        onClick={() => {
                            setOpenAll(true);
                            console.log("first");
                        }}
                        className="seemore-cmt"
                    >
                        <p>{"Xem tất cả >>"}</p>
                    </div>
                ) : null}
            </div>
            <ReviewsContainer
                open={openAll}
                setOpen={setOpenAll}
                comments={comments}
                org_id={org_id}
                totalItem={totalItem}
                page={page}
                muiCustomClass={isMapReview?'isMap':''}
                commentable_type="ORGANIZATION"
            />
        </>
    );
}

export default OrgReviews;
