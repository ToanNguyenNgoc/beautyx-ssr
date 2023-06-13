export interface ResponseType {
    context: {
        current_page: number,
        data: any,
        first_page_url: string,
        from: number,
        last_page: number,
        last_page_url: string,
        links: [],
        next_page_url?: string,
        path: string,
        per_page: number,
        prev_page_url?: number,
        to: number,
        total: number
    },
    message?: string,
    status?: number
}
export interface Response<Context> {
    context: Context,
    message?: string,
    status?: number
}