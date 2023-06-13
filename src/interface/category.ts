export interface Category {
      branch_id: number
      created_by_id: number
      created_date: string | null
      deleted: boolean
      id: number
      modified_date: string | null
      name: string
      product_category_order: number,
      products_count: number
}
export interface CategoryService {
      branch_id?: number
      created_by_id?: number
      created_date?: string
      deleted?: boolean
      group_order?: number
      id: number
      modified_date?: string
      name?: string
      services_count: number
}