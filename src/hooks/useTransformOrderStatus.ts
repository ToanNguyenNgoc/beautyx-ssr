import { AppContext } from "context/AppProvider";
import { useContext } from "react";

export function useTransformOrderStatus(status: string) {
    const { t } = useContext(AppContext) as any
    const statusList = [
        { status: 'PAID', title: t('acc.pain'), color: '#ABD373' },
        { status: 'PENDING', title: t('order.pending'), color: '#E7C900' },
        { status: 'CANCELED', title: t('acc.canceled'), color: 'var(--red_2)' },
        { status: 'REFUND', title: t('acc.canceled'), color: 'var(--red_2)' },
        { status: 'CANCELED_BY_USER', title: t('acc.canceled'), color: 'var(--red_2)' },
        { status: 'TIMEOUT', title: t('acc.canceled'), color: 'var(--red_2)' },
    ]
    const statusTransform = statusList.find(i => i.status === status)
    return { statusTransform }
}