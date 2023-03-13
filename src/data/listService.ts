
export const discountsOrgs = [
    {
        id: 5,
        title: "Test Final Price",
        description: "Test Final Price",
        discount_value: 123000,
        discount_unit: "PRICE",
        discount_type: "FINAL_PRICE",
        valid_from: null,
        valid_util: null,
        valid_time: null,
        coupon_code: "E",
        minimum_order_value: null,
        maximum_discount_value: null,
        priority: 0,
        total: null,
        used: 0,
        limit: null,
        platform: null,
        deleted_at: null,
        created_at: null,
        updated_at: null,
        items_count: 0,
        organizations: [
            {
                id: 1,
                name: "MYSPA Dev 2021",
                subdomain: "dev",
                domain: "myspa.vn",
                latitude: 16.03963,
                longitude: 108.1891627,
                telephone: [
                    "0354328444"
                ],
                address: "241 Phan Xích Long ",
                min_price: 500000,
                max_price: 7000000,
                image: "20220311073137.jpg",
                is_momo_ecommerce_enable: true,
                is_moba_register_requested: true,
                opening_status: true,
                opening_time: [
                    {
                        from_time_opening: "08:00",
                        to_time_opening: "19:00",
                        time_opening: "on"
                    }
                ],
                created_at: "2022-01-07 16:37:38",
                updated_at: "2022-05-30 08:48:40",
                province_code: 48,
                district_code: 495,
                ward_code: 20314,
                priority: 1,
                timezone: null,
                is_demo: false,
                description: null,
                full_address: "241 Phan Xích Long , Phường Hòa Xuân, Quận Cẩm Lệ, Thành phố Đà Nẵng",
                image_url: "https://dev.myspa.vn/files/dev/avatar/20220311073137.jpg",
                is_favorite: false,
                pivot: {
                    "discount_id": 1,
                    "organization_id": 1
                }
            }
        ],
        items: []
    },
    {
        id: 1,
        title: "Test Final Price",
        description: "Test Final Price",
        discount_value: 123000,
        discount_unit: "PRICE",
        discount_type: "PRODUCT",
        valid_from: null,
        valid_util: null,
        valid_time: null,
        coupon_code: "E",
        minimum_order_value: null,
        maximum_discount_value: null,
        priority: 0,
        total: null,
        used: 0,
        limit: null,
        platform: null,
        deleted_at: null,
        created_at: null,
        updated_at: null,
        items_count: 0,
        organizations: [
            {
                id: 2,
                name: "MYSPA Dev 2021",
                subdomain: "dev",
                domain: "myspa.vn",
                latitude: 16.03963,
                longitude: 108.1891627,
                telephone: [
                    "0354328444"
                ],
                address: "241 Phan Xích Long ",
                min_price: 500000,
                max_price: 7000000,
                image: "20220311073137.jpg",
                is_momo_ecommerce_enable: true,
                is_moba_register_requested: true,
                opening_status: true,
                opening_time: [
                    {
                        from_time_opening: "08:00",
                        to_time_opening: "19:00",
                        time_opening: "on"
                    }
                ],
                created_at: "2022-01-07 16:37:38",
                updated_at: "2022-05-30 08:48:40",
                province_code: 48,
                district_code: 495,
                ward_code: 20314,
                priority: 1,
                timezone: null,
                is_demo: false,
                description: null,
                full_address: "241 Phan Xích Long , Phường Hòa Xuân, Quận Cẩm Lệ, Thành phố Đà Nẵng",
                image_url: "https://dev.myspa.vn/files/dev/avatar/20220311073137.jpg",
                is_favorite: false,
                pivot: {
                    "discount_id": 1,
                    "organization_id": 1
                }
            }
        ],
        items: []
    }
]
export const exDiscountFinal = [
    {
        "id": 5,
        "title": "Test Final Price",
        "description": "Test Final Price",
        "discount_value": 80000,
        "discount_unit": "PRICE",
        "discount_type": "FINAL_PRICE",
        "valid_from": null,
        "valid_util": null,
        "valid_time": null,
        "coupon_code": "E",
        "minimum_order_value": null,
        "maximum_discount_value": null,
        "priority": 0,
        "total": null,
        "used": 0,
        "limit": null,
        "platform": null,
        "deleted_at": null,
        "created_at": null,
        "updated_at": null,
        "items_count": 1,
        "organizations": [],
        "items": [
            {
                "id": 4,
                "productable_type": "App\\Models\\CI\\Service",
                "productable_id": 138,
                "discount_id": 5,
                "organization_id": 1,
                "created_at": "2022-08-02 16:58:24",
                "updated_at": "2022-08-02 16:58:26",
                "view_price": 0,
                "productable": {
                    "id": 138,
                    "service_code": "00138",
                    "service_backup_code": "",
                    "service_name": "Massage lưng và đùi",
                    "duration": 60,
                    "price": 200000,
                    "special_price": 150000,
                    "special_price_momo": 0,
                    "description": "",
                    "service_group_id": 71,
                    "service_order": false,
                    "commission_percen": 1,
                    "commission_money": 20000,
                    "reward_percent": 0,
                    "reward_money": 0,
                    "commission_plan": 1,
                    "image": "20190115085955.jpg",
                    "status": false,
                    "deleted": false,
                    "created_date": "2022-01-18 09:53:08",
                    "modified_date": "2021-03-08 11:57:52",
                    "created_by_id": 16622,
                    "branch_id": 1,
                    "booking_online": 1,
                    "service_cost_type": 1,
                    "is_featured": false,
                    "is_momo_ecommerce_enable": true,
                    "is_moba_ecommerce_enable": false,
                    "video": null,
                    "is_displayed_home": 0,
                    "tags": null,
                    "favorites_count": 2,
                    "image_url": "https://dev.myspa.vn/files/dev/service/20190115085955.jpg",
                    "video_url": null,
                    "rating": 4,
                    "is_favorite": false,
                    "bought_count": 95,
                    "category": {
                        "id": 71,
                        "name": "Massage foot",
                        "group_order": 2,
                        "deleted": false,
                        "branch_id": 0,
                        "created_date": "2018-03-17 14:48:10",
                        "modified_date": "2018-05-28 10:28:10",
                        "created_by_id": 182
                    }
                },
                "discount": {
                    "id": 5,
                    "title": "Test Final Price",
                    "description": "Test Final Price",
                    "discount_value": 80000,
                    "discount_unit": "PRICE",
                    "discount_type": "FINAL_PRICE",
                    "valid_from": null,
                    "valid_util": null,
                    "valid_time": null,
                    "coupon_code": "E",
                    "minimum_order_value": null,
                    "maximum_discount_value": null,
                    "priority": 0,
                    "total": null,
                    "used": 0,
                    "limit": null,
                    "platform": null,
                    "deleted_at": null,
                    "created_at": null,
                    "updated_at": null,
                    "organizations": [],
                    "items": [
                        {
                            "id": 4,
                            "productable_type": "App\\Models\\CI\\Service",
                            "productable_id": 138,
                            "discount_id": 5,
                            "organization_id": 1,
                            "created_at": "2022-08-02 16:58:24",
                            "updated_at": "2022-08-02 16:58:26"
                        }
                    ]
                },
                "organization": {
                    "id": 1,
                    "name": "JENNA THANH ",
                    "subdomain": "dev_jennathanh",
                    "domain": "myspa.vn",
                    "latitude": 21.03283049676,
                    "longitude": 105.84108292749,
                    "telephone": [
                        "0899717717"
                    ],
                    "address": "2RMR",
                    "min_price": 9000,
                    "max_price": 100000,
                    "image": "",
                    "is_momo_ecommerce_enable": true,
                    "is_moba_register_requested": false,
                    "opening_status": true,
                    "opening_time": [
                        {
                            "from_time_opening": "",
                            "to_time_opening": "",
                            "time_opening": "off"
                        },
                        {
                            "from_time_opening": "",
                            "to_time_opening": "",
                            "time_opening": "off"
                        },
                        {
                            "from_time_opening": "",
                            "to_time_opening": "",
                            "time_opening": "off"
                        },
                        {
                            "from_time_opening": "",
                            "to_time_opening": "",
                            "time_opening": "off"
                        },
                        {
                            "from_time_opening": "",
                            "to_time_opening": "",
                            "time_opening": "off"
                        },
                        {
                            "from_time_opening": "",
                            "to_time_opening": "",
                            "time_opening": "off"
                        },
                        {
                            "from_time_opening": "",
                            "to_time_opening": "",
                            "time_opening": "off"
                        }
                    ],
                    "created_at": "2022-01-07 16:37:38",
                    "updated_at": "2022-05-28 11:51:58",
                    "province_code": 1,
                    "district_code": 1,
                    "ward_code": 31,
                    "priority": 0,
                    "timezone": null,
                    "is_demo": false,
                    "description": null,
                    "full_address": "2RMR, Phường Giảng Võ, Quận Ba Đình, Thành phố Hà Nội",
                    "image_url": "https://dev_jennathanh.myspa.vn/files/dev_jennathanh/avatar/",
                    "is_favorite": false
                }
            }
        ]
    }
]