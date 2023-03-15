import { AppContext } from "context/AppProvider"
import { IOrderV2 } from "interface"
import { useContext } from "react"

interface CommentProps {
    commentable_type: any
    commentable_id: number,
    org_id: number
}

export function useCheckUserBought({ commentable_type, commentable_id, org_id }: CommentProps) {
    let bought = false

    const { orderService } = useContext(AppContext) as any

    const orders: IOrderV2[] = orderService ?? []
    const organization_ids_order = orders.map(i => i.organization_id)
    const service_ids_order = orders
        .map(i => i.items)
        ?.flat()
        ?.filter(i => i.productable_type === 'App\\Models\\CI\\Service')
        ?.map(i => i.productable_id)

    const product_ids_order = orders
        .map(i => i.items)
        ?.flat()
        ?.filter(i => i.productable_type === 'App\\Models\\CI\\Product')
        ?.map(i => i.productable_id)



    if (commentable_type === 'ORGANIZATION' && organization_ids_order.includes(org_id)) {
        bought = true
    }
    if (
        commentable_type === 'SERVICE' &&
        organization_ids_order.includes(org_id) &&
        service_ids_order.includes(commentable_id)
    ) {
        bought = true
    }
    if (
        commentable_type === 'PRODUCT' &&
        organization_ids_order.includes(org_id) &&
        product_ids_order.includes(commentable_id)
    ) {
        bought = true
    }

    return { bought }
}