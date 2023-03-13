import topic1 from "assets/image/topic1.png";
import topic2 from "assets/image/topic2.png";
import topic3 from "assets/image/topic3.png";
import product1 from "assets/image/product1.png";
import product2 from "assets/image/product2.png";
import product3 from "assets/image/product3.png";
import product4 from "assets/image/product4.png";
import homeWhy1 from "assets/icon/homeWhy1.svg";
import homeWhy2 from "assets/icon/homeWhy2.svg";
import homeWhy3 from "assets/icon/homeWhy3.svg";
import homeWhy4 from "assets/icon/homeWhy4.svg";

import deal0 from "assets/image/deal0.jpg"
import deal1 from "assets/image/deal1.jpg"
import deal2 from "assets/image/deal2.jpg"
import bannerMomo from 'assets/image/bannerMomo.jpg'
import dayjs from "dayjs";



export interface Ideals {
    id: number,
    title: string,
    min_price?: number | null,
    max_price?: number | null,
    keyword?: string
    img: string,
    banner: string,
    percent?: number,
    special_price?: boolean
}
export interface IProductsSection {
    id: number,
    cate: string,
    text: string,
    image_url: string,
    url: string
}

export const deals: Ideals[] = [
    {
        id: 1,
        title: "Deal HOT",
        min_price: 50000,
        max_price: 100000,
        // keyword: 'Gội đầu',
        img: '',
        banner: deal0,
        special_price: true
    },
    {
        id: 2,
        title: "Dịch vụ dưỡng da giảm 50",
        min_price: null,
        // keyword: 'Dưỡng',
        img: '',
        percent: 50,
        banner: deal1,
        special_price: false
    },
    {
        id: 3,
        title: "Thẩm mỹ đẹp toàn diện",
        min_price: null,
        img: '',
        // keyword: 'Chăm sóc da',
        percent: 30,
        banner: deal2,
        special_price: true
    },
];
export const topics = [
    {
        id: 1,
        title: "Nails xinh đón Tết",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        image_url: topic1,
    },
    {
        id: 2,
        title: "Đẹp chanh xả - mừng 8/3",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        image_url: topic2,
    },
    {
        id: 3,
        title: "Đi nhóm",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        image_url: topic3,
    },
];
export const productsSection = [
    { id: 1, cate: "Sản phẩm", text: "làm đẹp", image_url: product1, url: '/danh-sach-san-pham/cham-soc-da-mat?id=130' },
    { id: 2, cate: "Chăm sóc tóc", text: "khỏe", image_url: product2, url: '/danh-sach-san-pham/salon-toc?id=5' },
    { id: 3, cate: "Make up", text: "xịn mịn", image_url: product3, url: '/danh-sach-san-pham/khac?id=185' },
    { id: 4, cate: "Dưỡng body", text: "trắng sáng", image_url: product4, url: '/danh-sach-san-pham/cham-soc-co-the?id=141' },
];
export const whyNots = [
    {
        title: "Tìm kiếm nơi làm đẹp",
        content:
            "Khám phá và tìm kiếm Spa, Salon, Thẩm mỹ, Phòng khám gần bạn. ",
        image_url: homeWhy1,
    },
    {
        title: "+100.000 địa điểm uy tín",
        content:
            "Mua đa dạng dịch vụ làm đẹp uy tín, an toàn với các đánh giá xác thực.",
        image_url: homeWhy2,
    },
    {
        title: "Đặt lịch trực tuyến",
        content:
            "Đặt lịch làm đẹp trực tuyến nhanh chóng. Không cần chờ đợi khi đi làm đẹp.",
        image_url: homeWhy3,
    },
    {
        title: "Thanh toán đa kênh",
        content:
            "Thanh toán online tiện lợi, bảo mật, đa dạng hình thức thanh toán.",
        image_url: homeWhy4,
    },
];
export const searchKeyRecommend = [
    'Gội đầu', 'Cắt tóc', 'Nặn mụn', 'Xăm chân mày', 'Triệt lông', 'Sơn gel', 'Chăm sóc da'
]

const banners = [
    {
        id: -1,
        name: "Beautyx vs Momo",
        type: '',
        imageURL: bannerMomo,
        htmlTemplate: null,
        url: '',
        target: null,
        width: 0,
        height: 0,
        view_count: 68,
        expires_at: '2023-01-31 00:00:00',
        platform: 'MOMO|BEAUTYX',
        origin_type: null,
        origin_id: null,
        deleted_at: null,
        created_at: '',
        updated_at: '',
        priority: 3
    }
]
const todayNumber = parseInt(dayjs().format('YYYYMMDD'))
export const bannersHard = (platform: string) => {
    const bannersResult = banners.filter(item => (
        parseInt(dayjs(item.expires_at).format('YYYYMMDD')) >= todayNumber && item.platform?.includes(platform)
    ))
    return bannersResult
}