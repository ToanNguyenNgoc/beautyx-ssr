import { Dialog } from "@mui/material";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { EXTRA_FLAT_FORM } from "../../api/extraFlatForm";
import icon from "../../constants/icon";
import useDeviceMobile from "../../utils/useDeviceMobile";
import MapContent from "./MapContent";
import "./style.css";
export default function Map(props: any) {
    const { open, setOpenMap, data } = props;
    const IS_MB = useDeviceMobile();

    // console.log(data)
    const history = useHistory();
    function handleClose() {
        setOpenMap ? setOpenMap(false) : history.goBack();
    }

    const platform = EXTRA_FLAT_FORM();

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={() => {
                setOpenMap(false);
            }}
        >
            <div
                style={
                    platform === "BEAUTYX" && IS_MB === true
                        ? {
                              width: "100vw",
                              height: "90vh",
                          }
                        : { width: "100vw", height: "100vh" }
                }
                className="map"
            >
                <div onClick={handleClose} className="dialog-map__close">
                    <div className="dialog-map__close-img">
                        <img src={icon.closeCircleWhite} alt="" />
                    </div>
                </div>
                <MapContent orgs={data} />
            </div>
        </Dialog>
    );
}
