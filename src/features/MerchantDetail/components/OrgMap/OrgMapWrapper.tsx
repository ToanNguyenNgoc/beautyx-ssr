import { Dialog } from "@mui/material";
import MapContent from "../../../../components/Map/MapContent";
import icon from "../../../../constants/icon";
import useFullScreen from "../../../../utils/useDeviceMobile";
import MapOrg from "./MapOrg";
import "./orgMap.css";

export default function OrgMapWrapper(props: any) {
    const { open, setOpen, org } = props;
    const IS_MB = useFullScreen();
    function handleClose() {
        setOpen(false);
    }

    return (
        <Dialog
            fullScreen={IS_MB ? true : false}
            open={open}
            onClose={handleClose}
        >
            <div className="dialog-map__org">
                <div
                    onClick={() => handleClose()}
                    className="dialog-map__close"
                >
                    <div className="dialog-map__close-img">
                        <img src={icon.closeCircleWhite} alt="" />
                    </div>
                </div>
                <MapContent orgs={[org]} isDetail={true} />
                {/* <MapOrg org={org} /> */}
            </div>
        </Dialog>
    );
}
