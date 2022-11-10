export interface ITrendService {
    _id: string,
    id: string,
    organization_id: string,
    service_name: string,
    image_url?: string,
    price: number,
    special_price: number,
    trend_id: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}
export interface ITrend {
    _id: string,
    organization_id: string,
    organization_name: string,
    organization_image: string,
    services: ITrendService[],
    cate_id: string,
    title: string,
    content: string,
    image_thumb: string,
    media_url: string,
    trend_url: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}