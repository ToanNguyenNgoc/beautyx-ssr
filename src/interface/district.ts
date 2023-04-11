export interface IDistrict {
    name: string,
    type: string,
    codename: string,
    province_code: null | number,
    district_code: null | number,
    ward_code: null | number,
    province_id: null | number,
    district_id: null | number,
    organizations_count: number
}
export interface IWard {
    name: string,
    type: string,
    codename: string,
    province_code: null | number,
    district_code: null | number,
    ward_code: number,
    province_id: null | number,
    district_id: number,
    organizations_count: number
}