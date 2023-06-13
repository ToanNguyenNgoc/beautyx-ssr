import { analytics, logEvent } from "../../../firebase";
import { IOrganization } from "interface";
import { useEffect } from "react";

export function usePostAnalytics(org: IOrganization) {
    useEffect(() => (
        logEvent(analytics, 'detail_merchant', {
            merchant: org?.name
        })
    ), [org?.id, org?.name])
}