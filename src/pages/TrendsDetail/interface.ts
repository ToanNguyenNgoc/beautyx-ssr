export interface ITrendItemVideo {
    favorite_count: number,
    isFavorite: boolean,
    view_count: number,
    share_count: number,
    comment_count: number
}
export interface ITrendCommentChild {
    commentable_id: string,
    commentable_type: string,
    created_at: string,
    body: string,
    user: {
        avatar: string,
        fullname: string
    },
}
export interface ITrendComment {
    commentable_id: string,
    commentable_type: string,
    created_at: string,
    body: string,
    user: {
        avatar: string,
        fullname: string
    },
    children: ITrendCommentChild[],
    media_url:string[]
}

export interface ITrendItem {
    _id: string | null,
    status: string,
    video: ITrendItemVideo,
    comments: ITrendComment[]
}