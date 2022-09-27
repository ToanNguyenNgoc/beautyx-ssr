
export interface ITagParent {
      created_at:string,
      group: string,
      id: number,
      media: ITagMedia[],
      name: string,
      organizations_count: number,
      parent_id: number,
      updated_at: string
}

export interface ITag {
      id: number,
      name: string,
      created_at: null | string,
      updated_at: null | string,
      parent_id: null | number,
      parent: ITagParent,
      group: null | string,
      organizations_count: number,
      media: ITagMedia[],
      children?: ITag[]
}
export interface ITagMedia {
      id: number,
      model_type: string,
      model_id: number,
      uuid: string,
      collection_name: string,
      name: string,
      file_name: string,
      mime_type: string,
      disk: string,
      conversions_disk: string,
      size: number | string,
      manipulations: any[],
      custom_properties: any[],
      generated_conversions: any[],
      responsive_images: any[],
      order_column: number,
      created_at: null | string,
      updated_at: null | string,
      original_url: string,
      preview_url: null | string
}