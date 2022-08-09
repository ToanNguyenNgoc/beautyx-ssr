import { Dialog } from "@mui/material";
import { useHistory } from "react-router-dom";
import icon from "../../constants/icon";
import MapContent from "./MapContent";
import "./style.css";
export default function Map(props: any) {
    const { open, setOpenMap, data } = props;
    const history = useHistory();
    function handleClose() {
        setOpenMap ? setOpenMap(false) : history.goBack();
    }
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={() => {
                setOpenMap(false);
            }}
        >
            <div className="map">
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
