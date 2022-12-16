import product from './assets/product.svg'
import clinic from './assets/clinic.svg'
import spa from './assets/spa.svg'
import nail from './assets/nail.svg'
import salon from './assets/salon.svg'
import other from './assets/other.svg'
import group1 from './assets/group1.png'
import group2 from './assets/group2.png'
import imgC from './assets'
import postMedia1 from './assets/postMedia1.png';
import postMedia2 from './assets/postMedia2.jpeg'

export interface IGroupCate {
    id: number, icon: string, name: string, total: number, bgColor: string
}
export interface IGroup {
    id: number, name: string, image_url: string
}
export interface IPost {
    id: number,
    group: IGroup,
    groupCate: IGroupCate,
    user: {
        fullname: string,
        avatar: string
    },
    content: string,
    medias: string[],
    favorite_count: number,
    created_at: string,
    comment_count: number
}

export const groupCates: IGroupCate[] = [
    { id: 1, icon: product, name: 'Mỹ phẩm', total: 60, bgColor: "#C9C0FF" },
    { id: 2, icon: clinic, name: 'Thẩm mỹ', total: 60, bgColor: "#C9F58D" },
    { id: 3, icon: spa, name: 'Spa', total: 60, bgColor: "#A9DFFF" },
    { id: 4, icon: nail, name: 'Nail', total: 60, bgColor: "#FFC6D6" },
    { id: 5, icon: salon, name: 'Salon', total: 60, bgColor: "#FFAA79" },
    { id: 6, icon: other, name: 'Khác', total: 60, bgColor: "#FFF7AE" },
]
export const groups: IGroup[] = [
    { id: 1, name: 'SĂN DEAL HOT MỖI NGÀY', image_url: group1 },
    { id: 2, name: 'Review phẫu thuật thẩm mỹ có tâm', image_url: group2 },
    { id: 3, name: 'Ăn chơi, làm đẹp', image_url: group1 },
]
export const posts: IPost[] = [
    {
        id: 1,
        group: { id: 1, name: 'SĂN DEAL HOT MỖI NGÀY', image_url: group1 },
        groupCate: { id: 1, icon: product, name: 'Mỹ phẩm', total: 60, bgColor: "#C9C0FF" },
        user: {
            fullname: 'Hồ Thanh Mỹ',
            avatar: imgC.avatar
        },
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet elit purus, et gravida libero venenatis sed. Ut cursus porta ',
        medias: [postMedia1, postMedia2],
        favorite_count: 10,
        created_at: "2023-01-30 15:46:51",
        comment_count: 10
    },
    {
        id: 2,
        group: { id: 2, name: 'Review phẫu thuật thẩm mỹ có tâm', image_url: group2 },
        groupCate: { id: 2, icon: clinic, name: 'Thẩm mỹ', total: 60, bgColor: "#C9F58D" },
        user: {
            fullname: 'Hồ Thanh Mỹ',
            avatar: imgC.avatar
        },
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet elit purus, et gravida libero venenatis sed. Ut cursus porta ',
        medias: [postMedia1, postMedia2, postMedia1, postMedia2, postMedia1, postMedia2, postMedia1, postMedia2],
        favorite_count: 99,
        created_at: "2022-11-30 15:46:51",
        comment_count: 99
    },
    {
        id: 3,
        group: { id: 3, name: 'Ăn chơi, làm đẹp', image_url: group1 },
        groupCate: { id: 1, icon: product, name: 'Mỹ phẩm', total: 60, bgColor: "#C9C0FF" },
        user: {
            fullname: 'Hồ Thanh Mỹ',
            avatar: imgC.avatar
        },
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet elit purus, et gravida libero venenatis sed. Ut cursus porta ',
        medias: [postMedia1],
        favorite_count: 999,
        created_at: "2022-11-30 15:46:51",
        comment_count: 999
    },
]