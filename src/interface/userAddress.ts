export interface IUserAddress {
    id: number | string,
    latitude: null | number | string,
    longitude: null | number | string,
    address: string | null,
    is_default: boolean,
    user_id: number,
    user: {
        avatar: any
        email: string
        fullname: string
        id: number
        media: []
        platform: any
        telephone: string
    },
    created_at: string,
    updated_at: string
}