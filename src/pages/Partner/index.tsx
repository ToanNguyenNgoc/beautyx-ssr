import React from "react";
import { partnerStyle } from "./style";
import Information from "./components/Information";
import FormPartner from "./components/FormPartner";

export default function Partner() {
    const parner = partnerStyle();
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
