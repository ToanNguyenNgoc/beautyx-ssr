import React, { useContext } from "react";
import icon from "../../../../../constants/icon";
import { AppContext } from "../../../../../context/AppProvider";

function AddressItem(props: any) {
    const {
        item,
        handleRemoveAddress,
        index,
        handleUpdateAddress,
        address_default,
    } = props;
    const { t } = useContext(AppContext) as any;

    const onRemoveAddress = () => {
        if (handleRemoveAddress) {
            handleRemoveAddress(item);
        }
    };
    const onUpdateAddress = () => {
        if (handleUpdateAddress) {
            handleUpdateAddress(item);
        }
    };
    return (
        <>
            <div className="us-add_item">
                <div className="flex-row-sp us-add_item-header">
                    <span className="title">
                        {t("Mer_de.address")} {index + 1}
                    </span>
                    <div className="flex-row us-add_item-header_left">
                        {item.id === address_default?.id ? (
                            <span className="default">{t("acc.default")}</span>
                        ) : (
                            <>
                                <span
                                    onClick={onUpdateAddress}
                                    className="se-default"
                                >
                                    {t("acc.set_default_address")}
                                </span>
                                <button onClick={onRemoveAddress}>
                                    <img src={icon.TrashOrange} alt="" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="content">{item?.address}</div>
            </div>
        </>
    );
}

export default AddressItem;
