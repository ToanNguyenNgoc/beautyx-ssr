import React, { useState } from "react";
import { Masonry, TabContext, TabList, TabPanel } from "@mui/lab";
import OrgGalleryItem from "./OrgGalleryItem";
import OrgGalleriesDialog from "./OrgGalleriesDialog";
import { Tab } from "@mui/material";
import OrgGalleriesVideo from "./OrgGalleriesVideo";
import { IOrgMobaGalleries } from "interface";
import { useDeviceMobile } from "hooks";


export function OrgGalleries({ galleries }: { galleries: IOrgMobaGalleries[] }) {
    const IS_MOBILE = useDeviceMobile();
    const [chooseThumb, setChooseThumb] = useState<IOrgMobaGalleries>(galleries[0]);
    const [openImages, setOpenImages] = useState(false);
    const onChooseThumb = (thumb: any) => {
        setChooseThumb(thumb);
        if (IS_MOBILE) {
            setOpenImages(true);
        }
    };
    const [value, setValue] = React.useState("1");
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        galleries.length > 0 ?
            <div className="org-galleries-cnt">
                <div className="org-galleries__thumb-section">
                    <ul className="thumb-list">
                        {galleries?.map((item: any, index: number) => (
                            <li key={index} onClick={() => onChooseThumb(item)}>
                                <div className="thumb-list__item-cnt">
                                    <div className="thumb-img__box">
                                        <img src={item.image_url} alt="" />
                                    </div>
                                    <div className="thumb-img__title">
                                        <span className="title">{item.name}</span>
                                        <span className="count">
                                            {item.images?.length} Hình
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {IS_MOBILE === false && (
                    <div className="org-galleries__images-section">
                        <span className="title">{chooseThumb?.name}</span>
                        <div className="images-section__wrap">
                            <TabContext
                                value={
                                    chooseThumb?.videos?.length > 0 ? value : "1"
                                }
                            >
                                <div className="galleries-tab">
                                    <TabList
                                        onChange={handleChange}
                                        aria-label="lab API tabs example"
                                    >
                                        <Tab label="Hình ảnh" value="1" />
                                        {chooseThumb?.videos?.length > 0 && (
                                            <Tab label="Video" value="2" />
                                        )}
                                    </TabList>
                                </div>
                                <TabPanel value="1">
                                    <div className="galleries-masory">
                                        <Masonry
                                            columns={IS_MOBILE ? 2 : 5}
                                            spacing={IS_MOBILE ? 1 : 2}
                                        >
                                            {chooseThumb?.images?.map(
                                                (item: any, index: number) => (
                                                    <OrgGalleryItem
                                                        key={index}
                                                        image_url={item?.image_url}
                                                    />
                                                )
                                            )}
                                        </Masonry>
                                    </div>
                                </TabPanel>
                                <TabPanel value="2">
                                    <div className="galleries-masory">
                                        <Masonry
                                            columns={IS_MOBILE ? 2 : 5}
                                            spacing={IS_MOBILE ? 1 : 2}
                                        >
                                            {chooseThumb?.videos?.map(
                                                (item: any, index: number) => (
                                                    <OrgGalleriesVideo
                                                        key={index}
                                                        item={item}
                                                    />
                                                )
                                            )}
                                        </Masonry>
                                    </div>
                                </TabPanel>
                            </TabContext>
                        </div>
                    </div>
                )}
                <OrgGalleriesDialog
                    open={openImages}
                    setOpen={setOpenImages}
                    chooseThumb={chooseThumb}
                />
            </div>
            :
            <></>
    );
}
