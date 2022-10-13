import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncTags } from "../../../../../redux/Tags/tagsSlice";
import "./homeTagsProducts.css";
import { ITag } from "../../../../../interface/tags";
export default function HomeTagsProducts() {
    const dispatch = useDispatch();
    const { TAGS } = useSelector((state: any) => state);
    const tags: ITag[] = TAGS.tags;
    useEffect(() => {
        dispatch(fetchAsyncTags());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="homeTagsPr">
            <Container>
                <div className="homeTagsPr-wrap">
                    <div className="homeTagsPr-list">
                        {tags?.slice(0, 11).map((item: any, index: number) => (
                            <>
                                <div key={index} className="homeTagsPr-item">
                                    <p className="item-title">{item.name}</p>
                                    {item?.children.length > 0 ? (
                                        <ul className="item-list">
                                            {item?.children.map(
                                                (e: any, i: number) => (
                                                    <li key={i}>
                                                        <p>{e.name}</p>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    ) : null}
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}
