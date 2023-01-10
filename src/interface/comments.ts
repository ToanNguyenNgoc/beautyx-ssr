import { User } from './user'

export interface ICommentChildMedia {
    original_url: string
}

export interface ICommentChild {
    id?: number,
    body: string,
    user_id: number,
    user: User,
    organization_id?: number,
    rate_id?: number,
    commentable_type?: string,
    commentable_id: number,
    created_at?: string,
    updated_at?: string,
    deleted_at?: null,
    media_url: string[]
    media: ICommentChildMedia[]
}

export interface Rate {
    id: number,
    point: number,
    user_id: number,
    organization_id: number,
    rateable_type: string //App\\Models\\CI\\Service,
    rateable_id: number,
    created_at: string,
    updated_at: string,
    deleted_at?: string
}

export interface IComment {
    id: number,
    body: string,
    user_id: number,
    organization_id: null | number,
    rate_id: null | number,
    commentable_type: string,
    commentable_id: number,
    created_at: string,
    updated_at: string,
    deleted_at: null | string,
    rate: Rate,
    user: User,
    children: ICommentChild[],
    media_url: string[],
}