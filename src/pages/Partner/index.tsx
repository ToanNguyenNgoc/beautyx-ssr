import React, { useContext } from "react";
import { partnerStyle } from "./style";
import Information from "./components/Information";
import FormPartner from "./components/FormPartner";
import { AppContext } from "../../context/AppProvider";

export default function Partner() {
    const parner = partnerStyle();
    const { t } = useContext(AppContext);
    return (
        <div>
            <section className={parner.partner}>
                <div className={parner.container}>
                    <div className={parner.content}>
                        {/* infomation */}
                        <Information />
                        {/* end infomation*/}

                        {/* form */}
                        <FormPartner />
                        {/* end form */}
                    </div>
                </div>
            </section>
        </div>
    );
}
