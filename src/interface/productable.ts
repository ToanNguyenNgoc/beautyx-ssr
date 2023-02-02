import { IOrganization } from "./organization"

export interface Media {
    id: number,
    model_type: string,
    model_id: number,
    uuid: number,
    collection_name: number,
    name: number,
    file_name: string,
    mime_type: string,
    disk: string,
    conversions_disk: string,
    size: number,
    manipulations: any[],
    custom_properties: any[],
    generated_conversions: any[],
    responsive_images: any[],
    order_column: number,
    created_at: string,
    updated_at: string,
    original_url: string,
    preview_url: string
}

export interface Productable {
    id: string,
    content: {
        id: number,
        name: string,
        type: number,
        sku?: any,
        status: boolean,
        on_ecommerce: boolean,
        on_moba: boolean,
        stock?: any,
        organization_id: number,
        origin_id: number,
        price: number,
        discount_price: number,
        discount_moba_price: number,
        discount_ecommerce_price: number,
        deleted_at?: string,
        created_at: string,
        updated_at: string,
        media: Media[],
        categories: any[],
        tags: any[],
        sold_count: number,
        rating: number,
        organization: IOrganization[],
        combos: any[],
        favorites_count: number,
        distance?: number
    }
}