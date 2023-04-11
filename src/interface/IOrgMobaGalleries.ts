export interface IMageOrgMoba {
    created_date: string
    deleted: boolean
    gallery_id: number
    id: number
    image: string
    image_url: string
}

export interface IOrgMobaGalleries {
    branch_id: number
    created_date: string
    deleted: boolean
    id: number
    image_url: string
    images: IMageOrgMoba[]
    name: string
    thumbnail: string
    videos: any[]
}