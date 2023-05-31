import { Dialog } from "@mui/material";
import { useDeviceMobile } from "hooks";
import React, { useState } from "react";
import ReactPlayer from "react-player/lazy";

export default function OrgGalleriesVideo(props: any) {
    const { item } = props;
    const is_mb = useDeviceMobile()

    const [open, setOpen] = useState(false);
    return (
        <>
            <div
                onClick={() => setOpen(true)}
                className="galleries-video player-wrapper"
            >
                <ReactPlayer
                    muted={true}
                    width="100%"
                    height="100%"
                    url={item?.video_url}
                />
            </div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <div className="wrap-video">
                    {is_mb === true ? (
                        <ReactPlayer
                            width="100%"
                            height="80vh"
                            playing
                            controls
                            muted={true}
                            url={item?.video_url}
                        />
                    ) : (
                        <ReactPlayer
                            width="100%"
                            height="80vh"
                            playing
                            controls
                            muted={true}
                            url={item?.video_url}
                        />
                    )}
                </div>
            </Dialog>
        </>
    );
}
