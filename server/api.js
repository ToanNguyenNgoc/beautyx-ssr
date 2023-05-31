const axios = require('axios')

const getOrgDetail = async (id) => {
  let org = {}
  try {
    const response = await axios.get(`https://api.myspa.vn/v1/organizations/${id}`)
    org = response?.data?.context
  } catch (error) { }
  return org
}
const getDiscountDetail = async (id) => {
  let discount = {}
  let productable = {}
  let item = {}
  try {
    const response = await axios.get(`https://api.myspa.vn/v1/discounts/${id}`)
    discount = response.data.context
    item = response.data.context.items[0]
    productable = item.productable
  } catch (error) { }
  return { discount, productable, item }
}
const getServiceDetail = async (id, org_id) => {
  let service = {}
  try {
    const response = await axios.get(`https://api.myspa.vn/v1/organizations/${org_id}/services/${id}`)
    service = response.data.context
  } catch (error) { }
  return service
}
const getProductDetail = async (id, org_id) => {
  let product = {}
  try {
    const response = await axios.get(`https://api.myspa.vn/v1/organizations/${org_id}/products/${id}`)
    product = response.data.context
  } catch (error) { }
  return product
}
const getTagById = async (id) => {
  let tag = {}
  try {
    const response = await axios.get(`https://api.myspa.vn/v1/tags/${id}`)
    tag = response.data.context
  } catch (error) { }
  return tag
}
const getProvince = async (province_cde) => {
  let province = {}
  let image_url = ''
  try {
    const response = await axios.get('https://api.myspa.vn/v1/provinces?include=media')
    const cur = response?.data?.context?.data?.find(i => i.province_code == province_cde)
    province = cur
    image_url = cur?.media[0]?.original_url
  } catch (error) { }
  return { province, image_url }
}

module.exports = {
  getOrgDetail,
  getDiscountDetail,
  getServiceDetail,
  getProductDetail,
  getTagById,
  getProvince
}