import commentsApi from "api/commentsApi";
import IStore from "interface/IStore";
import { ParamComment } from "params-query/param.interface";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSwr } from "./useSwr";

export function useComment(param: ParamComment) {
    const [loadPost, setLoadPost] = useState(false)
    const history = useHistory()
    const { USER } = useSelector((state: IStore) => state.USER)
    const { responseArray, result, mutate, totalItem } = useSwr(
        '/comments',
        param["filter[commentable_id]"],
        param
    )
    const comments = responseArray
    const totalComment = totalItem
    const postComment = async (body: any) => {
        if (!USER) return history.push("/sign-in?1")
        setLoadPost(true)
        try {
            const responsePost = await commentsApi.postComment2(body)
            const muteDate = {
                ...result,
                data: {
                    context: {
                        ...result.data.context,
                        data: [responsePost.data.context, ...responseArray]
                    }
                }
            }
            mutate(muteDate, true)
            setLoadPost(false)
        } catch (error) {
            console.log(error)
            setLoadPost(false)
        }
    }
    return { comments, loadPost, postComment, totalItem, totalComment }
}