import { FullImage } from 'components/Layout';
import React, { useState } from 'react';

function OrgGalleryItem(props: any) {
    const { image_url } = props;
    const [open, setOpen] = useState(false);
    return (
        <>
            <div onClick={() => setOpen(true)} className="org-image-items__box">
                <img src={image_url} alt="" />
            </div>
            <FullImage
                open={open}
                setOpen={setOpen}
                src={[image_url]}
            />
        </>
    );
}

export default OrgGalleryItem;