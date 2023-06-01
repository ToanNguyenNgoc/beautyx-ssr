const express = require('express');
const path = require('path');
const fs = require("fs");
const dotenv = require("dotenv")
const { isHTMLTemplate } = require("./valid")
const {
    getOrgDetail,
    getDiscountDetail,
    getServiceDetail,
    getProductDetail,
    getTagById,
    getProvince
} = require("./api")
const app = express();
dotenv.config()


const PORT = process.env.REACT_APP_PORT || 3008;
const indexPath = path.resolve(__dirname, '..', 'build', 'index.html');

// static resources should just be served as they are
app.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));

// here we serve the index.html page
const pagesServerSide = [
    'orgs',
    'cua-hang',
    'chi-tiet-giam-gia',
    'ket-qua-tim-kiem',
    'dich-vu',
    'san-pham',
    'danh-sach-dich-vu',
    'danh-sach-san-pham'
]
app.get('/*', (req, res, next) => {
    fs.readFile(indexPath, 'utf8', async (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        const page = req.path.split('/')[1]
        if (pagesServerSide.includes(page)) {
            // console.log(htmlData)
            let title = ''
            let description = ''
            let image = ''
            if ((page === 'orgs' || page === 'cua-hang') && req.path.split('/')[2]) {
                const subdomain = req.path.split('/')[2]
                const org = await getOrgDetail(subdomain)
                title = org.name
                description = org?.description?.length > 0 ?
                    `${org.description}`
                    :
                    `Lựa chọn nhiều sản phẩm, dịch vụ từ ${org.name}, thanh toán, đặt hẹn online và nhiều ưu đãi khác`
                image = org.image_url
            }
            if (page === 'chi-tiet-giam-gia') {
                const paramArr = req.path.split('/')[2]?.split('_')
                const { item, productable } = await getDiscountDetail(paramArr[2])
                title = productable?.service_name
                description = isHTMLTemplate(productable?.description) ?
                    `Dịch vụ làm đẹp cùng Deal hot ${productable?.service_name} tại ${item.organization?.full_address}`
                    :
                    `${productable.description}`
                image = productable.image_url
            }
            if (page === 'dich-vu') {
                const service = await getServiceDetail(
                    req.path.split('/')[2]?.split('_')[0],
                    req.path.split('/')[2]?.split('_')[1]
                )
                const org = await getOrgDetail(req.path.split('/')[2]?.split('_')[1])
                title = `${service?.service_name} | ${org?.name}`
                description = isHTMLTemplate(service?.description) ?
                    `Dịch vụ làm đẹp ${service?.service_name} của ${org?.name} địa chỉ ${org?.full_address}`
                    :
                    `${service.description}`
                image = service?.image ? service?.image_url : org?.image_url
            }
            if (page === 'san-pham') {
                const product = await getProductDetail(
                    req.path.split('/')[2]?.split('_')[0],
                    req.path.split('/')[2]?.split('_')[1]
                )
                const org = await getOrgDetail(req.path.split('/')[2]?.split('_')[1])
                title = `${product?.product_name} | ${org?.name}`
                description = isHTMLTemplate(product?.description) ?
                    `Sản phẩm làm đẹp ${product?.product_name} của ${org?.name} địa chỉ ${org?.full_address}`
                    :
                    `${product.description}`
                image = product?.image ? product?.image_url : org?.image_url
            }
            if ((page === 'danh-sach-dich-vu' || page === 'danh-sach-san-pham') && req.query.id) {
                const tag = await getTagById(req.query.id)
                title = tag?.name
                description = `Trải nghiệm các dịch vụ, sản phẩm làm đẹp của ${tag?.name}`
                image = tag?.media[0]?.original_url
            }
            if (page === 'ket-qua-tim-kiem' && req.query.province) {
                const { province, image_url } = await getProvince(req.query.province)
                title = `Làm đẹp tại ${province?.name ?? ''}`
                description = `Trải nhiệm và khám phá các dịch vụ làm đẹp tại ${province?.name || ''}`
                image = image_url
            }


            //---
            htmlData = htmlData
                .replace(
                    "<title>【BeautyX】- App đặt lịch làm đẹp online với nhiều địa điểm uy tín gần bạn</title>",
                    `<title>${title}</title>`
                )
                .replace(
                    '<meta name="description" content="Nền tảng app đặt lịch làm đẹp tại spa, salon, nails, massage, phòng khám, tmv uy tín với hàng nghìn địa điểm trên toàn quốc, đặt lịch dễ dàng, thanh toán nhanh chóng."/>',
                    `<meta name="description" 
                    content="${description}"
                />`
                )
                .replace(
                    '<meta property="og:title" content=""/>',
                    `<meta property="og:title" content="${title}"/>`
                )
                .replace(
                    '<meta property="og:description" content=""/>',
                    `<meta property="og:description" content="${description}"/>`
                )
                .replace(
                    '<meta property="og:image" content=""/>',
                    `<meta property="og:image" content="${image}"/>`
                )
            return res.send(htmlData);
        } else {
            return res.send(htmlData);
        }
    });
});

// listening...
app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error during app startup', error);
    }
    console.log("listening on " + PORT + "...");
});