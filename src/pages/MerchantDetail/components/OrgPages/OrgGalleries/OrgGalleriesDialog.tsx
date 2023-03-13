import React, { useState } from "react";
import { Dialog, Tab } from "@mui/material";
import { Masonry, TabContext, TabList, TabPanel } from "@mui/lab";
import OrgGalleriesVideo from "./OrgGalleriesVideo";
import { useDeviceMobile } from "hooks";
import { Transition } from "utils";
import icon from "constants/icon";
import { FullImage } from "components/Layout";
import { IOrgMobaGalleries } from "interface";

interface OrgGalleriesDialogProps {
    chooseThumb: IOrgMobaGalleries,
    open: boolean, setOpen: (open: boolean) => void
}

function OrgGalleriesDialog(props: OrgGalleriesDialogProps) {
    const { chooseThumb, open, setOpen } = props;
    const [value, setValue] = React.useState("1");
    const [fullImg, setFullImg] = useState(false)
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const IS_MOBILE = useDeviceMobile();
    const onFullImg = () => setFullImg(true)
    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
            <FullImage
                open={fullImg} setOpen={setFullImg}
                src={chooseThumb?.images?.map(i => i.image_url)}
            />
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
                        value={chooseThumb?.videos?.length > 0 ? value : "1"}
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
                                            <div onClick={onFullImg} key={index} className="org-image-items__box">
                                                <img src={item.image_url} alt="" />
                                            </div>
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
        </Dialog>
    );
}

export default OrgGalleriesDialog;
