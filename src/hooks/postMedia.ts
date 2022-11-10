import mediaApi from "api/mediaApi"


export async function postMedia(e: any) {
    const file = e.target.files[0]
    let formData = new FormData()
    let model_id
    let original_url
    formData.append('file', file)
    const res = await mediaApi.postMedia(formData)
    if (res) {
        original_url = res.data.context.original_url
        model_id = res.data.context.model_id
    }
    return { original_url, model_id }
}