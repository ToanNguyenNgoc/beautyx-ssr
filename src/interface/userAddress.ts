export interface IUserAddress {
    id: number,
    latitude: null | number,
    longitude: null | number,
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