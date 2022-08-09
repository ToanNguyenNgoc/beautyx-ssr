import React from "react";
import { Dialog, Tab } from "@mui/material";
import { Masonry, TabContext, TabList, TabPanel } from "@mui/lab";
import useFullScreen from "../../../../../utils/useDeviceMobile";
import OrgGalleryItem from "./OrgGalleryItem";
import { Transition } from "../../../../../utils/transition";
import icon from "../../../../../constants/icon";
import OrgGalleriesVideo from "./OrgGalleriesVideo";

function OrgGalleriesDialog(props: any) {
    const { chooseThumb, open, setOpen } = props;
    const [value, setValue] = React.useState("1");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const IS_MOBILE = useFullScreen();
    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
            <div className="org-galleries__images-section">
                <div className="flex-row title">
                    <button
                        className="org-image-btn"
                        onClick={() => setOpen(false)}
                    >
                        <img src={icon.chevronLeft} alt="" />
                    </button>
                    {chooseThumb?.name}
                </div>
                <div className="images-section__wrap">
                    <TabContext
                        value={chooseThumb?.videos.length > "0" ? value : "1"}
                    >
                        <div className="galleries-tab">
                            <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                            >
                                <Tab label="Hình ảnh" value="1" />
                                {chooseThumb?.videos.length > 0 && (
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
                    {/* <Masonry
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
                    </Masonry> */}
                </div>
            </div>
        </Dialog>
    );
}

export default OrgGalleriesDialog;
