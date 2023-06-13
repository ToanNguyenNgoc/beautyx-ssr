interface IMedia {
      collection_name: string
      conversions_disk: string
      created_at: string
      custom_properties: []
      disk: string
      file_name: string
      generated_conversions: []
      id: number
      manipulations: []
      mime_type: string
      model_id: number
      model_type: string
      name: string
      order_column: number
      original_url: string
      preview_url: string
      responsive_images: []
      size: number
      updated_at: string
      uuid: string
}
export interface IProvince {
      name: string,
      type: string,
      codename: string,
      province_code: number,
      district_code: number | null,
      ward_code: number | null,
      province_id: number | null,
      district_id: number | null,
      organizations_count: number,
      media: IMedia[],
      branches_count: number
}
export interface IDistrict {
      branches_count: number
      codename: string
      district_code: number
      district_id: any
      name: string
      organizations_count: number
      province_code: any
      province_id: number
      type: string
      ward_code: any
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